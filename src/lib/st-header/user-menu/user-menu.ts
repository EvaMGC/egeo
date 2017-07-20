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
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   ElementRef,
   Input,
   OnDestroy,
   Renderer,
   Output,
   EventEmitter
} from '@angular/core';

import { StDropDownMenuItem } from '../../st-dropdown-menu/st-dropdown-menu.interface';
import { EventWindowManager } from '../../utils/event-window-manager';
import { StHeaderUserMenu } from '../st-header.model';

@Component({
   selector: 'st-header-user-menu',
   templateUrl: './user-menu.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StUserMenuComponent extends EventWindowManager implements OnDestroy {

   @Input() userMenu: StHeaderUserMenu;
   @Input() qaTag: string;
   @Input() showUserName: boolean = true;

   @Output() selectOption: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();

   constructor(
      private renderer: Renderer,
      private cd: ChangeDetectorRef,
      public elementRef: ElementRef
   ) {
      super(renderer, cd, elementRef);
   }

   public get qaId(): string {
      return this.qaTag + '-profile-menu';
   }

   public changeMenuState(event: MouseEvent): void {
      this.openElement();
   }

   public changeOption(option: StDropDownMenuItem): void {
      this.selectOption.emit(option);
      this.closeElement();
   }

   public ngOnDestroy(): void {
      this.closeElement();
   }
}
