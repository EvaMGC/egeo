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
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { JSON_SCHEMA } from './json-schema';

@Component({
   selector: 'st-form-demo',
   templateUrl: 'st-form-demo.html'
})
export class StFormDemoComponent {
   public jsonSchema: any;
   public model: any = {};
   public reactiveForm: FormGroup = new FormGroup({ 'genericNumberInput': new FormControl(this.model.genericNumberInput) });

   @ViewChild('templateDrivenForm') public templateDrivenForm: NgForm;

   constructor(private _cd: ChangeDetectorRef) {
      this.jsonSchema = JSON_SCHEMA;
   }

   showFormStatus(): void {
      console.log(this.reactiveForm);
   }

   updateModel(): void {
      this.templateDrivenForm.controls['genericNumberInput'].setValue(1);
      this.templateDrivenForm.controls['requiredNumber'].setValue(2);

      this._cd.markForCheck();
   }
}
