import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { StFormLabelModule } from '../utils/egeo-form/st-form-label/st-form-label.module';
import { StSwitchComponent } from './st-switch.component';

let fixture: ComponentFixture<StSwitchComponent>;
let component: StSwitchComponent;
let model: boolean = true;
let formGroup: FormGroup;

describe('StSwitchComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StFormLabelModule],
         declarations: [StSwitchComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      formGroup = new FormGroup(
         { requiredSwitch: new FormControl({ value: this.model, disabled: false }, Validators.required) }
      );

      fixture = TestBed.createComponent(StSwitchComponent);
      component = fixture.componentInstance;
      component.stModel = false;
      component.qaTag = 'qa tag';
   });

   it('if model is not introduced as input, it throws an error', () => {
      component.stModel = undefined;
      try {
         component.ngOnInit();
         fixture.detectChanges();
         expect(component.stModel).toThrow();
      } catch (error) {
         expect(error.message).toContain('st-switch-component: field stModel is a required field');
      }
   });

   it('if qa tag is not introduced as input, it throws an error', () => {
      component.qaTag = undefined;

      try {
         component.ngOnInit();
         fixture.detectChanges();
         expect(component.qaTag).toThrow();
      } catch (error) {
         expect(error.message).toContain('st-switch-component: field qaTag is a required field');
      }
   });

   it('qa tag is added as id to the clickable element', () => {
      let qaTag = 'fakeQATag';
      component.qaTag = qaTag;
      component.ngOnInit();
      fixture.detectChanges();
      fixture.changeDetectorRef.markForCheck();

      let clickableElement: HTMLElement = fixture.nativeElement.querySelector('#' + qaTag);

      expect(clickableElement).toBeDefined();
      expect(clickableElement.click).toBeDefined();
   });

   describe('when it is initialised', () => {
      it('an internal form control is created with the associated model', () => {
         component.stModel = model;
         component.ngOnInit();
         fixture.detectChanges();

         expect(component.internalFormControl.disabled).toBeFalsy();
      });
   });

   describe('Should update its class when disabled attribute changes', () => {
      beforeEach(() => {
         component.stModel = model;
         component.ngOnInit();
      });

      it('if it is disabled, class "st-switch--disabled" has to be added to toggle', () => {
         component.setDisabledState(true);
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('.st-switch__toggle').classList).toContain('st-switch--disabled');
      });

      it('if it is enabled, class "st-switch--disabled" hos to be removed from toggle', () => {
         component.setDisabledState(false);
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('.st-switch__toggle').classList).not.toContain('st-switch--disabled');
      });
   });

   describe('should listen any external change and update internal form control and model', () => {
      let newValue: boolean = false;
      beforeEach(() => {
         component.ngOnInit();
         component.writeValue(newValue);
      });

      it('internal form control and model are updated with new value', () => {
         expect(component.internalFormControl.value).toBe(newValue);
         expect(component.stModel).toBe(newValue);
      });
   });

   describe('when user clicks on toggle', () => {
      beforeEach(() => {
         spyOn(component.change, 'emit');
         component.stModel = false;
         component.ngOnInit();
      });
      it('if switch is not disabled, model has to change', () => {
         component.disabled = false;
         // put switch to off
         component.stModel = false;
         fixture.detectChanges();

         let switchBox: HTMLDivElement = fixture.nativeElement.querySelector('.st-switch__toggle');
         switchBox.click();
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();

         expect(component._stModel).toBeTruthy();
         expect(component.change.emit).toHaveBeenCalledWith(true);
         expect(switchBox.classList).toContain('st-switch--on');

         switchBox.click();
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();

         expect(component._stModel).toBeFalsy();
         expect(component.change.emit).toHaveBeenCalledWith(false);
         expect(switchBox.classList).toContain('st-switch--off');
      });

      it('if switch is disabled, no changes are executed', () => {
         component.disabled = true;
         // put switch to off
         component.stModel = false;
         fixture.detectChanges();

         let switchBox: HTMLDivElement = fixture.nativeElement.querySelector('.st-switch__toggle');
         switchBox.click();
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();

         expect(component._stModel).toBeFalsy();
         expect(component.change.emit).not.toHaveBeenCalled();
         expect(switchBox.classList).toContain('st-switch--off');

         switchBox.click();
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();

         expect(component._stModel).toBeFalsy();
         expect(component.change.emit).not.toHaveBeenCalled();
         expect(switchBox.classList).toContain('st-switch--off');
      });
   });

   describe('label is positioned according to the input labelPosition', () => {
      beforeEach(() => {
         component.stModel = false;
      });
      it('label is placed on top, when labelPosition is "top"', () => {
         component.labelPosition = 'top';
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let label: HTMLElement = fixture.nativeElement.querySelector('.st-switch__label');

         expect(label.classList).toContain('st-switch__label--top');
      });

      it('label is placed on the left, when labelPosition is "left"', () => {
         component.labelPosition = 'left';
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let label: HTMLElement = fixture.nativeElement.querySelector('.st-switch__label');

         expect(label.classList).toContain('st-switch__label--left');
      });

      it('label is placed on the right, when labelPosition is "right"', () => {
         component.labelPosition = 'right';
         fixture.detectChanges();
         fixture.changeDetectorRef.markForCheck();
         let label: HTMLElement = fixture.nativeElement.querySelector('.st-switch__label');

         expect(label.classList).toContain('st-switch__label--right');
      });

   });

   it('Callback function is initialized on registerOnChange function in order to be called when there is a change', () => {
      let callbackFunction = jasmine.createSpy('callbackFunction');
      component.ngOnInit();

      component.registerOnChange(callbackFunction);

      component.onChange(true);

      expect(callbackFunction).toHaveBeenCalledWith(true);
   });

});
