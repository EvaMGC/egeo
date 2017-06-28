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
   OnInit,
   Output,
   AfterViewInit,
   ChangeDetectorRef,
   ElementRef,
   ViewChild,
   HostListener
} from '@angular/core';

import { StDropDownMenuGroup, StDropDownMenuItem } from './st-dropdown-menu.interface';

/**
 * @description {Component} Dropdown-Menu
 * This directive show a autocomplete list in element that you attach
 *
 * @example
 *
 * <st-dropdown-menu [items]="list" [active]="show" (change)="onChange(event)">
 *    <button (click)="show = !show">Show menu</button>
 * </st-dropdown-menu>
 */
@Component({
   selector: 'st-dropdown-menu',
   templateUrl: './st-dropdown-menu.component.html',
   styleUrls: ['./st-dropdown-menu.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StDropdownMenuComponent implements OnInit, AfterViewInit {

   /** @input {string} qaTag For set id for tests */
   @Input() qaTag: string;
   /** @input {boolean} active=false Show or hide list */
   @Input() active: boolean = false;
   /** @input {StDropDownMenuItem[] | StDropDownMenuGroup[]} items List of items or groups of them to show in menu */
   @Input() items: StDropDownMenuItem[] | StDropDownMenuGroup[];
   /* tslint:disable-next-line:max-line-length */
   /** @input { 'top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'} [placement='bottom-start'] Posible possitions of menu with respect element to attach */
   @Input() placement: string = 'bottom-start';
   /** @input {string} [emptyListMessage=''] Message to show in case of empty list */
   @Input() emptyListMessage: string = '';

   /** @output {StDropDownMenuItem} change Event emitted when user select an item */
   @Output() change: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();

   @ViewChild('buttonId') buttonElement: ElementRef;

   public itemsGroup: StDropDownMenuGroup[] = [];
   public widthMenu: string;

   constructor(private cd: ChangeDetectorRef) { }

   ngOnInit(): void {
      if (undefined === this.items) {
         throw new Error('Attribute items is required');
      }
      this.checkGroup();
   }

   ngOnChanges(values: any): void {
      if (values.items) {
         this.checkGroup();
      }
   }

   ngAfterViewInit(): void {
      this.updateWidth();
   }

   checkGroup(): void {
      if (this.isDropDownGroup(this.items)) {
         this.itemsGroup = this.items;
      }
   }

   isDropDownGroup(value: StDropDownMenuItem[] | StDropDownMenuGroup[]): value is StDropDownMenuGroup[] {
      return value && value.length > 0 && (<StDropDownMenuGroup>value[0]).title !== undefined;
   }

   onChange(value: StDropDownMenuItem): void {
      this.change.emit(value);
   }

   @HostListener('window:resize', ['$event']) onResize(event) {
      this.updateWidth();
   }

   private updateWidth(): void {
      if (this.buttonElement && this.buttonElement.nativeElement) {
         let el: HTMLElement = this.buttonElement.nativeElement;

         if (el.children && el.children.length > 0) {
            this.widthMenu = el.children[0].getBoundingClientRect().width + 'px';
         } else {
            this.widthMenu = el.getBoundingClientRect().width + 'px';
         }
      }
      this.cd.markForCheck();
   }
}

