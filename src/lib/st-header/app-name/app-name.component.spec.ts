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
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

// Component
import { AppNameComponent } from './app-name.component';

let comp: AppNameComponent;
let fixture: ComponentFixture<AppNameComponent>;
let de: DebugElement;


describe('StHeader component', () => {
   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppNameComponent]
    })
    .compileComponents();  // compile template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNameComponent);
    comp = fixture.componentInstance;

    comp.appLogoPath = undefined;
    comp.appName = 'Test App';
    comp.companyName = 'Stratio';

    fixture.autoDetectChanges(true);
  });

    describe('AppName component', () => {
        it('should be init correctly without image', () => {
            let appLabel: HTMLDivElement = fixture.debugElement.query(By.css('.app-label')).nativeElement;
            let appName: HTMLSpanElement = fixture.debugElement.query(By.css('.sth-app-name')).nativeElement;
            let companyName: HTMLSpanElement = fixture.debugElement.query(By.css('.company-name')).nativeElement;


            expect(appLabel).toBeDefined();
            expect(appLabel).not.toBeNull();
            expect(comp.showAppName).toBeTruthy();
            expect(appName.textContent).toBe(comp.appName);
            expect(companyName.textContent).toBe(comp.companyName);
        });
    });
});
