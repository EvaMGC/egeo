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
import { SimpleChanges, SimpleChange } from '@angular/core';
import { StMaxValidator } from './st-max-validator';
import { FormControl, ValidationErrors } from '@angular/forms';

describe('Directive: StMaxValidator', () => {
   let directive: StMaxValidator;
   let allowedMax: number = 10;
   let formControl: FormControl = new FormControl(allowedMax);
   let simpleChanges: SimpleChanges = {
      max: new SimpleChange('0', String(allowedMax), true)
   };

   beforeEach(() => {
      directive = new StMaxValidator();
      directive.max = String(allowedMax);


      directive.ngOnChanges(simpleChanges);
   });

   describe('should be able to validate if a number is higher than another', () => {

      it('if the allowed maximum number is not defined, it does not return any error', () => {
         directive.max = undefined;
         formControl.patchValue(allowedMax - 1);

         let validationErrors: ValidationErrors = directive.validate(formControl);

         expect(validationErrors).toBeNull();
      });

      it('if number is undefined, it does not return any error', () => {
         formControl.patchValue(undefined);

         let validationErrors: ValidationErrors = directive.validate(formControl);

         expect(validationErrors).toBeNull();
      });

      it('if number is higher than the allowed, it returns an error', () => {
         formControl.patchValue(12);
         let validationErrors: ValidationErrors = directive.validate(formControl);

         expect(validationErrors).not.toBeNull();
         expect(validationErrors.max).toBeDefined();
         expect(validationErrors.max.max).toBe(allowedMax);
         expect(validationErrors.max.actual).toBe(12);
      });

      it('if number is equal to the allowed, it does not return any error', () => {
         formControl.patchValue(allowedMax);

         let validationErrors: ValidationErrors = directive.validate(formControl);

         expect(validationErrors).toBeNull();
      });

      it('if number is minor than the allowed, it does not return any error', () => {
         formControl.patchValue(allowedMax - 1);

         let validationErrors: ValidationErrors = directive.validate(formControl);

         expect(validationErrors).toBeNull();
      });

   });

   it ('it should register the onChange function in order to be executed when form control is updated', () => {
      let fakeOnChangeFunction = jasmine.createSpy('onChange');

      directive.registerOnValidatorChange(fakeOnChangeFunction);

      directive.ngOnChanges(simpleChanges);

      expect(fakeOnChangeFunction).toHaveBeenCalled();
   });
});
