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
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { StHeaderMenuOption, StHeaderUserMenu } from '@stratio/egeo';

import { HEADER_MENU, USER_MENU } from './st-header-demo.model';

@Component({
   selector: 'st-header-demo',
   template: `
      <div class="header-container">
         <st-header
            appName="STRATIO"
            [menu]="headerMenuSchema"
            [userMenu]="userMenu"
            qaTag="st-header" [maxWidth]="1700"
            (changeHeight)="onChangeHeight($event)"
         ></st-header>

         <div [ngStyle]="{'padding-top': (height + 20) + 'px'}">
            <router-outlet></router-outlet>
         </div>
      </div>
   `,
   styles: [`
      .header-container {
         width: 100%;
         position: relative;
      }
   `],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StHeaderDemoComponent {

   public height: string;
   public headerMenuSchema: StHeaderMenuOption[] = HEADER_MENU;
   public userMenu: StHeaderUserMenu = USER_MENU;

   constructor(private _cd: ChangeDetectorRef) {}

   onChangeHeight(newHeight: string): void {
      this.height = newHeight;
      this._cd.markForCheck();
   }
}
