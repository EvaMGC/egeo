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

import { CommonModule }  from '@angular/common';
import {NgModule, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { StFormComponent } from './st-form.component';
import {StFormFieldComponent} from "./st-form-field/st-form-field.component";
import {PipesModule} from '../pipes/pipes.module';
import {StInputModule} from "../st-input/st-input.module";
import { StEgeo, StRequired } from '../decorators/require-decorators';

@NgModule({
   imports: [ CommonModule,  FormsModule, ReactiveFormsModule, StInputModule, PipesModule ],
   declarations: [ StFormComponent, StFormFieldComponent ],
   exports: [ StFormComponent ]
})

@StEgeo()
export class StFormModule {
   @Input() @StRequired() schema: any;
}
