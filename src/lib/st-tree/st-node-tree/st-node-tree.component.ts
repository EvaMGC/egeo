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
   OnInit,
   OnChanges,
   SimpleChanges,
   ChangeDetectorRef,
   EventEmitter,
   Output
} from '@angular/core';

import { StNodeTree, StNodeTreeChange } from '../st-tree.model';

/**
 * @description {Component} Node-Tree
 * This component show a subtree structure
 *
 * @example
 *
 *  <st-node-tree [father]="fatherNode" [node]="internalTree" ></st-node-tree>
 */
@Component({
   selector: 'st-node-tree',
   templateUrl: './st-node-tree.component.html',
   styleUrls: ['./st-node-tree.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StNodeTreeComponent implements OnInit, OnChanges {

   /** @Input {string[]} fahter Variable to get full path for father */
   @Input() father: number[];
   /** @Input {StNodeTree} node Subtree structure */
   @Input() node: StNodeTree;
   @Input() pos: number;

   @Output() toogleNode: EventEmitter<StNodeTreeChange> = new EventEmitter<StNodeTreeChange>();
   @Output() selectNode: EventEmitter<StNodeTreeChange> = new EventEmitter<StNodeTreeChange>();

   public actualPath: number[] = [];

   constructor(private _cd: ChangeDetectorRef) { }

   ngOnInit(): void {
      this.actualPath = this.buildActualPath(this.father, this.pos);
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes && changes.father) {
         this.actualPath = this.buildActualPath(changes.father.currentValue, this.pos);
         this._cd.markForCheck();
      }

      if (changes && changes.pos) {
         this.actualPath = this.buildActualPath(this.father, changes.pos.currentValue);
         this._cd.markForCheck();
      }
   }

   getType(): string {
      return this.node.expanded ? 'expanded' : 'collapsed';
   }

   hasChildren(): boolean {
      return this.node && this.node.children && this.node.children.length > 0;
   }

   onClickForSelect(event: Event): void {
      event.stopImmediatePropagation();
      this.node.expanded = !this.node.expanded;
      let changeEvent: StNodeTreeChange = { node: this.node, path: this.getPath() };
      this.toogleNode.emit(changeEvent);
      this.selectNode.emit(changeEvent);
   }

   onToogleNode(event: Event): void {
      event.stopImmediatePropagation();
      this.node.expanded = !this.node.expanded;
      this.toogleNode.emit({ node: this.node, path: this.getPath() });
   }

   private getPath(): string {
      if (this.father.length === 0) {
         return '';
      } else if (this.father.length === 1) {
         return `children[${this.pos}]`;
      }
      return [...this.father.slice(1).map((father) => `children[${father}]`), ...[`children[${this.pos}]`]].join('.');
   }

   private buildActualPath(fatherPath: number[], actualNode: number): number[] {
      return [...fatherPath, actualNode];
   }
}
