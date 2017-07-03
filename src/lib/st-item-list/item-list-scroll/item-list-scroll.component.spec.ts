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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { times as _times } from 'lodash';

// Components
import { ItemListItemComponent } from '../item-list-item/item-list-item.component';
import { ItemListScrollComponent } from './item-list-scroll.component';

// Model
import { StItemListElement } from '../st-item-list.model'

let comp: ItemListScrollComponent;
let fixture: ComponentFixture<ItemListScrollComponent>;

let qaTag: string = 'st-item-list-test';

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
         imports: [VirtualScrollModule],
         declarations: [ItemListScrollComponent, ItemListItemComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ItemListScrollComponent);
      comp = fixture.componentInstance;
      comp.list = list;
   });

   describe('ItemListScrollComponent', () => {
      it('Should init correctly', () => {
         fixture.detectChanges();
         expect(comp.listQaTag).toEqual('');

         comp.qaTag = qaTag;
         fixture.detectChanges();
         expect(comp.listQaTag).toEqual(qaTag + '-scroll-list');
      });
   });
});
