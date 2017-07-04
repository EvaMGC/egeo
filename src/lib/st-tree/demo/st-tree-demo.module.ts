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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StDemoGeneratorModule } from '../../utils/demo-generator/demo-generator.module';
import { StTreeModule } from '../st-tree.module';
import { StTreeComponent } from '../st-tree.component';
import { StTreeDemoComponent } from './st-tree-demo';


@NgModule({
   imports: [
      CommonModule,
      StTreeModule,
      StDemoGeneratorModule.withComponents({ components: [StTreeDemoComponent, StTreeComponent] })
   ],
   declarations: [StTreeDemoComponent]
})
export class StTreeDemoModule { }
