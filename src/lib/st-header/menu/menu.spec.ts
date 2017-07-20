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
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StHeaderMenuComponent } from './menu';
import { StHeaderMenuOption } from '../st-header.model';


let comp: StHeaderMenuComponent;
let fixture: ComponentFixture<StHeaderMenuComponent>;
let de: DebugElement;

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


describe('StHeaderComponent', () => {
   describe('StHeaderMenuComponent', () => {
      beforeEach(async(() => {
         TestBed.configureTestingModule({
            declarations: [StHeaderMenuComponent],
            schemas: [NO_ERRORS_SCHEMA]
         })
            .compileComponents();  // compile template and css
      }));
      beforeEach(() => {
         fixture = TestBed.createComponent(StHeaderMenuComponent);
         comp = fixture.componentInstance;
         comp.menu = menu;
      });

      it('should be initialized correctly', () => {
         comp.qaTag = 'test';
         fixture.detectChanges();

         expect(comp.qaId).toEqual(comp.qaTag + '-menu');
      });
   });
});
