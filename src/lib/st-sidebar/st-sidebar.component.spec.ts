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
import { ChangeDetectionStrategy } from '@angular/core';
import { StSidebarComponent } from './st-sidebar.component';

describe('StSidebar', () => {

   let component: StSidebarComponent;
   let fixture: ComponentFixture<StSidebarComponent>;
   let itemList: HTMLLIElement[];

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [],
         declarations: [StSidebarComponent]
      })
      // remove this block when the issue #12313 of Angular is fixed
         .overrideComponent(StSidebarComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
         })
         .compileComponents();  // compile template and css

   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StSidebarComponent);
      component = fixture.componentInstance;
      component.items = [
         { id: 'vault-roles', label: 'Vault Roles' },
         { id: 'identities', label: 'Identities' },
         { id: 'masters', label: 'Masters' },
         { id: 'agents', label: 'Agents' },
         { id: 'roles', label: 'Roles' }
      ];

      fixture.detectChanges();
      itemList = fixture.nativeElement.querySelectorAll('li');
   });

   it('st-sidebar class is added to the host tag', () => {
      let hostTag: HTMLButtonElement = fixture.nativeElement;

      expect(hostTag.classList).toContain('st-sidebar');
   });

   it('by default, first item is active if the active item is not introduced', () => {
      expect(itemList[0].classList).toContain('item__active');
   });

   it('if active item is updated from outside, it has to be updated as active', () => {
      // by default, first item is active
      expect(itemList[0].classList).toContain('item__active');

      // active is changed from outside
      component.active = component.items[4].id;
      fixture.detectChanges();

      expect(itemList[4].classList).toContain('item__active');
      expect(itemList[0].classList).not.toContain('item__active');

   });

   describe('When user clicks on a tab', () => {

      it('When user clicks on a tab, event is emitted if it was not already activated', () => {
         spyOn(component.change, 'emit');
         itemList[2].click();

         expect(component.change.emit).toHaveBeenCalledWith(component.items[2].id);

         (<jasmine.Spy> component.change.emit).calls.reset();
         component.active = component.items[2].id;

         itemList[2].click();

         fixture.detectChanges();
         expect(component.change.emit).not.toHaveBeenCalled();

         itemList[3].click();

         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();

         expect(component.change.emit).toHaveBeenCalledWith(component.items[3].id);
      });

      it('this tab is displayed as active one', () => {
         component.active = component.items[2].id;
         fixture.detectChanges();

         expect(itemList[2].classList).toContain('item__active');
      });
   });

   it('It should be able to add any class to an specific item', () => {
      component.items[2].class = 'warning';
      fixture.detectChanges();

      expect(itemList[2].classList).toContain('warning');
   });
});
