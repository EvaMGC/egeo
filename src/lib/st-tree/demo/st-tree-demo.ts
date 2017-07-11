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
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
   cloneDeep as _cloneDeep,
   get as _get,
   set as _set
} from 'lodash';

import { StNodeTree, StNodeTreeChange } from '../st-tree.model';
import { StInputError } from '../../st-input/st-input.error.model';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
   selector: 'st-tree-demo',
   templateUrl: 'st-tree-demo.html',
   styles: [`
      .tree-background-A {
         background-color: #f5f5f5;
         padding: 20px;
      }
      .tree-background-B {
         background-color: #efefef;
         padding: 20px;
      }
      .tree-container {
         overflow: auto;
         height: 500px;
      }
   `]
})

export class StTreeDemoComponent implements OnInit {
   public treeForm: FormGroup;
   public nodeForm: FormGroup;
   public treeModel: TreeModel = { levels: 10, nodes: 50, max: undefined, name: 'Node'};
   public nodeModel: NodeModel = { name: 'New name', path: 'children[0]'};
   public forceTreeValidations: boolean = false;
   public forceNodeValidations: boolean = false;
   public errors: StInputError = { generic: 'Error'};

   public treeA: StNodeTree = {
      name: 'hdfs',
      icon: 'icon-folder',
      expanded: false,
      children: [
         { name: 'folder A', icon: 'icon-folder' },
         {
            name: 'folder B', icon: 'icon-folder', expanded: false, children: [
               {
                  name: 'folder B.0', icon: 'icon-folder', children: [
                     { name: 'folder B.0.0', icon: 'icon-file' },
                     { name: 'folder B.0.1', icon: 'icon-file' }
                  ]
               },
               {
                  name: 'folder B.1', icon: 'icon-folder', expanded: false, children: [
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
   public treeB: StNodeTree;

   public notificationChangeStream: Observable<StNodeTreeChange>;
   private subject: Subject<StNodeTreeChange> = new Subject<StNodeTreeChange>();
   private selectedPath: string;

   constructor(private _fb: FormBuilder) {
      this.notificationChangeStream = this.subject.asObservable();
      this.treeB = _cloneDeep(this.treeA);
   }

   ngOnInit(): void {
      this.treeForm = this._fb.group({
         'levels': [this.treeModel.levels, [Validators.required]],
         'nodes': [this.treeModel.nodes, [Validators.required]],
         'max': [this.treeModel.max],
         'name': [this.treeModel.name, [Validators.required]]
      });
      this.nodeForm = this._fb.group({
         'name': [this.nodeModel.name, [Validators.required]],
         'path': [this.nodeModel.path, [Validators.required]]
      });
   }

   onToogleNode(nodeChange: StNodeTreeChange, tree: StNodeTree): void {
      console.log('toogle node', nodeChange);
      let node: StNodeTree = _get<StNodeTree>(tree, nodeChange.path, tree);
      node.expanded = nodeChange.node.expanded;
      tree = _cloneDeep(tree);
   }

   onSelectNode(nodeChange: StNodeTreeChange, tree: StNodeTree): void {
      console.log('select node', nodeChange);
      let node: StNodeTree;
      if (this.selectedPath) {
         node = _get<StNodeTree>(tree, this.selectedPath, tree);
         node.selected = false;
      }
      this.selectedPath = nodeChange.path;
      node = _get<StNodeTree>(tree, nodeChange.path, tree);
      node.selected = true;
      tree = _cloneDeep(tree);
   }

   onNavigatePrevious(nodeChange: StNodeTreeChange): void {
      console.log('navigate previous', nodeChange);
   }

   onUpdateNodes(): void {
      this.forceNodeValidations = true;
      if (this.nodeForm.valid) {
         let nodeA: StNodeTree = _cloneDeep(this.treeA.children[0]);
         let nodeB: StNodeTree = _cloneDeep(this.treeB.children[0]);
         nodeA.name = nodeB.name = this.nodeModel.name = this.nodeForm.value.name;
         this.nodeModel.path = this.nodeForm.value.path;
         _set(this.treeA, this.nodeModel.path, nodeA);
         _set(this.treeB, this.nodeModel.path, nodeB);
         this.subject.next({ node: nodeA, path: this.nodeModel.path });
         this.subject.next({ node: nodeB, path: this.nodeModel.path });
      }
   }

   onGenerateTrees(): void {
      this.forceTreeValidations = true;
      if (this.treeForm.valid) {
         this.treeModel.levels = this.treeForm.value.levels;
         this.treeModel.nodes = this.treeForm.value.nodes;
         this.treeModel.max = this.treeForm.value.max || undefined;
         this.treeModel.name = this.treeForm.value.name;
         this.treeA = this.generateTree(this.treeModel.levels, this.treeModel.nodes, this.treeModel.name, 0);
         this.treeB = _cloneDeep(this.treeA);
      }
   }

   private generateNode(name: string, children?: StNodeTree[]): StNodeTree {
      return children ? { name: name, icon: 'icon-folder', expanded: true, children: children } : { name: name, icon: 'icon-file' };
   }

   private generateTree(levels: number, levelNodes: number, nodeName: string, startNode: number): StNodeTree {
      let node: StNodeTree;
      let childNodes: StNodeTree[];
      if (levels > 0) {
         childNodes = [];
         for (let i: number = 0; i < levelNodes; i++) {
            // Only generate childrens for the first child
            childNodes.push(this.generateTree(i === 0 ? levels - 1 : 0, levelNodes, `${nodeName} (${startNode}.${i})`, startNode + 1));
         }
      }
      return this.generateNode(nodeName, childNodes);
   }
}

export interface TreeModel {
   levels: number;
   nodes: number;
   max: number;
   name: string;
}

export interface NodeModel {
   name: string;
   path: string;
}
