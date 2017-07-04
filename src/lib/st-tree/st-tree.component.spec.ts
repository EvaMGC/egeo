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
import { DebugElement, SimpleChanges, SimpleChange } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { cloneDeep as _cloneDeep } from 'lodash';


import { StTreeComponent } from './st-tree.component';
import { StNodeTree } from './st-tree.model';
import { StNodeTreeComponent } from './st-node-tree/st-node-tree.component';
import { StTreeNodeExpandComponent } from './st-tree-node-expand/st-tree-node-expand.component';


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
         declarations: [StTreeComponent, StNodeTreeComponent, StTreeNodeExpandComponent]
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

      let newTree: StNodeTree = { name: 'hdfs', icon: 'icon-folder', expanded: true };
      let changes: SimpleChanges = { tree: new SimpleChange(mockTree, newTree, true) };
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
   });
});
