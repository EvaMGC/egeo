/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { StEgeo, StRequired } from '../decorators/require-decorators';
import { Order, ORDER_TYPE } from './shared/order';
import { StTableHeader } from './shared/table-header.interface';

@StEgeo()
@Component({
   selector: 'st-table',
   templateUrl: './st-table.component.html',
   styleUrls: ['./st-table.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StTableComponent {
   @Input() @StRequired() fields: StTableHeader[];
   @Input() qaTag: string;
   @Input() header: boolean = true;
   @Input() sortable: boolean = true;
   @Input() currentOrder: Order;
   @Output() changeOrder: EventEmitter<Order> = new EventEmitter();

   public orderTypes: any = ORDER_TYPE;

   public onChangeOrder(field: StTableHeader): void {

      if (field && this.isSortable(field)) {
         if (this.currentOrder && this.currentOrder.orderBy === field.id) {
            this.changeOrderDirection();
         } else {
            this.currentOrder = new Order(field.id, ORDER_TYPE.ASC);
         }
         this.changeOrder.emit(this.currentOrder);
      }

   }

   public isSortable(field: StTableHeader): boolean {
      return field && field.sortable !== undefined ? field.sortable : this.sortable;
   }

   public getHeaderItemClass(field: StTableHeader): string {
      let isOrderAsc = this.isSortedByFieldAndDirection(field, this.orderTypes.ASC);
      return isOrderAsc ? 'icon-arrow2_up' : 'icon-arrow2_down';
   }

   public isSortedByField(field: StTableHeader): boolean {
      return this.currentOrder && this.currentOrder.orderBy === field.id;
   }

   private isSortedByFieldAndDirection(field: StTableHeader, orderType: ORDER_TYPE): boolean {
      return this.isSortedByField(field) && this.currentOrder.type === orderType;
   }

   private changeOrderDirection(): void {
      let newDirection = this.currentOrder.type === ORDER_TYPE.ASC ? ORDER_TYPE.DESC : ORDER_TYPE.ASC;
      this.currentOrder = new Order(this.currentOrder.orderBy, newDirection);
   }
}
