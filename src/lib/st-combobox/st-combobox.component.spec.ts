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
import { Component, DebugElement, SimpleChanges, SimpleChange } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { StFormLabelModule } from '../utils/egeo-form/st-form-label/st-form-label.module';
import { StFormLabelStatus } from '../utils/egeo-form/st-form-label/st-form-label-status.enum';
import { StDropdownMenuModule } from '../st-dropdown-menu/st-dropdown-menu.module';
import { StPopModule } from '../st-pop/st-pop.module';
import { StComboboxComponent } from './st-combobox.component';

import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';

let comboInput: HTMLInputElement;
let options: StDropDownMenuItem[] = [
   { label: 'label1', value: 'value1' },
   { label: 'label2', value: 'value2' },
   { label: 'label3', value: 'value3' },
   { label: 'label4', value: 'value4' },
   { label: 'label5', value: 'value5' },
   { label: 'label6', value: 'value6' },
   { label: 'label7', value: 'value7' },
   { label: 'label8', value: 'value8' },
   { label: 'label9', value: 'value9' },
   { label: 'label10', value: 'value10' }
];

describe('StCombobox', () => {

   let component: StComboboxComponent;
   let fixture: ComponentFixture<StComboboxComponent>;
   let compiled: any;
   let de: DebugElement;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StFormLabelModule, StDropdownMenuModule, StPopModule],
         declarations: [StComboboxComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StComboboxComponent);
      comboInput = fixture.debugElement.query(By.css('input')).nativeElement;
      component = fixture.componentInstance;
      compiled = fixture.debugElement.nativeElement;

   });

   it('st-combobox should have a placeholder', () => {
      let placeholder: string = 'Select option';
      component.placeholder = placeholder;
      fixture.detectChanges();
      expect(comboInput.placeholder).toEqual(placeholder);
   });

   it('st-combobox should be init with options', () => {
      component.options = options;
      fixture.detectChanges();
      expect(component.hasOptions()).toBeTruthy();
   });

   it('st-combobox should be init by default with empty options', () => {
      fixture.detectChanges();
      expect(component.hasOptions()).toBeFalsy();
      expect(component.options).toEqual([]);
   });

   it('st-combobox should change disabled status', () => {
      fixture.detectChanges();
      expect(component.disabled).toBeFalsy();

      component.setDisabledState(true);
      fixture.detectChanges();
      expect(component.disabled).toBeTruthy();

      component.setDisabledState(false);
      fixture.detectChanges();
      expect(component.disabled).toBeFalsy();
   });

   it('st-combobox should change value when come from outside', () => {
      fixture.detectChanges();
      expect(component.selectedValue).toBeUndefined();

      component.writeValue(options[2]);
      fixture.detectChanges();
      expect(component.selectedValue).toBeDefined();
      expect(component.selectedValue).toEqual(options[2]);
   });

   it('st-combobox should register onChange function', () => {
      fixture.detectChanges();
      expect(component.onChange).toBeUndefined();

      let fakeFunction: (_: any) => void = jasmine.createSpy('fake');

      component.registerOnChange(fakeFunction);
      component.onChange(options[1]);
      fixture.detectChanges();
      expect(fakeFunction).toHaveBeenCalled();
      expect(fakeFunction).toHaveBeenCalledWith(options[1]);
   });

   it('st-combobox should register onTouched function', () => {
      fixture.detectChanges();
      expect(component.onTouched).toBeUndefined();

      let fakeFunction: () => void = jasmine.createSpy('fake');

      component.registerOnTouched(fakeFunction);
      component.onTouched();
      fixture.detectChanges();
      expect(fakeFunction).toHaveBeenCalled();
   });

   it('st-combobox should write value when update forceValidations input', () => {
      spyOn(component, 'writeValue').and.callThrough();
      fixture.detectChanges();
      expect(component.writeValue).not.toHaveBeenCalled();

      let changeOther: SimpleChanges = { 'options': new SimpleChange([], [], true) };
      component.ngOnChanges(changeOther);
      fixture.detectChanges();
      expect(component.writeValue).not.toHaveBeenCalled();

      let change: SimpleChanges = { 'forceValidations': new SimpleChange(false, true, true) };
      component.ngOnChanges(change);
      fixture.detectChanges();
      expect(component.writeValue).toHaveBeenCalled();
   });

   it('st-combobox should change option and notify', () => {
      component.options = options;
      fixture.detectChanges();

      let fakeOnChange: (_: any) => void = jasmine.createSpy('fakeOnChange');
      let fakeOnTouched: () => void = jasmine.createSpy('fakeOnTouched');

      component.registerOnChange(fakeOnChange);
      component.registerOnTouched(fakeOnTouched);
      fixture.detectChanges();

      expect(component.selectedValue).toBeUndefined();
      expect(component.onChange).not.toHaveBeenCalled();
      expect(component.onTouched).not.toHaveBeenCalled();

      component.changeOption(options[2]);
      fixture.detectChanges();

      expect(component.selectedValue).toBeDefined();
      expect(component.selectedValue).toEqual(options[2]);
      expect(component.onChange).toHaveBeenCalled();
      expect(component.onChange).toHaveBeenCalledWith(options[2]);
      expect(component.onTouched).toHaveBeenCalled();
   });

   it('st-combobox should not open menu when is disabled', () => {
      spyOn(component, 'onClickButton').and.callThrough();
      component.options = options;
      fixture.detectChanges();
      expect(component.width).toEqual('0px');

      component.setDisabledState(true);
      fixture.detectChanges();
      comboInput.click();
      fixture.detectChanges();
      expect(component.onClickButton).toHaveBeenCalled();
      expect(component.onClickButton).toHaveBeenCalledTimes(1);
      expect(component.width).toEqual('0px');
      expect(component.isActive).toBeFalsy();
   });

   it('st-combobox should open menu', () => {
      spyOn(component, 'onClickButton').and.callThrough();
      component.options = options;
      fixture.detectChanges();
      expect(component.width).toEqual('0px');

      fixture.detectChanges();
      comboInput.click();
      fixture.detectChanges();
      expect(component.onClickButton).toHaveBeenCalled();
      expect(component.onClickButton).toHaveBeenCalledTimes(1);
      expect(component.width).not.toEqual('0px');
      expect(component.isActive).toBeTruthy();
   });

   it('st-combobox should change between normal and disable StFormLabelStatus', () => {
      component.options = options;
      fixture.detectChanges();
      expect(component.getLabelStatus()).toEqual(StFormLabelStatus.FOCUS);

      component.setDisabledState(true);
      fixture.detectChanges();
      expect(component.getLabelStatus()).toEqual(StFormLabelStatus.DISABLED);
   });

   it('st-combobox should change between error and disable StFormLabelStatus', () => {
      spyOn(component, 'showError').and.returnValue(true);
      component.options = options;
      fixture.detectChanges();

      expect(component.getLabelStatus()).toEqual(StFormLabelStatus.ERROR);

      component.setDisabledState(true);
      fixture.detectChanges();
      expect(component.getLabelStatus()).toEqual(StFormLabelStatus.DISABLED);
   });


   it('st-combobox should return error only in certain cases', () => {
      component.options = options;

      fixture.detectChanges();
      expect(component.showError()).toBeFalsy();

      component.errorMessage = '';
      fixture.detectChanges();
      expect(component.showError()).toBeFalsy();

      component.errorMessage = 'error';
      fixture.detectChanges();
      expect(component.showError()).toBeFalsy();

      component.forceValidations = true;
      fixture.detectChanges();
      expect(component.showError()).toBeTruthy();

      component.onFocus(new Event('focus'));
      fixture.detectChanges();
      expect(component.showError()).toBeFalsy();

      component.setDisabledState(true);
      fixture.detectChanges();
      expect(component.showError()).toBeFalsy();
   });

   it('st-combobox should change classes when error', () => {
      fixture.detectChanges();
      expect(component.getBarType()).toEqual('st-input-normal-bar sth-input-normal-bar');

      component.errorMessage = 'error';
      component.forceValidations = true;
      fixture.detectChanges();
      expect(component.getBarType()).toEqual('st-input-error-bar sth-input-error-bar');
   });

   it('st-combobox should focus input', () => {
      component.errorMessage = 'error';
      component.forceValidations = true;
      fixture.detectChanges();
      expect(component.showError()).toBeTruthy();

      component.onFocus(new Event('focus'));
      fixture.detectChanges();
      expect(component.showError()).toBeFalsy();

      component.onFocusOut(new Event('focusout'));
      fixture.detectChanges();
      expect(component.showError()).toBeTruthy();
   });

   it('st-combobox should validate with default message', () => {
      let control: FormControl = new FormControl(undefined, [Validators.required]);
      component.selectedValue = options[2];
      component.forceValidations = true;
      control.setValue(options[2]);

      fixture.detectChanges();

      component.validate(control);
      expect(component.showError()).toBeFalsy();

      // Third if in checkValidations
      control.setValue(undefined);
      fixture.detectChanges();
      component.validate(control);
      expect(component.showError()).toBeTruthy();

      // Second if in checkValidations
      control.setValue({ value: 'value' });
      fixture.detectChanges();
      component.validate(control);
      expect(component.showError()).toBeTruthy();

      control.setValue({ label: 'test' });
      fixture.detectChanges();
      component.validate(control);
      expect(component.showError()).toBeTruthy();

      control.setValue('test');
      fixture.detectChanges();
      component.validate(control);
      expect(component.showError()).toBeTruthy();

      // First if in checkValidations
      control.setValue({});
      fixture.detectChanges();
      component.validate(control);
      expect(component.showError()).toBeTruthy();
   });

   it('st-combobox should validate with custom message', () => {
      let control: FormControl = new FormControl();
      component.selectedValue = options[2];
      component.forceValidations = true;
      component.errorRequiredMessage = 'This field is required';
      control.setValue(options[2]);

      fixture.detectChanges();
      component.validate(control);
      expect(component.showError()).toBeFalsy();

      control.setValue(options[2]);
      control.setErrors({ 'required': true });
      fixture.detectChanges();
      component.validate(control);
      expect(component.showError()).toBeTruthy();

      control.setValue(undefined);
      fixture.detectChanges();
      component.validate(control);
      expect(component.showError()).toBeTruthy();

      control.setValue(options[2]);
      control.setErrors({ 'custom': true });
      fixture.detectChanges();
      component.validate(control);
      expect(component.showError()).toBeTruthy();

      control.setValue(undefined);
      control.setErrors({ 'required': true });
      fixture.detectChanges();
      component.validate(control);
      expect(component.showError()).toBeTruthy();
   });

});





