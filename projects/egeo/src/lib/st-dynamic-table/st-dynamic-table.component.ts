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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { JSONSchema4 } from 'json-schema';

import { StEgeo, StRequired } from '../decorators/require-decorators';
import { Order } from '../st-table/shared/order';
import { StTableHeader } from '../st-table/shared/table-header.interface';
import { StDynamicTableUtils } from './utils/st-dynamic-table.utils';
import { StDynamicTableHeader, StDynamicTableUserInterface } from './st-dynamic-table.model';


/**
 * @description {Component} [Dynamic Table]
 *
 * The table component has been designed to be able to create a table deducing its columns using a json schema
 *
 * * @model
 *
 *   [StDynamicTableHeader] {./st-dynamic-table.model.ts#StDynamicTableHeader}
 *   [StDynamicTableUISpecification] {./st-dynamic-table.model.ts#StDynamicTableUISpecification}
 *   [StDynamicTableUserInterface] {./st-dynamic-table.model.ts#StDynamicTableUserInterface}
 *
 * @example
 *
 * {html}
 *
 * ```
 * <st-dynamic-table [jsonSchema]="jsonSchema"
 *    [items]="sortedUsers"
 *    [sortable]="true"
 *    [filterable]="true"
 *    [hasHoverMenu]="true"
 *    [currentOrder]="currentOrder"
 *    [activeHoverMenu]="activeHoverMenuPosition"
 *    [templateContentFilter]="filterContent"
 *    (changeOrder)="onSortTable($event)"
 *    (showHoverMenu)="onShowHoverMenu($event)">
 *        <st-dropdown-menu st-dynamic-table-hover-menu
 *          class="hover-menu"
 *          [items]="rowActions"
 *          [active]="activeHoverMenuPosition[3] !== undefined"
 *          [visualMode]="1">
 *       </st-dropdown-menu>
 * </st-dynamic-table>
 * ```
 *
 */
@StEgeo()
@Component({
   selector: 'st-dynamic-table',
   templateUrl: './st-dynamic-table.component.html',
   styleUrls: ['./st-dynamic-table.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StDynamicTableComponent {
   /** @Input {{key: string, value: any}[]} [items=''] Item list displayed as table rows */
   @Input() @StRequired() items: { key: string, value: any }[];

   /** @Input {StDynamicTableUserInterface} [uiDefinitions=''] UI definition for each field */
   @Input() uiDefinitions: StDynamicTableUserInterface;

   /** @Input {string} [qaTag=''] Prefix used to generate the id values for qa tests */
   @Input() qaTag: string;
   /** @Input {boolean} [header=true] Boolean to show or hide the header */
   @Input() header: boolean = true;
   /**
    * @Input {boolean} [sortable=true] Boolean to make sortable the table, To enable sorting of columns use
    * the new "sortable" field inside stTableHeader model
    */
   @Input() sortable: boolean = true;
   /**
    * @Input {boolean} [filterable=false] Boolean to make filterable the table, To enable filtering of columns use
    * the new "filterable" field inside stTableHeader model (necesary define filterConfig).
    */
   @Input() filterable: boolean = false;
   /**
    * @Input {boolean} [selectable=false] Boolean to show or hide a checkboxes in the first cell of rows
    */
   @Input() selectable: boolean = false;
   /**
    * @Input {boolean} [selectableAll=false] Boolean to show or hide a checkbox in the header to select or
    *  deselect all rows
    */
   @Input() selectableAll: boolean = false;

   /** @Input {boolean[]} [selected=''] Boolean list to indicate if a row is selected */
   @Input() selected?: boolean[] = [];

   /** @Input {Order} [currentOrder=''] It specifies what is the current order applied to the table */
   @Input() currentOrder: Order;

   /** @Input {string} [customClasses=] Classes for adding styles to table tag from outside. These can be: separated-rows */
   @Input() customClasses: string;

   /** @Input {boolean} [fixedHeader=false] Boolean to fix the table header */
   @Input() fixedHeader: boolean = false;

   /** @Input {TemplateRef} [templateContentFilter=undefined] Reference to paint a custom template inside popover content */
   @Input() templateContentFilter?: TemplateRef<any>;

   /** @Input {boolean[]} [statusFilter=] List of status filter by column, needed with templateContentFilter */
   @Input() statusFilter?: boolean[];

   /** @Input {number} [activeHoverMenu=] Position of the current active hover menu */
   @Input() activeHoverMenu?: number;

   /** @Input {boolean} [hasHoverMenu=] It specifies if a menu has to be displayed when user puts the mouse over
    * the rows. Remember to add a cell with the selector st-table-row-hover for adding content to the menu
    */
   @Input() hasHoverMenu?: boolean;
   /** @Input {string} [hoverButton='icon-ellipsis'] It specifies the icon class of the hover button displayed when user puts mouse over a row
    */
   @Input() hoverButton: string = 'icon-ellipsis';

   /** @Input {boolean} [selectedAll=] It specifies if all rows are selected */
   @Input() selectedAll?: boolean;

   /** @Output {Order} [changeOrder=''] Event emitted with the new order which has to be applied to the table rows */
   @Output() changeOrder: EventEmitter<Order> = new EventEmitter<Order>();
   /** @Output {boolean} [selectAll=''] Event emitted  when user interacts with the checkbox to select or deselect
    * all rows
    */
   @Output() selectAll: EventEmitter<boolean> = new EventEmitter<boolean>();

   /** @Output {StTableHeader[]} [selectFilters=] Event emitted  when user interacts with filter button without a custom template */
   @Output() selectFilters: EventEmitter<StTableHeader[]> = new EventEmitter<StTableHeader[]>();
   /** @Output {EventEmitter<number} [showHoverMenu=] Event emitted when user clicks on hover button of a row */
   @Output() showHoverMenu: EventEmitter<number> = new EventEmitter<number>();
   /** @Output {EventEmitter<{checked: boolean, row: number}} [selectRow=] Event emitted when user clicks on checkbox of a row */
   @Output() selectRow: EventEmitter<{ checked: boolean, row: number }> = new EventEmitter<{ checked: boolean, row: number }>();
   /** @Output {EventEmitter<{checked: boolean, row: number}} [selectRow=] Event emitted when user clicks on checkbox of a row */
   @Output() clickCell: EventEmitter<{ row: number, fieldId: string, label: string }> = new EventEmitter<{ row: number, fieldId: string, label: string }>();

   public fields: StDynamicTableHeader[] = [];

   private _jsonSchema: JSONSchema4;

   constructor(private _cd: ChangeDetectorRef) {
   }

   /** @Input {JSONSchema4} [jsonSchema=] Json schema to define its structure */
   @Input() @StRequired()
   get jsonSchema(): JSONSchema4 {
      return this._jsonSchema;
   }

   set jsonSchema(_jsonSchema: JSONSchema4) {
      this._jsonSchema = _jsonSchema;
      this.fields = StDynamicTableUtils.getHeaderFieldsFromJsonSchema(this._jsonSchema, this.uiDefinitions);
      this._cd.markForCheck();
   }

   public onChangeOrder(order: Order): void {
      if (order) {
         this.changeOrder.emit(order);
      }
   }

   public onSelectAll(checked: boolean): void {
      this.selectAll.emit(checked);
   }

   public onSelectedFilters(selectedFilters: StTableHeader[]): void {
      this.selectFilters.emit(selectedFilters);
   }

   public onShowHoverMenu(row: number): void {
      this.showHoverMenu.emit(row);
   }

   public getCellClasses(field: StDynamicTableHeader): { clickable?: boolean } {
      let classes: { clickable?: boolean } = {};

      if (field.reference) {
         classes.clickable = true;
      }

      return classes;
   }

   public getCellStyles(field: StDynamicTableHeader): any {
      const uiDefinition = this.uiDefinitions && this.uiDefinitions[field.id];
      return uiDefinition && uiDefinition.styles;
   }

   public onSelectRow(checkboxEvent: { checked: boolean, value: any }, row: number): void {
      this.selectRow.emit({ checked: checkboxEvent.checked, row: row });
   }

   public onClickCellLabel(row: number, fieldId: string, label: string): void {
      this.clickCell.emit({ row, fieldId, label });
   }

}

