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
import { StHeaderAppComponent } from './app';

let comp: StHeaderAppComponent;
let fixture: ComponentFixture<StHeaderAppComponent>;
let de: DebugElement;


describe('StHeaderComponent', () => {
   describe('StHeaderAppComponent', () => {
      beforeEach(async(() => {
         TestBed.configureTestingModule({
            declarations: [StHeaderAppComponent]
         })
            .compileComponents();  // compile template and css
      }));

      beforeEach(() => {
         fixture = TestBed.createComponent(StHeaderAppComponent);
         comp = fixture.componentInstance;
      });

      it('should be initialized correctly', () => {
         comp.appName = 'Test';
         comp.qaTag = 'test-id';
         fixture.detectChanges();

         let expectedId: string = comp.qaTag + '-logo';
         let appLabel: HTMLDivElement = fixture.debugElement.query(By.css(`#${expectedId}`)).nativeElement;

         expect(comp.qaId).toEqual(expectedId);
         expect(appLabel).toBeDefined();
         expect(appLabel.textContent).toEqual(comp.appName);
      });
   });
});
