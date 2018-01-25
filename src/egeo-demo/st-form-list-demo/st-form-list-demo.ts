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
import { FormArray, FormGroup } from '@angular/forms';

@Component({
   selector: 'st-form-list-demo',
   templateUrl: 'st-form-list-demo.html'
})
export class StFormListDemoComponent {
   public jsonSchema: any = {
      '$schema': 'http://json-schema.org/schema#',
      'properties': {
         'genericNumberInput': {
            'title': 'Required number between 6-10',
            'description': 'Generic input description',
            'type': 'number',
            'default': 5,
            'minimum': 6,
            'maximum': 10,
            'exclusiveMinimum': false,
            'exclusiveMaximum': false
         },
         'genericTextInput': {
            'title': 'Required text with a text of 2-6 characters',
            'description': 'This is a generic text',
            'type': 'string',
            'default': 'Generic text',
            'minLength': 2,
            'maxLength': 6
         }
      },
      'required': [
         'genericNumberInput'
      ]
   };

   public model: any[];
   public outputModel: any[];
   public form: FormGroup;
   public model2: Array<any> = [
      { genericNumberInput: 8, genericTextInput: 'este es el ngmodel ' },
      { genericNumberInput: 20, genericTextInput: 'fake text 2' }
   ];

   constructor() {
   }

   public showFormStatus(): void {
      console.log({ valid: this.form.valid, model: this.form.value, controls: this.form.controls });
   }

   public onModelChange(model: Array<any>): void {
      this.model2 = model;
   }

   public changeModelFromOutside(): void {
      this.model = [
         { genericNumberInput: 8, genericTextInput: 'fake text 1' },
         { genericNumberInput: 20, genericTextInput: 'fake text 2' }
      ];
   }
}
