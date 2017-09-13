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
import { clone as _clone } from 'lodash';

@Component({
   selector: 'st-breadcrumbs-demo',
   templateUrl: 'st-breadcrumbs-demo.html'
})
export class StBreadcrumbsDemoComponent {
   public output: string;
   public options: string[] = [];

   private originalOptions: string[] = ['Home'];

   constructor() {
      for (let i = 1; i < 15; i++) {
         this.originalOptions.push('level' + i);
      }
      this.reset();
   }

   outputEmitter(pos: number): void {
      this.options = this.options.slice(0, pos + 1);
   }

   reset(): void {
      this.options = _clone(this.originalOptions);
   }
}
