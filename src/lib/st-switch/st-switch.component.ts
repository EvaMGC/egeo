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
   Component,
   Input,
   ChangeDetectionStrategy,
   forwardRef,
   ChangeDetectorRef, Output, EventEmitter, OnInit
} from '@angular/core';
import {
   FormControl,
   ControlValueAccessor,
   NG_VALUE_ACCESSOR
} from '@angular/forms';
import { StEgeo, StRequired } from '../decorators/require-decorators';
import { StFormLabelStatus } from '../utils/egeo-form/st-form-label/st-form-label-status.enum';

@Component({
   selector: 'st-switch',
   templateUrl: './st-switch.html',
   styleUrls: ['./st-switch.scss'],
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StSwitchComponent), multi: true }
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})

@StEgeo()
export class StSwitchComponent implements ControlValueAccessor {
   @Input() qaTag: string;
   @Input() label: string;
   @Input() labelPosition: 'top' | 'right' | 'left' = 'top';
   @Input() contextualHelp: string;
   @Input() name: string;
   @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

   private _stModel: boolean;
   private _disabled: boolean;
   private registeredOnChange: (_: any) => void;

   constructor(private _cd: ChangeDetectorRef) {
   }

   @Input() @StRequired()
   get stModel(): boolean {
      return this._stModel;
   }

   set stModel(value: boolean) {
      this._stModel = value;
      this._cd.markForCheck();
   }

   @Input()
   get disabled(): boolean {
      return this._disabled;
   }

   set disabled(disabled: boolean) {
      this._disabled = disabled;
      this._cd.markForCheck();
   }

   getLabelStatus(): StFormLabelStatus {
      if (this.disabled) {
         return StFormLabelStatus.DISABLED;
      }
   }

   get labelQaTag(): string {
     return (this.qaTag || '') + '-label';
   }

   // load external change
   writeValue(value: boolean): void {
      this._stModel = value;
   }

   // internal change callback
   registerOnChange(fn: (_: any) => void): void {
      this.registeredOnChange = fn;
   }

   registerOnTouched(fn: () => void): void {
   }

   setDisabledState(disable: boolean): void {
      this.disabled = disable;
   }

   onChange(event: MouseEvent): void {
      if (!this.disabled) {
         event.stopPropagation();
         let value: boolean = (<HTMLInputElement> event.target).checked;
         this._stModel = value;
         this.change.emit(this._stModel);
         if (this.registeredOnChange) {
            this.registeredOnChange(value);
         }
      }
   }
}
