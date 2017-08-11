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
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { StFormLabelModule } from '../utils/egeo-form/st-form-label/st-form-label.module';
import { StSwitchComponent } from './st-switch.component';

let fixture: ComponentFixture<StSwitchComponent>;
let component: StSwitchComponent;
let model: boolean = true;
let formGroup: FormGroup;

describe('StSwitchComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StFormLabelModule],
         declarations: [StSwitchComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      formGroup = new FormGroup(
         { requiredSwitch: new FormControl({ value: this.model, disabled: false }, Validators.required) }
      );

      fixture = TestBed.createComponent(StSwitchComponent);
      component = fixture.componentInstance;
      component.stModel = false;
      component.qaTag = 'qa tag';
   });

   it('if model is not introduced as input, it throws an error', () => {
      component.stModel = undefined;
      try {
         fixture.detectChanges();
         expect(component.stModel).toThrow();
      } catch (error) {
         expect(error.message).toContain('st-switch-component: field stModel is a required field');
      }
   });

   it('qa tag is added as id to the clickable element', () => {
      let qaTag = 'fakeQATag';
      component.qaTag = qaTag;
      fixture.detectChanges();
      fixture.changeDetectorRef.markForCheck();

      let clickableElement: HTMLElement = fixture.nativeElement.querySelector('#' + qaTag);

      expect(clickableElement).toBeDefined();
      expect(clickableElement.click).toBeDefined();
   });

   it('qa tag for the label is generated using the qa tag', () => {
      let qaTag = 'fakeQATag';
      component.qaTag = qaTag;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('#' + qaTag + '-label')).not.toBeNull();
   });

   describe('Should update its class when disabled attribute changes', () => {
      beforeEach(() => {
         component.stModel = model;
      });

      it('if it is disabled, class "st-switch--disabled" has to be added to toggle', () => {
         component.setDisabledState(true);
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('.st-switch__toggle').classList).toContain('st-switch--disabled');
      });

      it('if it is enabled, class "st-switch--disabled" hos to be removed from toggle', () => {
         component.setDisabledState(false);
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('.st-switch__toggle').classList).not.toContain('st-switch--disabled');
      });
   });

   describe('should listen any external change and update internal form control and model', () => {
      let newValue: boolean = false;
      beforeEach(() => {
         component.writeValue(newValue);
      });

      it('model is updated with new value', () => {
         expect(component.stModel).toBe(newValue);
      });
   });

   describe('when user clicks on toggle', () => {
      beforeEach(() => {
         spyOn(component.change, 'emit');
         component.stModel = false;
      });
      it('if switch is not disabled, model has to change', () => {
         component.disabled = false;
         // put switch to off
         component.stModel = false;
         fixture.detectChanges();

         let switchBox: HTMLDivElement = fixture.nativeElement.querySelector('.st-switch__toggle');

         switchBox.click();
         fixture.detectChanges();

         expect(component.stModel).toBeTruthy();
         expect(component.change.emit).toHaveBeenCalledWith(true);
         expect(switchBox.classList).toContain('st-switch--on');

         switchBox.click();
         fixture.detectChanges();

         expect(component.stModel).toBeFalsy();
         expect(component.change.emit).toHaveBeenCalledWith(false);
         expect(switchBox.classList).toContain('st-switch--off');
      });

      it('if switch is disabled, no changes are executed', () => {
         component.disabled = true;
         // put switch to off
         component.stModel = false;
         fixture.detectChanges();

         let switchBox: HTMLDivElement = fixture.nativeElement.querySelector('.st-switch__toggle');
         switchBox.click();
         fixture.detectChanges();

         expect(component.stModel).toBeFalsy();
         expect(component.change.emit).not.toHaveBeenCalled();
         expect(switchBox.classList).toContain('st-switch--off');

         switchBox.click();
         fixture.detectChanges();

         expect(component.stModel).toBeFalsy();
         expect(component.change.emit).not.toHaveBeenCalled();
         expect(switchBox.classList).toContain('st-switch--off');
      });
   });

   describe('label is positioned according to the input labelPosition', () => {
      beforeEach(() => {
         component.stModel = false;
      });
      it('label is placed on top, when labelPosition is "top"', () => {
         component.labelPosition = 'top';
         fixture.detectChanges();
         let label: HTMLElement = fixture.nativeElement.querySelector('.st-form-label__label');

         expect(label.classList).toContain('st-form-label__label--top');
      });

      it('label is placed on the left, when labelPosition is "left"', () => {
         component.labelPosition = 'left';
         fixture.detectChanges();
         let label: HTMLElement = fixture.nativeElement.querySelector('.st-form-label__label');

         expect(label.classList).toContain('st-form-label__label--left');
      });

      it('label is placed on the right, when labelPosition is "right"', () => {
         component.labelPosition = 'right';
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let label: HTMLElement = fixture.nativeElement.querySelector('.st-form-label__label');

         expect(label.classList).toContain('st-form-label__label--right');
      });

   });

   it('Callback function is initialized on registerOnChange function in order to be called when there is a change', () => {
      let callbackFunction = jasmine.createSpy('callbackFunction');
      component.registerOnChange(callbackFunction);
      component.stModel = false;
      fixture.detectChanges();

      let switchBox: HTMLDivElement = fixture.nativeElement.querySelector('.st-switch__toggle');
      switchBox.click();

      expect(callbackFunction).toHaveBeenCalledWith(true);
   });

   it('If model is changed from outside, switch is updated', () => {
      spyOn(component.change, 'emit').and.callThrough();
      model = true;
      component.stModel = model;
      fixture.detectChanges();
      fixture.changeDetectorRef.markForCheck();

      let switchBox: HTMLDivElement = fixture.nativeElement.querySelector('.st-switch__toggle');

      expect(component.stModel).toBeTruthy();
      expect(switchBox.classList).toContain('st-switch--on');

      model = false;
      component.stModel = model;
      fixture.detectChanges();
      fixture.changeDetectorRef.markForCheck();

      switchBox = fixture.nativeElement.querySelector('.st-switch__toggle');

      expect(component.stModel).toBeFalsy();
      expect(switchBox.classList).toContain('st-switch--off');
   });

});
