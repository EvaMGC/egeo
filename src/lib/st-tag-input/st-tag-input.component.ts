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
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   forwardRef,
   Input,
   OnInit,
   OnChanges,
   ViewChild,
   ElementRef,
   SimpleChanges,
   HostBinding,
   HostListener
} from '@angular/core';
import {
   ControlValueAccessor,
   FormControl,
   NG_VALIDATORS,
   NG_VALUE_ACCESSOR,
   Validator
} from '@angular/forms';

import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';

/**
 * @description {Component} Tag Input
 *
 * This component is a text input box that automatically creates tags out of a typed text.
 *
 * @example
 *
 * {html}
 *
 * ```
 * <st-tag-input
 *    class="st-form-field"
 *    name="tag-input-reactive"
 *    formControlName="tag-input-reactive"
 *    [autocompleteList]="filteredlist"
 *    [withAutocomplete]="true"
 *    [disabled]="disabled"
 *    [label]="'Tag Input with Reactive Form'"
 *    [id]="'tag-input-reactive'"
 *    [placeholder]="'Add tags separated by commas'"
 *    [tooltip]="'This is a Tag Input component tooltip'"
 *    [forbiddenValues]="['test']"
 *    (input)="onFilterList($event)">
 * </st-tag-input>
 * <st-tag-input
 *    class="st-form-field"
 *    name="tag-input-template-driven"
 *    [(ngModel)]="tags.templateDriven"
 *    [autocompleteList]="filteredlist"
 *    [withAutocomplete]="true"
 *    [disabled]="disabled"
 *    [label]="'Tag Input with Template Driven Form'"
 *    [id]="'tag-input-template-driven'"
 *    [placeholder]="'Add tags separated by commas'"
 *    [tooltip]="'This is a Tag Input component tooltip'"
 *    [regularExpression]="pattern"
 *    (input)="onFilterList($event)">
 * </st-tag-input>
 * ```
 */
@Component({
   selector: 'st-tag-input',
   templateUrl: './st-tag-input.component.html',
   styleUrls: ['./st-tag-input.component.scss'],
   host: {
      'class': 'st-tag-input'
   },
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StTagInputComponent), multi: true },
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => StTagInputComponent), multi: true }],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StTagInputComponent implements ControlValueAccessor, Validator, OnInit, OnChanges {

   /** @input {string | null} [label=null] Label to show over the input. It is empty by default */
   @Input() label: string | null = null;
   /** @input {string | null} [tooltip=null] The tooltip to show  over the label. It is empty by default */
   @Input() tooltip: string | null = null;
   /** @input {string | null} [placeholder=null] The text that appears as placeholder of the input. It is empty by default */
   @Input() placeholder: string | null = null; // TODO
   /** @input {string | null} [errorMessage=null] Error message to show. It is empty by default */
   @Input() errorMessage: string | null = null;

   /** @input {boolean} [withAutocomplete=false] Enable autocomplete feature. It is false by default */
   @Input() withAutocomplete: boolean = false;
   /** @input {StDropDownMenuItem} [autocompleteList=Array()] List to be used for autocomplete feature. It is empty by default */
   @Input() autocompleteList: StDropDownMenuItem[] = [];

   /** @input {string[]} [forbiddenValues=Array()] A list of values that user can not type and if he types one of them,
    * tag input will be invalid. It is empty by default
    */
   @Input() forbiddenValues: string[] = [];
   /** @input {string} [regularExpression=] Regular expression to validate values. It is null by default */
   @Input() regularExpression: any | null = null;

   @ViewChild('newElement') newElementInput: ElementRef;
   @ViewChild('inputElement') inputElement: ElementRef;

   public expandedMenu: boolean = false;
   public items: string[] = [];
   public innerInputContent: string = '';

   private _focus: boolean = false;
   private _isDisabled: boolean = false;
   private _newElementInput: HTMLInputElement | null = null;
   private _selected: number | null = null;

   onChange = (_: any) => { };
   onTouched = () => { };

   constructor(
      private _selectElement: ElementRef,
      private _cd: ChangeDetectorRef) {
   }

   /** @input {boolean} [disabled=false] Disable the component. It is false by default */
   @Input()
   set disabled(value: boolean) {
      this._isDisabled = value;
   }

   get hasLabel(): boolean {
      return this.label !== null && this.label.length > 0;
   }

   get hasError(): boolean {
      return this.errorMessage !== null;
   }

   get hasFocus(): boolean {
      return this._focus;
   }

   get hasPlaceholder(): boolean {
      return !this._focus && !this.items.length && this.placeholder !== null && this.placeholder.length > 0;
   }

   @HostBinding('class.st-tag-input--autocomplete')
   get hasAutocomplete(): boolean {
      return this.expandedMenu && this.autocompleteList !== null && this.autocompleteList.length > 0;
   }

   get disableValue(): string | null {
      return this._isDisabled === true ? '' : null;
   }

   get isValidInput(): boolean {
      const isForbidden = this.forbiddenValues.length && this.forbiddenValues.indexOf(this.innerInputContent) > -1;
      const isDuplicated = this.items.indexOf(this.innerInputContent) !== -1;
      let regularExp = new RegExp(this.regularExpression);
      const matchedPattern = this.regularExpression ? regularExp.test(this.innerInputContent) : true;
      return this.innerInputContent.length ? !isForbidden && !isDuplicated && matchedPattern : true;
   }

   get tagSelected(): number | null {
      return this._selected;
   }

   get selectId(): string | null {
      const select: HTMLElement = this._selectElement.nativeElement;
      return select.getAttribute('id') !== null ? select.id : null;
   }

   get inputId(): string | null {
      return this.selectId !== null ? `${this.selectId}-input` : null;
   }

   get labelId(): string | null {
      return this.selectId !== null ? `${this.selectId}-label` : null;
   }

   get tagId(): string | null {
      return this.selectId !== null ? `${this.selectId}-tag-` : null;
   }

   get listId(): string {
      return this.selectId !== null ? `${this.selectId}-autocomplete` : null;
   }

   ngOnInit(): void {
      this._newElementInput = this.newElementInput.nativeElement;
   }

   ngOnChanges(changes: SimpleChanges): void {
      this.checkAutocompleteMenuChange(changes);
   }

   writeValue(data: any): void {
      if (data && Array.isArray(data) && data.length) {
         this.items = [];
         for (const value of data) {
            this.items.push(value);
         }
         this.onChange(this.items);
         this._cd.markForCheck();
      }
   }

   setDisabledState(disabled: boolean): void {
      this.disabled = disabled;
      this._cd.markForCheck();
   }

   validate(control: FormControl): any {}

   // Registry the change function to propagate internal model changes
   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }

   // Input actions
   onInputText(text: string): void {
      this.innerInputContent = text;
      this.showAutocompleteMenu();
   }

   onInputFocusIn(event: Event): void {
      if (!this._isDisabled) {
         this._focus = true;
         this._newElementInput.focus();
      }
   }

   onInputFocusOut(event: Event): void {
      if (!this.expandedMenu) {
         this._focus = false;
         this.addCurrentTag();
      }
   }

   onInputKeyDown(event: any): void {
      switch (event.keyCode) {
         case 188: // Comma
         case 13: // Enter
            if (this.innerInputContent.length && this.isValidInput) {
               this.addTag(this.innerInputContent);
            }
            event.preventDefault();
            break;
         case 9: // Tab
            if (this.innerInputContent.length && this.isValidInput) {
               this.addTag(this.innerInputContent);
               event.preventDefault();
            } else if (this.innerInputContent.length) {
               this.clearInput();
            }
            break;
         case 46: // Delete
            if (this.innerInputContent.length) {
               this.clearInput();
            } else if (this.items.length) {
               event.target.previousElementSibling.focus();
            }
            break;
         case 8: // Backspace
         case 37: // Left
            if (this.items.length && !this.innerInputContent.length) {
               event.target.previousElementSibling.focus();
            }
            break;
         default:
            break;
      }
   }

   // Tag actions
   onTagKeyDown(event: any, index: number): void {
      switch (event.keyCode) {
         case 8: // Backspace
         case 46: // Delete
            if (this._selected !== null) {
               this.deleteTag(this._selected);
               this._selected = null;
               this._newElementInput.focus();
            }
            break;
         case 37: // Left
            if (this._selected > 0) {
               event.target.previousElementSibling.focus();
            }
            break;
         case 39: // Right
            if (this._selected < this.items.length) {
               event.target.nextElementSibling.focus();
            }
            break;
         default:
            break;
      }
   }

   onTagFocusIn(event: Event, index: number): void {
      if (!this._isDisabled) {
         this._focus = true;
         this.addCurrentTag();
         this.expandedMenu = false;
         this._selected = index;
      }
   }

   onTagFocusOut(event: Event, index: number): void {
      this._focus = false;
      this._selected = null;
   }

   onTagClick(event: Event, index: number): void {
      event.stopPropagation();
      event.preventDefault();
   }

   // Dropdown actions
   onListSelect(data: StDropDownMenuItem): void {
      this._focus = false;
      if (data.value.length && this.items.indexOf(data.value) === -1) {
         this.addTag(data.value);
      } else {
         this.clearInput();
      }
   }

   @HostListener('document:click', ['$event'])
   onClickOutside(event: Event): void {
      const isInputElement: boolean = this.inputElement.nativeElement.contains(event.target);
      if (!isInputElement && this.expandedMenu) {
         this._focus = false;
         this.addCurrentTag();
      }
   }

   private addTag(tag: string): void {
      this.items.push(tag);
      this.clearInput();
      this.onChange(this.items);
   }

   private addCurrentTag(): void {
      if (this.innerInputContent.length && this.isValidInput) {
         this.addTag(this.innerInputContent);
      } else {
         this.clearInput();
      }
   }

   private deleteTag(index: number): void {
      this.items.splice(index, 1);
      this.onChange(this.items);
   }

   private clearInput(): void {
      if (this.expandedMenu) {
         this.expandedMenu = false;
      }
      this.innerInputContent = '';
      this._newElementInput.innerText = '';
   }

   private showAutocompleteMenu(): void {
      if (this.withAutocomplete && !this.expandedMenu) {
         this.expandedMenu = true;
      }
      if (this.innerInputContent === '') {
         this.expandedMenu = false;
      }
      this._cd.markForCheck();
   }

   private checkAutocompleteMenuChange(changes: SimpleChanges): void {
      if (changes && changes.autocompleteList) {
         this._cd.markForCheck();
      }
   }
}
