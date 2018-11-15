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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StDemoGeneratorModule, StFormModule, StTextareaModule, StHorizontalTabsModule } from '@stratio/egeo';
import { StFormDemoComponent } from './st-form-demo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StFormEditorDemoComponent } from './form-editor/st-form-editor-demo';
import { StVisualSectionImprovementsDemoComponent } from './visual-section-improvements/st-visual-section-improvements-editor-demo';
import { StVisualFieldImprovementsDemoComponent } from './visual-field-improvements/st-visual-field-improvements-editor-demo';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      StFormModule,
      ReactiveFormsModule,
      StTextareaModule,
      StHorizontalTabsModule,
      StDemoGeneratorModule.withComponents({ components: [StFormDemoComponent] })
   ],
   declarations: [StFormDemoComponent, StFormEditorDemoComponent, StVisualFieldImprovementsDemoComponent,
      StVisualSectionImprovementsDemoComponent]
})
export class StFormDemoModule { }

