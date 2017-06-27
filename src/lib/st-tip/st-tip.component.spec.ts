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
import { StTipComponent } from './st-tip.component';

let component: StTipComponent;
let fixture: ComponentFixture<StTipComponent>;
let text: string = 'This text will be displayed in our tip';
let qaTag: string = 'tip-qa-tag';

describe('StTip', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StTipComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTipComponent);
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
      expect(fixture.componentInstance.theme).toEqual('themeA');

      component.theme = 'themeB';
      fixture.detectChanges();
      expect(fixture.componentInstance.theme).toEqual('themeB');
   });

   it('If themeA is defined, it needs to be applied', () => {
      let el: DebugElement;
      component.qaTag = qaTag;
      component.text = text;
      component.theme = 'themeA';
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('.themeA'));
      expect(el.nativeElement).toBeDefined();
   });

   it('If themeB is defined, it needs to be applied', () => {
      let el: DebugElement;
      component.qaTag = qaTag;
      component.text = text;
      component.theme = 'themeB';
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('.themeB'));
      expect(el.nativeElement).toBeDefined();
   });

});
