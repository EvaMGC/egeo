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
import {
   Component,
   Input,
   OnInit,
   ChangeDetectionStrategy,
   forwardRef,
   ChangeDetectorRef
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, NgModelGroup, ControlContainer, NgForm} from '@angular/forms';

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

   @Input()
   get value(): any {
      return this._value;
   }

   set value(value: any) {
      if (value !== this._value) {
         this._value = value;
      }
      this._cd.markForCheck();
   }

   // Function to call when the value changes.
   onChange(_: any): void {
      this._cd.markForCheck();

   }

   onTouched = () => {
   };

   constructor(private _cd: ChangeDetectorRef) {

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


   // When value is received from outside
   writeValue(value: any): void {
      this._value = value;
      this.onChange(value);
      this._cd.markForCheck();
   }

   // Registry the change function to propagate internal model changes
   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   // Registry the touch function to propagate internal touch events TODO: make this function.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   // Allows Angular to disable the list.
   setDisabledState(isDisabled: boolean): void {
   }


}
