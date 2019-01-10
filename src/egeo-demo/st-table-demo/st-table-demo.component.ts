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
import { Component } from '@angular/core';
import { cloneDeep as _cloneDeep } from 'lodash';
import { Order, ORDER_TYPE, StTableHeader } from '@stratio/egeo';

@Component({
   templateUrl: './st-table-demo.component.html',
   styleUrls: ['./st-table-demo.component.scss']
})
export class StTableDemoComponent {
   public configDoc: any = {
      html: 'demo/st-table-demo/st-table-demo.component.html',
      ts: 'demo/st-table-demo/st-table-demo.component.ts',
      component: 'lib/st-table/st-table.component.ts'
   };
   public smallTableFields: StTableHeader[] = [
      { id: 'id', label: 'Id' },
      { id: 'name', label: 'Name' },
      { id: 'lastName', label: 'Last Name' }];

   public fields: StTableHeader[] = [
      { id: 'id', label: 'Id' },
      { id: 'name', label: 'Name' },
      { id: 'lastName', label: 'Last Name' },
      { id: 'phone', label: 'Phone' },
      { id: 'company', label: 'Company' },
      { id: 'completedProfile', label: 'Completed profile' }];

   public header: boolean = true;

   public data: Array<{ id: string, name: string, lastName: string, phone: number, company: string, completedProfile: string }> = [
      {
         id: '4545-df56-s341',
         name: 'Antonio',
         lastName: 'López',
         phone: 60052520145,
         company: 'Stratio',
         completedProfile: '100%'
      },
      {
         id: '4545-df56-s342',
         name: 'Marina',
         lastName: 'Lara',
         phone: 600456520145,
         company: 'Stratio',
         completedProfile: '20%'
      },
      {
         id: '4545-df56-s343',
         name: 'Álvaro',
         lastName: 'García',
         phone: 60052320145,
         company: 'Stratio',
         completedProfile: '10%'
      },
      {
         id: '4545-df56-s344',
         name: 'Marina',
         lastName: 'González',
         phone: 600455640145,
         company: 'Stratio',
         completedProfile: '50%'
      }, {
         id: '4545-df56-s345',
         name: 'Pepe',
         lastName: 'Guerrero',
         phone: 6005276845,
         company: 'Stratio',
         completedProfile: '80%'
      },
      {
         id: '4545-df56-s346',
         name: 'María',
         lastName: 'Rodríguez',
         phone: 60065620145,
         company: 'Stratio',
         completedProfile: '70%'
      }
   ];
   public sortedData: Array<{ id: string, name: string, lastName: string, phone: number, company: string, completedProfile: string }>;
   public selectedCheckboxes: boolean[][] = [[], []];
   public visibleCheckboxes: boolean[][] = [[], []];


   constructor() {
      this.sortedData = _cloneDeep(this.data);
   }

   // Selectable tables

   public onSelectRow(event: any, rowIndex: number, selected: Array<boolean>) {
      selected[rowIndex] = event.checked;
   }

   public changeCheckBoxVisibility(visible: boolean, tableNumber: number, position: number): void {
      this.visibleCheckboxes[tableNumber][position] = visible;
   }

   public isCheckBoxVisible(tablePosition: number, position: number): boolean {
      return this.visibleCheckboxes[tablePosition][position] || this.selectedCheckboxes[tablePosition].indexOf(true) > -1;
   }

   public thereAreSomeCheckboxesChecked(tablePosition: number): boolean {
      return this.selectedCheckboxes[tablePosition].indexOf(true) > -1;
   }

   public onSelectAll(selected: boolean, tablePosition: number) {
      this.selectedCheckboxes[tablePosition] = [];
      for (let i = 0; i < this.data.length; ++i) {
         this.selectedCheckboxes[tablePosition].push(selected);
      }
   }

   // Sortable tables

   public onSortTable(order: Order): void {
      const reverseConst: number = order.type === ORDER_TYPE.ASC ? 1 : -1;
      this.sortedData = [...this.data].sort((a, b) => {
         return a[order.orderBy].toString().localeCompare(b[order.orderBy].toString()) * reverseConst;
      });
   }
}
