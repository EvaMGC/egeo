import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Order, ORDER_TYPE } from './shared/order';
import { RouterTestingModule } from '@angular/router/testing';
import { StTableComponent } from './st-table.component';

let fixture: ComponentFixture<StTableComponent>;
let component: StTableComponent;
let fakeFields = ['id', 'name', 'lastName', 'phone'];

describe('StTableComponent', () => {

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [CommonModule, RouterTestingModule],
         declarations: [StTableComponent]
      });

      fixture = TestBed.createComponent(StTableComponent);
      component = fixture.componentInstance;
      component.fields = fakeFields;
      component.qaTag = 'fake qa tag';

   });

   describe('If developer does not specify some inputs, they will be set by default', () => {
      beforeEach(() => {
         fixture.detectChanges();
      });
      it('header is shown by default', () => {
         expect(component.header).toBeTruthy();
      });

      it('table is sortable by default', () => {
         expect(component.sortable).toBeTruthy();
      });
   });

   it('If fields input is not introduced, it throws an error', () => {
      component.fields = undefined;
      try {
         fixture.detectChanges();
         expect(component.fields).toThrow();
      } catch (error) {
         expect(error.message).toContain('st-table-component: field fields is a required field');
      }
   });

   it('If qa tag input is not introduced, it throws an error', () => {
      component.qaTag = undefined;
      try {
         fixture.detectChanges();
         expect(component.qaTag).toThrow();
      } catch (error) {
         expect(error.message).toContain('st-table-component: field qaTag is a required field');
      }
   });

   describe('Should return if table is currently sorted by a specific field and a direction', () => {
      beforeEach(() => {
         fixture.detectChanges();
      });

      it('if current order is not defined yet, all header fields will be displayed with a down arrow', () => {
         component.currentOrder = undefined;
         fixture.detectChanges();
         let headerItems: HTMLTableHeaderCellElement[] = fixture.nativeElement.querySelectorAll('.st-table__header-item');

         for (let i = 0; i < headerItems.length; ++i) {
            let headerItem = headerItems[i];
            expect(Array.from(headerItem.querySelector('.st-table__order-arrow').classList)[1]).toBe('icon-arrow2_down');
         }

      });

      it('if table is sort by the introduced field but not in the specified direction, it returns false', () => {
         component.currentOrder = new Order(fakeFields[0], ORDER_TYPE.ASC);

         expect(component.isSortedByFieldAndDirection(fakeFields[0], ORDER_TYPE.DESC)).toBeFalsy();

         component.currentOrder = new Order(fakeFields[0], ORDER_TYPE.DESC);

         expect(component.isSortedByFieldAndDirection(fakeFields[0], ORDER_TYPE.ASC)).toBeFalsy();
      });

      it('if table is sort in the specified direction but not by the introduced field, it returns false', () => {
         component.currentOrder = new Order(fakeFields[0], ORDER_TYPE.ASC);

         expect(component.isSortedByFieldAndDirection(fakeFields[2], ORDER_TYPE.ASC)).toBeFalsy();

         component.currentOrder = new Order(fakeFields[0], ORDER_TYPE.DESC);

         expect(component.isSortedByFieldAndDirection(fakeFields[2], ORDER_TYPE.DESC)).toBeFalsy();
      });

      it('if table is sort by that field and in the specified direction, it returns true', () => {
         component.currentOrder = new Order(fakeFields[0], ORDER_TYPE.ASC);

         expect(component.isSortedByFieldAndDirection(fakeFields[0], ORDER_TYPE.ASC)).toBeTruthy();

         component.currentOrder = new Order(fakeFields[0], ORDER_TYPE.DESC);

         expect(component.isSortedByFieldAndDirection(fakeFields[0], ORDER_TYPE.DESC)).toBeTruthy();
      });

   });


   describe('When user clicks on a field in the table header, order is changed', () => {
      beforeEach(() => {
         spyOn(component.changeOrder, 'emit');
         fixture.detectChanges();
      });
      it('if field is different to the current order`s one, current order is changed to the selected field and in direction ASC', () => {
         component.currentOrder = new Order(fakeFields[0], ORDER_TYPE.ASC);

         let headerItem: HTMLTableHeaderCellElement = fixture.nativeElement.querySelectorAll('.st-table__header-item')[1];
         headerItem.click();
         fixture.changeDetectorRef.markForCheck();
         fixture.detectChanges();

         expect(component.currentOrder.orderBy).toBe(fakeFields[1]);
         expect(component.currentOrder.type).toBe(ORDER_TYPE.ASC);
         // also order arrow is updated

         fixture.changeDetectorRef.markForCheck();
         fixture.detectChanges();

         expect(Array.from(headerItem.querySelector('.st-table__order-arrow').classList)[1]).toBe('icon-arrow2_up');
         expect(component.changeOrder.emit).toHaveBeenCalledWith(component.currentOrder);
      });

      it('if field is the same to the current order`s one, only order direction is changed', () => {
         // ascent sorting
         component.currentOrder = new Order(fakeFields[1], ORDER_TYPE.ASC);
         let headerItem: HTMLTableHeaderCellElement = fixture.nativeElement.querySelectorAll('.st-table__header-item')[1];
         headerItem.click();
         fixture.detectChanges();

         expect(component.currentOrder.orderBy).toBe(fakeFields[1]);
         expect(component.currentOrder.type).toBe(ORDER_TYPE.DESC);
         // also order arrow is updated
         expect(Array.from(headerItem.querySelector('.st-table__order-arrow').classList)[1]).toBe('icon-arrow2_down');

         expect(component.changeOrder.emit).toHaveBeenCalledWith(component.currentOrder);

         // descent sorting
         component.currentOrder = new Order(fakeFields[1], ORDER_TYPE.DESC);
         headerItem.click();
         fixture.detectChanges();

         expect(component.currentOrder.orderBy).toBe(fakeFields[1]);
         expect(component.currentOrder.type).toBe(ORDER_TYPE.ASC);
         // also order arrow is updated
         expect(Array.from(headerItem.querySelector('.st-table__order-arrow').classList)[1]).toBe('icon-arrow2_up');

         expect(component.changeOrder.emit).toHaveBeenCalledWith(component.currentOrder);
      });

      it('if field is undefined, order is not changed', () => {
         component.currentOrder = new Order(fakeFields[1], ORDER_TYPE.DESC);

         component.onChangeOrder(undefined);
         fixture.detectChanges();

         expect(component.currentOrder.orderBy).toBe(fakeFields[1]);
         expect(component.currentOrder.type).toBe(ORDER_TYPE.DESC);
         expect(component.changeOrder.emit).not.toHaveBeenCalled();
      });

      it('should display in bold the field`s header which table is sorted by', () => {
         let headerItem: HTMLTableHeaderCellElement = fixture.nativeElement.querySelectorAll('.st-table__header-item')[1];
         headerItem.click();
         fixture.changeDetectorRef.markForCheck();
         fixture.detectChanges();

         expect(headerItem.classList).toContain('st-table__header-item--selected');
      });

   });

});
