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
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { times as _times } from 'lodash';

// Components
import { ItemListItemComponent } from './item-list-item/item-list-item.component';
import { ItemListScrollComponent } from './item-list-scroll/item-list-scroll.component';
import { StItemListComponent } from './st-item-list.component';

// Order modules
import { StSearchModule } from '../st-search/st-search.module';

// Model
import { StItemListElement, StItemListConfig } from './st-item-list.model';

let comp: StItemListComponent;
let fixture: ComponentFixture<StItemListComponent>;

let qaTag: string = 'st-item-list-test';
let config: StItemListConfig = {
   title: 'List title',
   searchPlaceholder: 'List search'
}

function generateData(numData: number): StItemListElement[] {
   return _times(numData, (i) => {
      return {
         id: i,
         name: `Element ${i}`,
         icon: 'icon-archive'
      };
   });
}

let list: StItemListElement[] = generateData(10);

describe('StItemListComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [StSearchModule, VirtualScrollModule],
         declarations: [StItemListComponent, ItemListItemComponent, ItemListScrollComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StItemListComponent);
      comp = fixture.componentInstance;
      comp.list = list;
   });

   it('Should init correctly', () => {
      fixture.detectChanges();
      expect(comp.listTitle).toEqual('');
      expect(comp.searchPlaceholder).toEqual('');
      expect(comp.listQaTag).toEqual('');
      expect(comp.searchQaTag).toEqual('');
      expect(comp.align).toEqual('left');
      expect(comp.theme).toEqual('themeA');

      comp.qaTag = qaTag;
      comp.config = config;
      fixture.detectChanges();
      expect(comp.listTitle).toEqual(config.title);
      expect(comp.searchPlaceholder).toEqual(config.searchPlaceholder);
      expect(comp.listQaTag).toEqual(qaTag);
      expect(comp.searchQaTag).toEqual(qaTag + '-search');
   });

   it('If themeA is defined, it needs to be applied', () => {
      let el: DebugElement;
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('.themeA'));
      expect(el.nativeElement).toBeDefined();
   });

   it('If themeB is defined, it needs to be applied', () => {
      let el: DebugElement;
      comp.theme = 'themeB';
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('.themeB'));
      expect(el.nativeElement).toBeDefined();
   });

});
