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
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {AppNameComponent} from './app-name/app-name.component';
import {NavigationLinksComponent} from './navigation-links/navigation-links.component';
import {StHeaderBehaviorDirective} from './st-header-behavior/header-behavior.directive';
import {SubmenuComponent} from './submenu/submenu.component';
import {SubmenuPosDirective} from './submenu-pos/submenu-pos.directive';
import {UserMenuComponent} from './user-menu/user-menu.component';

import { StHeaderComponent } from './st-header.component';

@NgModule({
   imports: [CommonModule, RouterModule],
   declarations: [
      SubmenuPosDirective,
      StHeaderComponent,
      AppNameComponent,
      NavigationLinksComponent,
      SubmenuComponent,
      UserMenuComponent,
      StHeaderBehaviorDirective
   ],
   exports: [StHeaderComponent, StHeaderBehaviorDirective]
})
export class StHeaderModule { }
