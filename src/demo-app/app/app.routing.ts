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
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main';

export const routes: Routes = [
   {
      path: '', component: LayoutComponent, children: [
         // Main redirection
         { path: '', redirectTo: 'main', pathMatch: 'full' },
         { path: 'main', component: MainComponent },
         { path: 'dropdown-menu-demo', loadChildren: '@stratio/egeo#StDropdownMenuDemoModule' },
         { path: 'dropdown-demo', loadChildren: '@stratio/egeo#StDropdownDemoModule' },
         { path: 'combobox-demo', loadChildren: '@stratio/egeo#StComboboxDemoModule' },
         { path: 'help-demo', loadChildren: '@stratio/egeo#StHelpDemoModule' },
         { path: 'info-box-demo', loadChildren: '@stratio/egeo#StInfoBoxDemoModule' },
         { path: 'item-list-demo', loadChildren: '@stratio/egeo#StItemListDemoModule' },
         { path: 'tip-demo', loadChildren: '@stratio/egeo#StTipDemoModule' },
         { path: 'search-demo', loadChildren: '@stratio/egeo#StSearchDemoModule' }
      ]
   }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
