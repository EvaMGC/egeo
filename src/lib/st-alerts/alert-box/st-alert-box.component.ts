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
import {
   Component,
   Input,
   OnInit,
   ChangeDetectorRef,
   ChangeDetectionStrategy
} from '@angular/core';

import { STALERT_SEVERITY, StAlert } from '../st-alerts.model';

@Component({
   selector: 'st-alert-box',
   templateUrl: './st-alert-box.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StAlertBoxComponent implements OnInit {

   @Input() alert: StAlert;
   @Input() showInConsole: boolean = false;
   public opacity: number = 0;

   constructor(private _cd: ChangeDetectorRef) { }

   ngOnInit(): void {
      this.alert.opacity.subscribe(opacity => this.changeOpacity(opacity));
      this.alert.notify();
      if (this.showInConsole) {
         this.notifyConsole();
      }
   }

   enter(): void {
      this.alert.pauseNotify();
   }

   leave(): void {
      this.alert.continueNotify();
   }

   closeAlert(): void {
      this.alert.cancel();
   }

   getIcon(): string {
      switch (this.alert.severity) {
         case STALERT_SEVERITY.ERROR: return 'icon-ban';
         case STALERT_SEVERITY.WARNING: return 'icon-alert';
         case STALERT_SEVERITY.SUCCESS: return 'icon-circle-check';
         default: return '';
      }
   }

   getSeverityColor(): string {
      switch (this.alert.severity) {
         case STALERT_SEVERITY.ERROR: return 'sth-alert-box-error';
         case STALERT_SEVERITY.WARNING: return 'sth-alert-box-warning';
         case STALERT_SEVERITY.SUCCESS: return 'sth-alert-box-success';
         default: return '';
      }
   }

   goTo(): void {
      window.open(this.alert.link.link);
   }

   changeOpacity(opacity: number): void {
      this.opacity = opacity;
      this._cd.markForCheck();
   }

   private notifyConsole(): void {
      switch (this.alert.severity) {
         case STALERT_SEVERITY.ERROR: console.error(`ERROR-${this.alert.title}: ${this.alert.message}`); break;
         case STALERT_SEVERITY.WARNING: console.warn(`WARNING-${this.alert.title}: ${this.alert.message}`); break;
         case STALERT_SEVERITY.SUCCESS: console.log(`SUCCESS-${this.alert.title}: ${this.alert.message}`); break;
         default: console.error(`ERROR: severity not found for ${this.alert.title}: ${this.alert.message}`); break;
      }
   }
}
