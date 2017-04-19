import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StTableRowComponent } from './st-table-row.component';

let fixture: ComponentFixture<StTableRowComponent>;
let component: StTableRowComponent;

describe('StTableRowComponent', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [CommonModule, RouterTestingModule],
         declarations: [StTableRowComponent]
      });
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(StTableRowComponent);
      component = fixture.componentInstance;
   });

   it ('theme class is added to the component root', () => {
      expect(fixture.nativeElement.classList).toContain('sth-table-row');
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

   describe('should displayed compacted or not', () => {
      it('if compacted input is true, compacted class is added to it', () => {
         component.compacted = true;
         fixture.detectChanges();

         expect(fixture.nativeElement.classList).toContain('sth-table-row--compacted');
      });

      it('if compacted input is false, compacted class is not added to it', () => {
         component.compacted = false;
         fixture.detectChanges();

         expect(fixture.nativeElement.classList).not.toContain('sth-table-row--compacted');
      });
   });
});
