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

import { StDropDownMenuItem } from '../st-dropdown-menu.interface';

@Component({
   selector: 'st-dropdown-menu-demo',
   templateUrl: 'st-dropdown-menu-demo.html',
   styles: ['.button{border: 1px solid black;}']
})
export class StDropdownMenuDemoComponent {

   public menu: StDropDownMenuItem[] = [];
   public active: boolean = false;
   public selectedValue: StDropDownMenuItem = {value: 'none', label: 'none'};

   constructor() {
      for (let i = 0; i < 15; i++) {
         this.menu.push({
            label: 'option-' + i,
            value: 'option-' + i
         });
      }
   }

   changeActive(): void {
      this.active = !this.active;
      console.log('click button and active is: ', this.active);
   }

   onChange(element: StDropDownMenuItem): void {
      this.active = false;
      this.selectedValue = element;
      console.log('select value and hide menu');
   }
}
