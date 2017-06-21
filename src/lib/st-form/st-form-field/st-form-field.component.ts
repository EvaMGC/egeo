import {
  Component
  ChangeDetectionStrategy
  OnInit
} from '@angular/core';

import {
  ControlValueAccessor,
} from '@angular/forms';

@Component({
  selector: 'st-form-field',
  templateUrl: './st-form-field.component.html',
  styleUrls: [  './st-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StFormFieldComponent implements ControlValueAccessor, OnInit {
   private registeredOnChange: (_: any) => void;

  constructor() {

  }

  ngOnInit(): void {
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
