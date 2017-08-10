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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { PipesModule } from '../../pipes/pipes.module';
import { SCHEMA_WITH_INPUTS } from '../spec/resources/json-schema-with-inputs';
import { StFormDirectiveModule } from '../../directives/form/form-directives.module';
import { StFormFieldComponent } from './st-form-field.component';
import { StInputModule } from '../../st-input/st-input.module';

let component: StFormFieldComponent;
let fixture: ComponentFixture<StFormFieldComponent>;
let formControl: FormControl = new FormControl();

describe('StFormFieldComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StInputModule, PipesModule, StFormDirectiveModule],
         declarations: [StFormFieldComponent]
      })
         .compileComponents();  // compile template and css
   }));


   beforeEach(() => {
      fixture = TestBed.createComponent(StFormFieldComponent);
      component = fixture.componentInstance;
   });

   describe('should be able to render inputs with their validations', () => {

      describe('number input', () => {
         let input: HTMLInputElement;
         let numberInputProperty: any;
         let minValue: number;
         let maxValue: number;
         beforeEach(() => {
            numberInputProperty = SCHEMA_WITH_INPUTS.properties.genericNumberInput;
            minValue = numberInputProperty.minimum;
            maxValue = numberInputProperty.maximum;
            component.schema = {key: 'genericNumberInput', value: numberInputProperty};
            component.formControl = formControl;
         });

         it('if user tries to type text, input value is not updated', () => {
            fixture.detectChanges();
            input = fixture.nativeElement.querySelector('#genericNumberInput');

            input.focus();
            input.value = 'fake test';
            input.blur();

            fixture.detectChanges();

            expect(input.value).toBe('');
         });

         it('required input', () => {
            fixture.detectChanges();
            input = fixture.nativeElement.querySelector('#genericNumberInput');
            component.required = true;
            fixture.detectChanges();

            input.focus();
            input.value = '';
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('This field is required');

            input.focus();
            input.value = '7';
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         it('min number validation', () => {
            fixture.detectChanges();
            input = fixture.nativeElement.querySelector('#genericNumberInput');
            input.focus();
            input.value = (minValue - 1).toString();
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be higher than ' + minValue);

            input.value = minValue.toString();
            input.dispatchEvent(new Event('input'));

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         it('max number validation', () => {
            fixture.detectChanges();
            input = fixture.nativeElement.querySelector('#genericNumberInput');
            input.value = (maxValue + 1).toString();
            input.dispatchEvent(new Event('input'));

            input.blur();

            fixture.detectChanges();


            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be minor than ' + maxValue);

            input.value = maxValue.toString();
            input.dispatchEvent(new Event('input'));

            fixture.detectChanges();


            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         describe('number has to be between a certain range', () => {

            it('if minimum is exclusive, when user puts a value equal or minor than the minimum, validation error is displayed', () => {
               numberInputProperty.exclusiveMinimum = true;
               fixture.detectChanges();



               input = fixture.nativeElement.querySelector('#genericNumberInput');

               input.focus();
               // minor than the minimum
               input.value = (minValue - 1).toString();
               input.dispatchEvent(new Event('input'));
               input.blur();

               fixture.detectChanges();



               expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be higher than ' + (minValue + 1));

               // equal to the minimum
               input.value = minValue.toString();
               input.dispatchEvent(new Event('input'));

               fixture.detectChanges();

               expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be higher than ' + (minValue + 1));
            });

            it('if minimum is not exclusive, when user puts a value equal to the minimum, input will be valid', () => {
               numberInputProperty.exclusiveMinimum = false;
               fixture.detectChanges();

               input = fixture.nativeElement.querySelector('#genericNumberInput');

               input.focus();

               // minor than the minimum
               input.value = minValue.toString();
               input.dispatchEvent(new Event('input'));

               input.blur();

               fixture.detectChanges();


               expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
            });

            it('if maximum is exclusive, when user puts a value equal or major than the maximum, validation error is displayed', () => {
               numberInputProperty.exclusiveMaximum = true;
               fixture.detectChanges();

               input = fixture.nativeElement.querySelector('#genericNumberInput');

               input.focus();
               // major than the maximum
               input.value = (maxValue + 1).toString();
               input.dispatchEvent(new Event('input'));
               input.blur();

               fixture.detectChanges();

               expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be minor than ' + (maxValue - 1));

               // equal to the maximum
               input.value = maxValue.toString();
               input.dispatchEvent(new Event('input'));
               fixture.detectChanges();


               expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be minor than ' + (maxValue - 1));
            });

            it('if maximum is not exclusive, when user puts a value equal to the maximum, input will be valid', () => {
               numberInputProperty.exclusiveMaximum = false;
               fixture.detectChanges();
               input = fixture.nativeElement.querySelector('#genericNumberInput');

               input.focus();

               // minor than the minimum
               input.value = maxValue.toString();
               input.dispatchEvent(new Event('input'));

               input.blur();

               fixture.detectChanges();

               expect(fixture.nativeElement.querySelector('#genericNumberInput').parentNode.parentNode.querySelector('.st-input-error-layout span')).toBeNull();
            });
         });

         it ('When form control is updated externally, it is updated', () => {
            formControl.setValue(5);

            fixture.detectChanges();

            input = fixture.nativeElement.querySelector('#genericNumberInput');

            expect(input.value).toBe('5');
         });
      });

      describe('text input', () => {
         let input: HTMLInputElement;
         let textInputProperty: any;
         let minLength: number;
         let maxLength: number;

         beforeEach(() => {
            textInputProperty = SCHEMA_WITH_INPUTS.properties.genericTextInput;
            minLength = textInputProperty.minLength;
            maxLength = textInputProperty.maxLength;
            component.schema = {key: 'genericTextInput', value: textInputProperty};
            component.formControl = formControl;
            fixture.detectChanges();
            input = fixture.nativeElement.querySelector('#genericTextInput');
         });
         it('required validation', () => {
            component.required = true;
            fixture.detectChanges();
            input.focus();
            input.value = '';
            input.dispatchEvent(new Event('input'));

            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('This field is required');

            input.value = 'aa';
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();


            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         it('min length validation', () => {
            input.focus();

            input.value = 'a'.repeat(minLength - 1);
            input.dispatchEvent(new Event('input'));

            input.blur();

            fixture.detectChanges();


            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The field min length is ' + minLength);

            input.value = 'a'.repeat(minLength);
            input.dispatchEvent(new Event('input'));

            fixture.detectChanges();


            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         it('max length validation', () => {
            input.focus();

            input.value = 'a'.repeat(maxLength + 1);
            input.dispatchEvent(new Event('input'));

            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The field max length is ' + maxLength);

            input.focus();
            input.value = 'a'.repeat(maxLength);
            input.dispatchEvent(new Event('input'));

            input.blur();
            fixture.detectChanges();


            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         it('pattern validation', () => {
            input.focus();
            input.value = 'bbbb';
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('Invalid value');

            input.focus();
            input.value = 'aa';
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
         });

         it ('When form control is updated externally, it is updated', () => {
            formControl.setValue('aa');

            fixture.detectChanges();

            input = fixture.nativeElement.querySelector('#genericTextInput');

            expect(input.value).toBe('aa');
         });
      });

   });

});
