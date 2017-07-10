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
   Output,
   OnDestroy
} from '@angular/core';
import { cloneDeep as _cloneDeep, isEqual as _isEqual } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
export class StNodeTreeComponent implements OnInit, OnChanges, OnDestroy {

   /** @Input {string[]} fahter Variable to get full path for father */
   @Input() father: number[];
   /** @Input {StNodeTree} node Subtree structure */
   @Input() node: StNodeTree;
   @Input() pos: number;
   @Input() maxLevel: number;
   @Input() changeStreamNotification: Observable<StNodeTreeChange>;

   @Output() internalNodeUpdate: EventEmitter<StNodeTreeChange> = new EventEmitter<StNodeTreeChange>();
   @Output() toogleNode: EventEmitter<StNodeTreeChange> = new EventEmitter<StNodeTreeChange>();
   @Output() selectNode: EventEmitter<StNodeTreeChange> = new EventEmitter<StNodeTreeChange>();

   public actualPath: number[] = [];

   private subscriptionNotifications: Subscription;

   constructor(private _cd: ChangeDetectorRef) { }

   ngOnInit(): void {
      this.actualPath = this.buildActualPath(this.father, this.pos);
      this.checkSubscriptionToChanges(this.changeStreamNotification);
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes && changes.father) {
         this.actualPath = this.buildActualPath(changes.father.currentValue, this.pos);
      }
      if (changes && changes.pos) {
         this.actualPath = this.buildActualPath(this.father, changes.pos.currentValue);
      }
      if (changes && changes.changeStreamNotification && changes.changeStreamNotification.currentValue) {
         this.checkSubscriptionToChanges(changes.changeStreamNotification.currentValue);
      }
      this._cd.markForCheck();
   }

   ngOnDestroy(): void {
      if (this.subscriptionNotifications) {
         this.subscriptionNotifications.unsubscribe();
      }
   }

   getType(): string {
      return this.node.expanded ? 'expanded' : 'collapsed';
   }

   hasChildren(): boolean {
      return this.node && this.node.children && this.node.children.length > 0;
   }

   isLevelOverflow(): boolean {
      return this.maxLevel !== undefined && this.father && this.father.length >= this.maxLevel;
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

   private checkSubscriptionToChanges(stream: Observable<StNodeTreeChange>): void {
      if (this.changeStreamNotification) {
         if (this.subscriptionNotifications) {
            this.subscriptionNotifications.unsubscribe();
         }
         this.subscriptionNotifications = this.changeStreamNotification.subscribe((change: StNodeTreeChange) => this.changeNode(change));
      }
   }

   private changeNode(change: StNodeTreeChange): void {
      let path: string = this.getPath();
      if (change.path === path && !_isEqual(change.node, this.node)) {
         this.node = _cloneDeep(change.node);
         this.internalNodeUpdate.emit({ node: this.node, path });
         this._cd.markForCheck();
      }
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
