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
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Component
import { StHelpComponent } from './st-help.component';

let component: StHelpComponent;
let fixture: ComponentFixture<StHelpComponent>;
let text: string = 'This text will be displayed in our help';
let qaTag: string = 'help-qa-tag';

describe('StHelp', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StHelpComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StHelpComponent);
      component = fixture.componentInstance;
   });

   it('It should have required inputs defined', () => {
      component.text = text;
      fixture.detectChanges();
      expect(fixture.componentInstance.text).toEqual(text);
   });

   it('It should have theme defined as default', () => {
      component.qaTag = qaTag;
      component.text = text;
      fixture.detectChanges();
      expect(fixture.componentInstance.textPosition).toEqual('vertical');

      component.textPosition = 'horizontal';
      fixture.detectChanges();
      expect(fixture.componentInstance.textPosition).toEqual('horizontal');
   });

   it('If themeA is defined, it needs to be applied', () => {
      let el: DebugElement;
      component.qaTag = qaTag;
      component.text = text;
      component.textPosition = 'vertical';
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('.st-help--vertical'));
      expect(el.nativeElement).toBeDefined();
   });

   it('If themeB is defined, need to be applied', () => {
      let el: DebugElement;
      component.qaTag = qaTag;
      component.text = text;
      component.textPosition = 'horizontal';
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('.st-help--horizontal'));
      expect(el.nativeElement).toBeDefined();
   });

});
