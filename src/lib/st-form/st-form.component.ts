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

import { Component, Input, OnInit } from '@angular/core';
import { StEgeo, StRequired } from '../decorators/require-decorators';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";

@Component({
   selector: 'st-form',
   templateUrl: './st-form.component.html'
})

@StEgeo()
export class StFormComponent implements OnInit {
   @Input() @StRequired() schema: any;
   @Input() form: FormGroup = new FormGroup({});
   @Input() model: any = {};

   constructor() {
   }

   ngOnInit() {
      for (let propertyName in this.schema.properties) {
         let property: any = this.schema.properties[propertyName];
         let formControl: FormControl | FormArray;
         if (property.type !== 'list') {
            formControl = new FormControl({value: this.model[propertyName], required: this.isRequired(propertyName)});
         }
         else {
            formControl = new FormArray([]);
         }

         this.form.addControl(propertyName, formControl);
      }
   }

   isRequired(propertyName: string): boolean {
      if (!propertyName || !this.schema.required) {
         return false;
      }
      return this.schema.required.indexOf(propertyName) !== -1;
   }
}
