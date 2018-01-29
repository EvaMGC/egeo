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
import { Component, Input, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


/**
 * @description {Component} [Form list]
 *
 * The form list component allows to create dynamically list of any item.
 *
 * @example
 *
 * {html}
 *
 * ```
 *  <st-form-list [schema]="jsonSchema" [(value)]="model" >
 *  </st-form-list>
 * ```
 *
 * In a form
 *
 * <form #templateDrivenForm="ngForm" novalidate autocomplete="off" class="col-md-6">
 *     <st-form-list [schema]="jsonSchema" [(value)]="model" ></st-form-list>
 * </form>
 *
 */
@Component({
   selector: 'st-form-list',
   templateUrl: './st-form-list.html',
   styleUrls: ['./st-form-list.scss'],
   host: { class: 'st-form-list' },
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StFormListComponent), multi: true }
   ]
})

export class StFormListComponent implements ControlValueAccessor {
   /** @Input {any} [schema=''] JSON schema of items */
   @Input() schema: any;
   /** @Input {string} [buttonLabel='Add'] String displayed in the button to add more items */
   @Input() buttonLabel: string = 'Add';
   /** @Input {boolean} [disabled='false'] Boolean to enable or disable form list */
   @Input() disabled = false;

   public _value: any[] = [];

   onTouched = () => {
   };

   onChange: any = () => {
   };

   /** @Input {any[]} [value=''] Current list value */
   @Input()
   get value(): any[] {
      return this._value;
   }

   set value(value: any[]) {
      this._value = value;
      this.onChange(this._value);
   }

   addItem(): void {
      this._value.push({});
      this.onChange(this._value);
   };

   removeItem(position: number): void {
      delete  this._value[position];
   }

   isRequired(propertyName: string): boolean {
      return propertyName && this.schema.required && this.schema.required.indexOf(propertyName) !== -1;
   }

   writeValue(value: any[]): void {
      this._value = value;
      this.onChange(this.value);
   }

   registerOnChange(fn: (_: any) => void): void {
      this.onChange = (obj: any) => fn(obj);
   }

   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   setDisabledState(disable: boolean): void {
   }

}
