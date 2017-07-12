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

import { STALERT_SEVERITY } from '../st-alerts.model';
import { StAlertsService } from '../st-alerts.service';

@Component({
   selector: 'st-alerts-demo',
   templateUrl: 'st-alerts-demo.html'
})
export class StAlertsDemoComponent {

   constructor(private _alertService: StAlertsService) { }

   showWarning(): void {
      this._alertService.notifyAlert(
         'Warning',
         'Internal server Error.sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor incididunt ut labore et dolore magna aliqua',
         STALERT_SEVERITY.WARNING);
   }

   showError(): void {
      this._alertService.notifyAlert(
         'Error',
         'Internal server Error.sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
         STALERT_SEVERITY.ERROR,
         undefined, 10000);
   }

   showSuccess(): void {
      this._alertService.notifyAlert(
         'Success',
         'Internal server Error.sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
         STALERT_SEVERITY.SUCCESS);
   }
}
