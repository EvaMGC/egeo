/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import {
   ChangeDetectionStrategy, Component, HostListener, Input
} from '@angular/core';

@Component({
   selector: '[st-table-row]',
   templateUrl: './st-table-row.component.html',
   styleUrls: ['./st-table-row.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   host: {
      'class': 'st-table-row'
   }
})

export class StTableRowComponent {
   public showHoverMenu: boolean = false;

   @HostListener('mouseover') onShowHoverMenu(): void {
      this.showHoverMenu = true;
   }

   @HostListener('mouseout') onHideHoverMenu(): void {
      this.showHoverMenu = false;
   }
}

