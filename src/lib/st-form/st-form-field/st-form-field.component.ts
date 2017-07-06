import {
   Component,
   ChangeDetectionStrategy,
   OnInit,
   Input
} from '@angular/core';

import {
   ControlValueAccessor
} from '@angular/forms';
import {StEgeo, StRequired} from '../../decorators/require-decorators';

@Component({
   selector: 'st-form-field',
   templateUrl: './st-form-field.component.html',
   styleUrls: ['./st-form-field.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

@StEgeo()
export class StFormFieldComponent implements ControlValueAccessor, OnInit {
   @Input() @StRequired() schema: any;

   public type: string;
   private registeredOnChange: (_: any) => void;

   constructor() {}

   ngOnInit(): void {
      this.type = this.schema.value.type;
   }

   writeValue(value: any): void {
      this.onChange(value);
   }

   registerOnChange(fn: (_: any) => void): void {
      this.registeredOnChange = fn;
   }

   registerOnTouched(fn: () => void): void {
   }

   onChange(value: any): void {

      if (this.registeredOnChange) {
         this.registeredOnChange(value);
      }
   }

}
