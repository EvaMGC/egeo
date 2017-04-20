import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CheckRequired, Required } from '../decorators';
import { Order, ORDER_TYPE } from './shared/order';

@CheckRequired()
@Component({
   selector: 'st-table',
   templateUrl: './st-table.component.html',
   styleUrls: ['./st-table.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StTableComponent {
   @Input() @Required() fields: string[];
   @Input() @Required() qaTag: string;
   @Input() header: boolean = true;
   @Input() sortable: boolean = true;
   @Input() currentOrder: Order;
   @Output() changeOrder: EventEmitter<Order> = new EventEmitter();

   public orderTypes: any = ORDER_TYPE;

   public onChangeOrder(field: string): void {
      if (field) {
         if (this.currentOrder && this.currentOrder.orderBy === field) {
            this.changeOrderDirection();
         } else {
            this.currentOrder = new Order(field, ORDER_TYPE.ASC);
         }
         this.changeOrder.emit(this.currentOrder);
      }
   }

   public getHeaderItemClass(field: string): string {
      let isOrderAsc = this.isSortedByFieldAndDirection(field, this.orderTypes.ASC);
      return isOrderAsc ? 'icon-arrow2_up' : 'icon-arrow2_down';
   }

   public isSortedByField(field: string): boolean {
      return this.currentOrder && this.currentOrder.orderBy === field;
   }

   private isSortedByFieldAndDirection(field: string, orderType: ORDER_TYPE): boolean {
      return this.isSortedByField(field) && this.currentOrder.type === orderType;
   }

   private changeOrderDirection(): void {
      let newDirection = this.currentOrder.type === ORDER_TYPE.ASC ? ORDER_TYPE.DESC : ORDER_TYPE.ASC;
      this.currentOrder = new Order(this.currentOrder.orderBy, newDirection);
   }
}
