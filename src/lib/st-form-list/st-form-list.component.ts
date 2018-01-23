import {
   Component,
   Input,
   ChangeDetectionStrategy,
   OnInit,
   ChangeDetectorRef,
   forwardRef, OnChanges, SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
   selector: 'st-form-list',
   templateUrl: './st-form-list.html',
   styleUrls: ['./st-form-list.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StFormListComponent), multi: true }
   ]
})
export class StFormListComponent implements ControlValueAccessor, OnInit, OnChanges {
   @Input() schema: any;
   @Input() buttonLabel: string = 'Add';
   @Input() disabled = false;
   // @Output() modelChange: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

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

   private registeredOnChange: (_: any) => void;
   private _value: Array<any> = [];


   @Input()
   get value(): any {
      return this._value;
   }

   set value(value: any) {
      this._value = value;

      if (value !== this._value) {
         this._value = value;
         this.onChange(value);
      }
      this._cd.markForCheck();
   }
   // onChange = (value: Array[]) => {
   // };

   // Function to call when the input is touched (when a star is clicked).
   onTouched = () => {
   };

   ngOnChanges(changes: SimpleChanges): void {
      this.updateFormArray();
   }

   // @Input()
   // get model(): Array<any> {
   //    return this._model;
   // }
   //
   // set model(model: Array<any>) {
   //    if (model) {
   //       this._model = [];
   //       model.forEach(item => this._model.push(item));
   //       this.updateFormArray();
   //    }
   // }

   constructor(private _cd: ChangeDetectorRef) {
   }

   ngOnInit(): void {
      // this.updateFormArray();
   }

   addItem(): void {
      this.value.push({});
      this.onChange(this.value);
   };

   isRequired(propertyName: string): boolean {
      return propertyName && this.schema.required && this.schema.required.indexOf(propertyName) !== -1;
   }

   // Allows Angular to update the model (list).
   // Update the model and changes needed for the view here.
   writeValue(value: Array<any>): void {
      if (value !== this._value) {
         this._value = value;
      }
      this._cd.markForCheck();
   }



   // Allows Angular to register a function to call when the model (list) changes.
   // Save the function as a property to call later here.
   registerOnChange(fn: (value: Array<any>) => void): void {
      this.onChange = fn;
   }

   // Allows Angular to register a function to call when the list has been touched.
   // Save the function as a property to call later here.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   // Allows Angular to disable the list.
   setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
   }

   // Function to call when the value changes.
   onChange(value: Array<any>): void {
      value = value || [];
      this.value = value;
      if (this.registeredOnChange) {
         this.registeredOnChange(value);
      }
      this._cd.markForCheck();
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


   // validate(control: FormControl): any {
   //    // if (this.sub) {
   //    //    this.sub.unsubscribe();
   //    // }
   //    // this.sub = control.statusChanges.subscribe(() => this.checkErrors(control));
   // }

   // ngOnChanges(change: any): void {
   //    // if (this.forceValidations) {
   //    //    this.writeValue(this.internalControl.value);
   //    // }
   //    // this._cd.markForCheck();
   // }

   // writeValue(value: any): void {
   //    this.onChange(value);
   // }

   // registerOnChange(fn: (_: any) => void): void {
   //    this.registeredOnChange = fn;
   // }

   // registerOnTouched(fn: () => void): void {
   // }



   // private generateItemFormGroup(rowValue?: any): FormGroup {
   //    // let formGroup = new FormGroup({});
   //    // let propertyNames: string[] = Object.keys(this.schema.properties);
   //    // for (let j = 0; j < propertyNames.length; ++j) {
   //    //    const value: any = rowValue ? rowValue[propertyNames[j]] : '';
   //    //    let formControl: FormControl = new FormControl(value);
   //    //    formGroup.addControl(propertyNames[j], formControl);
   //    // }
   //    // return formGroup;
   // }

   private updateFormArray(): void {
      // this.formArray.controls = [];
      // console.log(this.value);
      // if (this.value) {
      //    for (let i = 0; i < this.value.length; ++i) {
      //       this.formArray.push(this.generateItemFormGroup(this.value[i]));
      //    }
      // }
      // console.log(this.formArray.controls);
      // this._cd.markForCheck();
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
