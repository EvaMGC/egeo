
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
import { times as _times, filter as _filter } from 'lodash';

import { StItemListElement, StItemListConfig } from '../st-item-list.model';
import { StItemListComponent } from '../st-item-list.component';

@Component({
   selector: 'st-item-list-demo',
   templateUrl: './st-item-list-demo.html',
   styles: [`
      .item-list-container {
         padding: 20px;
      }
      .item-list-example-A {
         height: 500px;
      }
      .item-list-example-B {
         height: 300px;
      }
   `]
})
export class StItemListDemoComponent {
   public qaTag: string = 'st-item-list-demo';

   public listShort: StItemListElement[] = this.generateData(5);
   public listLong: StItemListElement[] = this.generateData(100);

   public listShortFilteredA: StItemListElement[] = this.filterList(this.listShort, '');
   public listLongFilteredA: StItemListElement[] = this.filterList(this.listLong, '');

   public listShortFilteredB: StItemListElement[] = this.filterList(this.listShort, '');
   public listLongFilteredB: StItemListElement[] = this.filterList(this.listLong, '');

   public configAll: StItemListConfig = {
       title: 'List Title',
       searchPlaceholder: 'Text for search'
   };

   public configTitle: StItemListConfig = {
       title: 'List Title',
       searchPlaceholder: ''
   };

   public configSearch: StItemListConfig = {
       title: '',
       searchPlaceholder: 'Text for search'
   };

   public themeA: string = 'themeA';
   public themeB: string = 'themeB';

   onSelectItem(item: StItemListElement): void {
      item.selected = !item.selected;
   }

   onSearchItem(value: string, listN: number): void {
      switch (listN) {
         case 0:
            this.listShortFilteredA = this.filterList(this.listShort, value);
            break;
         case 1:
            this.listLongFilteredA = this.filterList(this.listLong, value);
            break;
         case 2:
            this.listLongFilteredB = this.filterList(this.listLong, value);
            break;
         case 3:
            this.listShortFilteredB = this.filterList(this.listShort, value);
            break;
         default:
      }
   }

   private filterList(list: StItemListElement[], filter: string): StItemListElement[] {
       return _filter(list, (item) => item.name.indexOf(filter) > -1);
   }

   private generateData(numData: number): StItemListElement[] {
      return _times(numData, (i) => {
         return {
            id: i,
            name: `Element ${i}`,
            icon: 'icon-file'
         };
      });
   }
}
