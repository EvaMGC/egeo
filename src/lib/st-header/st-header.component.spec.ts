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
import { Component } from '@angular/core';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// Component
import { StHeaderComponent } from './st-header.component';

// Other components
import { AppNameComponent } from './app-name/app-name.component';
import { NavigationLinksComponent } from './navigation-links/navigation-links.component';
import { StHeaderBehaviorDirective } from './st-header-behavior/header-behavior.directive';
import { SubmenuComponent } from './submenu/submenu.component';
import { SubmenuPosDirective } from './submenu-pos/submenu-pos.directive';
import { UserMenuComponent } from './user-menu/user-menu.component';

// Models
import { StHeaderUserMenuModel, StHeaderModel } from './st-header.model';


@Component({
   template: ''
})
class DummyComponent { }

let comp: StHeaderComponent;
let fixture: ComponentFixture<StHeaderComponent>;
let de: DebugElement;

let userMenu: StHeaderUserMenuModel = {
   userName: 'Antonio H.',
   logoutLabel: 'Logout',
   logoutPath: 'path'
};

let menu: StHeaderModel[] = [
   {
      icon: 'icon-head',
      label: 'IDENTITIES',
      link: '/navigation/header/test1',
      subMenus: [{
         label: 'USER',
         link: '/navigation/header/test1/subtest1',
         isActive: true
      },
      {
         label: 'GROUP',
         link: '/navigation/header/test1/subtest2',
         isActive: true
      }],
      isActive: true
   },
   {
      icon: 'icon-puzzle',
      label: 'SERVICES',
      link: '/navigation/header/test2',
      subMenus: [],
      isActive: true
   }
];

let appName: string = 'Test App';
let companyName: string = 'Stratio';

describe('StHeader component', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [RouterTestingModule.withRoutes([
            { path: 'navigation/header/test1/subtest1', component: DummyComponent },
            { path: 'navigation/header/test1/subtest2', component: DummyComponent }
         ])
         ],
         declarations: [AppNameComponent, NavigationLinksComponent, SubmenuComponent, SubmenuPosDirective, UserMenuComponent, StHeaderComponent, DummyComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StHeaderComponent);
      comp = fixture.componentInstance;

      comp.appName = appName;
      comp.companyName = companyName;
      comp.userMenu = userMenu;
      comp.menu = menu;
   });
   it('should be init correctly', () => {
      spyOn(comp, 'ngOnInit');
      fixture.detectChanges();

      expect(comp.ngOnInit).toHaveBeenCalled();
      expect(comp.hasUserMenu()).toBeTruthy();

   });
});
