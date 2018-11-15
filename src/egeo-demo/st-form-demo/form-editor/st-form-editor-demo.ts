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
   selector: 'st-form-editor-demo',
   templateUrl: 'st-form-editor-demo.html',
   styleUrls: ['st-form-editor-demo.component.scss']
})
export class StFormEditorDemoComponent {
   public jsonSchema: any;
   public model: any = {  };
   public schemaError: string;

   @ViewChild('formModel') public formModel: NgForm;

   constructor() {
      this.jsonSchema = JSON_SCHEMA;
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

   onChangeSchema(jsonSchema: any): void {
      try {
         this.jsonSchema = JSON.parse(jsonSchema);
         this.schemaError = undefined;
      } catch(error) {
         this.schemaError = error;
         console.log(error);
      }
   }
}
