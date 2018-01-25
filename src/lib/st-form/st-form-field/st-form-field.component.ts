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
   ChangeDetectionStrategy,
   OnInit,
   Input,
   forwardRef,
   OnDestroy, ChangeDetectorRef
} from '@angular/core';
import {
   ControlValueAccessor,
   NG_VALUE_ACCESSOR,
   FormControl,
   ControlContainer,
   NgForm,
} from '@angular/forms';
import { StRequired } from '../../decorators/require-decorators';
import { StInputError } from '../../st-input/st-input.error.model';
import { Subscription } from 'rxjs';

@Component({
   selector: 'st-form-field',
   templateUrl: './st-form-field.component.html',
   styleUrls: ['./st-form-field.component.scss'],
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StFormFieldComponent), multi: true }
   ],
   viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StFormFieldComponent implements ControlValueAccessor, OnInit {
   @Input() @StRequired() schema: any;
   @Input() required: boolean = false;
   @Input() errorMessages: StInputError;
   @Input() qaTag: string;
   @Input() name: string;

   @Input()
   get value(): any {
      return this._value;
   }

   set value(value: any) {
      this._value = value;
      this._cd.markForCheck();
   }

   public disabled: boolean = false; // To check disable
   public focus: boolean = false;
   public errorMessage: string = undefined;
   public type: string;

   private _value: any;
   private registeredOnChange: (_: any) => void;


   constructor (private _cd: ChangeDetectorRef) {

   }


   onTouched = () => {
   }

   onChange: any = () => { };

   ngOnInit(): void {
      this.type = this.schema.value.type === 'string' ? 'text' : this.schema.value.type;
      if (!this.errorMessages) {
         this.errorMessages = {
            generic: 'Error',
            required: 'This field is required',
            minLength: 'The field min length is ' + this.schema.value.minLength,
            maxLength: 'The field max length is ' + this.schema.value.maxLength,
            min: 'The number has to be higher than ' + this.min,
            max: 'The number has to be minor than ' + this.max,
            pattern: 'Invalid value'
         };
      }
   }

   get min(): number {
      return this.schema.value.exclusiveMinimum ? this.schema.value.minimum + 1 : this.schema.value.minimum;
   }

   get max(): number {
      return this.schema.value.exclusiveMaximum ? this.schema.value.maximum - 1 : this.schema.value.maximum;
   }

   get label(): string {
      return this.schema.value.title;
   }

   get placeholder(): string {
      return this.schema.value.placeholder || '';
   }

   get description(): string {
      return this.schema.value.description;
   }

   get minLength(): number {
      return this.schema.value.minLength;
   }

   get maxLength(): number {
      return this.schema.value.maxLength;
   }

   hasType(type: string): boolean {
      switch (type) {
         case 'input':
            return this.type === 'text' || this.type === 'number';
         default:
            return this.type === type;
      }
   }

   // When value is received from outside
   writeValue(value: any): void {
      this._value = value;
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

