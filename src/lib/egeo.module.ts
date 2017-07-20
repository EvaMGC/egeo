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
import { ModuleWithProviders, NgModule } from '@angular/core';

import { StAlertsService } from './st-alerts/st-alerts.service';
import { StModalService } from './st-modal/st-modal.service';
import { StPaginationService } from './st-pagination/st-pagination.service';
import { EgeoResolveService } from './utils/egeo-resolver/egeo-resolve.service';
import { SelectOneDispatcher } from './utils/unique-dispatcher';
import { StWindowRefService } from './utils/window-service';

import { DECLARATIONS } from './barrels';

@NgModule({
   imports: [
      CommonModule,
      ...DECLARATIONS
   ],
   declarations: [],
   exports: [
      ...DECLARATIONS
   ]
})
export class EgeoModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: EgeoModule,
         providers: [
            StModalService,
            StPaginationService,
            EgeoResolveService,
            SelectOneDispatcher,
            StAlertsService,
            StWindowRefService
         ]
      };
   }
}
