import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StFormLabelComponent } from './st-form-label.component';
import { StTooltipModule } from '../../../st-tooltip/st-tooltip.module';

@NgModule({
   imports: [CommonModule, StTooltipModule],
   declarations: [StFormLabelComponent],
   exports: [StFormLabelComponent]
})
export class StFormLabelModule { }
