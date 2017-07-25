import {
   Component,
   ChangeDetectionStrategy,
   OnInit,
   Input
} from '@angular/core';

import {
   ControlValueAccessor, FormControl, Validators
} from '@angular/forms';
import { StEgeo, StRequired } from '../../decorators/require-decorators';
import { StInputError } from "../../st-input/st-input.error.model";

@Component({
   selector: 'st-form-field',
   templateUrl: './st-form-field.component.html',
   styleUrls: ['./st-form-field.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

@StEgeo()
export class StFormFieldComponent implements ControlValueAccessor, OnInit {
   @Input() @StRequired() schema: any;
   @Input() required: boolean = false;
   @Input() formControl: FormControl = new FormControl('');
   @Input() errorMessages: StInputError;

   public type: string;

   private registeredOnChange: (_: any) => void;

   constructor() {
   }

   ngOnInit(): void {
      this.type = this.schema.value.type == 'string' ? 'text' : this.schema.value.type;
      if (this.required) {
         this.formControl.validator = Validators.compose([Validators.required]);
      }
      if (!this.errorMessages) {
         this.errorMessages = {
            generic: 'Error',
            required: 'This field is required',
            minLength: 'The field min length is ' + this.schema.value.minLength,
            maxLength: 'The field max length is ' + this.schema.value.maxLength,
            min: 'The number has to be higher than ' + this.schema.value.minimum,
            max: 'The number has to be minor than ' + this.schema.value.maximum,
            pattern: 'Invalid value'
         };
      }
   }

   writeValue(value: any): void {
      this.onChange(value);
   }

   registerOnChange(fn: (_: any) => void): void {
      this.registeredOnChange = fn;
   }

   registerOnTouched(fn: () => void): void {
   }

   getMin(): number {
      return this.schema.value.exclusiveMinimum ? this.schema.value.minimum : this.schema.value.minimum
   }

   getMax(): number {
      return this.schema.value.exclusiveMaximum ? this.schema.value.maximum : this.schema.value.maximum
   }

   onChange(value: any): void {
      if (this.registeredOnChange) {
         this.registeredOnChange(value);
      }
   }

}
