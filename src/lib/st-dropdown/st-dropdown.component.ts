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
   AfterViewInit,
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   ElementRef,
   EventEmitter,
   Input,
   OnChanges,
   OnDestroy,
   OnInit,
   Output,
   Renderer,
   ViewChild,
   HostListener
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { EventWindowManager } from '../utils/event-window-manager';

import {
   StDropDownMenuGroup,
   StDropDownMenuItem
} from '../st-dropdown-menu/st-dropdown-menu.interface';

import { StEgeo, StRequired } from '../decorators/require-decorators';

@StEgeo()
@Component({
   selector: 'st-dropdown',
   templateUrl: './st-dropdown.component.html',
   styleUrls: ['./st-dropdown.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StDropdownComponent extends EventWindowManager
   implements OnDestroy, OnInit, OnChanges {
   @Input() button: string;
   @Input() active: boolean;
   @StRequired()
   @Input()
   items: Array<StDropDownMenuItem | StDropDownMenuGroup>;
   @Input() default: boolean;
   @Input() firstSelected: boolean;
   @Input() disabled: boolean;
   @Input() width: string;
   @Input() qaTag: string;
   @Input() themeClass: string;
   @Output() click: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Output() change: EventEmitter<Object> = new EventEmitter<Object>();
   @ViewChild('buttonId') buttonElement: ElementRef;

   public widthMenu: string;

   constructor(
      private renderer: Renderer,
      private cd: ChangeDetectorRef,
      @ViewChild('buttonId') buttonElement: ElementRef
   ) {
      super(renderer, cd, buttonElement);
   }

   ngOnInit(): void {
      this.checkFirstSelected();
      this.findSelected();
   }

   ngOnChanges(values: any): void {
      if (values.items) {
         this.checkFirstSelected();
         this.findSelected();
      }
   }

   ngOnDestroy(): void {
      this.closeElement();
   }

   changeOption(item: StDropDownMenuItem): void {
      this.active = !this.active;
      this.updateSelected(item);

      if (!this.default) this.button = item.label;
      this.change.emit(item);
      this.closeElement();
   }

   onClickEvent(event: MouseEvent): void {
      this.openElement();
      this.click.emit(true);
      event.stopPropagation();
   }

   @HostListener('document:keydown', ['$event'])
   public hideMenu(event?: KeyboardEvent): void {
      if (
         event &&
         ((event.keyCode && event.keyCode !== 27) ||
            (event.key && event.key !== 'Escape'))
      ) {
         return;
      }
      this.closeElement();
   }

   private findSelected(): void {
      if (this.isStDropdownItem(this.items)) {
         let item = this.items.find(object => object.selected === true);

         if (item) {
            this.button = item.label;
            this.cd.markForCheck();
         }
      } else if (this.items && this.items.length > 0) {
         let items = this.items
            .map((i: StDropDownMenuGroup) => {
               return i.items.find(object => object.selected === true);
            })
            .filter(object => object !== undefined);

         if (items.length > 0) {
            this.button = items[0].label;
            this.cd.markForCheck();
         }
      }
   }

   private isStDropdownItem(
      items: Array<StDropDownMenuItem | StDropDownMenuGroup>
   ): items is StDropDownMenuItem[] {
      if (items && items.length > 0) {
         return (<StDropDownMenuGroup[]>items)[0].items === undefined;
      }
   }

   private updateSelected(item?: StDropDownMenuItem): void {
      if (this.isStDropdownItem(this.items)) {
         const itemSelected = Object.assign(
            [],
            this.items.find(object => object.selected === true)
         );

         if (itemSelected) {
            itemSelected.selected = false;
         }

         if (item) {
            const element = Object.assign([], this.items.find(i => i === item));

            if (element) element.selected = true;
         }
      } else if (this.items && this.items.length > 0) {
         this.items.map((i: StDropDownMenuGroup) => {
            let itemSelected = Object.assign(
               [],
               i.items.find(object => object.selected === true)
            );

            if (itemSelected) {
               itemSelected.selected = false;
            }

            if (item) {
               const element = Object.assign([], i.items.find(n => n === item));

               if (element) element.selected = true;
            }
         });
      }
   }

   private checkFirstSelected(): void {
      if (this.firstSelected) {
         if (this.isStDropdownItem(this.items)) {
            this.updateSelected();
            this.items[0].selected = true;
         } else if (this.items && this.items.length > 0) {
            this.updateSelected();
            this.items.map((i: StDropDownMenuGroup) => {
               i.items[0].selected = true;
            });
         }
      }
   }
}
