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


import { StNodeTree } from '../st-tree.model';
import { StNodeTreeComponent } from './st-node-tree.component';
import { StTreeNodeExpandComponent } from '../st-tree-node-expand/st-tree-node-expand.component';


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

let fixture: ComponentFixture<StNodeTreeComponent>;

describe('StTreeComponent', () => {
   describe('StNodeTreeComponent', () => {

      let comp: StNodeTreeComponent;

      beforeEach(async(() => {
         TestBed.configureTestingModule({
            declarations: [StNodeTreeComponent, StTreeNodeExpandComponent]
         })
            .compileComponents();  // compile template and css
      }));

      beforeEach(() => {
         fixture = TestBed.createComponent(StNodeTreeComponent);
         comp = fixture.componentInstance;
      });


      it('should init correctly', () => {
         comp.father = ['root'];
         comp.node = mockTree;
         fixture.detectChanges();

         expect(comp.actualPath).toEqual(['root', mockTree.name]);
         expect(comp.getType()).toEqual('expanded');
         expect(comp.hasChildren()).toBeTruthy();
      });

      it('should react to changes', () => {
         comp.father = ['root'];
         comp.node = mockTree;
         fixture.detectChanges();

         expect(comp.actualPath).toEqual(['root', mockTree.name]);
         expect(comp.getType()).toEqual('expanded');
         expect(comp.hasChildren()).toBeTruthy();

         let newNode: StNodeTree = _cloneDeep(mockTree);
         newNode.expanded = false;
         newNode.name = 'newTest';
         let changes: SimpleChanges = { node: new SimpleChange(mockTree, newNode, true) };
         comp.node = newNode;
         comp.ngOnChanges(changes);

         expect(comp.actualPath).toEqual(['root', newNode.name]);
         expect(comp.getType()).toEqual('collapsed');
         expect(comp.hasChildren()).toBeTruthy();

         comp.ngOnChanges({ father: new SimpleChange(['root'], ['newRoot'], true) });
         expect(comp.actualPath).toEqual(['newRoot', newNode.name]);
      });

      it('should check if has children correctly', () => {
         comp.father = ['root'];
         comp.node = mockTree;
         fixture.detectChanges();

         expect(comp.hasChildren()).toBeTruthy();

         let newNode: StNodeTree = { name: 'test1', icon: 'icon-folder' };
         comp.node = newNode;
         expect(comp.hasChildren()).toBeFalsy();

         newNode.children = [];
         comp.node = newNode;
         expect(comp.hasChildren()).toBeFalsy();
      });
   });
});
