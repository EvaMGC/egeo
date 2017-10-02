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
import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Component({
   selector: '[st-tooltip]',
   styleUrls: ['./st-tooltip.component.scss'],
   templateUrl: './st-tooltip.component.html'
})
export class StTooltipComponent {

   @HostBinding('class.st-tooltip') classTooltip: boolean;
   @HostBinding('class.st-tooltip-on') classTooltipOn: boolean;

   private _showOnClick: boolean;
   @Input()
   set showOnClick(value: boolean) {
      this._showOnClick = value;
      this.classTooltip = this.title && !value;
   }
   get showOnClick(): boolean {
      return this._showOnClick;
   }

   private _title: string;
   @Input('attr.title')
   set title(value: string) {
      this._title = value;
      if (value) {
         this.el.nativeElement.setAttribute('title', value);
         this.classTooltip = !this.showOnClick;
      } else {
         this.el.nativeElement.removeAttribute('title');
         this.classTooltip = false;
      }
   }
   get title(): string {
      return this._title;
   }

   @HostListener('document:click', ['$event']) onClick(event: Event): void {
      this.classTooltipOn = this.showOnClick && this.title && this.el.nativeElement.contains(event.target);
   }

   constructor(private el: ElementRef) {
      this.classTooltip = false;
      this.classTooltipOn = false;
      this.showOnClick = false;
      this.title = this.el.nativeElement.title;
   }
}
