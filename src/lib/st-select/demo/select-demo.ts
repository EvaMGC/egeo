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
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { StDropDownMenuItem } from '../../st-dropdown-menu/st-dropdown-menu.interface';

@Component({
   selector: 'select-demo',
   templateUrl: 'select-demo.html',
   styles: [`
            p span {
               color: #999;
            }
            h2 {
               white-space: nowrap;
               width: 100%;
            }
   `]
})

export class SelectDemoComponent {
   @ViewChild('templateDrivenForm') public templateDrivenForm: NgForm;

   public options: StDropDownMenuItem[] = [];
   public forceValidations: boolean = false;
   public isDisabled: boolean = false;
   public errorMessage: string = 'Error, this field is required';
   public model: any = {
      option1: null,
      option2: null
   };
   public reactiveForm: FormGroup; // our model driven form

   constructor(private _fb: FormBuilder) {
      for (let i: number = 0; i < 10; i++) {
         this.options.push({
            label: `option-${i}`,
            value: i
         });
      }
      this.model.option2 = this.options[2];

      this.reactiveForm = this._fb.group({
         'option1': [this.model.option1, [Validators.required]],
         'option2': [this.model.option2, [Validators.required]]
      });
   }

   changeForceValidations(): void {
      this.forceValidations = true;
   }

   changeDisabled(): void {
      this.isDisabled = !this.isDisabled;
      if (this.isDisabled) {
         this.reactiveForm.get('option1').disable();
         this.templateDrivenForm.form.get('option1-template').disable();
      } else {
         this.reactiveForm.get('option1').enable();
         this.templateDrivenForm.form.get('option1-template').enable();
      }
   }

   onSubmitReactiveForm(): void {
      this.model.option1 = this.reactiveForm.value.option1;
      this.model.option2 = this.reactiveForm.value.option2;
   }
}
