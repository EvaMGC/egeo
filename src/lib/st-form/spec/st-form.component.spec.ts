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

import { StFormComponent } from '../st-form.component';
import { schemaWithInputs } from './resources/json-schema-with-inputs';

let component: StFormComponent;
let fixture: ComponentFixture<StFormComponent>;

describe('StFormComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StFormComponent]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      component = fixture.componentInstance;
      component.schema = schemaWithInputs;

   });

   describe('should render a form according its json schema', () => {
      xit('inputs are created with their ids', () => {
         for (let propertyId in schemaWithInputs.properties) {
            if (schemaWithInputs.hasOwnProperty(propertyId)) {
               expect(fixture.nativeElement.querySelector('#' + propertyId)).not.toBeNull();
            }
         }
      });

      xit('tooltips are generated using their descriptions', () => {
         for (let propertyId in schemaWithInputs.properties) {
            if (schemaWithInputs.hasOwnProperty(propertyId)) {
               let property: any = schemaWithInputs[propertyId];
               let tooltip: HTMLElement = fixture.nativeElement.querySelector('#' + propertyId + '-contextual-help');
               let tooltipText: Element = (<Element> tooltip.parentNode).querySelector('.sth-tooltip-content-text');

               expect(tooltipText).toContain(property.description);
            }
         }
      });

      xit('inputs are displayed with their default value', () => {
         for (let propertyId in schemaWithInputs.properties) {
            if (schemaWithInputs.hasOwnProperty(propertyId)) {
               let property: any = schemaWithInputs[propertyId];
               expect(fixture.nativeElement.querySelector('#' + propertyId).value).toBe(property.default);
            }
         }
      });

      describe('inputs are created with their validations', () => {

         describe('number input', () => {

            xit('if user tries to type text, input value is not updated', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#requiredNumber');
               input.focus();
               input.value = 'fake test';
               input.blur();

               fixture.detectChanges();

               expect(input.value).toBe('');
            });

            xit('required input', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#requiredNumber');
               input.focus();
               input.value = '';
               input.blur();

               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toContain('This field is required');

               input.value = '50';
               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).not.toContain('This field is required');
            });

            xit('min number validation', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#minNumber');
               let minValue: number = schemaWithInputs.properties.minNumber.minimum;
               input.focus();
               input.value = (minValue - 1).toString();
               input.blur();

               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toContain('This field is invalid');

               input.value = minValue.toString();
               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toBeNull();
            });

            xit('max number validation', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#maxNumber');
               let maxNumber: number = schemaWithInputs.properties.maxNumber.maximum;
               input.focus();
               input.value = (maxNumber + 1).toString();
               input.blur();

               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toContain('This field is invalid');

               input.value = maxNumber.toString();
               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toBeNull();
            });


            xdescribe('number has to be between a certain range', () => {
               let input: HTMLInputElement;
               let minValue: number;
               let maxValue: number;

               beforeEach(() => {
                  input = fixture.nativeElement.querySelector('#minAndMaxNumber');
                  minValue = schemaWithInputs.properties.minAndMaxNumber.minimum;
                  maxValue = schemaWithInputs.properties.minAndMaxNumber.maximum;
               });

               xit('if minimum is exclusive, when user puts a value equal or minor than the minimum, validation error is displayed', () => {
                  input.focus();
                  // minor than the minimum
                  input.value = (minValue - 1).toString();
                  input.blur();

                  fixture.detectChanges();

                  expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toContain('This field is invalid');

                  // equal to the minimum
                  input.value = minValue.toString();
                  fixture.detectChanges();

                  expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toContain('This field is invalid');
               });

               xit('if minimum is not exclusive, when user puts a value equal to the minimum, input will be valid', () => {
                  schemaWithInputs.properties.minAndMaxNumber.exclusiveMinimum = false;
                  fixture.detectChanges();

                  input.focus();
                  // minor than the minimum
                  input.value = minValue.toString();
                  input.blur();

                  fixture.detectChanges();

                  expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toBeNull();
               });

               xit('if maximum is exclusive, when user puts a value equal or major than the maximum, validation error is displayed', () => {
                  input.focus();
                  // major than the maximum
                  input.value = (maxValue + 1).toString();
                  input.blur();

                  fixture.detectChanges();

                  expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toContain('This field is invalid');

                  // equal to the maximum
                  input.value = maxValue.toString();
                  fixture.detectChanges();

                  expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toContain('This field is invalid');
               });

               xit('if maximum is not exclusive, when user puts a value equal to the maximum, input will be valid', () => {
                  schemaWithInputs.properties.minAndMaxNumber.exclusiveMaximum = false;
                  fixture.detectChanges();

                  input.focus();
                  // minor than the maximum
                  input.value = maxValue.toString();
                  input.blur();

                  fixture.detectChanges();

                  expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toBeNull();
               });
            });
         });

         xdescribe('text input', () => {
            let fakeText = 'fake text';
            xit('required validation', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#requiredText');
               input.focus();
               input.value = fakeText;
               input.value = '';
               input.blur();

               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toContain('This field is required');

               input.value = fakeText;
               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toBeNull();
            });

            xit('min length validation', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#minLengthText');
               let minLength: number = schemaWithInputs.properties.minLengthText.minLength;
               input.focus();

               input.value = 'a'.repeat(minLength - 1);

               input.blur();

               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toContain('This field is invalid');

               input.value = 'a'.repeat(minLength);

               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toBeNull();
            });

            xit('max length validation', () => {
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#maxLengthText');
               let maxLength: number = schemaWithInputs.properties.maxLengthText.maxLength;
               input.focus();

               input.value = 'a'.repeat(maxLength + 1);

               input.blur();

               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toContain('This field is invalid');

               input.value = 'a'.repeat(maxLength);

               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toBeNull();
            });

            xit('pattern validation', () => {
               // this input only admits a valid url
               let input: HTMLInputElement = fixture.nativeElement.querySelector('#url');

               input.focus();

               input.value = 'a';

               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toContain('This field is invalid');

               input.value = 'www.egeo.stratio.com';

               fixture.detectChanges();

               expect((<Element> input.parentNode.parentNode).querySelector('.sth-input-container error')).toBeNull();
            });
         });

      });
   });


});
