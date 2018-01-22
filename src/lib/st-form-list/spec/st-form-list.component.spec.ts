import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StFormListComponent } from '../st-form-list.component';
import { TWO_INPUTS_JSON_SCHEMA } from './resources/two-inputs-json-schema';
import { StInputModule } from '../../st-input/st-input.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StFormFieldComponent } from '../../st-form/st-form-field/st-form-field.component';
import { PipesModule } from '../../pipes/pipes.module';
import { StFormDirectiveModule } from '../../directives/form/form-directives.module';

let component: StFormListComponent;
let fixture: ComponentFixture<StFormListComponent>;

fdescribe('[StFormList]', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StInputModule, PipesModule, StFormDirectiveModule],
         declarations: [StFormListComponent, StFormFieldComponent],
         schemas: [NO_ERRORS_SCHEMA]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StFormListComponent);
      component = fixture.componentInstance;
   });


   describe('should allow to customize the label of the button to add more items', () => {
      it('if button label is not introduced as input, a default label is displayed', () => {
         fixture.detectChanges();
         expect(fixture.nativeElement.querySelector('.button.button-link-primary').innerText).toContain('Add');
      });

      it('if label is introduced as input, it is added to the button', () => {
         let buttonLabel = 'Add items';
         component.buttonLabel = 'Add items';
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('.button.button-link-primary').innerText).toContain(buttonLabel);
      });

   });

   describe('should be able to create an array of items', () => {
      beforeEach(() => {
         component.schema = TWO_INPUTS_JSON_SCHEMA;
         fixture.detectChanges();
      });

      it('items are loaded according to a json schema', () => {
         fixture.nativeElement.querySelector('.button.button-link-primary').click();
         fixture.detectChanges();

         let controls = fixture.nativeElement.querySelectorAll('input');

         expect(controls.length).toBe(Object.keys(TWO_INPUTS_JSON_SCHEMA.properties).length);
         for (let i = 0; i < Object.keys(TWO_INPUTS_JSON_SCHEMA.properties).length; ++i) {
            expect(controls[i].name).toBe(Object.keys(TWO_INPUTS_JSON_SCHEMA.properties)[i]);
         }
      });

      fit('array is loaded according to the model introduced as input', () => {
         let fakeModel: Array<any> = [
            { genericNumberInput: 8, genericTextInput: 'fake text 1' },
            { genericNumberInput: 20, genericTextInput: 'fake text 2' }
         ];
         component.model = fakeModel;
         component.ngOnInit();
         fixture.detectChanges();

         let rows = fixture.nativeElement.querySelectorAll('.st-form-list__row');
         let formArrayControls = component.formArray.controls;

         expect(rows.length).toBe(fakeModel.length);
         expect(formArrayControls.length).toBe(fakeModel.length);

         let itemProperties = Object.keys(TWO_INPUTS_JSON_SCHEMA.properties);
         for (let i = 0; i <rows.length; ++i) {
            let inputs: HTMLInputElement[] = rows[i].querySelectorAll('input');
            expect(inputs[0].name).toBe(itemProperties[0]);
            expect(inputs[0].value).toEqual(String(fakeModel[i][itemProperties[0]]));
            expect(component.formArray.controls[i].controls[itemProperties[0]].value).toEqual(fakeModel[i][itemProperties[0]]);

            expect(inputs[1].name).toBe(itemProperties[1]);
            expect(inputs[1].value).toEqual(String(fakeModel[i][itemProperties[1]]));
            expect(component.formArray.controls[i].controls[itemProperties[1]].value).toEqual(fakeModel[i][itemProperties[1]]);
         }
      });
   });


   // describe('should be able to control if items can be repeated or not', () => {
   //    let item = 'new item';
   //    it('if input "allowDuplicates" is true, then user can introduced the same item two times', () => {
   //       component.allowDuplicates = true;
   //
   //       component.addItem(0);
   //       (<FormControl>component.formArray.controls[0]).patchValue(item);
   //
   //       component.checkValidations();
   //
   //       expect(component.formArray.valid).toBeTruthy();
   //
   //       component.addItem(1);
   //       (<FormControl>component.formArray.controls[1]).patchValue(item);
   //       component.checkValidations();
   //
   //       expect(component.formArray.valid).toBeTruthy();
   //    });
   //
   //    it('if input "allowDuplicates" is false, then user can not introduced the same item two times', () => {
   //       component.allowDuplicates = false;
   //       component.addItem(0);
   //       (<FormControl>component.formArray.controls[0]).patchValue(item);
   //
   //       component.checkValidations();
   //
   //       expect(component.formArray.valid).toBeTruthy();
   //
   //       component.addItem(1);
   //       (<FormControl>component.formArray.controls[1]).patchValue(item);
   //       component.checkValidations();
   //
   //       expect(component.formArray.valid).toBeFalsy();
   //    });
   //
   //    it('Alert is shown if list does not allow duplicated items and user introduces a duplicated one', () => {
   //       component.allowDuplicates = false;
   //       component.addItem(0);
   //       (<FormControl>component.formArray.controls[0]).patchValue(item);
   //
   //       component.checkValidations();
   //
   //       expect(component.formArray.valid).toBeTruthy();
   //
   //       component.addItem(1);
   //       (<FormControl>component.formArray.controls[1]).patchValue(item);
   //       component.checkValidations();
   //
   //       expect(component.showDuplicatedItemError()).toBeTruthy();
   //    });
   // });
});
