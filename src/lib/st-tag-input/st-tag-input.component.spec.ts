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
import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { cloneDeep as _cloneDeep } from 'lodash';

import { StTagInputComponent } from './st-tag-input.component';
import { StTagInputModule } from './st-tag-input.module';
import { StLabelModule } from '../st-label/st-label.module';

const simpleTags: string[] = ['Example 1', 'Example 2', 'Example 3'];

// tslint:disable-next-line:max-line-length
const ipFormat: any =  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

describe('StTagInputComponent', () => {
   let comp: StTagInputComponent;
   let fixture: ComponentFixture<StTagInputComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StLabelModule],
         declarations: [StTagInputComponent],
         schemas: [NO_ERRORS_SCHEMA]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTagInputComponent);
      comp = fixture.componentInstance;
   });

   it('Should init correctly', () => {
      (fixture.elementRef.nativeElement as HTMLElement).id = null;
      fixture.detectChanges();

      expect(comp.label).toBeNull();
      expect(comp.placeholder).toBeNull();
      expect(comp.tooltip).toBeNull();
      expect(comp.errorMessage).toBeNull();
      expect(comp.withAutocomplete).toBeFalsy();
      expect(comp.autocompleteList).toEqual([]);

      expect(comp.innerInputContent).toEqual('');
      expect(comp.items).toEqual([]);
      expect(comp.expandedMenu).toBeFalsy();

      expect(comp.hasLabel).toBeFalsy();
      expect(comp.hasFocus).toBeFalsy();
      expect(comp.hasError).toBeFalsy();
      expect(comp.hasPlaceholder).toBeFalsy();
      expect(comp.hasAutocomplete).toBeFalsy();
      expect(comp.disableValue).toBeNull('');
      expect(comp.isValidInput).toBeTruthy();
      expect(comp.tagSelected).toBeNull();
      expect(comp.selectId).toBeNull();
      expect(comp.inputId).toBeNull();
      expect(comp.labelId).toBeNull();
      expect(comp.tagId).toBeNull();
      expect(comp.listId).toBeNull();
   });

   it('Should propagate id to internal elements', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test Label';
      comp.items = _cloneDeep(simpleTags);
      fixture.detectChanges();

      const label: HTMLElement = fixture.debugElement.query(By.css('.st-label')).nativeElement;
      const tag: HTMLElement = fixture.debugElement.query(By.css('.tag-item')).nativeElement;
      const input: HTMLElement = fixture.debugElement.query(By.css('.inner-input')).nativeElement;
      const list: HTMLElement = fixture.debugElement.query(By.css('st-dropdown-menu')).nativeElement;

      expect(comp.selectId).toEqual(id);

      expect(comp.labelId).toEqual(`${id}-label`);
      expect(label.getAttribute('id')).toEqual(`${id}-label`);

      expect(comp.inputId).toEqual(`${id}-input`);
      expect(input.getAttribute('id')).toEqual(`${id}-input`);

      expect(comp.tagId).toEqual(`${id}-tag-`);
      expect(tag.getAttribute('id')).toContain(`${id}-tag-`);

      expect(comp.listId).toEqual(`${id}-autocomplete`);
      expect(list.getAttribute('id')).toContain(`${id}-autocomplete`);
   });

   it('Should not have a label', () => {
      fixture.detectChanges();
      let label: DebugElement = fixture.debugElement.query(By.css('.st-label'));
      expect(label).toBeNull();
      expect(comp.hasLabel).toBeFalsy();
   });

   it('Should have a label and tooltip', () => {
      comp.label = 'test label';
      comp.tooltip = 'Test help';
      fixture.detectChanges();

      const label: DebugElement = fixture.debugElement.query(By.css('.st-label'));

      expect(comp.hasLabel).toBeTruthy();
      expect(label).toBeDefined();
      expect(label.nativeElement).toBeDefined();
      expect((label.nativeElement as HTMLLabelElement).textContent).toEqual(comp.label);
      expect((label.nativeElement as HTMLLabelElement).title).toEqual(comp.tooltip);
   });

   it('Should have a placeholder', () => {
      comp.placeholder = 'Test help';
      fixture.detectChanges();

      expect(comp.hasPlaceholder).toBeTruthy();
   });

   it('Should hide a placeholder when tags added', () => {
      comp.placeholder = 'Test help';
      comp.items = _cloneDeep(simpleTags);
      fixture.detectChanges();

      expect(comp.hasPlaceholder).toBeFalsy();
   });

   it('Should change input focus on click input container', () => {
      comp.placeholder = 'Test help';
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      fixture.detectChanges();

      const input: HTMLInputElement = fixture.debugElement.query(By.css('.inner-input')).nativeElement;
      spyOn(input, 'focus');

      expect(comp.hasPlaceholder).toBeTruthy();
      expect(comp.hasFocus).toBeFalsy();
      expect(input.focus).not.toHaveBeenCalled();

      const container: HTMLLabelElement = fixture.debugElement.query(By.css('.st-input')).nativeElement;
      container.click();
      fixture.detectChanges();

      expect(comp.hasPlaceholder).toBeFalsy();
      expect(comp.hasFocus).toBeTruthy();
      expect(input.focus).toHaveBeenCalled();
   });

   it('Should change component focus on focus tag', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.items = _cloneDeep(simpleTags);
      fixture.detectChanges();

      expect(comp.hasFocus).toBeFalsy();
      expect(comp.tagSelected).toBeNull();

      const tag: HTMLElement = fixture.debugElement.query(By.css('.tag-item')).nativeElement;
      tag.focus();
      fixture.detectChanges();
      expect(comp.hasFocus).toBeTruthy();
      expect(comp.tagSelected).toBeDefined();
   });

   it('Should prevent tag click propagation', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.items = _cloneDeep(simpleTags);
      fixture.detectChanges();

      const tag: HTMLElement = fixture.debugElement.query(By.css('.tag-item')).nativeElement;
      const container: HTMLLabelElement = fixture.debugElement.query(By.css('.st-input')).nativeElement;
      spyOn(tag, 'click');
      spyOn(container, 'click');

      expect(tag.click).not.toHaveBeenCalled();
      expect(container.click).not.toHaveBeenCalled();

      tag.click();
      comp.onTagClick(new Event('ClickEvent'), 0);
      fixture.detectChanges();
      expect(tag.click).toHaveBeenCalled();
      expect(container.click).not.toHaveBeenCalled();
   });

   it('Should remove tag when press delete or backspace on focus tag', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.items = _cloneDeep(simpleTags);
      fixture.detectChanges();

      expect(comp.hasFocus).toBeFalsy();
      expect(comp.tagSelected).toBeNull();
      expect(comp.items.length).toEqual(simpleTags.length);

      const tag: DebugElement = fixture.debugElement.query(By.css('.tag-item'));
      tag.nativeElement.focus();
      tag.triggerEventHandler('keydown', { keyCode: 46, preventDefault: () => {} });
      fixture.detectChanges();

      expect(comp.hasFocus).toBeTruthy();
      expect(comp.tagSelected).toBeNull();
      expect(comp.items.length).toEqual(simpleTags.length - 1);

      const newTag: DebugElement = fixture.debugElement.query(By.css('.tag-item'));
      newTag.nativeElement.focus();
      newTag.triggerEventHandler('keydown', { keyCode: 8, preventDefault: () => {} });
      fixture.detectChanges();

      expect(comp.hasFocus).toBeTruthy();
      expect(comp.tagSelected).toBeNull();
      expect(comp.items.length).toEqual(simpleTags.length - 2);
   });

   it('Should add tag when press enter, comma or tab with input text', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.innerInputContent = 'New Tag';
      fixture.detectChanges();

      expect(comp.items.length).toEqual(0);
      expect(comp.innerInputContent).not.toEqual('');
      expect(comp.isValidInput).toBeTruthy();

      const input: DebugElement = fixture.debugElement.query(By.css('.inner-input'));
      input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
      fixture.detectChanges();

      expect(comp.items.length).toEqual(1);
      expect(comp.isValidInput).toBeTruthy();
      expect(comp.innerInputContent).toEqual('');

      comp.innerInputContent = 'New Tag 2';
      input.triggerEventHandler('keydown', { keyCode: 13, preventDefault: () => {} });
      fixture.detectChanges();

      expect(comp.items.length).toEqual(2);
      expect(comp.isValidInput).toBeTruthy();
      expect(comp.innerInputContent).toEqual('');

      comp.innerInputContent = 'New Tag 3';
      input.triggerEventHandler('keydown', { keyCode: 9, preventDefault: () => {} });
      fixture.detectChanges();

      expect(comp.items.length).toEqual(3);
      expect(comp.isValidInput).toBeTruthy();
      expect(comp.innerInputContent).toEqual('');
   });

   it('Should avoid to add tag when press enter, comma or tab with input text already exist', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.items = _cloneDeep(simpleTags);
      fixture.detectChanges();

      expect(comp.items.length).toEqual(simpleTags.length);
      expect(comp.isValidInput).toBeTruthy();

      comp.innerInputContent = simpleTags[0];
      const input: DebugElement = fixture.debugElement.query(By.css('.inner-input'));
      input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
      fixture.detectChanges();

      expect(comp.items.length).toEqual(simpleTags.length);
      expect(comp.isValidInput).toBeFalsy();

      comp.innerInputContent = simpleTags[1];
      input.triggerEventHandler('keydown', { keyCode: 13, preventDefault: () => {} });
      fixture.detectChanges();

      expect(comp.items.length).toEqual(simpleTags.length);
      expect(comp.isValidInput).toBeFalsy();

      comp.innerInputContent = simpleTags[2];
      input.triggerEventHandler('keydown', { keyCode: 9, preventDefault: () => {} });
      fixture.detectChanges();

      expect(comp.items.length).toEqual(simpleTags.length);
      expect(comp.isValidInput).toBeTruthy();
      expect(comp.innerInputContent).toEqual('');
   });

   it('Should add tag when focus out with input text', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.innerInputContent = 'New Tag';
      comp.items = _cloneDeep(simpleTags);
      fixture.detectChanges();

      expect(comp.items.length).toEqual(simpleTags.length);
      expect(comp.innerInputContent).not.toEqual('');

      const input: HTMLElement = fixture.debugElement.query(By.css('.inner-input')).nativeElement;
      input.focus();
      fixture.detectChanges();

      const tag: HTMLElement = fixture.debugElement.query(By.css('.tag-item')).nativeElement;
      tag.focus();
      fixture.detectChanges();

      expect(comp.items.length).toEqual(simpleTags.length + 1);
      expect(comp.innerInputContent).toEqual('');
   });

   it('Should remove input text when press delete with input text', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.innerInputContent = 'New Tag';
      fixture.detectChanges();

      expect(comp.innerInputContent).not.toEqual('');

      const input: DebugElement = fixture.debugElement.query(By.css('.inner-input'));
      input.triggerEventHandler('keydown', { keyCode: 46, preventDefault: () => {} });
      fixture.detectChanges();

      expect(comp.innerInputContent).toEqual('');
   });

   it('Should lost focus when press tab without input text', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.innerInputContent = 'New Tag';
      fixture.detectChanges();

      expect(comp.hasFocus).toBeFalsy();
      expect(comp.innerInputContent).not.toBe('');

      const container: HTMLLabelElement = fixture.debugElement.query(By.css('.st-input')).nativeElement;
      container.click();
      const input: DebugElement = fixture.debugElement.query(By.css('.inner-input'));
      input.triggerEventHandler('keydown', { keyCode: 9, preventDefault: () => {} });
      fixture.detectChanges();

      expect(comp.hasFocus).toBeTruthy();
      expect(comp.innerInputContent).toEqual('');
      comp.innerInputContent = 'New Tag';

      input.triggerEventHandler('keydown', { keyCode: 9, preventDefault: () => {} });
      fixture.detectChanges();

      expect(comp.innerInputContent).toBe('');
   });

   it('Should set disabled with a empty tag list', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.placeholder = 'Test help';

      comp.setDisabledState(true);
      fixture.detectChanges();

      expect(comp.disableValue).toEqual('');

      const input: HTMLInputElement = fixture.debugElement.query(By.css('.inner-input')).nativeElement;
      spyOn(input, 'focus');

      expect(comp.hasPlaceholder).toBeTruthy();
      expect(comp.hasFocus).toBeFalsy();
      expect(input.focus).not.toHaveBeenCalled();

      const container: HTMLLabelElement = fixture.debugElement.query(By.css('.st-input')).nativeElement;
      container.click();
      fixture.detectChanges();

      expect(comp.hasPlaceholder).toBeTruthy();
      expect(comp.hasFocus).toBeFalsy();
      expect(input.focus).not.toHaveBeenCalled();
   });

   it('Should set disabled with tag list', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.items = _cloneDeep(simpleTags);

      comp.setDisabledState(true);
      fixture.detectChanges();

      expect(comp.disableValue).toEqual('');
      expect(comp.hasFocus).toBeFalsy();
      expect(comp.tagSelected).toBeNull();

      const tag: HTMLElement = fixture.debugElement.query(By.css('.tag-item')).nativeElement;
      tag.focus();
      fixture.detectChanges();

      expect(comp.hasFocus).toBeFalsy();
      expect(comp.tagSelected).toBeNull();
   });

   it('Should display autocomplete list with autocomplete', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.autocompleteList = [{ value: '1', label: '1' }, { value: '2', label: '2' }];
      comp.withAutocomplete = true;
      fixture.detectChanges();

      expect(comp.expandedMenu).toBeFalsy();
      expect(comp.hasAutocomplete).toBeFalsy();

      comp.onInputText('New Tag');
      comp.autocompleteList = [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '2', label: '2' }];
      fixture.detectChanges();

      expect(comp.expandedMenu).toBeTruthy();
      expect(comp.hasAutocomplete).toBeTruthy();

      comp.onInputText('');
      fixture.detectChanges();

      expect(comp.expandedMenu).toBeFalsy();
      expect(comp.hasAutocomplete).toBeFalsy();
   });

   it('Should add tag from autocomplete list ', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.autocompleteList = [{ value: '1', label: '1' }, { value: '2', label: '2' }];
      comp.withAutocomplete = true;
      comp.items = _cloneDeep(simpleTags);
      fixture.detectChanges();

      expect(comp.items.length).toEqual(simpleTags.length);

      comp.onListSelect(comp.autocompleteList[0]);
      fixture.detectChanges();

      expect(comp.items.length).toEqual(simpleTags.length + 1);
      expect(comp.items[comp.items.length - 1]).toEqual('1');
   });

   it('Should add tag when click outside with autocomplete list ', () => {
      const id: string = 'test-id';
      (fixture.elementRef.nativeElement as HTMLElement).id = id;
      comp.label = 'Test';
      comp.autocompleteList = [{ value: '1', label: '1' }, { value: '2', label: '2' }];
      comp.withAutocomplete = true;
      comp.items = _cloneDeep(simpleTags);
      fixture.detectChanges();

      expect(comp.items.length).toEqual(simpleTags.length);
      expect(comp.expandedMenu).toBeFalsy();
      expect(comp.hasAutocomplete).toBeFalsy();

      comp.onInputText('New Tag');
      fixture.detectChanges();

      expect(comp.expandedMenu).toBeTruthy();
      expect(comp.hasAutocomplete).toBeTruthy();

      let div = document.createElement('div');
      document.body.appendChild(div);
      div.click();
      fixture.detectChanges();

      expect(comp.items.length).toEqual(simpleTags.length + 1);
      expect(comp.items[comp.items.length - 1]).toEqual('New Tag');
      expect(comp.expandedMenu).toBeFalsy();
      expect(comp.hasAutocomplete).toBeFalsy();
   });

   describe('It should be able to configure the type of its items', () => {
      let input: DebugElement;
      let enterKeyDownEventObj: any;

      beforeEach(() => {
         fixture.detectChanges();
         input = fixture.debugElement.query(By.css('.st-tag-input__text.inner-input'));
         enterKeyDownEventObj = {keyCode: 13, preventDefault: () => {}};
      });

      it('by default type of items is text', () => {
         comp.onInputText('New Tag');

         input.triggerEventHandler('keydown', enterKeyDownEventObj);

         expect(comp.items[comp.items.length - 1]).toEqual('New Tag');
      });

      it('if type is number, model will be an array of numbers', () => {
         comp.type = 'number';

         comp.onInputText('56');

         input.triggerEventHandler('keydown', enterKeyDownEventObj);

         expect(comp.items[comp.items.length - 1]).toEqual(56);

         comp.onInputText('100.54');
         input.triggerEventHandler('keydown', enterKeyDownEventObj);

         expect(comp.items[comp.items.length - 1]).toEqual(100.54);
      });

      it('if type is integer, model will be an array of integers', () => {
         comp.type = 'integer';
         comp.onInputText('567');
         input.triggerEventHandler('keydown', enterKeyDownEventObj);

         expect(comp.items[comp.items.length - 1]).toEqual(567);
      });

      it('When type is integer and user types and invalid integer, it wont be added', () => {
         comp.items = [];
         comp.type = 'integer';
         comp.onInputText('invalid integer');
         input.triggerEventHandler('keydown', enterKeyDownEventObj);

         expect(comp.items.length).toBe(0);

         comp.onInputText('58.2');
         input.triggerEventHandler('keydown', enterKeyDownEventObj);

         expect(comp.items[comp.items.length - 1]).toBe(58);

         comp.onInputText('62');
         input.triggerEventHandler('keydown', enterKeyDownEventObj);

         expect(comp.items[comp.items.length - 1]).toBe(62);
      });

      it('When type is number and user types and invalid number, it wont be added', () => {
         comp.items = [];
         comp.type = 'integer';
         comp.onInputText('invalid integer');
         input.triggerEventHandler('keydown', enterKeyDownEventObj);

         expect(comp.items.length).toBe(0);

         comp.onInputText('56&notANumber');
         input.triggerEventHandler('keydown', enterKeyDownEventObj);

         expect(comp.items.length).toBe(1);
         expect(comp.items[comp.items.length - 1]).toEqual(56);

         comp.onInputText('&notANumber56');
         input.triggerEventHandler('keydown', enterKeyDownEventObj);

         expect(comp.items.length).toBe(1);

         comp.onInputText('58');
         input.triggerEventHandler('keydown', enterKeyDownEventObj);

         expect(comp.items.length).toBe(2);
         expect(comp.items[comp.items.length - 1]).toEqual(58);

         comp.onInputText('74.2');
         input.triggerEventHandler('keydown', enterKeyDownEventObj);

         expect(comp.items[comp.items.length - 1]).toEqual(74);
      });
   });
});

@Component({
   template: `
      <form [formGroup]="reactiveForm" novalidate autocomplete="off">
         <st-tag-input #tagInput
            name="tags"
            formControlName="tags"
            placeholder="placeholder"
            label="Test"
            tooltip="Test Help"
            id="test"
            [errorMessage]="errorMessage"
            class="st-form-field">
         </st-tag-input>
      </form>
   `
})
class StTagInputTestReactiveComponent {
   errorMessage: string | undefined = null;
   reactiveForm: FormGroup;
   model: string[] = [];

   @ViewChild('tagInput') tagInput: StTagInputComponent;

   constructor(private _fb: FormBuilder) {
      this.reactiveForm = this._fb.group({
         tags: [this.model, [Validators.required]]
      });
   }
}

describe('StTagInputComponent', () => {
   describe('Reactive form instance', () => {
      let fixture: ComponentFixture<StTagInputTestReactiveComponent>;
      let comp: StTagInputTestReactiveComponent;
      let compTagInput: StTagInputComponent;

      beforeEach(async(() => {
         TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, StTagInputModule],
            declarations: [StTagInputTestReactiveComponent]
         }).compileComponents();  // compile template and css
      }));

      beforeEach(() => {
         fixture = TestBed.createComponent(StTagInputTestReactiveComponent);
         comp = fixture.componentInstance;
         compTagInput = comp.tagInput;
         fixture.detectChanges();
      });

      afterEach(() => {
         fixture.destroy();
      });

      it('Should change value from formControl', () => {
         fixture.detectChanges();
         expect(compTagInput.items).toEqual([]);

         comp.reactiveForm.get('tags').setValue(simpleTags);
         fixture.detectChanges();
         expect(compTagInput.items).toEqual(simpleTags);
      });

      it('Should change model when add tag', () => {
         const responseFunction = jasmine.createSpy('response');
         comp.reactiveForm.get('tags').valueChanges.subscribe(responseFunction);
         fixture.detectChanges();

         const id: string = 'test-id';
         (fixture.elementRef.nativeElement as HTMLElement).id = id;
         compTagInput.label = 'Test';
         compTagInput.innerInputContent = 'New Tag';
         fixture.detectChanges();

         const input: DebugElement = fixture.debugElement.query(By.css('.inner-input'));
         input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
         fixture.detectChanges();

         expect(compTagInput.items.length).toEqual(1);
         expect(compTagInput.innerInputContent).toEqual('');

         expect(comp.reactiveForm.valid).toBeTruthy();
         expect(comp.reactiveForm.value.tags).toEqual(compTagInput.items);
         expect(comp.reactiveForm.value.tags[0]).toEqual('New Tag');
         expect(responseFunction).toHaveBeenCalled();
         expect(responseFunction).toHaveBeenCalledWith(compTagInput.items);
      });

      it('Should validate required status', () => {
         comp.reactiveForm.get('tags').setValue([]);
         fixture.detectChanges();
         expect(comp.reactiveForm.valid).toBeFalsy();

         comp.reactiveForm.get('tags').setValue(['New Tag']);
         fixture.detectChanges();
         expect(comp.reactiveForm.valid).toBeTruthy();
      });

      it ('if regular expression is introduced as input, only values that match it will be valid', () => {
         compTagInput.type = 'text';
         compTagInput.regularExpression = ipFormat;
         compTagInput.ngOnInit();
         fixture.detectChanges();

         compTagInput.innerInputContent = 'New Tag';
         fixture.detectChanges();

         const input: DebugElement = fixture.debugElement.query(By.css('.inner-input'));
         input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
         fixture.detectChanges();

         expect(compTagInput.items.length).toEqual(0);

         compTagInput.innerInputContent = '192.168.1.1';
         fixture.detectChanges();

         input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
         fixture.detectChanges();

         expect(compTagInput.items.length).toEqual(1);
      });

      describe('When type is number', () => {
         beforeEach(() => {
            compTagInput.type = 'number';
            compTagInput.ngOnInit();
            fixture.detectChanges();
         });

         it('and user types a text with letters and other symbols different to a dot, it wont be added', () => {
            compTagInput.innerInputContent = 'New Tag';
            fixture.detectChanges();

            const input: DebugElement = fixture.debugElement.query(By.css('.inner-input'));
            input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
            fixture.detectChanges();

            expect(compTagInput.items.length).toEqual(0);

            compTagInput.innerInputContent = '34.56fg';
            fixture.detectChanges();

            input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
            fixture.detectChanges();

            expect(compTagInput.items.length).toEqual(0);

            compTagInput.innerInputContent = '34.56';
            fixture.detectChanges();

            input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
            fixture.detectChanges();

            expect(compTagInput.items.length).toEqual(1);
            expect(compTagInput.items[0]).toEqual(34.56);
         });

         it ('if form control has invalid values, only will be added the valid numbers', () => {
            (<any> comp.reactiveForm.controls).tags.setValue(['text', 2, 6.67]);
            fixture.detectChanges();

            expect(compTagInput.items.length).toEqual(2);
            expect(compTagInput.items).toEqual([2, 6.67]);
         });
      });

      describe('When type is integer', () => {
         beforeEach(() => {
            compTagInput.type = 'integer';
            compTagInput.ngOnInit();
            fixture.detectChanges();
         });

         it('and user types a text with characters different to numbers, it wont be added', () => {
            compTagInput.innerInputContent = 'New Tag';
            fixture.detectChanges();

            const input: DebugElement = fixture.debugElement.query(By.css('.inner-input'));
            input.triggerEventHandler('keydown', {
               keyCode: 188, preventDefault: () => {
               }
            });
            fixture.detectChanges();

            expect(compTagInput.items.length).toEqual(0);

            compTagInput.innerInputContent = '34.56fg';
            fixture.detectChanges();

            input.triggerEventHandler('keydown', {
               keyCode: 188, preventDefault: () => {
               }
            });
            fixture.detectChanges();

            expect(compTagInput.items.length).toEqual(0);

            compTagInput.innerInputContent = '34.56';
            fixture.detectChanges();

            input.triggerEventHandler('keydown', {
               keyCode: 188, preventDefault: () => {
               }
            });
            fixture.detectChanges();

            expect(compTagInput.items.length).toEqual(0);

            compTagInput.innerInputContent = '56';
            fixture.detectChanges();

            input.triggerEventHandler('keydown', {
               keyCode: 188, preventDefault: () => {
               }
            });
            fixture.detectChanges();

            expect(compTagInput.items.length).toEqual(1);
            expect(compTagInput.items[0]).toEqual(56);
         });

         it ('if form control has invalid values, only will be added the valid integers', () => {
            (<any> comp.reactiveForm.controls).tags.setValue(['text', 78, 6]);
            fixture.detectChanges();

            expect(compTagInput.items.length).toEqual(2);
            expect(compTagInput.items).toEqual([78, 6]);
         });
      });
   });
});


@Component({
   changeDetection: ChangeDetectionStrategy.OnPush,
   template: `
      <form #templateDrivenForm="ngForm" novalidate autocomplete="off">
         <st-tag-input #tagInput
            class="st-form-field"
            id="test"
            placeholder="placeholder"
            name="tags"
            label="Test"
            tooltip="Test Help"
            required
            [errorMessage]="errorMessage"
            [(ngModel)]="model"
         >
         </st-tag-input>
      </form>
      `
})
class StTagInputTestTemplateComponent {
   errorMessage: string | undefined = null;
   model: string[] = [];

   @ViewChild('tagInput') tagInput: StTagInputComponent;
   @ViewChild('templateDrivenForm') templateDrivenForm: NgForm;
}

describe('StTagInputComponent', () => {
   describe('Template form instance', () => {
      let fixture: ComponentFixture<StTagInputTestTemplateComponent>;
      let comp: StTagInputTestTemplateComponent;
      let compTagInput: StTagInputComponent;

      beforeEach(async(() => {
         TestBed.configureTestingModule({
            imports: [FormsModule, StTagInputModule],
            declarations: [StTagInputTestTemplateComponent]
         }).compileComponents();  // compile template and css
      }));

      beforeEach(() => {
         fixture = TestBed.createComponent(StTagInputTestTemplateComponent);
         comp = fixture.componentInstance;
         compTagInput = comp.tagInput;
      });

      afterEach(() => {
         fixture.destroy();
      });

      it('Should change value from formControl', async(() => {
         fixture.detectChanges();
         fixture.whenStable().then(() => { // Form generation it's asynchronous
            expect(compTagInput.items).toEqual([]);

            comp.templateDrivenForm.form.get('tags').setValue(simpleTags);
            fixture.detectChanges();
            expect(compTagInput.items).toEqual(simpleTags);
         });
      }));

      it('Should change model when add tag', async(() => {
         const responseFunction = jasmine.createSpy('response');
         fixture.detectChanges();
         fixture.whenStable().then(() => { // Form generation it's asynchronous
            comp.templateDrivenForm.form.get('tags').valueChanges.subscribe(responseFunction);

            const id: string = 'test-id';
            (fixture.elementRef.nativeElement as HTMLElement).id = id;
            compTagInput.label = 'Test';
            compTagInput.innerInputContent = 'New Tag';
            fixture.detectChanges();

            const input: DebugElement = fixture.debugElement.query(By.css('.inner-input'));
            input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
            fixture.detectChanges();

            expect(compTagInput.items.length).toEqual(1);
            expect(compTagInput.innerInputContent).toEqual('');

            expect(comp.templateDrivenForm.valid).toBeTruthy();
            expect(comp.templateDrivenForm.value.tags).toEqual(compTagInput.items);
            expect(comp.templateDrivenForm.value.tags[0]).toEqual('New Tag');
            expect(responseFunction).toHaveBeenCalled();
            expect(responseFunction).toHaveBeenCalledWith(compTagInput.items);
         });
      }));

      it('Should validate required status', async(() => {
         fixture.detectChanges();
         fixture.whenStable().then(() => { // Form generation it's asynchronous
            comp.templateDrivenForm.form.get('tags').setValue([]);
            fixture.detectChanges();
            expect(comp.templateDrivenForm.valid).toBeFalsy();

            comp.templateDrivenForm.form.get('tags').setValue(['New Tag']);
            fixture.detectChanges();
            expect(comp.templateDrivenForm.valid).toBeTruthy();
         });
      }));

      describe('should be able to not allow user types a forbidden value if there are', () => {
         it('if a forbidden value list is not introduced as input, user can introduce whatever he wants', async(() => {
            fixture.detectChanges();

            fixture.whenStable().then(() => { // Form generation it's asynchronous
               compTagInput.innerInputContent = 'New Tag';
               fixture.detectChanges();

               const input: DebugElement = fixture.debugElement.query(By.css('.inner-input'));
               input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
               fixture.detectChanges();
               expect(compTagInput.items.length).toEqual(1);

               compTagInput.innerInputContent = 'new tag 2';
               fixture.detectChanges();

               input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
               fixture.detectChanges();

               expect(compTagInput.items.length).toEqual(2);
            });
         }));

         it('if a forbidden value list is introduced as input and user introduces a forbidden value, tag is not added to model', async(() => {
            compTagInput.forbiddenValues = ['forbidden value'];
            fixture.detectChanges();

            fixture.whenStable().then(() => { // Form generation it's asynchronous
               compTagInput.innerInputContent = 'New Tag';
               fixture.detectChanges();

               const input: DebugElement = fixture.debugElement.query(By.css('.inner-input'));
               input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
               fixture.detectChanges();
               expect(compTagInput.items.length).toEqual(1);

               compTagInput.innerInputContent = 'forbidden value';
               fixture.detectChanges();

               input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
               fixture.detectChanges();

               expect(compTagInput.items.length).toEqual(1); // is not added the forbidden value
            });
         }));
      });


      it('if regular expression is introduced as input, only values that match it will be valid', (done) => {
         compTagInput.regularExpression = ipFormat;
         fixture.detectChanges();

         fixture.whenStable().then(() => { // Form generation it's asynchronous
            fixture.whenStable().then(() => { // Form generation it's asynchronous
               compTagInput.innerInputContent = '1.1.1.1';
               fixture.detectChanges();

               const input: DebugElement = fixture.debugElement.query(By.css('.inner-input'));
               input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
               fixture.detectChanges();
               expect(compTagInput.items.length).toEqual(1);

               compTagInput.innerInputContent = 'invalid ip';
               fixture.detectChanges();

               input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
               fixture.detectChanges();

               expect(compTagInput.items.length).toEqual(1);

               compTagInput.innerInputContent = '192.168.1.1';
               fixture.detectChanges();

               input.triggerEventHandler('keydown', { keyCode: 188, preventDefault: () => {} });
               fixture.detectChanges();

               expect(compTagInput.items.length).toEqual(2);
               done();
            });
         });
      });
   });
});
