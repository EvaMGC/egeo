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
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { get as _get } from 'lodash';

import { StTableHeader } from '../../shared/table-header.interface';
import { StTableFilterIconClasses } from '../../st-table.interface';

@Component({
   selector: 'st-popover-filter',
   templateUrl: './st-popover-filter.component.html',
   styleUrls: ['./st-popover-filter.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StPopoverFilterComponent {

   /** @Input {StTableHeader} [field=''] field displayed in the header */
   @Input() field: StTableHeader;

   /** @Input {number} [index=''] index of field displayed in the header */
   @Input() index: number;

   /** @Input {boolean} [filtered=''] Status filter by column, needed with templateContentFilter to change filtered icon */
   @Input() filtered: boolean;

   /** @Input {TemplateRef} [templateContentFilter=undefined] Reference to paint a custom template inside popover content */
   @Input() templateContentFilter?: TemplateRef<any>;

   /** @Input {{StTableFilterIconClasses} [iconClasses=''] List of icon classes */
   @Input() iconClasses?: StTableFilterIconClasses = new StTableFilterIconClasses();

   /** @Output [filter=''] Event emitted  when user interacts with filter button without a custom template */
   @Output() filter: EventEmitter<any> = new EventEmitter();

   public openToLeft: boolean;
   public offsetX: number;

   private _hidden: boolean;

   constructor(private _elementRef: ElementRef) {

   }

   /** @Input {boolean} [hidden=''] field to show popover */
   @Input()
   get hidden(): boolean {
      return this._hidden;
   }

   set hidden(hidden: boolean) {
      if (!hidden) {
         this.offsetX = (this._elementRef.nativeElement.offsetLeft - this._elementRef.nativeElement.offsetWidth)  * -1;
      }
      this._hidden = hidden;
   }

   public getConfigField(field: StTableHeader, config: string): any {
      return _get(field, `filters.${config}`);
   }

   public getFilteredIcon(): string {
      return this.filtered ? this.iconClasses.selected : this.iconClasses.enabled;
   }

   public onChangeFilter(indexFilter: number, event: Event): void {
      this.field.filters.filterConfig[indexFilter].selected = (<any>event).checked;
   }

   public onFilter(): void {
      this.filter.emit();
   }
}
