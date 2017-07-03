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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { StEgeo, StRequired } from '../decorators/require-decorators';
import { StItemListElement, StItemListConfig, StItemListConfigSchema } from './st-item-list.model';

@Component({
   selector: 'st-item-list',
   templateUrl: './st-item-list.component.html',
   styleUrls: ['./st-item-list.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StItemListComponent {

   @Input() @StRequired() list: StItemListElement[];
   @Input() config: StItemListConfig;
   @Input() qaTag: string = '';
   @Input() hasSearch: boolean = false;
   @Input() align: 'left' | 'right' = 'left';
   @Input() theme: string = 'themeA';

   @Output() selectItem: EventEmitter<StItemListElement> = new EventEmitter<StItemListElement>();
   @Output() search: EventEmitter<string> = new EventEmitter<string>();

   get listTitle(): string {
      return this.config && this.config.title || '';
   }

   get searchPlaceholder(): string {
      return this.config && this.config.searchPlaceholder || '';
   }

   get listQaTag(): string {
      return this.qaTag || '';
   }

   get searchQaTag(): string {
      return this.qaTag && this.qaTag + '-search' || '';
   }

}
