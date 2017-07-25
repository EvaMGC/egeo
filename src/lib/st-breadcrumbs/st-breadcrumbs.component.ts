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
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
   selector: 'st-breadcrumbs',
   templateUrl: './st-breadcrumbs.component.html',
   styleUrls: ['./st-breadcrumbs.component.scss']
})
export class StBreadCrumbsComponent {
   @Input() options: string[] = [];
   @Input() qaTag: string;
   @Output() select: EventEmitter<number> = new EventEmitter<number>();

   generateCrumbs(): string[] {
      if (this.options.length <= 6) {
         return [...this.options];
      } else {
         return this.options
            .slice(0, 1)
            .concat(['...'])
            .concat(this.options.slice(-4));
      }
   }

   onSelect(index: number): void {
      if (index + 1 < this.options.length) {
         if (this.options.length <= 6 || index === 0) {
            this.select.emit(index);
         } else {
            let calculatedIndex: number;
            calculatedIndex = this.options.length - (6 - index);
            this.select.emit(index);
         }
      }
   }
}
