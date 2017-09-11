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
import { StTableHeader } from '@stratio/egeo';

@Component({
   templateUrl: './st-table-demo.component.html',
   styleUrls: ['./st-table-demo.component.scss']
})
export class StTableDemoComponent {
   public fields: StTableHeader[] = [
      { id: 'id', label: 'Id',  sortable: true}, { id: 'name', label: 'Name' }, { id: 'lastName', label: 'Last Name' },
      { id: 'phone', label: 'Phone' }, { id: 'company', label: 'Company' },
      { id: 'completedProfile', label: 'Completed profile', sortable: false }];

   public header: boolean = true;

   public data: Array<{id: string, name: string, lastName: string, phone: number, company: string, completedProfile: string}> = [
      {
         id: '4545-df56-s345',
         name: 'Antonio',
         lastName: 'López',
         phone: 60052520145,
         company: 'Stratio',
         completedProfile: '80%'
      },
      {
         id: '4545-df56-s345',
         name: 'Marina',
         lastName: 'Lara',
         phone: 600456520145,
         company: 'Stratio',
         completedProfile: '80%'
      },
      {
         id: '4545-df56-s345',
         name: 'Álvaro',
         lastName: 'García',
         phone: 60052320145,
         company: 'Stratio',
         completedProfile: '80%'
      },
      {
         id: '4545-df56-s345',
         name: 'Marina',
         lastName: 'González',
         phone: 600455640145,
         company: 'Stratio',
         completedProfile: '80%'
      }, {
         id: '4545-df56-s345',
         name: 'Pepe',
         lastName: 'Guerrero',
         phone: 6005276845,
         company: 'Stratio',
         completedProfile: '80%'
      },
      {
         id: '4545-df56-s345',
         name: 'María',
         lastName: 'Rodríguez',
         phone: 60065620145,
         company: 'Stratio',
         completedProfile: '80%'
      }
   ];

   public selected: boolean[] = [];

   public onSelectRow(event: any, rowIndex: number) {
      this.selected[rowIndex] = event.checked;
   }
}
