import {
   Component,
   Input,
   Output,
   ChangeDetectionStrategy,
   EventEmitter,
   AfterViewChecked,
   OnInit
} from '@angular/core';
import {
   FormControl,
   FormArray,
   ControlValueAccessor,
   Validators, FormGroup
} from '@angular/forms';

import { validations } from '../../share/barrels';

@Component({
   selector: 'st-form-list',
   templateUrl: './form-list.html',
   styleUrls: ['./form-list.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StFormListComponent implements ControlValueAccessor, AfterViewChecked, OnInit {
   @Input() stModel: Array<any>;
   @Input() field: any;
   @Input() name: string = '';
   @Output() stModelChange: EventEmitter<any> = new EventEmitter<any>();
   @Input() placeholder: string;
   @Input() isRequired: boolean;
   @Input() errorMessage: string;
   @Input() stFormGroup: FormGroup = new FormGroup({});
   @Input() minItems: number;
   @Input() maxItems: number;
   @Input() disabled: boolean = false;
   @Input() allowDuplicates: boolean = true;

   formArray: FormArray;
   newItemList: Array<any> = [];
   private registeredOnChange: (_: any) => void;
   private formControls: Array<FormControl> = [];

   ngOnInit(): void {
      this.stFormGroup.addControl(this.name, new FormArray(this.formControls));
      this.formArray = <FormArray>this.stFormGroup.controls[this.name];
      if (this.stModel === undefined) {
         this.stModel = [];
      } else {
         for (let i = 0; i < this.stModel.length; ++i) {
            this.addItem(i);
         }
      }
      if (this.isRequired && this.stModel.length === 0) {
         this.addItem(this.stModel.length);
      }
      this.checkValidations();
   }

   ngAfterViewChecked(): void {
      this.checkValidations();
   }

   writeValue(value: any): void {
      this.onChange(value);
   }

   registerOnChange(fn: (_: any) => void): void {
      this.registeredOnChange = fn;
   }

   registerOnTouched(fn: () => void): void {
   }

   onChange(value: Array<any>): void {
      value = value || [];
      this.stModel = value;
      this.stModelChange.emit(value);
      if (this.registeredOnChange) {
         this.registeredOnChange(value);
      }
   }

   checkValidations(): void {
      let _validations: any = [];
      if (this.isRequired) {
         _validations.push(Validators.required);
         _validations.push(validations.validateMinLength(1));
      }
      if (this.isRequired || (this.stModel && this.stModel.length > 0)) {
         if (this.minItems > 0) {
            _validations.push(validations.validateMinLength(this.minItems));
         }
         if (this.maxItems > 0) {
            _validations.push(validations.validateMaxLength(this.maxItems));
         }
      }
      if (!this.allowDuplicates) {
         _validations.push(validations.validateNoDuplicatedItems());
      }
      this.formArray.validator = Validators.compose(_validations);
      this.formArray.updateValueAndValidity({ emitEvent: true, onlySelf: false });
   }

   addItem(index: number): void {
      this.newItemList.push(index);
      this.stModel.push();
      let formControl = new FormControl({ value: '' });
      this.formArray.push(formControl);
      this.onChange(this.stModel);
   };

   removeItem(index: number): void {
      if (index >= 0 && index < this.stModel.length) {
         let indexInChangeArray = this.newItemList.indexOf(index);
         this.newItemList[indexInChangeArray] = undefined;
         for (let i = indexInChangeArray; i < this.newItemList.length; ++i) {
            if (this.newItemList[i] !== undefined) {
               let value = this.newItemList[i];
               this.newItemList[i] = value - 1;
            }
         }
         this.stModel.splice(index, 1);
         this.formControls.splice(index, 1);
         this.onChange(this.stModel);
         this.checkValidations();
      }
   };

   showHelpTip(): boolean {
      return this.minItems > 0 && this.stModel && this.stModel.length > 0;
   }

   showDuplicatedItemError(): boolean {
      let errors: any = this.formArray.errors;
      return errors && errors.repeatedItems !== undefined;
   }

   generatePropertyName(i: number): string {
      return this.field.value.title.split(' ').join('-') + '-' + i;
   }
}
