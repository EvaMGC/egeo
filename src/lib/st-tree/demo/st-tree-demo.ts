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
import { Component } from '@angular/core';
import { cloneDeep as _cloneDeep, get as _get} from 'lodash';

import { StNodeTree, StNodeTreeChange } from '../st-tree.model';

@Component({
   selector: 'st-tree-demo',
   templateUrl: 'st-tree-demo.html'
})

export class StTreeDemoComponent {
   public tree: StNodeTree = {
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
   public maxLevel: number = 3;

   onToogleNode(nodeChange: StNodeTreeChange): void {
      console.log('toogle node', nodeChange);
      let node: StNodeTree = _get<StNodeTree>(this.tree, nodeChange.path, this.tree);
      node.expanded = nodeChange.node.expanded;
      this.tree = _cloneDeep(this.tree);
   }

   onSelectNode(nodeChange: StNodeTreeChange): void {
      console.log('selecte node', nodeChange);
   }

   onClick(): void {
      this.tree = this.generateTree(10, 50, 'Node', 0);
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
            childNodes.push(this.generateTree(i === 0 ? levels - 1 : 0, levelNodes, `${nodeName}-${startNode}.${i}`, startNode + 1));
         }
      }
      return this.generateNode(nodeName, childNodes);
   }
}
