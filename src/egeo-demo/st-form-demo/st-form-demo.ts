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
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { JSON_SCHEMA } from './json-schema';

@Component({
   selector: 'st-form-demo',
   templateUrl: 'st-form-demo.html'
})
export class StFormDemoComponent {
   public jsonSchema: any;
   public form: FormGroup;

   constructor() {
      this.jsonSchema = JSON_SCHEMA;
      this.form = new FormGroup({});
   }


   public showFormStatus(): void {
      console.log({valid: this.form.valid, model: this.form.value});
   }
}
