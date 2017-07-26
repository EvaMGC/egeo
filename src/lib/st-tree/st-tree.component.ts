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
import { Observable } from 'rxjs/Observable';

import { StEgeo, StRequired } from '../decorators/require-decorators';
import { StNodeTree, StNodeTreeChange } from './st-tree.model';
import { EgeoResolveService } from '../utils/egeo-resolver/egeo-resolve.service';

/**
 * @description {Component} [Tree]
 *
 * The tree is a component for representing information in a hierarchical way.
 * It allows navigating between the different nodes and visualizing the parent-child relationships between nodes.
 * Up to 5 depth levels can be displayed at a time. To avoid a horizontal scroll,
 * from the 5th level will be collapsing previous levels, starting with the first parent.
 *
 * @example
 *
 * <st-tree
 *    [tree]="treeA"
 *    [maxLevel]="treeModel.max"
 *    [isRoot]="true"
 *    (toogleNode)="onToogleNode($event, treeA)"
 *    (selectNode)="onSelectNode($event, treeA)"
 *    (navigatePrevious)="onNavigatePrevious($event)"
 *    [changeStreamNotification]="notificationChangeStream">
 * </st-tree>
 */
@StEgeo()
@Component({
   selector: 'st-tree',
   templateUrl: './st-tree.component.html',
   styleUrls: ['./st-tree.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StTreeComponent implements OnInit, OnChanges {

   /** @Input {string} [qaTag=''] Id value for qa test */
   @Input() qaTag: string = '';
   /** @Input {StNodeTree} [^tree] Tree root node */
   @Input() @StRequired() tree: StNodeTree;
   /** @Input {number} [maxLevel] Max level to show. From this level the tree does not expand more */
   @Input() maxLevel: number;
   /** @Input {boolean} [isRoot=true] TRUE: the first node is root and not show dots, FALSE: the first node is not root and
    * we put three dots to indicate that are more levels upper
    */
   @Input() isRoot: boolean = true;
   /** @Input {boolean} [expandFatherBranch=true] TRUE: Expand the path from the root to the expanded node if any node is not expanded.
    * FALSE: Only expand the selected node
    */
   @Input() expandFatherBranch: boolean = true;
   /** @Input {boolean} [collapseChildsBranch=true] TRUE: Collapse all child nodes. FALSE: Only collapse the selected node */
   @Input() collapseChildsBranch: boolean = true;
   /** @Input {Observable<StNodeTreeChange>} [changeStreamNotification] Stream for notificating changes in some node and not change all tree */
   @Input() changeStreamNotification: Observable<StNodeTreeChange>;

   /** @Output {StNodeTreeChange} [toogleNode] Notify any node expansion or collapsed */
   @Output() toogleNode: EventEmitter<StNodeTreeChange> = new EventEmitter<StNodeTreeChange>();
   /** @Output {StNodeTreeChange} [selectNode] Notify any node selection */
   @Output() selectNode: EventEmitter<StNodeTreeChange> = new EventEmitter<StNodeTreeChange>();
   /** @Output {Event} [navigatePrevious] Notify click over three dots to indicate that user wants to go up in tree structrure */
   @Output() navigatePrevious: EventEmitter<Event> = new EventEmitter<Event>();

   public internalTree: StNodeTree;
   public fatherNode: number[] = [];
   public selectedPath: string = '';

   constructor(
      private _resolver: EgeoResolveService,
      private _cd: ChangeDetectorRef
   ) { }

   ngOnInit(): void {
      this.internalTree = this.createTreeCopy(this.tree);
      this.checkTreeExpand();
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes && changes.tree && !changes.tree.firstChange && !_isEqual(changes.tree.currentValue, changes.tree.previousValue)) {
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

   onSelectNode(nodeChange: StNodeTreeChange): void {
      this.selectNode.emit(nodeChange);
      this.selectedPath = nodeChange.path;
      this._cd.markForCheck();
   }

   onInternalNodeUpdate(update: StNodeTreeChange): void {
      _set(this.internalTree, update.path, update.node);
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
