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
   Component, Input, OnInit, ChangeDetectionStrategy, forwardRef, ChangeDetectorRef,
   AfterContentChecked
} from '@angular/core';
import {
   ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm, ControlContainer, NG_VALIDATORS,
   FormControl
} from '@angular/forms';

@Component({
   selector: 'st-form',
   templateUrl: './st-form.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StFormComponent), multi: true }
   ]
   // viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})

export class StFormComponent implements ControlValueAccessor, OnInit {
   @Input() schema: any;

   private _value: any = {};
   private registeredOnChange: (_: any) => void;


   onTouched = () => { };

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

   // When value is received from outside
   writeValue(value: any): void {
      console.log('write value', value);
      this._value = value;
      this._cd.markForCheck();
      this.onChange(value);
   }

   // Registry the change function to propagate internal model changes
   registerOnChange(fn: (_: any) => void): void {
      this.registeredOnChange = fn;
   }

   // Registry the touch function to propagate internal touch events TODO: make this function.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   // Allows Angular to disable the list.
   setDisabledState(isDisabled: boolean): void {
   }

   // Function to call when the value changes.
   onChange(value: any): void {
      this._value = value;
      if (this.registeredOnChange) {
         this.registeredOnChange(value);
      }
this._cd.markForCheck();
   }
}
