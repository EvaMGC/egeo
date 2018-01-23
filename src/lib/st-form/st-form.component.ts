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
import { Component, Input, OnInit, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
   selector: 'st-form',
   templateUrl: './st-form.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StFormComponent), multi: true }
   ]
})

export class StFormComponent implements ControlValueAccessor, OnInit {
   @Input() schema: any;

   private _value: any = {};

   onChange: (_: any) => void;
   onTouched: () => void;


   constructor() {

   }

   ngOnInit(): void {
      Object.keys(this.schema.properties).forEach(propertyName => {
         let property: any = this.schema.properties[propertyName];
         if (property.default && this._value[propertyName] === undefined) {
            this._value[propertyName] = property.default;
         }
      });
   }

   isRequired(propertyName: string): boolean {
      return propertyName && this.schema.required && this.schema.required.indexOf(propertyName) !== -1;
   }

   @Input()
   get value(): any {
      return this._value;
   }

   set value(value: any) {
      this._value = value;
   }


   // Allows Angular to update the model (list).
   // Update the model and changes needed for the view here.
   // writeValue(value: any): void {
   //    if (value !== this._value) {
   //       console.log('entro a writeValue del form', value);
   //
   //       this.onChange(value);
   //    }
   // }

   // When value is received from outside
   writeValue(value: any): void {
      this._value = value;
   }
   /*
    ****** Control value accessor && validate methods ******
    */

   // Set the function to be called when the control receives a change event.
   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   // Set the function to be called when the control receives a touch event.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   setDisabledState(disabled: boolean): void {
      // this._isDisabled = disabled;
      // this._cd.markForCheck();
   }

}
