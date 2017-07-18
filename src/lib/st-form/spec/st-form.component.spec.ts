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

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StFormComponent} from '../st-form.component';
import {schemaWithInputs} from './resources/json-schema-with-inputs';
import {StFormFieldComponent} from "../st-form-field/st-form-field.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../pipes/pipes.module";
import {StInputModule} from "../../st-input/st-input.module";

let component: StFormComponent;
let fixture: ComponentFixture<StFormComponent>;

fdescribe('StFormComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StInputModule, PipesModule],
         declarations: [StFormComponent, StFormFieldComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StFormComponent);
      component = fixture.componentInstance;
      component.schema = schemaWithInputs;
      fixture.detectChanges();
   });

   describe('should render a form according its json schema', () => {
      it('a control is created for each property with its ids', () => {
         for (let propertyId in schemaWithInputs.properties) {
            if (schemaWithInputs.hasOwnProperty(propertyId)) {
               expect(fixture.nativeElement.querySelector('#' + propertyId)).not.toBeNull();
            }
         }
      });

      it('tooltips are generated using their descriptions', () => {
         for (let propertyId in schemaWithInputs.properties) {
            if (schemaWithInputs.hasOwnProperty(propertyId)) {
               let property: any = schemaWithInputs[propertyId];
               let tooltip: HTMLElement = fixture.nativeElement.querySelector('#' + propertyId + '-contextual-help');
               let tooltipText: Element = (<Element> tooltip.parentNode).querySelector('.sth-tooltip-content-text');

               expect(tooltipText).toContain(property.description);
            }
         }
      });

      it('inputs are displayed with their default value', () => {
         for (let propertyId in schemaWithInputs.properties) {
            if (schemaWithInputs.hasOwnProperty(propertyId)) {
               let property: any = schemaWithInputs[propertyId];
               expect(fixture.nativeElement.querySelector('#' + propertyId).value).toBe(property.default);
            }
         }
      });

      describe('inputs are created with their validations', () => {

         describe('number input', () => {

            it('if user tries to type text, input value is not updated', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#requiredNumber');
               input.focus();
               input.value = 'fake test';
               input.blur();

               fixture.detectChanges();

               expect(input.value).toBe('');
            });

            it('required input', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#requiredNumber');
               input.focus();
               input.value = '';
               input.dispatchEvent(new Event('input'));
               input.blur();
               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

               expect(<Element> (fixture.nativeElement.querySelector('#requiredNumber').parentNode.parentNode.querySelector('.st-input-error-layout span')).innerHTML).toBe('This field is required');

               input.value = '50';
               input.dispatchEvent(new Event('input'));
               input.blur();
               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

               expect(<Element> fixture.nativeElement.querySelector('#requiredNumber').parentNode.parentNode.querySelector('st-input-error-layout span')).toBeNull();
            });

            it('min number validation', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#minNumber');
               let minValue: number = schemaWithInputs.properties.minNumber.minimum;
               console.log(minValue)
               input.focus();
               input.value = (minValue - 1).toString();
               input.dispatchEvent(new Event('input'));
               input.blur();

               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();
console.log(fixture.nativeElement.querySelector('#minNumber').parentNode.parentNode)
               expect(<Element> (fixture.nativeElement.querySelector('#minNumber').parentNode.parentNode.querySelector('.st-input-error-layout span')).innerHTML).toBe('This field is invalid');

               input.value = minValue.toString();
               input.dispatchEvent(new Event('input'));

               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

               expect(<Element> fixture.nativeElement.querySelector('#minNumber').parentNode.parentNode.querySelector('st-input-error-layout span')).toBeNull();
            });

            it('max number validation', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#maxNumber');
               let maxNumber: number = schemaWithInputs.properties.maxNumber.maximum;
               input.focus();
               input.value = (maxNumber + 1).toString();
               input.dispatchEvent(new Event('input'));

               input.blur();

               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

                expect(<Element> fixture.nativeElement.querySelector('#maxNumber').parentNode.parentNode.querySelector('st-input-error-layout span')).toContain('This field is invalid');

               input.value = maxNumber.toString();
               input.dispatchEvent(new Event('input'));

               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

               expect(<Element> fixture.nativeElement.querySelector('#maxNumber').parentNode.parentNode.querySelector('st-input-error-layout span')).toBeNull();
            });


            describe('number has to be between a certain range', () => {
               let input: HTMLInputElement;
               let minValue: number;
               let maxValue: number;

               beforeEach(() => {
                  input = fixture.nativeElement.querySelector('#minAndMaxNumber');
                  minValue = schemaWithInputs.properties.minAndMaxNumber.minimum;
                  maxValue = schemaWithInputs.properties.minAndMaxNumber.maximum;
               });

               it('if minimum is exclusive, when user puts a value equal or minor than the minimum, validation error is displayed', () => {
                  input.focus();
                  // minor than the minimum
                  input.value = (minValue - 1).toString();
                  input.dispatchEvent(new Event('input'));

                  input.blur();

                  fixture.detectChanges();
                  fixture.changeDetectorRef.markForCheck();

                   expect(<Element> fixture.nativeElement.querySelector('#minAndMaxNumber').parentNode.parentNode.querySelector('st-input-error-layout span')).toContain('This field is invalid');

                  // equal to the minimum
                  input.value = minValue.toString();
                  fixture.detectChanges();

                   expect(<Element> fixture.nativeElement.querySelector('#minAndMaxNumber').parentNode.parentNode.querySelector('st-input-error-layout span')).toContain('This field is invalid');
               });

               it('if minimum is not exclusive, when user puts a value equal to the minimum, input will be valid', () => {
                  schemaWithInputs.properties.minAndMaxNumber.exclusiveMinimum = false;
                  fixture.detectChanges();

                  input.focus();
                  // minor than the minimum
                  input.value = minValue.toString();
                  input.blur();

                  fixture.detectChanges();
                  fixture.changeDetectorRef.markForCheck();

                  expect(<Element> fixture.nativeElement.querySelector('#minAndMaxNumber').parentNode.parentNode.querySelector('st-input-error-layout span')).toBeNull();
               });

               it('if maximum is exclusive, when user puts a value equal or major than the maximum, validation error is displayed', () => {
                  input.focus();
                  // major than the maximum
                  input.value = (maxValue + 1).toString();
                  input.blur();

                  fixture.detectChanges();
                  fixture.changeDetectorRef.markForCheck();

                   expect(<Element> fixture.nativeElement.querySelector('#minAndMaxNumber').parentNode.parentNode.querySelector('st-input-error-layout span')).toContain('This field is invalid');

                  // equal to the maximum
                  input.value = maxValue.toString();
                  fixture.detectChanges();
                  fixture.changeDetectorRef.markForCheck();

                   expect(<Element> fixture.nativeElement.querySelector('#minAndMaxNumber').parentNode.parentNode.querySelector('st-input-error-layout span')).toContain('This field is invalid');
               });

               it('if maximum is not exclusive, when user puts a value equal to the maximum, input will be valid', () => {
                  schemaWithInputs.properties.minAndMaxNumber.exclusiveMaximum = false;
                  fixture.detectChanges();

                  input.focus();
                  // minor than the maximum
                  input.value = maxValue.toString();
                  input.blur();

                  fixture.detectChanges();
                  fixture.changeDetectorRef.markForCheck();

                  expect(<Element> fixture.nativeElement.querySelector('#minAndMaxNumber').parentNode.parentNode.querySelector('st-input-error-layout span')).toBeNull();
               });
            });
         });

         xdescribe('text input', () => {
            let fakeText = 'fake text';
            it('required validation', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#requiredText');
               input.focus();
               input.value = fakeText;
               input.value = '';
               input.blur();

               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

                expect(<Element> fixture.nativeElement.querySelector('#requiredText').parentNode.parentNode.querySelector('st-input-error-layout span')).toContain('This field is required');

               input.value = fakeText;
               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

               expect(<Element> fixture.nativeElement.querySelector('#requiredText').parentNode.parentNode.querySelector('st-input-error-layout span')).toBeNull();
            });

            it('min length validation', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#minLengthText');
               let minLength: number = schemaWithInputs.properties.minLengthText.minLength;
               input.focus();

               input.value = 'a'.repeat(minLength - 1);

               input.blur();

               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

                expect(<Element> fixture.nativeElement.querySelector('#minLengthText').parentNode.parentNode.querySelector('st-input-error-layout span')).toContain('This field is invalid');

               input.value = 'a'.repeat(minLength);

               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

               expect(<Element> fixture.nativeElement.querySelector('#minLengthText').parentNode.parentNode.querySelector('st-input-error-layout span')).toBeNull();
            });

            it('max length validation', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#maxLengthText');
               let maxLength: number = schemaWithInputs.properties.maxLengthText.maxLength;
               input.focus();

               input.value = 'a'.repeat(maxLength + 1);

               input.blur();

               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

                expect(<Element> fixture.nativeElement.querySelector('#maxLengthText').parentNode.parentNode.querySelector('st-input-error-layout span')).toContain('This field is invalid');

               input.value = 'a'.repeat(maxLength);

               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

               expect(<Element> fixture.nativeElement.querySelector('#maxLengthText').parentNode.parentNode.querySelector('st-input-error-layout span')).toBeNull();
            });

            it('pattern validation', () => {
               // this input only admits a valid url
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#url');

               input.focus();

               input.value = 'a';

               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

                expect(<Element> fixture.nativeElement.querySelector('#url').parentNode.parentNode.querySelector('st-input-error-layout span')).toContain('This field is invalid');

               input.value = 'www.egeo.stratio.com';

               fixture.detectChanges();
               fixture.changeDetectorRef.markForCheck();

               expect(<Element> fixture.nativeElement.querySelector('#url').parentNode.parentNode.querySelector('st-input-error-layout span')).toBeNull();
            });
         });

      });
   });


});
