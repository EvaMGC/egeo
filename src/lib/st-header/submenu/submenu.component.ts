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
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { StSubMenuModel } from '../st-header.model';

@Component({
   selector: 'submenu',
   styleUrls: ['./submenu.component.scss'],
   templateUrl: './submenu.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmenuComponent {

   @Input() submenu: StSubMenuModel[] = [];
   @Input() qaTag: string;
   @Input() offset: number = 0;

   public getOffset(): Object {
      return {
         'margin-left': `${this.offset}px`
      };
   }

   public isActive(option: StSubMenuModel): string {
      if (!option.isActive) {
         return 'sth-header-submenu-disable-option';
      } else {
         return '';
      }
   }
}
