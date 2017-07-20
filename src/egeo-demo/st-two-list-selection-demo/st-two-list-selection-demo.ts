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
import * as _ from 'lodash';
import {
   StTwoListSelectionElement,
   StTwoListSelectionConfig,
   EgeoResolveService,
   StTwoListSelectExtraLabelAction,
   StDropDownMenuItem
} from '@stratio/egeo';

@Component({
   selector: 'two-list-selection-demo',
   templateUrl: './st-two-list-selection-demo.html',
   styleUrls: ['./st-two-list-selection-demo.scss']
})

export class StTwoListSelectionDemoComponent {

   completeUserList: Array<StTwoListSelectionElement> = [];
   selectedUserList: Array<StTwoListSelectionElement> = [];

   config: StTwoListSelectionConfig = {
      allElementsListTitle: 'All element',
      allElementsSearchPlaceholder: 'Search in all',
      selectedElementsListTitle: 'Selected elements',
      selectedElementsSearchPlaceholder: 'Search in selected'
   };

   public orderOptions: Array<StDropDownMenuItem> = [
      {
         label: 'A-Z',
         value: 1
      },
      {
         label: 'Z-A',
         value: 2
      }
   ];

   constructor() {
      this.fillLists();
   }

   showSelectedElements(): void {
      console.log(JSON.stringify(this.selectedUserList.map(item => item.name)));
   }

   selectExtraLabel(el: StTwoListSelectExtraLabelAction): void {
      el.event.stopImmediatePropagation();
      console.log('Selected label', el);
   }

   changeOrder(order: StDropDownMenuItem): void {
      console.log('change order, ', order);
   }

   private fillLists(): void {
      for (let i = 0; i < 300; i++) {
         if (i === 2) {
            this.completeUserList.push({id: i, name: null });
         } else {
            this.completeUserList.push({ id: i, name: `User-${i}` });
            if (i % 4 === 0) {
               this.selectedUserList.push(_.clone(this.completeUserList[i]));
            }
         }
      }
   }
}
