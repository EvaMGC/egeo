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

import { StFormComponent } from '../st-form.component';
import { JSON_SCHEMA } from './resources/json-schema';
import { StFormFieldComponent } from '../st-form-field/st-form-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { StInputModule } from '../../st-input/st-input.module';
import { StFormDirectiveModule } from '../../directives/form/form-directives.module';
import { StSwitchModule } from '../../st-switch/st-switch.module';

let component: StFormComponent;
let fixture: ComponentFixture<StFormComponent>;

describe('StFormComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StInputModule, StSwitchModule, PipesModule, StFormDirectiveModule],
         declarations: [StFormComponent, StFormFieldComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StFormComponent);
      component = fixture.componentInstance;
      component.schema = Object.assign({}, JSON_SCHEMA);
      fixture.detectChanges();
   });

   describe('should render a form according its json schema', () => {
      it('a control is created for each property with its ids', () => {
         for (let propertyId in JSON_SCHEMA.properties) {
            if (JSON_SCHEMA.hasOwnProperty(propertyId)) {
               expect(fixture.nativeElement.querySelector('#' + propertyId)).not.toBeNull();
            }
         }
      });

      it('tooltips are generated using their descriptions', () => {
         for (let propertyId in JSON_SCHEMA.properties) {
            if (JSON_SCHEMA.properties.hasOwnProperty(propertyId)) {
               let property: any = JSON_SCHEMA.properties[propertyId];
               let tooltip: HTMLElement = fixture.nativeElement.querySelector('#' + propertyId + '-label-contextual-help');

               if (property.description) {
                  let tooltipText: Element = (<Element> tooltip.parentNode).querySelector('.sth-tooltip-content-text');
                  expect(tooltipText.innerHTML).toBe(property.description);
               }else {
                  expect(tooltip).toBeNull();
               }
            }
         }
      });

      it('controls are displayed with their default value and label', () => {
         for (let propertyId in JSON_SCHEMA.properties) {
            if (JSON_SCHEMA.properties.hasOwnProperty(propertyId)) {
               let property: any = JSON_SCHEMA.properties[propertyId];
               if (property.default) {
                  if (property.type === 'boolean') {
                     expect(fixture.nativeElement.querySelector('#' + propertyId + '-input').checked).toBe(property.default);
                  } else {
                     expect(fixture.nativeElement.querySelector('#' + propertyId).value).toBe(property.default.toString());
                  }
               }
               expect(fixture.nativeElement.innerHTML).toContain(property.title);
            }
         }
      });
   });


});
