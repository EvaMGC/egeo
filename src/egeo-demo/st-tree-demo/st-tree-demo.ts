/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
   cloneDeep as _cloneDeep,
   get as _get,
   set as _set
} from 'lodash';
import { StTreeNode, StTreeEvent, StInputError } from '@stratio/egeo';
import { Observable, Subject } from 'rxjs';

@Component({
   selector: 'st-tree-demo',
   templateUrl: './st-tree-demo.html',
   styleUrls: ['./st-tree-demo.scss']
})

export class StTreeDemoComponent implements OnInit {
   public treeForm: FormGroup;
   public treeModel: TreeModel = { levels: 10, nodes: 50, name: 'Node' };
   public errors: StInputError = { generic: 'Error' };

   public treeA: StTreeNode = {
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
   public treeB: StTreeNode;

   public notificationChangeStream: Observable<StTreeEvent>;
   private subject: Subject<StTreeEvent> = new Subject<StTreeEvent>();
   private selectedPath: string;

   constructor(private _fb: FormBuilder) {
      this.notificationChangeStream = this.subject.asObservable();
      this.treeB = _cloneDeep(this.treeA);
   }

   ngOnInit(): void {
      this.treeForm = this._fb.group({
         'levels': [this.treeModel.levels, [Validators.required]],
         'nodes': [this.treeModel.nodes, [Validators.required]],
         'name': [this.treeModel.name, [Validators.required]]
      });
   }

   onToggleNode(event: StTreeEvent): void {
      console.log('toogle node', event);
      this.treeA = _cloneDeep(event.tree);
   }

   onSelectNode(event: StTreeEvent): void {
      console.log('select node', event);
      this.treeA = _cloneDeep(event.tree);
   }

   onGenerateTrees(): void {
      if (this.treeForm.valid) {
         this.treeModel.levels = this.treeForm.value.levels;
         this.treeModel.nodes = this.treeForm.value.nodes;
         this.treeModel.name = this.treeForm.value.name;
         this.treeA = this.generateTree(this.treeModel.levels, this.treeModel.nodes, this.treeModel.name, 0);
         this.treeB = _cloneDeep(this.treeA);
      }
   }

   private generateNode(name: string, children?: StTreeNode[]): StTreeNode {
      return children ? { name: name, icon: 'icon-folder', expanded: true, children: children } : { name: name, icon: 'icon-file' };
   }

   private generateTree(levels: number, levelNodes: number, nodeName: string, startNode: number): StTreeNode {
      let node: StTreeNode;
      let childNodes: StTreeNode[] = [];
      if (levels > 0) {
         childNodes = [];
         for (let i: number = 0; i < levelNodes; i++) {
            // Only generate children for the first child
            childNodes.push(this.generateTree(i === 0 ? levels - 1 : 0, levelNodes, `${nodeName} (${startNode}.${i})`, startNode + 1));
         }
      }
      return this.generateNode(nodeName, childNodes);
   }
}

export interface TreeModel {
   levels: number;
   nodes: number;
   name: string;
}
