/*
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   ElementRef,
   EventEmitter,
   forwardRef,
   Input,
   OnChanges,
   Output,
   Renderer,
   SimpleChange,
   SimpleChanges,
   ViewChild,
   OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { EventWindowManager } from '../utils/event-window-manager';
import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';
import { StEgeo, StRequired } from '../decorators/require-decorators';
import { StFormLabelStatus } from '../utils/egeo-form/st-form-label/st-form-label-status.enum';

@StEgeo()
@Component({
   selector: 'st-select',
   templateUrl: './st-select.component.html',
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StSelectComponent), multi: true },
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => StSelectComponent), multi: true }
   ],
   styleUrls: ['./st-select.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StSelectComponent extends EventWindowManager implements ControlValueAccessor, OnDestroy, OnChanges {
   @Input() public qaTag: string;
   @Input() public name: string = '';
   @Input() public options: StDropDownMenuItem[] = [];
   @Input() public label: string = '';
   @Input() public contextualHelp: string = '';
   @Input() public placeholder: string = '';
   @Input() public disabled: boolean = false;
   @Input() public selectedValue: StDropDownMenuItem;
   @Input() public errorRequiredMessage: string = '';
   @Input() public forceValidations: boolean = false;

   public errorMessage: string = undefined;
   public onChange: (_: any) => void;
   public onTouched: () => void;

   private sub: Subscription;
   private isFocused: boolean = false;
   private pristine: boolean = true;


   constructor(
      private renderer: Renderer,
      private cd: ChangeDetectorRef,
      @ViewChild('buttonId') public buttonElement: ElementRef,
      @ViewChild('input') public inputElement: ElementRef
   ) {
      super(renderer, cd, buttonElement);
   }

   validate(control: FormControl): any {
      if (this.sub) {
         this.sub.unsubscribe();
      }
      this.sub = control.statusChanges.subscribe(() => this.checkErrors(control));
      this.checkErrors(control);
   }

   hasOptions(): boolean {
      return this.options !== undefined && this.options.length > 0;
   }

   // Write a new value to the element.
   writeValue(newValue: any): void {
      this.selectedValue = newValue;
   }

   // Set the function to be called when the control receives a change event.
   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   // Set the function to be called when the control receives a touch event.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   // This function is called when the control status changes to or from "DISABLED".
   // Depending on the value, it will enable or disable the appropriate DOM element.
   setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes.forceValidations && changes.forceValidations.currentValue) {
         this.writeValue(this.selectedValue);
      }
      this.cd.markForCheck();
   }

   ngOnDestroy(): void {
      this.closeElement();
   }

   changeOption(selection: StDropDownMenuItem): void {
      this.selectedValue = selection;
      this.onChange(selection);
      this.onTouched();
      this.pristine = false;
      this.closeElement();
   }

   onClickButton(event: Event): void {
      if (!this.disabled) {
         (this.inputElement.nativeElement as HTMLInputElement).focus();
         this.openElement();
      }
   }

   getLabelStatus(): StFormLabelStatus {
      if (this.disabled) {
         return StFormLabelStatus.DISABLED;
      } else if (this.showError()) {
         return StFormLabelStatus.ERROR;
      }
      return StFormLabelStatus.FOCUS;
   }

   showError(): boolean {
      return this.errorMessage !== undefined && (!this.pristine || this.forceValidations) && !this.isFocused && !this.disabled;
   }

   /** Style functions */
   getBarType(): string {
      return this.showError() ? 'st-input-error-bar sth-input-error-bar' : 'st-input-normal-bar sth-input-normal-bar';
   }

   onFocus(event: Event): void {
      this.isFocused = true;
   }

   onFocusOut(event: Event): void {
      this.isFocused = false;
   }

   private getErrorObject(control: FormControl): { [key: string]: any } {
      let errors: { [key: string]: any };
      if (control.errors) {
         errors = this.checkValidations(control) ? Object.assign({}, control.errors, { 'OptionRequired': true }) : control.errors;
      } else {
         errors = this.checkValidations(control) ? { 'OptionRequired': true } : undefined;
      }
      return errors;
   }

   private checkValidations(control: FormControl): boolean {
      if (!control || !this.isDefined(control.value) || control.value === {}) {
         return true;
      }
      if (typeof control.value !== 'object' || !this.isDefined(control.value.value) || !this.isDefined(control.value.label)) {
         return true;
      }
      return false;
   }

   private isDefined(field: any): boolean {
      return field !== undefined && field !== null;
   }

   // When status change call this function to check if have errors
   private checkErrors(control: FormControl): void {
      this.pristine = control.pristine;
      let errors: { [key: string]: any } = this.getErrorObject(control);
      this.errorMessage = this.getErrorMessage(errors);
      this.cd.markForCheck();
   }

   // Get error message in function of error list.
   private getErrorMessage(errors: { [key: string]: any }): string {
      if (!errors) {
         return undefined;
      }

      if (!this.errorRequiredMessage) {
         return '';
      }

      if (errors.hasOwnProperty('required')) {
         return this.errorRequiredMessage;
      }

      if (errors.hasOwnProperty('OptionRequired')) {
         return this.errorRequiredMessage;
      }

      return '';
   }
}
