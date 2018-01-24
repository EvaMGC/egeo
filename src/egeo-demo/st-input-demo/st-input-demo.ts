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
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StInputError } from '@stratio/egeo';

@Component({
   selector: 'st-input-demo',
   templateUrl: 'st-input-demo.html',
   styleUrls: ['./st-input-demo.component.scss']
})
export class StInputDemoComponent {
   public myForm: FormGroup;
   public requiredError: StInputError = { required: 'This field is required' };
   public disabled: boolean = false;

   constructor(private fb: FormBuilder) {
      this.myForm = fb.group({
         name: new FormControl('', []),
         disabledField: new FormControl('', []),
         requiredField: new FormControl('', [Validators.required])
      });
      this.myForm.controls.disabledField.disable();
      this.myForm.valueChanges.subscribe(res => console.log(res));
   }


   disableInput(): void {
      this.disabled = !this.disabled;
      if (this.disabled) {
         this.myForm.controls.name.disable();
         this.myForm.controls.disabledField.disable();
         this.myForm.controls.requiredField.disable();
      } else {
         this.myForm.controls.name.enable();
         this.myForm.controls.disabledField.enable();
         this.myForm.controls.requiredField.enable();

      }
   }
}
