/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import {
   Component,
   Input,
   Output,
   forwardRef,
   ViewChild,
   EventEmitter,
   ChangeDetectionStrategy,
   AfterViewChecked,
   OnInit,
   OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
/**
 * @description {Component} [Dynamic form]
 *
 * The form component allows to generate forms dynamically using a JSON schema.
 *
 * @example
 *
 * {html}
 *
 * ```
 * <st-form [schema]="jsonSchema" [(ngModel)]="model" #formModel="ngModel">
 * </st-form>
 *
 * ```
 *
 */
@Component({
   selector: 'st-form',
   templateUrl: './st-form.component.html',
   styleUrls: ['./st-form.component.scss'],
   host: { class: 'st-form' },
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StFormComponent), multi: true },
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => StFormComponent), multi: true }
   ]
})

export class StFormComponent implements ControlValueAccessor, OnInit, AfterViewChecked, OnDestroy {
   /** @Input {any} [schema=] JSON schema needed to generate the form */
   @Input() schema: any;

   /** @Output {any} [valueChange=] Event emitted when value is changed. This emits the current form value */
   @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

   @ViewChild('form') form: NgForm;

   public showOptionalFields: boolean = false;
   public innerValue: any = {};
   private _value: any = {};
   private _parentFieldSubscription: Subscription[] = [];
   private _parentFields: string[];

   ngOnInit(): void {
      if (this.schema.dependencies) {
         this._parentFields = Object.keys(this.schema.dependencies);
      }
   }

   ngAfterViewChecked(): void {
      if (this._parentFields  && this.form.control && this.form.control.controls) {
         for (let i = 0; i < this._parentFields.length; ++i) {
            let parentField: string = this._parentFields[i];
            if (!this._parentFieldSubscription[i] && this.form.control.controls[parentField]) {

               this._parentFieldSubscription[i] = this.form.control.controls[this._parentFields[i]].valueChanges.subscribe((value) => {
                  if (!value) {
                     let childrenFields: string[] = this.schema.dependencies[parentField];
                     for (let j = 0; j < childrenFields.length; ++j) {
                        if (this.form.controls[childrenFields[j]]) {
                           this._value[childrenFields[j]] = undefined;
                        }
                     }
                  }
               });
            }
         }
      }
   }

   // Function to call when the value changes.
   onChange(_: any): void {
   }

   onTouched = () => {
   }

   validate(control: FormControl): any {
      let errors: any = null;
      if (this.form) {
         Object.keys(this.form.controls).forEach((propertyName) => {
            if (this.form.controls[propertyName] && this.form.controls[propertyName].errors) {
               if (!errors) {
                  errors = {};
               }
               errors[propertyName] = this.form.controls[propertyName].errors;
            }
         });

         this.form.control.setErrors(errors);
      }
      return errors;

   }

   isRequired(propertyName: string): boolean {
      return propertyName && this.schema.required && this.schema.required.indexOf(propertyName) !== -1;
   }

   hasOptionalFields(): boolean {
      for (let propertyName in this.schema.properties) {
         if (this.schema.properties[propertyName].optional) {
            return true;
         }
      }
      return false;
   }

   isAParentField(propertyName: string): boolean {
      return this.schema.dependencies && this.schema.dependencies[propertyName] && this.schema.dependencies[propertyName].length > 0;
   }

   getOptionalButtonLabel(): string {
      if (!this.showOptionalFields) {
         return 'Show more';
      }
      return 'Show less';
   }

   isOptionalField(propertyName: string): boolean {
      return this.schema.properties[propertyName].optional;
   }

   onChangeOptionalFieldsVisibility(): void {
      this.showOptionalFields = !this.showOptionalFields;
   }

   displayField(propertyName: string): boolean {
      let displayField: boolean = true;
      let parentField: string = this.getParentField(propertyName);
      if (parentField && !this._value[parentField]) {
         displayField = false;
      }
      return displayField;
   }

   // When value is received from oustside
   writeValue(value: any): void {
      if (value) {
         this.onChange(value);
         this.innerValue = value;
      }
   }

   onChangeProperty(value: any, property: string): void {
      setTimeout(() => {
         if (this._value[property] !== value) {
            this._value[property] = value;
            this.valueChange.emit(this._value);
            this.onChange(this._value);
         }
      });
   }

   // Registry the change function to propagate internal model changes
   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   // Registry the touch function to propagate internal touch events TODO: make this function.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   // Allows Angular to disable the form.
   setDisabledState(disable: boolean): void {
      if (disable) {
         this.form.control.disable();
      } else {
         this.form.control.enable();
      }
   }

   ngOnDestroy(): void {
      if (this._parentFieldSubscription) {
         for (let i = 0; i < this._parentFieldSubscription.length; ++i) {
            this._parentFieldSubscription[i].unsubscribe();
         }
      }
   }


   private getParentField(propertyName: string): string {
      let parentField: string = undefined;
      if (this.schema.dependencies) {
         Object.keys(this.schema.dependencies).forEach((key: string) => {
            if (this.schema.dependencies[key].indexOf(propertyName) !== -1 ) {
               parentField =  key;
            }
         });
      }
      return parentField;
   }

}
