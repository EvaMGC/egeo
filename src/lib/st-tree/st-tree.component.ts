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
   SimpleChanges
} from '@angular/core';
import { cloneDeep as _cloneDeep } from 'lodash';

import { StEgeo, StRequired } from '../decorators/require-decorators';
import { StNodeTree } from './st-tree.model';

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

   public internalTree: StNodeTree;
   public fatherNode: string[] = [];

   ngOnInit(): void {
      this.internalTree = this.createTreeCopy(this.tree);
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes && changes.tree) {
         this.internalTree = this.createTreeCopy(changes.tree.currentValue);
      }
   }

   private createTreeCopy(original: StNodeTree): StNodeTree {
      return _cloneDeep(original);
   }
}
