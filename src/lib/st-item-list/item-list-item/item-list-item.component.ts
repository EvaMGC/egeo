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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { StEgeo, StRequired } from '../../decorators/require-decorators';
import { StItemListElement } from '../st-item-list.model';

@Component({
   selector: 'item-list-item',
   templateUrl: './item-list-item.component.html',
   styleUrls: ['./item-list-item.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
@StEgeo()
export class ItemListItemComponent {

   @Input() @StRequired() item: StItemListElement;
   @Input() qaTag: string = '';
   @Input() align: 'left' | 'right' = 'left';

   @Output() selectItem: EventEmitter<StItemListElement> = new EventEmitter<StItemListElement>();

   constructor() { }

   get itemName(): string {
      return this.item.name;
   }

   get itemIcon(): string {
      return this.item.icon;
   }

   get itemSelected(): boolean {
      return this.item.selected ? true : false;
   }

   get itemQaTag(): string {
      return this.qaTag && this.qaTag + '-item-' + this.item.id || '';
   }

   get itemStyle(): string {
      let style: string = `sth-item-list__item item-list-item item-list-item--${this.align}`;
      style += this.itemSelected ? ' sth-item-list__item--selected' : '';
      return style;
   }

   emitOnSelect(event: Event): void {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.selectItem.emit(this.item);
   }
}

