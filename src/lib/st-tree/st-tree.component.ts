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
import {
   ChangeDetectionStrategy,
   Component,
   Input,
   OnChanges,
   OnInit,
   SimpleChanges,
   Output,
   EventEmitter,
   ChangeDetectorRef
} from '@angular/core';
import {
   cloneDeep as _cloneDeep,
   get as _get,
   set as _set,
   isEqual as _isEqual
} from 'lodash';

import { StEgeo, StRequired } from '../decorators/require-decorators';
import { StNodeTree, StNodeTreeChange } from './st-tree.model';
import { EgeoResolveService } from '../utils/egeo-resolver/egeo-resolve.service';

/**
 * @description {Component} Tree
 * This component show a tree structure
 *
 * @example
 *
 * <st-tree [tree]="tree"></st-tree>
 */
@StEgeo()
@Component({
   selector: 'st-tree',
   templateUrl: './st-tree.component.html',
   styleUrls: ['./st-tree.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StTreeComponent implements OnInit, OnChanges {

   /** @Input {string} qaTag value for set id and can test easily by QA team */
   @Input() qaTag: string = '';
   /** @Input {StNodeTree} tree Tree structure */
   @Input() @StRequired() tree: StNodeTree;

   @Input() expandFatherBranch: boolean = true;
   @Input() collapseChildsBranch: boolean = true;

   @Output() toogleNode: EventEmitter<StNodeTreeChange> = new EventEmitter<StNodeTreeChange>();
   @Output() selectNode: EventEmitter<StNodeTreeChange> = new EventEmitter<StNodeTreeChange>();

   public internalTree: StNodeTree;
   public fatherNode: number[] = [];

   constructor(
      private _resolver: EgeoResolveService,
      private _cd: ChangeDetectorRef
   ) { }

   ngOnInit(): void {
      this.internalTree = this.createTreeCopy(this.tree);
      this.checkTreeExpand();
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes && changes.tree && !changes.tree.firstChange) {
         if (!_isEqual(this.internalTree, changes.tree.currentValue)) {
            this.internalTree = this.createTreeCopy(changes.tree.currentValue);
            this.checkTreeExpand();
            this._cd.markForCheck();
         }
      }
   }

   onToogleNode(nodeChange: StNodeTreeChange): void {
      this.collapseAllBranchFromNode(nodeChange);
      this.toogleNode.emit(nodeChange);
   }

   onSelectNode(node: StNodeTreeChange): void {
      this.selectNode.emit(node);
   }

   private checkTreeExpand(): void {
      if (this.expandFatherBranch) {
         let paths: string[] = this._resolver.getKeys(this.internalTree, 'expanded', true).map(resolveKey => resolveKey.path);
         this.expandBranchFromNode(paths);
      }
   }

   private collapseAllBranchFromNode(nodeChange: StNodeTreeChange): void {
      if (nodeChange && nodeChange.node && !nodeChange.node.expanded && this.collapseChildsBranch) {
         let node: StNodeTree;
         if (nodeChange.path.length > 0) {
            node = _get<StNodeTree>(this.internalTree, nodeChange.path, undefined);
         } else {
            node = this.internalTree;
         }
         let paths: string[] = this._resolver.getKeys(node, 'expanded', true).map(resolveKey => resolveKey.path);
         let actualNode: StNodeTree;
         paths.forEach(path => {
            actualNode = _get<StNodeTree>(node, path);
            actualNode.expanded = false;
            let fullPath: string = nodeChange.path.length === 0 ? path : `${nodeChange.path}.${path}`;
            this.toogleNode.emit({ node: actualNode, path: fullPath });
         });
      }
   }

   private expandBranchFromNode(path: string[]): void {
      path.forEach(pathForExpand => {
         let i: number = 1;
         let fatherNode: StNodeTreeChange = this.getFatherNode(this.internalTree, pathForExpand, i);
         while (fatherNode && !fatherNode.node.expanded) {
            fatherNode.node.expanded = true;
            this.toogleNode.emit(fatherNode);
            fatherNode = this.getFatherNode(this.internalTree, pathForExpand, ++i);
         }
      });
   }

   private getFatherNode(tree: StNodeTree, path: string, levelsToUp: number): StNodeTreeChange {
      let pathParts: string[] = path.split('.');

      if (pathParts && pathParts.length >= levelsToUp) {
         pathParts = pathParts.slice(0, pathParts.length - levelsToUp);
         if (pathParts.length === 0) {
            return { node: tree, path: '' };
         } else if (pathParts.length > 0) {
            return { node: _get<StNodeTree>(this.internalTree, pathParts.join('.'), undefined), path: pathParts.join('.') };
         }
      }
      return undefined;
   }

   private createTreeCopy(original: StNodeTree): StNodeTree {
      return _cloneDeep(original);
   }
}
