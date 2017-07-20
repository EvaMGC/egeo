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
   Component,
   Input,
   OnDestroy,
   Renderer,
   ChangeDetectorRef,
   ElementRef,
   Output,
   EventEmitter
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EventWindowManager } from '../../utils/event-window-manager';
import { StDropDownMenuItem } from '../../st-dropdown-menu/st-dropdown-menu.interface';
import { StHeaderMenuOption } from '../st-header.model';

@Component({
   selector: 'st-header-menu-option',
   templateUrl: './menu-option.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StHeaderMenuOptionComponent extends EventWindowManager implements OnDestroy {

   @Input() option: StHeaderMenuOption;
   @Input() showMenuName: boolean;
   @Input() qaTag: string;

   @Output() selectMenu: EventEmitter<string> = new EventEmitter<string>();

   private subscription: Subscription;
   private actualPath: string = '';

   constructor(
      private renderer: Renderer,
      private cd: ChangeDetectorRef,
      private elementRef: ElementRef,
      private router: Router
   ) {
      super(renderer, cd, elementRef);
      this.subscription = this.router.events.subscribe((event) => this.onRouterEvent(event));
      this.actualPath = this.router.url;
   }

   public get qaId(): string {
      return this.qaTag + this.option.label;
   }

   public get hasSubmenu(): boolean {
      return this.option.subMenus && this.option.subMenus.length > 0;
   }

   public get submenuList(): StDropDownMenuItem[] {
      return this.hasSubmenu ? this.option.subMenus.map(_ => ({
         label: _.label,
         value: _.link,
         selected: this.actualPath === _.link
      })) : [];
   }

   public ngOnDestroy(): void {
      this.closeElement();
      if (this.subscription) {
         this.subscription.unsubscribe();
      }
   }

   public changeStatus(event: Event): void {
      this.openElement();
   }

   public changeOption(selected: StDropDownMenuItem): void {
      this.closeElement();
      this.selectMenu.emit(selected.value);
   }

   private onRouterEvent(event: any): void {
      if (event instanceof NavigationEnd) {
         this.actualPath = event.urlAfterRedirects;
      }
   }
}
