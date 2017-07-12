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
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { StAlert } from './st-alerts.model';
import { StAlertsService } from './st-alerts.service';

@Component({
   selector: 'st-alerts',
   templateUrl: './st-alerts.component.html',
   styleUrls: ['./st-alerts.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StAlertsComponent {

   @Input() showInConsole: boolean = false;
   @Input() qaTag: string = 'st-alert-manager';

   constructor(
      private _cd: ChangeDetectorRef,
      public alertService: StAlertsService
   ) { }
}
