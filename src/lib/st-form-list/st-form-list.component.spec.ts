import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { StFormListComponent } from './st-form-list.component';
import { StInputModule } from '../st-input/st-input.module';

describe('[StFormList]', () => {

   let component: StFormListComponent;
   let fixture: ComponentFixture<StFormListComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StInputModule],
         declarations: [StFormListComponent]
      })
         .compileComponents();  // compile template and css
   }));


   beforeEach(() => {
      fixture = TestBed.createComponent(StFormListComponent);
      component = fixture.componentInstance;
      component.name = 'fakeProperty';
   });

   describe('should be able to control if items can be repeated or not', () => {
      let item = 'new item';
      it('if input "allowDuplicates" is true, then user can introduced the same item two times', () => {
         component.allowDuplicates = true;

         component.addItem(0);
         (<FormControl>component.formArray.controls[0]).patchValue(item);

         component.checkValidations();

         expect(component.formArray.valid).toBeTruthy();

         component.addItem(1);
         (<FormControl>component.formArray.controls[1]).patchValue(item);
         component.checkValidations();

         expect(component.formArray.valid).toBeTruthy();
      });

      it('if input "allowDuplicates" is false, then user can not introduced the same item two times', () => {
         component.allowDuplicates = false;
         component.addItem(0);
         (<FormControl>component.formArray.controls[0]).patchValue(item);

         component.checkValidations();

         expect(component.formArray.valid).toBeTruthy();

         component.addItem(1);
         (<FormControl>component.formArray.controls[1]).patchValue(item);
         component.checkValidations();

         expect(component.formArray.valid).toBeFalsy();
      });

      it('Alert is shown if list does not allow duplicated items and user introduces a duplicated one', () => {
         component.allowDuplicates = false;
         component.addItem(0);
         (<FormControl>component.formArray.controls[0]).patchValue(item);

         component.checkValidations();

         expect(component.formArray.valid).toBeTruthy();

         component.addItem(1);
         (<FormControl>component.formArray.controls[1]).patchValue(item);
         component.checkValidations();

         expect(component.showDuplicatedItemError()).toBeTruthy();
      });
   });
});
