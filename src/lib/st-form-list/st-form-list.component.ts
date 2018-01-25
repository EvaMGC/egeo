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
import { Component, Input, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef } from '@angular/core';
import {ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm} from '@angular/forms';

@Component({
   selector: 'st-form-list',
   templateUrl: './st-form-list.html',
   styleUrls: ['./st-form-list.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StFormListComponent), multi: true }
   ]
   // viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class StFormListComponent implements ControlValueAccessor {
   @Input() schema: any;
   @Input() buttonLabel: string = 'Add';
   @Input() disabled = false;

   private _value: any[] = [];
   private registeredOnChange: (_: any) => void;

   constructor(private _cd: ChangeDetectorRef) {

   }


   onTouched = () => {
   }

   onChange: any = () => { };

   @Input()
   get value(): any[] {
      return this._value;
   }

   set value(value: any[]) {
      this._value = value;
      this._cd.markForCheck();
   }

   addItem(): void {
      this._value.push({});
      this.onChange(this.value);
   };

   isRequired(propertyName: string): boolean {
      return propertyName && this.schema.required && this.schema.required.indexOf(propertyName) !== -1;
   }


   // When value is received from outside
   writeValue(value: any): void {
      this._value = value;
      console.log(value)
      this.onChange(this.value);
   }

   registerOnChange(fn: (_: any) => void): void {
      this.onChange = (obj: any) => fn(obj);
   }

// Registry the touch function to propagate internal touch events TODO: make this function.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   setDisabledState(disable: boolean): void {
   }
}
