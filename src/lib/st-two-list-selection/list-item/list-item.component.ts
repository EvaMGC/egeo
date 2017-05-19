import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CheckRequired, Required } from '../../decorators/require-decorators';
import { StTwoListSelectionElement, StTwoListSelectExtraLabelAction } from '../st-two-list-selection.model';

@Component({
   selector: 'list-item',
   templateUrl: './list-item.component.html',
   styleUrls: ['./list-item.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
@CheckRequired()
export class ListItemComponent {

   @Input() @Required() item: StTwoListSelectionElement;
   @Input() @Required() qaTag: string;
   @Input() editable: boolean = false;
   @Input() mode: 'compact' | 'normal' = 'normal';

   @Output() selectItem: EventEmitter<StTwoListSelectionElement> = new EventEmitter<StTwoListSelectionElement>();
   @Output() selectExtraLabel: EventEmitter<StTwoListSelectExtraLabelAction> = new EventEmitter<StTwoListSelectExtraLabelAction>();

   constructor() { }

   get itemName(): string {
      return this.item.name;
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
      return this.mode === 'normal' ? 'item-normal sth-two-list-selection__item-normal' :
         'item-compact sth-two-list-selection__item-compact';
   }

   emitOnSelect(event: Event): void {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.selectItem.emit(this.item);
   }
}