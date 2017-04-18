import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StTableCellComponent } from './st-table-cell.component';

let fixture: ComponentFixture<StTableCellComponent>;
let component: StTableCellComponent;

describe('StTableCellComponent', () => {

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [CommonModule, RouterTestingModule],
         declarations: [StTableCellComponent]
      });

      fixture = TestBed.createComponent(StTableCellComponent);
      component = fixture.componentInstance;
   });

   it('should be able to be initialized', () => {
      expect(component).toBeDefined();
   });
});
