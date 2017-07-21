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
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
   selector: 'st-switch-demo',
   templateUrl: './st-switch-demo.html',
   styleUrls: ['./st-switch-demo.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StSwitchDemoComponent {

   public loading: boolean;
   public model: boolean = false;
   public form: FormGroup;
   public disabled: boolean;

   constructor() {
      this.loading = true;
      this.form = new FormGroup({
         switch: new FormControl({ value: this.model, disabled: false }, Validators.required)
      });
   }
}
