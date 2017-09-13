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
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { StHorizontalTab } from './st-horizontal-tabs.model';
import { StHorizontalTabsComponent } from './st-horizontal-tabs.component';


describe('StHorizontalTabsComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StHorizontalTabsComponent]
      })
         .compileComponents();  // compile template and css
   }));

   let component: StHorizontalTabsComponent;
   let fixture: ComponentFixture<StHorizontalTabsComponent>;
   let fakeOptions: StHorizontalTab[] = [
      {id: 'tab1', text: 'tab 1'},
      {id: 'tab2', text: 'tab 2'},
      {id: 'tab3', text: 'tab 3'}
   ];

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StHorizontalTabsComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StHorizontalTabsComponent);
      component = fixture.componentInstance;
      component.options = fakeOptions;
      fixture.detectChanges();
   });


   describe('when it is initialized', () => {

      it ('if "options" input is not introduced, it throws an exception', () => {
         component.options = undefined;
         fixture.detectChanges();

         expect(() => component.ngOnInit()).toThrowError('st-horizontal-tabs-component: field options is a required field');
      });


      it('only if option list has one option at least and if active tab is not defined, first option is activated', () => {
         // without options
         component.options = [];
         component.activeOption = undefined;

         component.ngOnInit();

         expect(component.isActive(fakeOptions[0])).toBeFalsy();

         // with options
         component.options = fakeOptions;
         component.activeOption = undefined;

         component.ngOnInit();

         expect(component.isActive(fakeOptions[0])).toBeTruthy();
         expect(component.activeOption).toBe(fakeOptions[0].text);
      });

      it('if active option is defined, it will be used as the active option', () => {
         component.activeOption = fakeOptions[1].text;
         component.ngOnInit();

         expect(component.isActive(fakeOptions[1])).toBeTruthy();
      });

      it('the width of the tabs is calculated to distribute them along the container width', () => {
         expect(component.tabWidth).toBe(100 / fakeOptions.length + '%');
      });

      it ('line is positioned below the active tab', () => {
         component.activateOption(fakeOptions[1], 1);

         fixture.detectChanges();

         expect(component.linePosition).toBe(100 / fakeOptions.length + '%');

         component.activateOption(fakeOptions[2], 2);

         fixture.detectChanges();

         expect(component.linePosition).toBe(2 * 100 / fakeOptions.length + '%');

         component.activateOption(fakeOptions[0], 0);

         fixture.detectChanges();

         expect(component.linePosition).toBe(0 + '%');
      });
   });

   it('should be able to return if an option is active', () => {
      component.activeOption = fakeOptions[0].text;
      fixture.detectChanges();

      expect(component.isActive(fakeOptions[1])).toBeFalsy();
      expect(component.isActive(fakeOptions[0])).toBeTruthy();
   });

   describe('should be able to activate an option', () => {

      it('when active option is changed, active option name is updated', () => {
         component.activateOption(fakeOptions[1], 1);
         fixture.detectChanges();

         expect(component.activeOption).toBe(fakeOptions[1].text);
      });


      it('when active option is changed, an event is emitted with the active option name', () => {
         spyOn(component.changedOption, 'emit');

         component.activateOption(fakeOptions[0], 0);
         fixture.detectChanges();

         expect(component.changedOption.emit).toHaveBeenCalledWith(fakeOptions[0]);
      });

      it ('line is positioned below the active option', () => {
         component.activateOption(fakeOptions[1], 1);

         fixture.detectChanges();

         expect(component.linePosition).toBe(100 / fakeOptions.length + '%');

         component.activateOption(fakeOptions[2], 2);

         fixture.detectChanges();

         expect(component.linePosition).toBe(2 * 100 / fakeOptions.length + '%');

         component.activateOption(fakeOptions[0], 0);

         fixture.detectChanges();

         expect(component.linePosition).toBe(0 + '%');
      });

   });
});
