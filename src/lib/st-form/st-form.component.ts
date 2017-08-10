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

import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
   selector: 'st-form',
   templateUrl: './st-form.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StFormComponent implements OnInit {
   @Input() schema: any;
   @Input() form: FormGroup = new FormGroup({});
   @Input() model: any = {};

   ngOnInit(): void {
      Object.keys(this.schema.properties).forEach(propertyName => {
         let property: any = this.schema.properties[propertyName];
         let formControl: FormControl | FormArray;
         if (property.default && this.model[propertyName] === undefined) {
            this.model[propertyName] = property.default;
         }
         formControl = new FormControl(this.model[propertyName] || '');
         this.form.addControl(propertyName, formControl);
      });
   }

   isRequired(propertyName: string): boolean {
      return propertyName && this.schema.required && this.schema.required.indexOf(propertyName) !== -1;
   }
}
