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
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StTableRowComponent } from './st-table-row.component';

let fixture: ComponentFixture<StTableRowComponent>;
let component: StTableRowComponent;

describe('StTableRowComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [CommonModule, RouterTestingModule],
         declarations: [StTableRowComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTableRowComponent);
      component = fixture.componentInstance;
   });

   describe('should be able to listen when mouse is over it', () => {
      beforeEach(() => {
         fixture.nativeElement.dispatchEvent(new Event('mouseover'));
         fixture.detectChanges();
      });
      it('boolean variable is updated', () => {
         expect(component.showHoverMenu).toBeTruthy();
      });

      it('hover menu is displayed at the end of row', () => {
         let cells = fixture.nativeElement.children;
         let hoverMenu = fixture.nativeElement.children[cells.length - 1];

         expect(hoverMenu.classList).toContain('hover-menu--show');
      });
   });

   describe('should be able to listen when mouse goes out from it', () => {
      beforeEach(() => {
         fixture.nativeElement.dispatchEvent(new Event('mouseout'));
         fixture.detectChanges();
      });
      it('boolean variable is updated', () => {
         expect(component.showHoverMenu).toBeFalsy();
      });

      it('hover menu is hidden', () => {
         let cells = fixture.nativeElement.children;
         let hoverMenu = fixture.nativeElement.children[cells.length - 1];

         expect(hoverMenu.classList).not.toContain('hover-menu--show');
      });
   });

   describe('user can define if row will be stood up when it is selected or not', () => {
      beforeEach(() => {
         component.selected = true;
         fixture.detectChanges();
      });

      it('by default, row is stood up', () => {
         expect(fixture.nativeElement.classList).toContain('selected');
      });

      it('if user puts the input standUpSelected to false, row is not stood up', () => {
         component.standUpSelected = false;
         fixture.detectChanges();

         expect(fixture.nativeElement.classList).not.toContain('selected');
      });

      it('if user puts the input standUpSelected to true, row is stood up', () => {
         component.standUpSelected = true;
         fixture.detectChanges();

         expect(fixture.nativeElement.classList).toContain('selected');
      });
   });
});
