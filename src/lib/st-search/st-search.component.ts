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
   Component,
   EventEmitter,
   Input,
   OnChanges,
   OnDestroy,
   OnInit,
   Output,
   SimpleChanges,
   Renderer,
   ChangeDetectorRef,
   ViewChild,
   ElementRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/debounceTime';

import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';
import { EventWindowManager } from '../utils/event-window-manager';
import { StEgeo, StDeprecated } from '../decorators/require-decorators';

@StEgeo()
@Component({
   selector: 'st-search',
   templateUrl: './st-search.component.html',
   styleUrls: ['./st-search.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StSearchComponent extends EventWindowManager implements OnChanges, OnDestroy, OnInit {
   @Input() debounce: number = 0;
   @Input() @StDeprecated(true) hasClearButton: boolean; // This field will be removed
   @Input() liveSearch: boolean = true;
   @Input() minLength: number = 0;
   @Input() placeholder: string = 'Search';
   @Input() qaTag: string;
   @Input() @StDeprecated(false) searchOnlyOnClick: boolean; // This field will be removed
   @Input() value: string;
   @Input() disabled: boolean = false;

   @Input() withAutocomplete: boolean = false;
   @Input() autocompleteList: StDropDownMenuItem[] = [];
   @Input() emptyAutocompleteListMessage: string = '';

   @Output() search: EventEmitter<string> = new EventEmitter<string>();

   public searchBox: FormControl = new FormControl();
   public showClear: boolean;

   private subscriptionSearch: Subscription | undefined = undefined;
   private subscriptionSearchClearButton: Subscription | undefined = undefined;
   private lastEmited: string | undefined = undefined;

   constructor(
      private _render: Renderer,
      private cd: ChangeDetectorRef,
      @ViewChild('buttonId') public buttonElement: ElementRef) {
      super(_render, cd, buttonElement);
   }

   public ngOnInit(): void {
      if (this.value) {
         this.searchBox.setValue(this.value);
      }
      // Show clear button if have text
      this.subscriptionSearchClearButton = this.searchBox.valueChanges.subscribe((val) => this.showClear = (val && val.length > 0));
      this.checkDisabled();
      this.manageSubscription();
   }

   public ngOnChanges(changes: SimpleChanges): void {
      this.checkDebounceChange(changes);
      this.checkValueChange(changes);
      this.checkDisableChange(changes);
      this.checkAutocompleteMenuChange(changes);
   }

   public ngOnDestroy(): void {
      if (this.subscriptionSearch !== undefined) {
         this.subscriptionSearch.unsubscribe();
      }
      if (this.subscriptionSearchClearButton !== undefined) {
         this.subscriptionSearchClearButton.unsubscribe();
      }
      this.closeElement();
   }

   public launchSearch(force: boolean): void {
      if (this.canSearch(force)) {
         this.showAutocompleteMenu();
         this.emitValue(force);
      } else {
         this.closeElement();
      }
   }

   public onKeyPress(event: KeyboardEvent): void {
      let key: number = event.keyCode || event.which;
      if (key === 13) {
         this.launchSearch(true);
      }
   }

   public changeOption(item: StDropDownMenuItem): void {
      if (item && item.label) {
         this.subscriptionSearch.unsubscribe();
         this.searchBox.setValue(item.label);
         this.cd.markForCheck();
         this.closeElement();
         this.emitValue(true);
         this.manageSubscription();
      }
   }

   public clearInput(): void {
      this.searchBox.setValue('');
      this.closeElement();
   }

   private emitValue(force: boolean): void {
      if (this.isEqualPrevious(force)) {
         this.lastEmited = this.searchBox.value;
         this.search.emit(this.lastEmited);
      }
   }

   private showAutocompleteMenu(): void {
      if (this.withAutocomplete && !this.isActive) {
         this.openElement();
      }
      if (this.searchBox.value === '') {
         this.closeElement();
      }
      this.cd.markForCheck();
   }

   private checkDisabled(): void {
      if (this.disabled) {
         this.searchBox.disable();
      } else {
         this.searchBox.enable();
      }
   }

   private canSearch(force: boolean): boolean {
      return this.isDefined() && !this.disabled && this.checkMins();
   }

   private isDefined(): boolean {
      return this.searchBox && this.searchBox.value !== null && this.searchBox.value !== undefined;
   }

   private checkMins(): boolean {
      return this.minLength <= (this.searchBox && this.searchBox.value && this.searchBox.value.length) ||
         this.searchBox.value.trim().length === 0;
   }

   private isEqualPrevious(force: boolean): boolean {
      return this.lastEmited !== this.searchBox.value || force;
   }

   private checkValueChange(changes: SimpleChanges): void {
      if (changes && changes.value) {
         if (this.subscriptionSearch) {
            this.subscriptionSearch.unsubscribe();
         }
         this.searchBox.setValue(changes.value.currentValue);
         this.manageSubscription();
      }
   }

   private checkDebounceChange(changes: SimpleChanges): void {
      if (changes && changes.debounce) {
         this.manageSubscription();
      }
   }

   private checkDisableChange(changes: SimpleChanges): void {
      if (changes && changes.disabled) {
         this.checkDisabled();
      }
   }

   private checkAutocompleteMenuChange(changes: SimpleChanges): void {
      if (changes && changes.autocompleteList) {
         this.cd.markForCheck();
      }
   }

   private manageSubscription(): void {
      if (this.subscriptionSearch !== undefined) {
         this.subscriptionSearch.unsubscribe();
      }
      if (this.liveSearch) {
         this.subscriptionSearch = this.searchBox
            .valueChanges
            .debounceTime(this.debounce)
            .subscribe((event) => this.launchSearch(false));
      }
   }
}
