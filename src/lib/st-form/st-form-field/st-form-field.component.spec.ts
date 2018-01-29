// /*
//  * © 2017 Stratio Big Data Inc., Sucursal en España.
//  *
//  * This software is licensed under the Apache License, Version 2.0.
//  * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
//  * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//  * See the terms of the License for more details.
//  *
//  * SPDX-License-Identifier: Apache-2.0.
//  */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
   FormsModule, NgForm, NG_VALUE_ACCESSOR, ControlContainer, FormGroup, FormControl,
   ReactiveFormsModule, NgModelGroup
} from '@angular/forms';
import { JSON_SCHEMA } from '../spec/resources/json-schema';
import { Component, ViewChild, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { StFormFieldModule } from './st-form-field.module';
import { StFormModule } from '../st-form.module';
import { StFormFieldComponent } from './st-form-field.component';

let isRequired: boolean = false;

@Component({
   template: `
      <fieldset ngModelGroup="address">     
         <st-form-field #formField
                        [schema]="schema"
                         [formControl]="formGroup.controls['input']"
                         [(value)]="model"
                        [name]="name"
                        [qaTag]="name"
                        [required]="isRequired" ngDefaultControl>
         </st-form-field>
      </fieldset>
`,

})


class FormFieldTestComponent {
   @ViewChild('templateDrivenForm') templateDrivenForm: NgForm;
   @ViewChild('formField') formField: any;
   @Input() schema: any;
   @Input() formGroup: FormGroup =  new FormGroup({'input': new FormControl()});
   @Input() name: string;
   @Input() model: any = '';
   @Input() qaTag: string;
   @Input() isRequired: boolean;
}

let fixture: ComponentFixture<FormFieldTestComponent>;
let component: FormFieldTestComponent;

fdescribe('StFormField', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, StFormFieldModule, ReactiveFormsModule],
         declarations: [FormFieldTestComponent]
      })
         .overrideComponent(StFormFieldComponent, {
            set:
            { changeDetection: ChangeDetectionStrategy.Default }
         })
         .compileComponents();  // compile template and css


   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(FormFieldTestComponent);
      component = fixture.componentInstance;
   });

   describe('should be able to render inputs with their validations', () => {

      fdescribe('number input', () => {
         let input: HTMLInputElement;
         let numberInputProperty: any;
         let minValue: number;
         let maxValue: number;

         beforeEach(() => {
            numberInputProperty = JSON_SCHEMA.properties.genericNumberInput;
            minValue = numberInputProperty.minimum;
            maxValue = numberInputProperty.maximum;
            component.name = 'genericNumberInput';
            component.schema = { key: 'genericNumberInput', value: numberInputProperty };
            component.isRequired = true;
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

         fit('required input', () => {
            fixture.whenStable().then(() => {

               component.isRequired = true;

            fixture.detectChanges();
            input = fixture.nativeElement.querySelector('#genericNumberInput');
            fixture.changeDetectorRef.markForCheck();
            fixture.detectChanges();

            input.focus();
            input.value = '';
            input.dispatchEvent(new Event('input'));
            input.blur();

            fixture.detectChanges();
            fixture.changeDetectorRef.markForCheck();

            console.log(fixture.nativeElement)

            expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).not.toBeNull();
            expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('This field is required');

            //
            // input.focus();
            // input.value = '7';
            // input.dispatchEvent(new Event('input'));
            // input.blur();
            //
            // fixture.detectChanges();
            //
            // expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
            });
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
// //    //
// //    //       describe('number has to be between a certain range', () => {
// //    //
// //    //          it('if minimum is exclusive, when user puts a value equal or minor than the minimum, validation error is displayed', () => {
// //    //             numberInputProperty.exclusiveMinimum = true;
// //    //             fixture.detectChanges();
// //    //
// //    //
// //    //             input = fixture.nativeElement.querySelector('#genericNumberInput');
// //    //
// //    //             input.focus();
// //    //             // minor than the minimum
// //    //             input.value = (minValue - 1).toString();
// //    //             input.dispatchEvent(new Event('input'));
// //    //             input.blur();
// //    //
// //    //             fixture.detectChanges();
// //    //
// //    //
// //    //             expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be higher than ' + (minValue + 1));
// //    //
// //    //             // equal to the minimum
// //    //             input.value = minValue.toString();
// //    //             input.dispatchEvent(new Event('input'));
// //    //
// //    //             fixture.detectChanges();
// //    //
// //    //             expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be higher than ' + (minValue + 1));
// //    //          });
// //    //
// //    //          it('if minimum is not exclusive, when user puts a value equal to the minimum, input will be valid', () => {
// //    //             numberInputProperty.exclusiveMinimum = false;
// //    //             fixture.detectChanges();
// //    //
// //    //             input = fixture.nativeElement.querySelector('#genericNumberInput');
// //    //
// //    //             input.focus();
// //    //
// //    //             // minor than the minimum
// //    //             input.value = minValue.toString();
// //    //             input.dispatchEvent(new Event('input'));
// //    //
// //    //             input.blur();
// //    //
// //    //             fixture.detectChanges();
// //    //
// //    //
// //    //             expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
// //    //          });
// //    //
// //    //          it('if maximum is exclusive, when user puts a value equal or major than the maximum, validation error is displayed', () => {
// //    //             numberInputProperty.exclusiveMaximum = true;
// //    //             fixture.detectChanges();
// //    //
// //    //             input = fixture.nativeElement.querySelector('#genericNumberInput');
// //    //
// //    //             input.focus();
// //    //             // major than the maximum
// //    //             input.value = (maxValue + 1).toString();
// //    //             input.dispatchEvent(new Event('input'));
// //    //             input.blur();
// //    //
// //    //             fixture.detectChanges();
// //    //
// //    //             expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be minor than ' + (maxValue - 1));
// //    //
// //    //             // equal to the maximum
// //    //             input.value = maxValue.toString();
// //    //             input.dispatchEvent(new Event('input'));
// //    //             fixture.detectChanges();
// //    //
// //    //
// //    //             expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be minor than ' + (maxValue - 1));
// //    //          });
// //    //
// //    //          it('if maximum is not exclusive, when user puts a value equal to the maximum, input will be valid', () => {
// //    //             numberInputProperty.exclusiveMaximum = false;
// //    //             fixture.detectChanges();
// //    //             input = fixture.nativeElement.querySelector('#genericNumberInput');
// //    //
// //    //             input.focus();
// //    //
// //    //             // minor than the minimum
// //    //             input.value = maxValue.toString();
// //    //             input.dispatchEvent(new Event('input'));
// //    //
// //    //             input.blur();
// //    //
// //    //             fixture.detectChanges();
// //    //
// //    //             expect(fixture.nativeElement.querySelector('#genericNumberInput').parentNode.parentNode.querySelector('.st-input-error-layout span')).toBeNull();
// //    //          });
// //    //       });
// //    //
// //    //       it('When form control is updated externally, it is updated', () => {
// //    //          component.templateDrivenForm.controls['genericNumber'].setValue(5);
// //    //
// //    //          fixture.detectChanges();
// //    //
// //    //          input = fixture.nativeElement.querySelector('#genericNumberInput');
// //    //
// //    //          expect(input.value).toBe('5');
// //    //       });
// //    //    });
// //    //
// //    //    describe('text input', () => {
// //    //       let input: HTMLInputElement;
// //    //       let textInputProperty: any;
// //    //       let minLength: number;
// //    //       let maxLength: number;
// //    //
// //    //       beforeEach(() => {
// //    //          textInputProperty = JSON_SCHEMA.properties.genericTextInput;
// //    //          minLength = textInputProperty.minLength;
// //    //          maxLength = textInputProperty.maxLength;
// //    //          propertySchema = { key: 'genericTextInput', value: textInputProperty };
// //    //          fixture.detectChanges();
// //    //          input = fixture.nativeElement.querySelector('#genericTextInput');
// //    //       });
// //    //       it('required validation', () => {
// //    //          required = true;
// //    //          fixture.detectChanges();
// //    //          input.focus();
// //    //          input.value = '';
// //    //          input.dispatchEvent(new Event('input'));
// //    //
// //    //          input.blur();
// //    //
// //    //          fixture.detectChanges();
// //    //
// //    //          expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('This field is required');
// //    //
// //    //          input.value = 'aa';
// //    //          input.dispatchEvent(new Event('input'));
// //    //          input.blur();
// //    //
// //    //          fixture.detectChanges();
// //    //
// //    //
// //    //          expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
// //    //       });
// //    //
// //    //       it('min length validation', () => {
// //    //          input.focus();
// //    //
// //    //          input.value = 'a'.repeat(minLength - 1);
// //    //          input.dispatchEvent(new Event('input'));
// //    //
// //    //          input.blur();
// //    //
// //    //          fixture.detectChanges();
// //    //
// //    //
// //    //          expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The field min length is ' + minLength);
// //    //
// //    //          input.value = 'a'.repeat(minLength);
// //    //          input.dispatchEvent(new Event('input'));
// //    //
// //    //          fixture.detectChanges();
// //    //
// //    //
// //    //          expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
// //    //       });
// //    //
// //    //       it('max length validation', () => {
// //    //          input.focus();
// //    //
// //    //          input.value = 'a'.repeat(maxLength + 1);
// //    //          input.dispatchEvent(new Event('input'));
// //    //
// //    //          input.blur();
// //    //
// //    //          fixture.detectChanges();
// //    //
// //    //          expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The field max length is ' + maxLength);
// //    //
// //    //          input.focus();
// //    //          input.value = 'a'.repeat(maxLength);
// //    //          input.dispatchEvent(new Event('input'));
// //    //
// //    //          input.blur();
// //    //          fixture.detectChanges();
// //    //
// //    //
// //    //          expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
// //    //       });
// //    //
// //    //       it('pattern validation', () => {
// //    //          input.focus();
// //    //          input.value = 'bbbb';
// //    //          input.dispatchEvent(new Event('input'));
// //    //          input.blur();
// //    //
// //    //          fixture.detectChanges();
// //    //
// //    //          expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('Invalid value');
// //    //
// //    //          input.focus();
// //    //          input.value = 'aa';
// //    //          input.dispatchEvent(new Event('input'));
// //    //          input.blur();
// //    //
// //    //          fixture.detectChanges();
// //    //
// //    //          expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
// //    //       });
// //    //
// //    //       it('When model is updated externally, it is updated', () => {
// //    //          component.templateDrivenForm.controls[propertySchema.key].setValue('aa');
// //    //
// //    //          fixture.detectChanges();
// //    //
// //    //          input = fixture.nativeElement.querySelector('#genericTextInput');
// //    //
// //    //          expect(input.value).toBe('aa');
// //    //       });
// //    //    });
// //    //
// //    // });
// //    //
// //    // describe('should be able to render switches with their validations', () => {
// //    //    let switchElement: HTMLInputElement;
// //    //    let booleanProperty: any;
// //    //
// //    //    beforeEach(() => {
// //    //       booleanProperty = JSON_SCHEMA.properties.boolean;
// //    //       propertySchema = { key: 'boolean', value: booleanProperty };
// //    //       fixture.detectChanges();
// //    //
// //    //       switchElement = fixture.nativeElement.querySelector('#boolean-input');
// //    //    });
// //    //
// //    //    it('label is displayed', () => {
// //    //       let label: HTMLElement = fixture.nativeElement.querySelector('.st-label');
// //    //       expect(label.innerHTML).toContain(booleanProperty.title);
// //    //    });
// //    //
// //    //    it('tooltip is displayed if description exits', () => {
// //    //       let tooltip: HTMLElement = fixture.nativeElement.querySelector('.st-tooltip');
// //    //       expect(tooltip.getAttribute('title')).toBe(booleanProperty.description);
// //    //    });
// //    //
// //    //    it('icon for opening tooltip is not displayed if description does not exit', () => {
// //    //       propertySchema = { key: 'boolean', value: { type: 'boolean', description: undefined } };
// //    //       fixture.detectChanges();
// //    //
// //    //       expect(fixture.nativeElement.querySelector('#boolean-label-tooltip')).toBeNull();
// //    //    });
// //    //
// //    //    it('if schema contains a default value, switch has to be initialized with it', () => {
// //    //       expect(switchElement.checked).toBe(booleanProperty.default);
// //    //    });
// //    //
// //    //    it('if switch is disabled, when user clicks on it, it does not change', () => {
// //    //       component.templateDrivenForm.controls[propertySchema.key].disable();
// //    //       let previousValue: boolean = Boolean(fixture.nativeElement.querySelector('#boolean-input').checked);
// //    //       fixture.detectChanges();
// //    //
// //    //       fixture.nativeElement.querySelector('#boolean-input').click();
// //    //       fixture.detectChanges();
// //    //
// //    //       expect(Boolean(fixture.nativeElement.querySelector('#boolean-input').checked)).toBe(previousValue);
// //    //    });
// //    //
// //    //    it('if switch is enabled, when user clicks on it, it has to change', () => {
// //    //       component.templateDrivenForm.controls[propertySchema.key].enable();
// //    //       fixture.detectChanges();
// //    //
// //    //       let previousValue: boolean = Boolean(switchElement.checked);
// //    //       switchElement.click();
// //    //
// //    //       expect(Boolean(switchElement.checked)).not.toBe(previousValue);
// //    //       expect(Boolean(switchElement.checked)).toBe(!previousValue);
// //    //    });
// //    });
// // });
// // });
// //
//
// //
// //
// let component: StFormFieldComponent;
// let fixture: ComponentFixture<StFormFieldComponent>;
//
//
// fdescribe('StFormFieldComponent', () => {
//
//    beforeEach(async(() => {
//       TestBed.configureTestingModule({
//          imports: [FormsModule, ReactiveFormsModule, StInputModule, StSwitchModule, PipesModule, StFormDirectiveModule],
//          declarations: [StFormFieldComponent],
//          providers: [NgForm, ControlContainer, { provide: ControlContainer, useExisting: NgForm }]
//       })
//          .compileComponents();  // compile template and css
//    }));
//
//
//    beforeEach(() => {
//       fixture = TestBed.createComponent(StFormFieldComponent);
//       component = fixture.componentInstance;
//    });
//
//    it('', () => {
//       expect(component).toBeDefined();
//    });
//
//
//    fdescribe('number input', () => {
//       let input: HTMLInputElement;
//       let numberInputProperty: any;
//       let minValue: number;
//       let maxValue: number;
//
//       beforeEach(() => {
//          numberInputProperty = JSON_SCHEMA.properties.genericNumberInput;
//          minValue = numberInputProperty.minimum;
//          maxValue = numberInputProperty.maximum;
//          component.name = 'genericNumberInput';
//          component.qaTag = 'genericNumberInput';
//          component.schema = { key: 'genericNumberInput', value: numberInputProperty };
//       });
//
//       it('if user tries to type text, input value is not updated', () => {
//          fixture.whenStable().then(() => {
//             fixture.detectChanges();
//             input = fixture.nativeElement.querySelector('#genericNumberInput');
//             input.focus();
//             input.value = 'fake test';
//             input.blur();
//
//             fixture.detectChanges();
//
//             expect(input.value).toBe('');
//          })
//       });
//
//       fit('required input', () => {
//          component.required = true;
//
//          fixture.detectChanges();
//          input = fixture.nativeElement.querySelector('#genericNumberInput');
//          fixture.changeDetectorRef.markForCheck();
//          fixture.detectChanges();
//
//          input.focus();
//          input.value = '';
//          input.dispatchEvent(new Event('input'));
//          input.blur();
//
//          console.log(input);
//
//
//          fixture.detectChanges();
//
//          expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('This field is required');
//          //
//          // input.focus();
//          // input.value = '7';
//          // input.dispatchEvent(new Event('input'));
//          // input.blur();
//          //
//          // fixture.detectChanges();
//          //
//          // expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
//       });
//
//       it('min number validation', () => {
//          fixture.detectChanges();
//          input = fixture.nativeElement.querySelector('#genericNumberInput');
//          input.focus();
//          input.value = (minValue - 1).toString();
//          input.dispatchEvent(new Event('input'));
//          input.blur();
//
//          fixture.detectChanges();
//
//          expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be higher than ' + minValue);
//
//          input.value = minValue.toString();
//          input.dispatchEvent(new Event('input'));
//
//          fixture.detectChanges();
//
//          expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
//       });
//
//       it('max number validation', () => {
//          fixture.detectChanges();
//          input = fixture.nativeElement.querySelector('#genericNumberInput');
//          input.value = (maxValue + 1).toString();
//          input.dispatchEvent(new Event('input'));
//
//          input.blur();
//
//          fixture.detectChanges();
//
//
//          expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be minor than ' + maxValue);
//
//          input.value = maxValue.toString();
//          input.dispatchEvent(new Event('input'));
//
//          fixture.detectChanges();
//
//
//          expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
//       });
//       //
//       //       describe('number has to be between a certain range', () => {
//       //
//       //          it('if minimum is exclusive, when user puts a value equal or minor than the minimum, validation error is displayed', () => {
//       //             numberInputProperty.exclusiveMinimum = true;
//       //             fixture.detectChanges();
//       //
//       //
//       //             input = fixture.nativeElement.querySelector('#genericNumberInput');
//       //
//       //             input.focus();
//       //             // minor than the minimum
//       //             input.value = (minValue - 1).toString();
//       //             input.dispatchEvent(new Event('input'));
//       //             input.blur();
//       //
//       //             fixture.detectChanges();
//       //
//       //
//       //             expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be higher than ' + (minValue + 1));
//       //
//       //             // equal to the minimum
//       //             input.value = minValue.toString();
//       //             input.dispatchEvent(new Event('input'));
//       //
//       //             fixture.detectChanges();
//       //
//       //             expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be higher than ' + (minValue + 1));
//       //          });
//       //
//       //          it('if minimum is not exclusive, when user puts a value equal to the minimum, input will be valid', () => {
//       //             numberInputProperty.exclusiveMinimum = false;
//       //             fixture.detectChanges();
//       //
//       //             input = fixture.nativeElement.querySelector('#genericNumberInput');
//       //
//       //             input.focus();
//       //
//       //             // minor than the minimum
//       //             input.value = minValue.toString();
//       //             input.dispatchEvent(new Event('input'));
//       //
//       //             input.blur();
//       //
//       //             fixture.detectChanges();
//       //
//       //
//       //             expect(fixture.nativeElement.querySelector('.st-input-error-layout span')).toBeNull();
//       //          });
//       //
//       //          it('if maximum is exclusive, when user puts a value equal or major than the maximum, validation error is displayed', () => {
//       //             numberInputProperty.exclusiveMaximum = true;
//       //             fixture.detectChanges();
//       //
//       //             input = fixture.nativeElement.querySelector('#genericNumberInput');
//       //
//       //             input.focus();
//       //             // major than the maximum
//       //             input.value = (maxValue + 1).toString();
//       //             input.dispatchEvent(new Event('input'));
//       //             input.blur();
//       //
//       //             fixture.detectChanges();
//       //
//       //             expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be minor than ' + (maxValue - 1));
//       //
//       //             // equal to the maximum
//       //             input.value = maxValue.toString();
//       //             input.dispatchEvent(new Event('input'));
//       //             fixture.detectChanges();
//       //
//       //
//       //             expect(fixture.nativeElement.querySelector('.st-input-error-layout span').innerHTML).toBe('The number has to be minor than ' + (maxValue - 1));
//       //          });
//       //
//       //          it('if maximum is not exclusive, when user puts a value equal to the maximum, input will be valid', () => {
//       //             numberInputProperty.exclusiveMaximum = false;
//       //             fixture.detectChanges();
//       //             input = fixture.nativeElement.querySelector('#genericNumberInput');
//       //
//       //             input.focus();
//       //
//       //             // minor than the minimum
//       //             input.value = maxValue.toString();
//       //             input.dispatchEvent(new Event('input'));
//       //
//       //             input.blur();
//       //
//       //             fixture.detectChanges();
//       //
//       //             expect(fixture.nativeElement.querySelector('#genericNumberInput').parentNode.parentNode.querySelector('.st-input-error-layout span')).toBeNull();
//       //          });
//       //       });
//       //
//       //       it('When form control is updated externally, it is updated', () => {
//       //          component.templateDrivenForm.controls['genericNumber'].setValue(5);
//       //
//       //          fixture.detectChanges();
//       //
//       //          input = fixture.nativeElement.querySelector('#genericNumberInput');
//       //
//       //          expect(input.value).toBe('5');
//       //       });
//       //    });
      });
   });
});
