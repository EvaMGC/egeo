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
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {StDropDownMenuItem} from '../../st-dropdown-menu/st-dropdown-menu.interface';
import { StUserMenuComponent } from './user-menu';
import { StHeaderUserMenu } from '../st-header.model';


let comp: StUserMenuComponent;
let fixture: ComponentFixture<StUserMenuComponent>;
let de: DebugElement;

let userMenu: StHeaderUserMenu = {
   userName: 'Antonio H.',
   options: [{ label: 'Logout', value: 'path' }]
};

describe('StHeaderComponent', () => {
   describe('StUserMenuComponent', () => {
      beforeEach(async(() => {
         TestBed.configureTestingModule({
            declarations: [StUserMenuComponent],
            schemas: [NO_ERRORS_SCHEMA]
         })
            .compileComponents();  // compile template and css
      }));

      beforeEach(() => {
         fixture = TestBed.createComponent(StUserMenuComponent);
         comp = fixture.componentInstance;
      });

      it('should be initialized and show username', () => {
         comp.userMenu = userMenu;
         comp.showUserName = true;

         fixture.detectChanges();
         let userName: DebugElement = fixture.debugElement.query(By.css('.sth-header-user-menu-name'));

         expect(userName).toBeDefined();
         expect(userName.nativeElement).toBeDefined();
         expect(userName.nativeElement.textContent).toEqual(userMenu.userName);
         expect(comp.qaId).toEqual(comp.qaTag + '-profile-menu');
      });

      it('should be initialized and not show username', () => {
         comp.userMenu = userMenu;
         comp.showUserName = false;

         fixture.detectChanges();
         let userName: DebugElement = fixture.debugElement.query(By.css('.sth-header-user-menu-name'));

         expect(userName).toBeNull();
         expect(comp.qaId).toEqual(comp.qaTag + '-profile-menu');
      });

      it('should display the logout menu', () => {
         comp.userMenu = userMenu;
         comp.showUserName = false;

         fixture.detectChanges();
         let logoutArrow: DebugElement = fixture.debugElement.query(By.css('.sth-header-user-menu-arrow'));

         expect(logoutArrow).toBeDefined();
         expect(comp.isActive).toBeFalsy();

         (logoutArrow.nativeElement as HTMLElement).click();

         fixture.detectChanges();
         expect(comp.isActive).toBeTruthy();
      });

      it('should be able to select an option', () => {
         let responseFunction = jasmine.createSpy('response');
         comp.selectOption.subscribe(responseFunction);
         let option: StDropDownMenuItem = {label: 'logout', value: 'logout', icon: 'icon-logout'};

         comp.userMenu = userMenu;
         comp.showUserName = false;
         fixture.detectChanges();

         let logoutArrow: DebugElement = fixture.debugElement.query(By.css('.sth-header-user-menu-arrow'));

         expect(logoutArrow).toBeDefined();
         expect(comp.isActive).toBeFalsy();

         (logoutArrow.nativeElement as HTMLElement).click();

         fixture.detectChanges();
         expect(comp.isActive).toBeTruthy();

         comp.changeOption(option);
         fixture.detectChanges();
         expect(responseFunction).toHaveBeenCalled();
         expect(responseFunction).toHaveBeenCalledWith(option);
         expect(comp.isActive).toBeFalsy();
      });
   });
});
