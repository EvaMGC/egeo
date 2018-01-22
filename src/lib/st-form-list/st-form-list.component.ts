import {
   Component,
   Input,
   ChangeDetectionStrategy,
   OnInit,
   Output,
   EventEmitter,
   ChangeDetectorRef
} from '@angular/core';
import { FormControl, FormArray, ControlValueAccessor, FormGroup } from '@angular/forms';


@Component({
   selector: 'st-form-list',
   templateUrl: './st-form-list.html',
   styleUrls: ['./st-form-list.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StFormListComponent implements ControlValueAccessor, OnInit {
   @Input() schema: any;
   @Input() model: Array<any>;
   @Input() formArray: FormArray;
   @Input() buttonLabel: string = 'Add';

   @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

   // @Input() name: string = '';
   // @Input() field: any;
   // @Input() placeholder: string;
   // @Input() isRequired: boolean;
   // @Input() errorMessage: string;
   // @Input() stFormGroup: FormGroup = new FormGroup({});
   // @Input() minItems: number;
   // @Input() maxItems: number;
   // @Input() disabled: boolean = false;
   // @Input() allowDuplicates: boolean = true;

   newItemList: Array<any> = [];
   private registeredOnChange: (_: any) => void;

   constructor(private _cd: ChangeDetectorRef) {
      this.formArray = new FormArray([]);
   }

   ngOnInit(): void {
      if (!this.model) {
         this.model = [];
      } else {
         for (let i = 0; i < this.model.length; ++i) {
            this.addItem(i);
         }
      }
   }

   addItem(index: number): void {
      this.model.push();
      let formGroup = new FormGroup({});
      for (let i = 0; i < Object.keys(this.schema.properties).length; ++i) {
         formGroup.addControl(Object.keys(this.schema.properties)[i], new FormControl());
      }
      this.formArray.push(formGroup);
      this.newItemList.push(index);
      this.onChange(this.model);
      this._cd.markForCheck();
   };

   isRequired(propertyName: string): boolean {
      return propertyName && this.schema.required && this.schema.required.indexOf(propertyName) !== -1;
   }

   // ngOnInit(): void {
   //    this.stFormGroup.addControl(this.name, new FormArray(this.formControls));
   //    this.formArray = <FormArray>this.stFormGroup.controls[this.name];
   //    if (this.stModel === undefined) {
   //       this.stModel = [];
   //    } else {
   //       for (let i = 0; i < this.stModel.length; ++i) {
   //          this.addItem(i);
   //       }
   //    }
   //    if (this.isRequired && this.stModel.length === 0) {
   //       this.addItem(this.stModel.length);
   //    }
   //    this.checkValidations();
   // }
   //
   ngAfterViewChecked(): void {
      // this.checkValidations();
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
      this.model = value;
      this.modelChange.emit(value);
      if (this.registeredOnChange) {
         this.registeredOnChange(value);
      }
   }

   //
   // checkValidations(): void {
   //    let _validations: any = [];
   //    if (this.isRequired) {
   //       _validations.push(Validators.required);
   //       _validations.push(Validators.minLength(1));
   //    }
   //    if (this.isRequired || (this.stModel && this.stModel.length > 0)) {
   //       if (this.minItems > 0) {
   //          _validations.push(Validators.minLength(this.minItems));
   //       }
   //       if (this.maxItems > 0) {
   //          _validations.push(Validators.maxLength(this.maxItems));
   //       }
   //    }
   //    if (!this.allowDuplicates) {
   //       _validations.push(Validators.validateNoDuplicatedItems());
   //    }
   //    this.formArray.validator = Validators.compose(_validations);
   //    this.formArray.updateValueAndValidity({ emitEvent: true, onlySelf: false });
   // }
   //

   //
   // removeItem(index: number): void {
   //    if (index >= 0 && index < this.stModel.length) {
   //       let indexInChangeArray = this.newItemList.indexOf(index);
   //       this.newItemList[indexInChangeArray] = undefined;
   //       for (let i = indexInChangeArray; i < this.newItemList.length; ++i) {
   //          if (this.newItemList[i] !== undefined) {
   //             let value = this.newItemList[i];
   //             this.newItemList[i] = value - 1;
   //          }
   //       }
   //       this.stModel.splice(index, 1);
   //       this.formControls.splice(index, 1);
   //       this.onChange(this.stModel);
   //       this.checkValidations();
   //    }
   // };
   //
   // showHelpTip(): boolean {
   //    return this.minItems > 0 && this.stModel && this.stModel.length > 0;
   // }
   //
   // showDuplicatedItemError(): boolean {
   //    let errors: any = this.formArray.errors;
   //    return errors && errors.repeatedItems !== undefined;
   // }
   //
   // generatePropertyName(i: number): string {
   //    return this.field.value.title.split(' ').join('-') + '-' + i;
   // }
}
