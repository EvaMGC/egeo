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
import { CheckRequired, Required } from '../decorators/require-decorators';
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

@CheckRequired()
export class StSwitchComponent implements ControlValueAccessor, OnInit {
   @Input() @Required() stModel: boolean;
   @Input() @Required() qaTag: string;
   @Input() label: string;
   @Input() labelPosition: 'top' | 'right' | 'left' = 'top';
   @Input() contextualHelp: string;
   @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

   public _stModel: boolean;
   public disabled: boolean;
   public internalFormControl: FormControl;
   private registeredOnChange: (_: any) => void;

   constructor(private _cd: ChangeDetectorRef) {
   }

   ngOnInit(): void {
      this._stModel = this.stModel;
      this.internalFormControl = new FormControl({ value: this._stModel });
   }

   getLabelStatus(): StFormLabelStatus {
      if (this.disabled) {
         return StFormLabelStatus.DISABLED;
      }
   }

   // load external change
   writeValue(value: boolean): void {
      this.internalFormControl.setValue(value);
      this.onChange(value);
      this._cd.markForCheck();
   }

   // internal change callback
   registerOnChange(fn: (_: any) => void): void {
      this.registeredOnChange = fn;
   }

   registerOnTouched(fn: () => void): void {
   }

   setDisabledState(disable: boolean): void {
      this.disabled = disable;
      this._cd.markForCheck();
   }

   onChange(value: boolean): void {
      if (!this.disabled) {
         this._stModel = value;
         this.change.emit(this._stModel);
         if (this.registeredOnChange) {
            this.registeredOnChange(value);
         }
      }
   }
}
