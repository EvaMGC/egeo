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
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {StPopModule} from '../st-pop/st-pop.module';
import { StDropdownMenuItemComponent } from './st-dropdown-menu-item/st-dropdown-menu-item.component';
import { StDropdownMenuComponent } from './st-dropdown-menu.component';
import { StDropDownMenuItem } from './st-dropdown-menu.interface';

let items: StDropDownMenuItem[] = [
   {
      label: 'example 1',
      value: 1
   },
   {
      label: 'example 2',
      value: 2
   }
];

fdescribe('StDropdownMenuComponent', () => {

   let component: StDropdownMenuComponent;
   let fixture: ComponentFixture<StDropdownMenuComponent>;
   let de: DebugElement;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [StPopModule],
         declarations: [StDropdownMenuComponent, StDropdownMenuItemComponent]
      })
      .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StDropdownMenuComponent);
      component = fixture.componentInstance;
   });

   it('should throw an error for missing Items attribute', () => {
      expect(() => component.ngOnInit()).toThrowError('Attribute items is required');
   });

   it('should show two items in component', () => {
      component.items = items;
      fixture.detectChanges();
      expect(component.items.length).toBe(items.length);
   });

   it('should show the menu inactive', () => {
      component.items = items;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('.dropdown-menu')).toBeNull();
   });

   it('should show the menu active', async(() => {
      component.items = items;
      component.active = true;
      fixture.whenStable().then(() => {
         expect(fixture.debugElement.nativeElement.querySelector('.dropdown-menu')).toBeDefined();
      });
   }));


});
