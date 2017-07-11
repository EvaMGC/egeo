/*
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Validator, ValidatorFn, AbstractControl, ValidationErrors, Validators, NG_VALIDATORS } from '@angular/forms';
import { OnChanges, SimpleChanges, Directive, Input, forwardRef } from '@angular/core';

@Directive({
   selector: '[min][formControlName],[min][formControl],[min][ngModel]',
   providers: [
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => StMinValidator), multi: true }
   ],   host: {'[attr.min]': 'min ? min : null'}
})
export class StMinValidator implements Validator, OnChanges {
   @Input() min: string;

   private _validator: ValidatorFn;

   private _onChange: () => void;

   ngOnChanges(changes: SimpleChanges): void {
      if ('min' in changes) {
         this._createValidator();
         if (this._onChange) this._onChange();
      }
   }

   validate(c: AbstractControl): ValidationErrors|null {
      return this.min == null ? null : this._validator(c);
   }

   registerOnValidatorChange(fn: () => void): void {
      this._onChange = fn;
   }

   private _createValidator(): void {
      this._validator = Validators.min(parseInt(this.min, 0));
   }
}
