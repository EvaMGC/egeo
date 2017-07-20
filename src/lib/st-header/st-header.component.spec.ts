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
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { RouterStub } from '../tests/router-stub';
import { StWindowRefService } from '../utils/window-service';
import { StHeaderComponent } from './st-header.component';
import { StHeaderAppComponent } from './app/app';
import { StHeaderMenuComponent } from './menu/menu';
import { StHeaderMenuOptionComponent } from './menu-option/menu-option';
import { StUserMenuComponent } from './user-menu/user-menu';
import { StHeaderMenuOption, StHeaderUserMenu } from './st-header.model';


let comp: StHeaderComponent;
let fixture: ComponentFixture<StHeaderComponent>;
let de: DebugElement;

let userMenu: StHeaderUserMenu = {
   userName: 'Antonio H.',
   options: [{ label: 'Logout', value: 'path' }]
};

let menu: StHeaderMenuOption[] = [
   {
      icon: 'icon-head',
      label: 'IDENTITIES',
      link: '/navigation/header/test1',
      subMenus: [{
         label: 'USER',
         link: '/navigation/header/test1/subtest1'
      },
      {
         label: 'GROUP',
         link: '/navigation/header/test1/subtest2'
      }]
   },
   {
      icon: 'icon-puzzle',
      label: 'SERVICES',
      link: '/navigation/header/test2',
      subMenus: []
   }
];

let appName: string = 'Test App';

class WindowMock {
   innerWidth: number = 0;

   setInnerWidth(newValue: number): void {
      this.innerWidth = newValue;
   }
}
let windowMock: WindowMock = new WindowMock();

class WindowRefMock {
 get nativeWindow (): any {
        return windowMock;
    }
}

describe('StHeaderComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [
            StHeaderComponent,
            StHeaderAppComponent,
            StHeaderMenuComponent,
            StHeaderMenuOptionComponent,
            StUserMenuComponent
         ],
         schemas: [NO_ERRORS_SCHEMA],
         providers: [
            { provide: Router, useClass: RouterStub },
            { provide: StWindowRefService, useClass: WindowRefMock }
         ]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StHeaderComponent);
      comp = fixture.componentInstance;
   });

   it('should be able to select a menu option', inject([Router], (router: Router) => {
      windowMock.setInnerWidth(2000);
      spyOn(router, 'navigate');
      let responseFunction = jasmine.createSpy('response');
      comp.selectMenu.subscribe(responseFunction);

      comp.appName = appName;
      comp.userMenu = userMenu;
      comp.menu = menu;
      fixture.detectChanges();

      comp.onSelectMenu('test');
      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['test']);
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledWith('test');

      expect(comp.showMenuNames).toBeTruthy();
      expect(comp.showUserName).toBeTruthy();

      windowMock.setInnerWidth(1000);
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      expect(comp.showMenuNames).toBeTruthy();
      expect(comp.showUserName).toBeTruthy();
   }));

   it(`should hide the user and menu labels when they doesn't fit on the screen`, () => {
      windowMock.setInnerWidth(2000);
      comp.appName = appName;
      comp.userMenu = userMenu;
      comp.menu = menu;
      fixture.detectChanges();

      expect(comp.showMenuNames).toBeTruthy();
      expect(comp.showUserName).toBeTruthy();

      windowMock.setInnerWidth(50);
      comp.onResize();
      fixture.detectChanges();

      expect(comp.showMenuNames).toBeFalsy();
      expect(comp.showUserName).toBeFalsy();
   });

   it('should only change showMenuNames value', () => {
      windowMock.setInnerWidth(2000);
      comp.appName = appName;
      comp.userMenu = userMenu;
      comp.menu = menu;
      fixture.detectChanges();

      comp.showMenuNames = false;
      comp.onResize();
      fixture.detectChanges();

      expect(comp.showMenuNames).toBeTruthy();
      expect(comp.showUserName).toBeTruthy();
   });

   it('should only change showUserName value', () => {
      windowMock.setInnerWidth(2000);
      comp.appName = appName;
      comp.userMenu = userMenu;
      comp.menu = menu;
      fixture.detectChanges();

      comp.showUserName = false;
      comp.onResize();
      fixture.detectChanges();

      expect(comp.showMenuNames).toBeTruthy();
      expect(comp.showUserName).toBeTruthy();
   });
});
