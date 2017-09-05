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
import { FormsModule } from '@angular/forms';

// Component
import { StInputAdjustable } from './st-input-adjustable';
import { Component, Input, ViewChild } from '@angular/core';

let component: TestStInputAdjustableComponent;
let fixture: ComponentFixture<any>;
let compiled: any;
let title: string = '';

@Component({
   template: `<div><input st-input-adjustable [(ngModel)]="title"></div>`
})
class TestStInputAdjustableComponent {
   @Input() title: string;
   @ViewChild(StInputAdjustable) adjustableInput: StInputAdjustable;
}

describe('StInputAdjustable', () => {
   beforeEach(
      async(() => {
         TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TestStInputAdjustableComponent, StInputAdjustable]
         }).compileComponents(); // compile template and css
      })
   );

   beforeEach(() => {
      fixture = TestBed.createComponent(TestStInputAdjustableComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
   });

   describe('should use a hidden text to manage the current length of the input', () => {
      it('should create it if it does not already exist', () => {
         let hiddenText: HTMLSpanElement = fixture.nativeElement.querySelector('.hidden-text');

         expect(hiddenText).toBeDefined();

         expect(hiddenText.style.visibility).toBe('hidden');
         expect(hiddenText.style.position).toBe('absolute');
         expect(hiddenText.style.textTransform).toBe('none');
         expect(hiddenText.style.whiteSpace).toBe('nowrap');
         expect(hiddenText.style.width).toBe('auto');
         expect(hiddenText.style.height).toBe('auto');
      });

      it('if it exists, this is used', () => {
         let previousHiddenText: HTMLSpanElement = fixture.nativeElement.firstChild.querySelector('.hidden-text');
         component.adjustableInput.ngAfterViewInit();

         expect(fixture.nativeElement.firstChild.querySelector('.hidden-text')).toBe(previousHiddenText);
      });
   });

   it('Should change the parent width according to the typed text more 10 px', async(done) => {
      title = 'fake text';
      let input: HTMLInputElement = fixture.nativeElement.querySelector('input');
      input.value = title;
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      let hiddenText: HTMLSpanElement = fixture.nativeElement.querySelector('.hidden-text');

      fixture.whenStable().then(() => {
         expect(fixture.nativeElement.firstChild.style.width).toEqual(hiddenText.clientWidth + 10 + 'px');
         done();
      });
   });

});
