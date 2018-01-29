// /*
//  * © 2017 Stratio Big Data Inc., Sucursal en España.
//  *
//  * This software is licensed under the Apache License, Version 2.0.
//  * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
//  * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//  * See the terms of the License for more details.
//  *
//  * SPDX-License-Identifier: Apache-2.0.
//  */
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { StFormComponent } from '../st-form.component';
// import { JSON_SCHEMA } from './resources/json-schema';
// import { StFormFieldComponent } from '../st-form-field/st-form-field.component';
// import { FormsModule, ReactiveFormsModule, NgForm, ControlContainer } from '@angular/forms';
// import { PipesModule } from '../../pipes/pipes.module';
// import { StInputModule } from '../../st-input/st-input.module';
// import { StFormDirectiveModule } from '../../directives/form/form-directives.module';
// import { StSwitchModule } from '../../st-switch/st-switch.module';
// import { StTooltipComponent } from '../../st-tooltip/st-tooltip.component';
// import { ChangeDetectionStrategy } from '@angular/core';
//
// let component: StFormComponent;
// let fixture: ComponentFixture<StFormComponent>;
//
// fdescribe('StFormComponent', () => {
//    beforeEach(async(() => {
//       TestBed.configureTestingModule({
//          imports: [FormsModule, ReactiveFormsModule, StInputModule, StSwitchModule, PipesModule, StFormDirectiveModule],
//          declarations: [StFormComponent, StFormFieldComponent],
//          providers: [NgForm]
//       })
//       // remove this block when the issue #12313 of Angular is fixed
//          .overrideComponent(StFormComponent, {
//             set: { changeDetection: ChangeDetectionStrategy.Default }
//          })
//          .overrideComponent(StFormFieldComponent, {
//             set: { viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ], changeDetection: ChangeDetectionStrategy.Default }
//
//          })
//          .compileComponents();  // compile template and css
//    }));
//
//    beforeEach(() => {
//       fixture = TestBed.createComponent(StFormComponent);
//       component = fixture.componentInstance;
//       component.schema = Object.assign({}, JSON_SCHEMA);
//       fixture.detectChanges();
//       fixture.changeDetectorRef.markForCheck();
//    });
//
//    describe('should render a form according its json schema', () => {
//       it('a control is created for each property with its ids', () => {
//          for (let propertyId in JSON_SCHEMA.properties) {
//             if (JSON_SCHEMA.hasOwnProperty(propertyId)) {
//                expect(fixture.nativeElement.querySelector('#' + propertyId)).not.toBeNull();
//             }
//          }
//       });
//
//       it('tooltips are generated using their descriptions', () => {
//          for (let propertyId in JSON_SCHEMA.properties) {
//             if (JSON_SCHEMA.properties.hasOwnProperty(propertyId)) {
//                let property: any = JSON_SCHEMA.properties[propertyId];
//                let input: HTMLElement = fixture.nativeElement.querySelector('#' + propertyId);
//                if (input) {
//                   let tooltip: Element = (<Element>input.parentNode).querySelector('label');
//                   if (property.description) {
//                      expect(tooltip.getAttribute('title')).toBe(property.description);
//                   } else {
//                      expect(tooltip.getAttribute('title')).toBeNull();
//                   }
//                }
//             }
//          }
//       });
//
//       it('controls are displayed with their default value and label', () => {
//          for (let propertyId in JSON_SCHEMA.properties) {
//             if (JSON_SCHEMA.properties.hasOwnProperty(propertyId)) {
//                let property: any = JSON_SCHEMA.properties[propertyId];
//                if (property.default) {
//                   if (property.type === 'boolean') {
//                      expect(fixture.nativeElement.querySelector('#' + propertyId + '-input').checked).toBe(property.default);
//                   } else {
//                      expect(fixture.nativeElement.querySelector('#' + propertyId).value).toBe(property.default.toString());
//                   }
//                }
//                expect(fixture.nativeElement.innerHTML).toContain(property.title);
//             }
//          }
//       });
//    });
//
//
// });
