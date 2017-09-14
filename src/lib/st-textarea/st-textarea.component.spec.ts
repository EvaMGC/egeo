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
import { Component, DebugElement, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { StTextareaComponent } from './st-textarea.component';
import { StTextareaError } from './st-textarea.error.model';
import { StTextareaModule } from './st-textarea.module';
import { StLabelModule } from '../st-label/st-label.module';

let component: StTextareaComponent;
let fixture: ComponentFixture<StTextareaComponent>;
let textarea: HTMLInputElement;

describe('StTextareaComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StLabelModule],
         declarations: [StTextareaComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTextareaComponent);
      textarea = fixture.nativeElement.querySelector('textarea');
      component = fixture.componentInstance;
      component.qaTag = 'test qaTag';
   });

   it('Textarea should have a placeholder', () => {
      component.placeholder = 'Placeholder sample';
      fixture.detectChanges();
      expect(textarea.getAttribute('placeholder')).toContain('Placeholder sample');
   });

   it('Textarea should be disabled', () => {
      fixture.detectChanges();

      component.setDisabledState(true);
      fixture.detectChanges();
      expect(textarea.disabled).toBe(true);

      component.setDisabledState(false);
      fixture.detectChanges();
      expect(textarea.disabled).toBe(false);
   });

   it('Textarea should be enabled', () => {
      fixture.detectChanges();
      component.setDisabledState(false);
      expect(textarea.disabled).toBe(false);
   });

   it('Textarea should be focused naturally', () => {
      fixture.detectChanges();
      textarea.focus();
      expect(component.focus).toBe(true);
   });

   // TODO: Review this test because something is wrong
   it('Textarea should be focused as default', async(() => {
      fixture.detectChanges();
      component.isFocused = true;
      fixture.whenStable().then(() => {
         component.ngAfterViewInit();
         expect(component.focus).toBe(true);
      });
   }));
});

@Component({
   template: `
      <form [formGroup]="reactiveForm" novalidate autocomplete="off" (ngSubmit)="onSubmitReactiveForm()" class="col-md-6">
         <div class="form-group">
            <st-textarea
               label="Description"
               placeholder="Module description"
               [forceValidations]="forceValidations"
               [errors]="errors"
               name="description"
               qaTag="description-input"
               formControlName="description"
               rows="5"
               cols="50"
               wrap="soft">
            </st-textarea>
         </div>
      </form>
      `
})
class FormReactiveComponent implements OnInit {
   public forceValidations: boolean;
   public reactiveForm: FormGroup;
   public model: any = {
      name: 'Egeo',
      description: '',
      components: 10
   };

   public errors: StTextareaError = {
      generic: 'Error',
      required: 'This field is required'
   };

   constructor(private _fb: FormBuilder) { }

   ngOnInit(): void {
      this.reactiveForm = this._fb.group({
         description: [
            this.model.description,
            [
               Validators.required
            ]
         ]
      });
   }

   disableInput(): void {
      this.reactiveForm.get('description').disable();
   }

   enableInput(): void {
      this.reactiveForm.get('description').enable();
   }

   onSubmitReactiveForm(): void { }
}

let reactiveFixture: ComponentFixture<FormReactiveComponent>;
let reactiveComp: FormReactiveComponent;

describe('StTextareaComponent in reactive form', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StTextareaModule],
         declarations: [FormReactiveComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      reactiveFixture = TestBed.createComponent(FormReactiveComponent);
      reactiveComp = reactiveFixture.componentInstance;
   });

   afterEach(() => {
      reactiveFixture.destroy();
   });

   it('should be init correct', () => {
      reactiveFixture.detectChanges();
      let htmlInput: HTMLInputElement = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;

      expect(htmlInput.placeholder).toBe('Module description');
   });

   it('should notify custom errors', () => {
      reactiveComp.forceValidations = false;
      reactiveFixture.detectChanges();
      let htmlInput: HTMLInputElement = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;

      reactiveComp.forceValidations = true;
      reactiveFixture.detectChanges();

      // Required
      let errorMessage: DebugElement = reactiveFixture.debugElement.query(By.css('.st-textarea-error-message'));
      expect(errorMessage).toBeDefined();
      expect(errorMessage.nativeElement).toBeDefined();
      expect((<HTMLSpanElement>errorMessage.nativeElement).textContent).toEqual('This field is required');
   });

   it('should notify generic errors', () => {
      let genericError: string = 'Generic Error';
      reactiveComp.forceValidations = false;
      reactiveComp.errors = { generic: genericError };
      reactiveFixture.detectChanges();
      let htmlInput: HTMLInputElement = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;

      reactiveComp.forceValidations = true;
      reactiveFixture.detectChanges();

      // Required
      let errorMessage: DebugElement = reactiveFixture.debugElement.query(By.css('.st-textarea-error-message'));
      expect(errorMessage).toBeDefined();
      expect(errorMessage.nativeElement).toBeDefined();
      expect((<HTMLSpanElement>errorMessage.nativeElement).textContent).toEqual(genericError);
   });

   it('should notify empty error', () => {
      reactiveComp.forceValidations = false;
      reactiveComp.errors = { };
      reactiveFixture.detectChanges();
      let htmlInput: HTMLInputElement = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;

      reactiveComp.forceValidations = true;
      reactiveFixture.detectChanges();

      // Required
      let errorMessage: DebugElement = reactiveFixture.debugElement.query(By.css('.st-textarea-error-message'));
      expect(errorMessage).toBeDefined();
      expect(errorMessage.nativeElement).toBeDefined();
      expect((<HTMLSpanElement>errorMessage.nativeElement).textContent).toEqual('');
   });

   it('should be able to disable and enable', () => {
      reactiveComp.forceValidations = false;
      reactiveFixture.detectChanges();

      reactiveComp.enableInput();
      reactiveFixture.detectChanges();
      let htmlInput: HTMLInputElement = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;
      expect(htmlInput).toBeDefined();
      expect(htmlInput.classList).not.toContain('disabled');

      reactiveComp.disableInput();
      reactiveFixture.detectChanges();
      htmlInput = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;
      expect(htmlInput).toBeDefined();
      expect(htmlInput.classList).toContain('disabled');

      reactiveComp.enableInput();
      reactiveFixture.detectChanges();
      htmlInput = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;
      expect(htmlInput).toBeDefined();
      expect(htmlInput.classList).not.toContain('disabled');
   });

   it('should notify empty error with undefined errors object', () => {
      reactiveComp.forceValidations = false;
      reactiveComp.errors = undefined;
      reactiveFixture.detectChanges();
      let htmlInput: HTMLInputElement = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;

      reactiveComp.forceValidations = true;
      reactiveFixture.detectChanges();

      // Required
      let errorMessage: DebugElement = reactiveFixture.debugElement.query(By.css('.st-textarea-error-message'));
      expect(errorMessage).toBeDefined();
      expect(errorMessage.nativeElement).toBeDefined();
      expect((<HTMLSpanElement>errorMessage.nativeElement).textContent).toEqual('');


      // All ok
      htmlInput.value = 'prueba';
      htmlInput.dispatchEvent(new Event('input'));
      reactiveFixture.detectChanges();

      errorMessage = reactiveFixture.debugElement.query(By.css('.st-textarea-error-message'));
      expect(errorMessage).toBeNull();
   });


   it('should notify no notify error with focus', () => {
      reactiveComp.forceValidations = false;
      reactiveComp.errors = { generic: 'error' };
      reactiveFixture.detectChanges();
      let htmlInput: HTMLInputElement = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;

      reactiveComp.forceValidations = true;
      reactiveFixture.detectChanges();

      // Required
      let errorMessage: DebugElement = reactiveFixture.debugElement.query(By.css('.st-textarea-error-message'));
      expect(errorMessage).toBeDefined();
      expect(errorMessage.nativeElement).toBeDefined();
      expect((<HTMLSpanElement>errorMessage.nativeElement).textContent).toEqual('error');

      htmlInput.dispatchEvent(new Event('focus'));
      reactiveFixture.detectChanges();

      errorMessage = reactiveFixture.debugElement.query(By.css('.st-textarea-error-message'));
      expect(errorMessage).toBeNull();

      htmlInput.dispatchEvent(new Event('blur'));
      reactiveFixture.detectChanges();

      errorMessage = reactiveFixture.debugElement.query(By.css('.st-textarea-error-message'));
      expect(errorMessage).toBeDefined();
      expect((<HTMLSpanElement>errorMessage.nativeElement).textContent).toEqual('error');
   });
});

// TODO: TEST INPUT IN TEMPLATE FORM
