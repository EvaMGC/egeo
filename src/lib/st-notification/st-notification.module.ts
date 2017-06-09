import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StNotificationComponent } from './st-notification.component';
import { StPopModule } from "../st-pop/st-pop.module";

@NgModule({
   imports: [CommonModule, StPopModule],
   declarations: [StNotificationComponent],
   exports: [StNotificationComponent]
})

export class StNotificationModule {
}
