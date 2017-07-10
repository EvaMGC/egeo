/*
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DebugElement, SimpleChanges, SimpleChange, ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { cloneDeep as _cloneDeep } from 'lodash';


import { StTreeComponent } from './st-tree.component';
import { StNodeTree, StNodeTreeChange } from './st-tree.model';
import { StNodeTreeComponent } from './st-node-tree/st-node-tree.component';
import { StTreeNodeExpandComponent } from './st-tree-node-expand/st-tree-node-expand.component';

import { EgeoResolveService } from '../utils/egeo-resolver/egeo-resolve.service';
import { EgeoResolverKeys } from '../utils/egeo-resolver/egeo-resolve-model';

const mockTree: StNodeTree = {
   name: 'hdfs',
   icon: 'icon-folder',
   expanded: true,
   children: [
      { name: 'folder A', icon: 'icon-folder' },
      {
         name: 'folder B', icon: 'icon-folder', expanded: true, children: [
            {
               name: 'folder B.0', icon: 'icon-folder', children: [
                  { name: 'folder B.0.0', icon: 'icon-file' },
                  { name: 'folder B.0.1', icon: 'icon-file' }
               ]
            },
            {
               name: 'folder B.1', icon: 'icon-folder', expanded: true, children: [
                  { name: 'folder B.1.0', icon: 'icon-file' },
                  { name: 'folder B.1.1', icon: 'icon-file' }
               ]
            },
            { name: 'folder B.2', icon: 'icon-file' },
            { name: 'folder B.3', icon: 'icon-file' },
            {
               name: 'folder B.4', icon: 'icon-folder', expanded: true, children: [
                  { name: 'folder B.4.0', icon: 'icon-file' },
                  { name: 'folder B.4.1', icon: 'icon-file' },
                  { name: 'folder B.4.2', icon: 'icon-file' },
                  { name: 'folder B.4.3', icon: 'icon-file' },
                  { name: 'folder B.4.4', icon: 'icon-file' }
               ]
            }
         ]
      },
      { name: 'folder C', icon: 'icon-file' },
      { name: 'folder D', icon: 'icon-folder' }
   ]
};

let fixture: ComponentFixture<StTreeComponent>;

describe('StTreeComponent', () => {

   let comp: StTreeComponent;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StTreeComponent, StNodeTreeComponent, StTreeNodeExpandComponent],
         providers: [EgeoResolveService]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTreeComponent);
      comp = fixture.componentInstance;
   });


   it('should init correctly', () => {
      comp.tree = mockTree;
      fixture.detectChanges();

      expect(comp.fatherNode).toEqual([]);
      expect(comp.qaTag).toEqual('');
      expect(comp.maxLevel).toBeUndefined();

      // Tree and mockTree are the same, internalTree its equal but not the same
      expect(comp.internalTree).toEqual(mockTree);
      expect(comp.tree).toBe(mockTree);
      expect(comp.internalTree).not.toBe(mockTree);
   });

   it('should change tree structure and reflect change', () => {
      comp.tree = mockTree;
      fixture.detectChanges();

      // Tree and mockTree are the same, internalTree its equal but not the same
      expect(comp.internalTree).toEqual(mockTree);
      expect(comp.tree).toBe(mockTree);
      expect(comp.internalTree).not.toBe(mockTree);

      let newTree: StNodeTree = { name: 'hdfs', icon: 'icon-folder' };
      let changes: SimpleChanges = { tree: new SimpleChange(mockTree, newTree, false) };
      comp.tree = newTree;
      comp.ngOnChanges(changes);

      // Tree and mockTree are the same, internalTree its equal but not the same
      expect(comp.internalTree).not.toEqual(mockTree);
      expect(comp.internalTree).toEqual(newTree);
      // Pased its the new tree now
      expect(comp.tree).not.toBe(mockTree);
      expect(comp.tree).toBe(newTree);
      // Its a copy
      expect(comp.internalTree).not.toBe(mockTree);
      expect(comp.internalTree).not.toBe(newTree);

      comp.ngOnChanges({});
      expect(comp.internalTree).toEqual(newTree);

      comp.internalTree = _cloneDeep(newTree);
      comp.ngOnChanges(changes);
      expect(comp.internalTree).toEqual(newTree);
   });


   it('should collapse node without childs and collapseChildsBranch true', () => {
      let node: StNodeTree = { name: 'name', icon: '' };
      comp.collapseChildsBranch = true;
      comp.tree = { name: 'root', icon: '', children: [node] };
      fixture.detectChanges();

      let responseFunction = jasmine.createSpy('response');
      comp.toogleNode.subscribe(responseFunction);
      let nodeToSend: StNodeTree = comp.internalTree.children[0];
      nodeToSend.expanded = false;
      let change: StNodeTreeChange = { node: nodeToSend, path: 'children[0]' };

      comp.onToogleNode(change);

      expect(comp.internalTree.children[0].expanded).toBeFalsy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledWith(change);

      comp.toogleNode.unsubscribe();
   });

   it('should collapse node with childs collapsed and collapseChildsBranch true', () => {
      let node: StNodeTree = { name: 'name', icon: '', expanded: true, children: [{ name: 'child1', icon: '' }] };
      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.collapseChildsBranch = true;
      fixture.detectChanges();

      let responseFunction = jasmine.createSpy('response');
      comp.toogleNode.subscribe(responseFunction);
      let nodeToSend: StNodeTree = comp.internalTree.children[0];
      nodeToSend.expanded = false;
      let change: StNodeTreeChange = { node: nodeToSend, path: 'children[0]' };

      comp.onToogleNode(change);

      expect(comp.internalTree.children[0].expanded).toBeFalsy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith(change);

      comp.toogleNode.unsubscribe();
   });

   it('should collapse node with childs expanded and collapseChildsBranch true', () => {
      let node: StNodeTree = { name: 'name', icon: '', expanded: true, children: [{ name: 'child1', icon: '', expanded: true }] };
      comp.tree = { name: 'root', icon: '', expanded: true, children: [node] };
      comp.collapseChildsBranch = true;
      fixture.detectChanges();

      let responseFunction = jasmine.createSpy('response');
      comp.toogleNode.subscribe(responseFunction);
      let nodeToSend: StNodeTree = comp.internalTree;
      nodeToSend.expanded = false;
      let change: StNodeTreeChange = { node: nodeToSend, path: '' };

      comp.onToogleNode(change);

      expect(comp.internalTree.expanded).toBeFalsy();
      expect(comp.internalTree.children[0].expanded).toBeFalsy();
      expect(comp.internalTree.children[0].children[0].expanded).toBeFalsy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(3);
      expect(responseFunction).toHaveBeenCalledWith(change);

      comp.toogleNode.unsubscribe();
   });

   it('should collapse node without childs and collapseChildsBranch false', () => {
      let node: StNodeTree = { name: 'name', icon: '' };
      comp.collapseChildsBranch = false;
      comp.tree = { name: 'root', icon: '', children: [node] };
      fixture.detectChanges();

      let responseFunction = jasmine.createSpy('response');
      comp.toogleNode.subscribe(responseFunction);
      let nodeToSend: StNodeTree = comp.internalTree.children[0];
      nodeToSend.expanded = false;
      let change: StNodeTreeChange = { node: nodeToSend, path: 'children[0]' };

      comp.onToogleNode(change);

      expect(comp.internalTree.children[0].expanded).toBeFalsy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledWith(change);

      comp.toogleNode.unsubscribe();
   });

   it('should collapse node with childs collapsed and collapseChildsBranch false', () => {
      let node: StNodeTree = { name: 'name', icon: '', expanded: true, children: [{ name: 'child1', icon: '' }] };
      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.collapseChildsBranch = false;
      fixture.detectChanges();

      let responseFunction = jasmine.createSpy('response');
      comp.toogleNode.subscribe(responseFunction);
      let nodeToSend: StNodeTree = comp.internalTree.children[0];
      nodeToSend.expanded = false;
      let change: StNodeTreeChange = { node: nodeToSend, path: 'children[0]' };

      comp.onToogleNode(change);

      expect(comp.internalTree.children[0].expanded).toBeFalsy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith(change);

      comp.toogleNode.unsubscribe();
   });

   it('should collapse node with childs expanded and collapseChildsBranch false', () => {
      let node: StNodeTree = { name: 'name', icon: '', expanded: true, children: [{ name: 'child1', icon: '', expanded: true }] };
      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.collapseChildsBranch = false;
      fixture.detectChanges();

      let responseFunction = jasmine.createSpy('response');
      comp.toogleNode.subscribe(responseFunction);
      let nodeToSend: StNodeTree = comp.internalTree.children[0];
      nodeToSend.expanded = false;
      let change: StNodeTreeChange = { node: nodeToSend, path: 'children[0]' };

      comp.onToogleNode(change);

      expect(comp.internalTree.children[0].expanded).toBeFalsy();
      expect(comp.internalTree.children[0].children[0].expanded).toBeTruthy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith(change);

      comp.toogleNode.unsubscribe();
   });

   it('should emit on select node', () => {
      comp.tree = { name: 'root', icon: '' };

      let responseFunction = jasmine.createSpy('response');
      comp.selectNode.subscribe(responseFunction);

      let change: StNodeTreeChange = { node: comp.internalTree, path: '' };

      comp.onSelectNode(change);

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith(change);

      comp.selectNode.unsubscribe();
   });

   it('should expand father nodes when its a deep node with expandFatherBranch true', () => {
      let responseFunction = jasmine.createSpy('response');
      let node: StNodeTree = { name: 'name', icon: '', expanded: false, children: [{ name: 'child1', icon: '', expanded: true }] };

      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.toogleNode.subscribe(responseFunction);
      comp.collapseChildsBranch = false;
      comp.expandFatherBranch = true;
      fixture.detectChanges();

      expect(comp.internalTree.expanded).toBeTruthy();
      expect(comp.internalTree.children[0].expanded).toBeTruthy();
      expect(comp.internalTree.children[0].children[0].expanded).toBeTruthy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(2);
   });

   it('should expand father nodes when its a child of root node with expandFatherBranch true', () => {
      let responseFunction = jasmine.createSpy('response');
      let node: StNodeTree = { name: 'name', icon: '', expanded: true, children: [{ name: 'child1', icon: '' }] };

      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.toogleNode.subscribe(responseFunction);
      comp.collapseChildsBranch = false;
      comp.expandFatherBranch = true;
      fixture.detectChanges();

      expect(comp.internalTree.expanded).toBeTruthy();
      expect(comp.internalTree.children[0].expanded).toBeTruthy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);

   });

   it('should expand father nodes when its the root node with expandFatherBranch true', () => {
      let responseFunction = jasmine.createSpy('response');
      let node: StNodeTree = { name: 'name', icon: '', expanded: false, children: [{ name: 'child1', icon: '' }] };

      comp.tree = { name: 'root', icon: '', expanded: true, children: [node] };
      comp.toogleNode.subscribe(responseFunction);
      comp.collapseChildsBranch = false;
      comp.expandFatherBranch = true;
      fixture.detectChanges();

      expect(comp.internalTree.expanded).toBeTruthy();
      expect(responseFunction).not.toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(0);
   });

   it('should expand father nodes when its a deep node with expandFatherBranch false', () => {
      let responseFunction = jasmine.createSpy('response');
      let node: StNodeTree = { name: 'name', icon: '', expanded: false, children: [{ name: 'child1', icon: '', expanded: true }] };

      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.toogleNode.subscribe(responseFunction);
      comp.collapseChildsBranch = false;
      comp.expandFatherBranch = false;
      fixture.detectChanges();

      expect(comp.internalTree.expanded).toBeFalsy();
      expect(comp.internalTree.children[0].expanded).toBeFalsy();
      expect(comp.internalTree.children[0].children[0].expanded).toBeTruthy();
      expect(responseFunction).not.toHaveBeenCalled();
   });

   it('should expand father nodes when its a child of root node with expandFatherBranch false', () => {
      let responseFunction = jasmine.createSpy('response');
      let node: StNodeTree = { name: 'name', icon: '', expanded: true, children: [{ name: 'child1', icon: '' }] };

      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.toogleNode.subscribe(responseFunction);
      comp.collapseChildsBranch = false;
      comp.expandFatherBranch = false;
      fixture.detectChanges();

      expect(comp.internalTree.expanded).toBeFalsy();
      expect(comp.internalTree.children[0].expanded).toBeTruthy();
      expect(responseFunction).not.toHaveBeenCalled();

   });

   it('should expand father nodes when its the root node with expandFatherBranch false', () => {
      let responseFunction = jasmine.createSpy('response');
      let node: StNodeTree = { name: 'name', icon: '', expanded: false, children: [{ name: 'child1', icon: '' }] };

      comp.tree = { name: 'root', icon: '', expanded: true, children: [node] };
      comp.toogleNode.subscribe(responseFunction);
      comp.collapseChildsBranch = false;
      comp.expandFatherBranch = false;
      fixture.detectChanges();

      expect(comp.internalTree.expanded).toBeTruthy();
      expect(responseFunction).not.toHaveBeenCalled();
   });

   it('should expand father nodes when its a deep node with expandFatherBranch true and intermediate node expanded', () => {
      let responseFunction = jasmine.createSpy('response');
      let node: StNodeTree = {
         name: 'name', icon: '', expanded: true, children: [
            {
               name: 'child1', icon: '', expanded: false, children: [
                  { name: 'child1.1', icon: '', expanded: false, children: [
                     { name: 'child1.1.1', icon: '', expanded: true }
                  ] }
               ]
            }
         ]
      };

      comp.tree = { name: 'root', icon: '', children: [node] };
      comp.toogleNode.subscribe(responseFunction);
      comp.collapseChildsBranch = false;
      comp.expandFatherBranch = true;
      fixture.detectChanges();

      expect(comp.internalTree.expanded).toBeTruthy();
      expect(comp.internalTree.children[0].expanded).toBeTruthy();
      expect(comp.internalTree.children[0].children[0].expanded).toBeTruthy();
      expect(comp.internalTree.children[0].children[0].children[0].expanded).toBeTruthy();
      expect(comp.internalTree.children[0].children[0].children[0].children[0].expanded).toBeTruthy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(3);
   });

    it('should collapse deep node with two levels childs expanded and collapseChildsBranch true', () => {
       let node: StNodeTree = {
         name: 'name', icon: '', expanded: true, children: [
            {
               name: 'child1', icon: '', expanded: false, children: [
                  { name: 'child1.1', icon: '', expanded: true, children: [
                     { name: 'child1.1.1', icon: '', expanded: false }
                  ] }
               ]
            }
         ]
      };

      comp.tree = { name: 'root', icon: '', expanded: true, children: [node] };
      comp.collapseChildsBranch = true;
      fixture.detectChanges();

      let responseFunction = jasmine.createSpy('response');
      comp.toogleNode.subscribe(responseFunction);
      let nodeToSend: StNodeTree = comp.internalTree.children[0].children[0];
      nodeToSend.expanded = false;
      let change: StNodeTreeChange = { node: nodeToSend, path: 'children[0].children[0]' };

      comp.onToogleNode(change);

      expect(comp.internalTree.expanded).toBeTruthy();
      expect(comp.internalTree.children[0].expanded).toBeTruthy();
      expect(comp.internalTree.children[0].children[0].expanded).toBeFalsy();
      expect(comp.internalTree.children[0].children[0].children[0].expanded).toBeFalsy();
      expect(comp.internalTree.children[0].children[0].children[0].children[0].expanded).toBeFalsy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(2);

      comp.toogleNode.unsubscribe();
   });

   it('should update when internal node update event', () => {
       let node: StNodeTree = { name: 'name', icon: '', expanded: true};
      comp.tree = { name: 'root', icon: '', expanded: true, children: [node] };
      comp.collapseChildsBranch = false;
      comp.expandFatherBranch = false;
      fixture.detectChanges();

      let nodeToSend: StNodeTree = _cloneDeep(comp.internalTree.children[0]);
      let newName: string = 'New node name';
      nodeToSend.name = newName;
      let change: StNodeTreeChange = { node: nodeToSend, path: 'children[0]' };

      expect(comp.internalTree.children[0].name).toEqual(node.name);
      comp.onInternalNodeUpdate(change);

      expect(comp.internalTree.children[0].name).toEqual(newName);
   });
});
