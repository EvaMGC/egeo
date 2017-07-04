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
import { Component, Input } from '@angular/core';

@Component({
   selector: 'st-tree-node-expand',
   templateUrl: 'st-tree-node-expand.component.html'
})

export class StTreeNodeExpandComponent {
   @Input() type: 'expanded' | 'collapsed' | 'root' = 'collapsed';

   getPathDots(): string {
      if (this.type === 'expanded') {
         return 'M2.5 4.5h4';
      }
      if (this.type === 'collapsed') {
         return 'M2.5 4.5h4M4.5 2.5v4';
      }
      return '';
   }

   getGraphDots(): string {
      return this.isRoot() ? 'M.5.5h17v8H.5z' : 'M.5.5h8v8h-8z';
   }

   getDeffDots(): string {
      return this.isRoot() ? 'M0 0h18v9H0z' : 'M0 0h9v9H0z';
   }

   getWidth(): string {
      return this.isRoot() ? '18' : '9';
   }

   getViewBox(): string {
      return this.isRoot() ? '0 0 18 9' : '0 0 9 9';
   }

   isRoot(): boolean {
      return this.type === 'root';
   }
}
