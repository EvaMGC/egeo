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
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { JSON_SCHEMA } from './json-schema';

@Component({
   selector: 'st-form-demo',
   templateUrl: 'st-form-demo.html'
})
export class StFormDemoComponent {
   public jsonSchema: any;
   public model: any = {  };

   @ViewChild('templateDrivenForm') public templateDrivenForm: NgForm;
   @ViewChild('formModel') public formModel: NgForm;

   constructor() {
      this.jsonSchema = JSON_SCHEMA;
   }

   showFormStatus(): void {
      console.log(this.formModel.valid);
   }

   onChange(model: any): void {
      this.model = model;
   }

   changeFormStatus(): void {
      if (this.formModel.control.enabled) {
         this.formModel.control.disable();
      } else {
         this.formModel.control.enable();
      }
   }
}
