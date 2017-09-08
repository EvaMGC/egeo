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
import { Component } from '@angular/core';
import { StRadioMenuOption } from '@stratio/egeo';

@Component({
   selector: 'st-radio-menu-demo',
   templateUrl: './st-radio-menu-demo.html'
})
export class StRadioMenuDemoComponent {
   options: Array<StRadioMenuOption>;
   selectedOptionTheme1: StRadioMenuOption;
   selectedOptionTheme2: StRadioMenuOption;

   constructor() {

      this.options = [
         {label: 'Service', value: 'service'},
         {label: 'Nodes', value: 'nodes'},
         {label: 'Casandra', value: 'cassandra'}
      ];
   }
}
