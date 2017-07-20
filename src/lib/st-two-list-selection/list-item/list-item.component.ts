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
import { StTwoListSelectionElement, StTwoListSelectExtraLabelAction } from '../st-two-list-selection.model';

@Component({
   selector: 'list-item',
   templateUrl: './list-item.component.html',
   styleUrls: ['./list-item.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
@StEgeo()
export class ListItemComponent {

   @Input() @StRequired() item: StTwoListSelectionElement;
   @Input() @StRequired() qaTag: string;
   @Input() editable: boolean = false;
   @Input() mode: 'compact' | 'normal' = 'normal';

   @Output() selectItem: EventEmitter<StTwoListSelectionElement> = new EventEmitter<StTwoListSelectionElement>();
   @Output() selectExtraLabel: EventEmitter<StTwoListSelectExtraLabelAction> = new EventEmitter<StTwoListSelectExtraLabelAction>();

   constructor() { }

   get itemName(): string {
      return this.item && this.item.name !== undefined && this.item.name !== null ? this.item.name : '';
   }

   get itemQaTag(): string {
      return this.qaTag + '-item-' + this.item.id;
   }

   get checkQaTag(): string {
      return this.qaTag + '-check-' + this.item.id;
   }

   get selected(): boolean {
      return this.item.selected ? true : false;
   }

   get itemMode(): string {
      let style: string = this.getModeStyle();
      style += this.selected ? ' sth-two-list-selection__selected_item' : '';
      return style;
   }

   getModeStyle(): string {
      return this.mode === 'normal' ? 'item-normal sth-two-list-selection__item-normal' :
         'item-compact sth-two-list-selection__item-compact';
   }

   emitOnSelect(event: Event): void {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.selectItem.emit(this.item);
   }
}
