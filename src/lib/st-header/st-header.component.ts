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
   EventEmitter,
   Input,
   OnInit,
   Output,
   ViewChild,
   HostListener,
   AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';

import { StUserMenuComponent } from './user-menu/user-menu';
import { StHeaderMenuOption, StHeaderUserMenu, StHeaderSubMenuOption } from './st-header.model';
import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';
import { StWindowRefService } from '../utils/window-service';

@Component({
   selector: 'st-header',
   templateUrl: './st-header.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StHeaderComponent implements AfterViewInit {

   @Input() appName: string = '';
   @Input() menu: StHeaderMenuOption[] = [];

   @Input() maxWidth: number;
   @Input() userMenu: StHeaderUserMenu;
   @Input() qaTag: string = '';

   @Output() selectMenu: EventEmitter<string> = new EventEmitter<string>();
   @Output() selectUserMenuOption: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();
   @Output() changeHeight: EventEmitter<number> = new EventEmitter<number>();

   @ViewChild('headerDivElement') headerDivElement: ElementRef;
   @ViewChild('headerFixPart') headerFixPart: ElementRef;
   @ViewChild('userMenuContainerElement') userMenuContainer: ElementRef;
   @ViewChild('userMenuElement') userMenuElement: StUserMenuComponent;

   public showUserName: boolean = true;
   public showMenuNames: boolean = true;
   private userMenuSize: number = 0;
   private fixPartSize: number = 0;
   private _window: Window;

   // Constants
   private userCollapsedSize: number = 76;
   private gapBetweenMenuAndUserMenu: number = 40;

   constructor(
      private _cd: ChangeDetectorRef,
      private _router: Router,
      private _windowRefService: StWindowRefService
   ) {
      this._window = _windowRefService.nativeWindow;
   }

   public ngAfterViewInit(): void {
      this.userMenuSize = this.userMenuElement.elementRef.nativeElement.scrollWidth;
      this.fixPartSize = this.headerFixPart.nativeElement.scrollWidth;

      this.checkMenuLabelVisibility();
   }

   @HostListener('window:resize', [])
   onResize(): void {
      this.checkMenuLabelVisibility();
   }

   public onSelectMenu(link: string): void {
      this._router.navigate([link]);
      this.selectMenu.emit(link);
   }

   public get height(): number {
      return this.showMenuNames ? 70 : 55;
   }

   private checkMenuLabelVisibility(): void {
      let containerSize: number = (this.userMenuContainer.nativeElement as HTMLDivElement).clientWidth;
      let windowSize: number = this._window.innerWidth;

      let canShowMenuNames = windowSize >= (this.fixPartSize + this.userCollapsedSize);
      let canShowUserName = canShowMenuNames && containerSize > (this.userMenuSize + this.gapBetweenMenuAndUserMenu);
      if (this.showMenuNames !== canShowMenuNames || this.showUserName !== canShowUserName) {
         if (this.showMenuNames !== canShowMenuNames) {
            this.showMenuNames = canShowMenuNames;
            this.changeHeight.emit(this.height);
         }
         if (this.showUserName !== canShowUserName) {
            this.showUserName = canShowUserName;
         }
         this._cd.markForCheck();
      }
   }
}
