import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StSwitchComponent } from './st-switch.component';
import { StFormLabelModule } from '../utils/egeo-form/st-form-label';

@NgModule({
   imports: [CommonModule, FormsModule, ReactiveFormsModule, StFormLabelModule],
   declarations: [StSwitchComponent],
   exports: [StSwitchComponent]
})
export class StSwitchModule {
}
