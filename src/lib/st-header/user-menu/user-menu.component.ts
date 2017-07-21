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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { EventWindowManager } from '../../utils/event-window-manager';
import { StHeaderUserMenuModel } from '../st-header.model';

@Component({
   selector: 'user-menu',
   styleUrls: ['./user-menu.component.scss'],
   templateUrl: './user-menu.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent extends EventWindowManager implements OnDestroy {

   @Input() userMenuModel: StHeaderUserMenuModel;
   @Input() qaTag: string;

   constructor(
      private router: Router,
      private renderer: Renderer,
      private cd: ChangeDetectorRef,
      private elementRef: ElementRef
   ) {
      super(renderer, cd, elementRef);
   }


   public changeMenuState(event: MouseEvent): void {
      this.openElement();
   }

   public navigateToLogout(): void {
      this.router.navigate([`/${this.userMenuModel.logoutPath}`]);
      this.closeElement();
   }

   public ngOnDestroy(): void {
      this.closeElement();
   }
}
