import { Component, forwardRef, Input, OnChanges, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

import { StInputError } from './st-input.error.model';

@Component({
   selector: 'st-input',
   templateUrl: './st-input.component.html',
   styleUrls: ['./st-input.component.scss'],
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StInputComponent), multi: true },
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => StInputComponent), multi: true }
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StInputComponent implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {

   @Input() placeholder: string = '';
   @Input() name: string = '';
   @Input() label: string = '';
   @Input() fieldType: 'string' | 'number' | 'password' = 'string';
   @Input() errors: StInputError;
   @Input() qaTag: string;
   @Input() forceValidations: boolean = false;
   @Input() contextualHelp: string;
   @Input() maxLength: number;

   private sub: Subscription;
   private valueChangeSub: Subscription;
   private internalControl: FormControl;
   private errorMessage: string = undefined;
   private internalInputModel: any = '';
   private internalType: string = 'text';

   private focus: boolean = false; // For change style when focus

   private isDisabled: boolean = false; // To check disable

   constructor(private _cd: ChangeDetectorRef) { }


   onChange = (_: any) => { };
   onTouched = () => { };


   validate(control: FormControl): any {
      if (this.sub) {
         this.sub.unsubscribe();
      }
      this.sub = control.statusChanges.subscribe(() => this.checkErrors(control));
   }

   ngOnChanges(): void {
      if (this.forceValidations) {
         this.writeValue(this.internalControl.value);
      }
      this._cd.markForCheck();
   }

   ngOnInit(): void {
      this.internalControl = new FormControl(this.internalInputModel);
      this.internalType = this.fieldType === 'password' ? 'password' : 'text';
      this.valueChangeSub = this.internalControl.valueChanges.subscribe((value) => this.onChange(value));
   }

   ngOnDestroy(): void {
      if (this.valueChangeSub) {
         this.valueChangeSub.unsubscribe();
      }
      if (this.sub) {
         this.sub.unsubscribe();
      }
   }

   // When value is received from outside
   writeValue(value: any): void {
      this.internalControl.setValue(value);
      this.internalInputModel = value;
   }

   // Registry the change function to propagate internal model changes
   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   // Registry the touch function to propagate internal touch events TODO: make this function.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   setDisabledState(disable: boolean): void {
      this.isDisabled = disable;
      if (this.isDisabled && this.internalControl && this.internalControl.enabled) {
         this.internalControl.disable();
      } else if (!this.isDisabled && this.internalControl && this.internalControl.disabled) {
         this.internalControl.enable();
      }
      this._cd.markForCheck();
   }

   // When status change call this function to check if have errors
   private checkErrors(control: FormControl): void {
      let errors: { [key: string]: any } = control.errors;
      this.errorMessage = this.getErrorMessage(errors);
      this._cd.markForCheck();
   }

   // Get error message in function of error list.
   private getErrorMessage(errors: { [key: string]: any }): string {
      if (!errors) {
         return undefined;
      }

      if (!this.errors) {
         return '';
      }

      if (errors.hasOwnProperty('required')) {
         return this.errors.required || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('fieldType')) {
         return this.errors.type || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('minlength')) {
         return this.errors.minLength || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('pattern')) {
         return this.errors.pattern || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('min')) {
         return this.errors.min || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('max')) {
         return this.errors.max || this.errors.generic || '';
      }
      return '';
   }

   /** Style functions */
   private getBarType(): string {
      return this.showError() ? 'error-bar' : 'normal-bar';
   }

   private showError(): boolean {
      return this.errorMessage !== undefined && (!this.internalControl.pristine || this.forceValidations) && !this.focus && !this.isDisabled;
   }

   private onFocus(event: Event): void {
      this.focus = true;
   }

   private onFocusOut(event: Event): void {
      this.focus = false;
   }
}
