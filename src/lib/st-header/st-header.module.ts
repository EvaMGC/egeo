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

import { StDropdownMenuModule } from '../st-dropdown-menu/st-dropdown-menu.module';

import { StHeaderComponent } from './st-header.component';
import { StHeaderAppComponent } from './app/app';
import { StHeaderMenuOptionComponent } from './menu-option/menu-option';
import { StHeaderMenuComponent } from './menu/menu';
import { StUserMenuComponent } from './user-menu/user-menu';


@NgModule({
   imports: [
      CommonModule,
      RouterModule,
      StDropdownMenuModule
   ],
   declarations: [
      StHeaderComponent,
      StHeaderAppComponent,
      StHeaderMenuOptionComponent,
      StHeaderMenuComponent,
      StUserMenuComponent
   ],
   exports: [StHeaderComponent]
})
export class StHeaderModule { }
