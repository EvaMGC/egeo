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
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StHeaderDemoComponent } from './st-header-demo.component';
import { StFakePageComponent } from './fake-page.component';
import { LONG_CONTENT } from './st-header-demo.model';

export const routing: ModuleWithProviders = RouterModule.forChild([
   {
      path: '', component: StHeaderDemoComponent, children: [
         { path: 'test1', redirectTo: 'test1/subtest1', pathMatch: 'full' },
         {
            path: 'test1', component: StFakePageComponent, data: { pageName: 'TEST 1' }, children: [
               { path: 'subtest1', component: StFakePageComponent, data: { pageName: 'SUBTEST 1' } },
               { path: 'subtest2', component: StFakePageComponent, data: { pageName: 'SUBTEST 2' } }
            ]
         },
         { path: 'test2', component: StFakePageComponent, data: { pageName: 'TEST 2' } },
         { path: 'test3', component: StFakePageComponent, data: { pageName: 'TEST 3' } },
         { path: 'test4', component: StFakePageComponent, data: { pageName: LONG_CONTENT } },
         { path: 'test5', component: StFakePageComponent, data: { pageName: 'TEST 5' } },
         { path: 'test6', component: StFakePageComponent, data: { pageName: 'TEST 6' } }
      ]
   }
]);
