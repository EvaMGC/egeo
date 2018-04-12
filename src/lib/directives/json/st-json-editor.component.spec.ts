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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

// Component
import { StJsonEditor } from './st-json-editor';
import { Component, Input, ViewChild } from '@angular/core';

let component: TestStJsonEditorComponent;
let fixture: ComponentFixture<any>;
let compiled: any;

@Component({
   template: `<st-json-editor></st-json-editor>`
})
class TestStJsonEditorComponent {
   @Input() title: string;
   @ViewChild(StJsonEditor) jsonEditor: StJsonEditor;
}

describe('StJsonEditor', () => {
   beforeEach(
      async(() => {
         TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [TestStJsonEditorComponent, StJsonEditor]
         }).compileComponents(); // compile template and css
      })
   );

   beforeEach(() => {
      fixture = TestBed.createComponent(TestStJsonEditorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
   });

});
