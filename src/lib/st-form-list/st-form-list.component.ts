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
   @Input() schema: any;
   @Input() buttonLabel: string = 'Add';
   @Input() disabled = false;

   public _value: any[] = [];

   onTouched = () => {
   };

   onChange: any = () => {
   };

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
      delete   this._value[position];
      // this.onChange(this._value);
      // this._value.splice(position, 1);
      console.log(this._value);
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
