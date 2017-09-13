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
import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { StBreadCrumbsComponent } from './st-breadcrumbs.component';

describe('StBreadCrumbsComponent', () => {
   let component: StBreadCrumbsComponent;
   let fixture: ComponentFixture<StBreadCrumbsComponent>;

   const menuMock: string[] = ['section0', 'section1', 'section2', 'section3', 'section4', 'section5', 'section6'];
   const expectedIndexShowing5: number[] = [0, -1, 3, 4, 5, 6];
   const expectedIndexShowing10: number[] = [0, 1, 2, 3, 4, 5, 6];

   beforeEach(
      async(() => {
         TestBed.configureTestingModule({
            declarations: [StBreadCrumbsComponent],
            schemas: [NO_ERRORS_SCHEMA]
         }).compileComponents(); // compile template and css
      })
   );

   beforeEach(() => {
      fixture = TestBed.createComponent(StBreadCrumbsComponent);
      component = fixture.componentInstance;
      component.options = menuMock;
   });

   it('Should be initialized with elements to show set to 10 options', () => {
      component.elementsToShow = 10;
      fixture.detectChanges();

      expect(component.elementsToShow).toEqual(10);
      expect(component.indexArray).toEqual(expectedIndexShowing10);
   });

   it('And user clicks on an element, component emits the element position', () => {
      spyOn(component.select, 'emit');
      fixture.detectChanges();

      component.onSelect(2);
      expect(component.select.emit).toHaveBeenCalledWith(2);
   });

   it('If user clicks on the active element, nothing happens', () => {
      spyOn(component.select, 'emit');
      fixture.detectChanges();

      component.onSelect(6);
      expect(component.select.emit).not.toHaveBeenCalled();
   });

   it('Should show first element, 3 dots and the last 4 elements ', () => {
      fixture.detectChanges();

      expect(component.elementsToShow).toEqual(5);
      expect(component.indexArray).toEqual(expectedIndexShowing5);
   });

   it('Should emit real position when user click on dots', () => {
      fixture.detectChanges();

      spyOn(component.select, 'emit');
      component.onSelect(-1);
      expect(component.select.emit).toHaveBeenCalledWith(2);
   });

   it('Should get option when index is greater than -1', () => {
      fixture.detectChanges();
      expect(component.getOption(3)).toEqual(menuMock[3]);
   });

   it('Should get 3 dots when index is -1', () => {
      fixture.detectChanges();
      expect(component.getOption(-1)).toEqual('...');
   });

   it('Should recalculate initPos and elements to show when changes', () => {
      fixture.detectChanges();
      expect(component.indexArray).toEqual(expectedIndexShowing5);

      component.ngOnChanges({});
      expect(component.indexArray).toEqual(expectedIndexShowing5);

      component.ngOnChanges({ elementsToShow: new SimpleChange(5, 7, true) });
      component.elementsToShow = 7;

      expect(component.indexArray).toEqual([0, 1, 2, 3, 4, 5, 6]);

      component.options = [...menuMock, 'section7'];
      component.ngOnChanges({ options: new SimpleChange(menuMock, component.options, true)});
      expect(component.indexArray).toEqual([0, -1, 2, 3, 4, 5, 6, 7]);
   });
});
