import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CheckRequired, Required } from '../decorators';
import { Order, ORDER_TYPE } from "./shared/order";

@CheckRequired()
@Component({
   selector: 'st-table',
   templateUrl: './st-table.component.html',
   styleUrls: ['./st-table.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StTableComponent {
   @Input() @Required() fields: Array<string>;
   @Input() @Required() qaTag: string;
   @Input() header: boolean = true;
   @Input() sortable: boolean = true;
   @Output() changeOrder: EventEmitter<Order> = new EventEmitter();

   public currentOrder: Order;
   public orderTypes: any = ORDER_TYPE;

   public isSortedByFieldAndDirection(field: string, orderType: ORDER_TYPE): boolean {
      return this.isSortedByField(field) && this.currentOrder.type === orderType;
   }

   public isSortedByField(field: string): boolean {
      return this.currentOrder && this.currentOrder.orderBy === field;
   }

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

   private changeOrderDirection(): void {
      this.currentOrder.type = this.currentOrder.type === ORDER_TYPE.ASC ? ORDER_TYPE.DESC : ORDER_TYPE.ASC;
   }
}
