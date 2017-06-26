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

import { StDropDownMenuItem, StDropDownMenuGroup } from '../../st-dropdown-menu/st-dropdown-menu.interface';

@Component({
   selector: 'st-dropdown-demo',
   templateUrl: 'st-dropdown-demo.html',
   styles: [`
      .background-grey {
         background-color: #f5f5f5;
         padding-top: 10px;
         padding-bottom: 10px;
      }
   `]
})
export class StDropdownDemoComponent {

   public items: Array<StDropDownMenuItem> = [
      { label: 'Item 1', value: 1, selected: true },
      { label: 'Item 2', value: 2 },
      { label: 'Item 3', value: 3 },
      { label: 'Item 4', value: 4 }
   ];

   public items10: Array<StDropDownMenuItem> = [
      { label: 'Item 1', value: 1 },
      { label: 'Item 2', value: 2 },
      { label: 'Item 3', value: 3 },
      { label: 'Item 4', value: 4 },
      { label: 'Item 5', value: 5 },
      { label: 'Item 6', value: 6 },
      { label: 'Item 7', value: 7 },
      { label: 'Item 8', value: 8 }
   ];

   public itemsWithIcon: Array<StDropDownMenuItem> = [
      { label: 'Edit', icon: 'icon-edit2', value: 'edit' },
      { label: 'Duplicate', icon: 'icon-copy', value: 'duplicate' },
      { label: 'Add', icon: 'icon-copy', value: 'add' },
      { label: 'Delete', icon: 'icon-copy', value: 'delete' }
   ];

   public itemsWithGroup: Array<StDropDownMenuGroup> = [
      { title: 'Group1', items: this.items },
      { title: 'Group2', items: this.items10 }
   ];
}
