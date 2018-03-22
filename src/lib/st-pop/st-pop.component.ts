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
   ElementRef,
   AfterViewInit,
   Input,
   ChangeDetectionStrategy,
   OnChanges,
   SimpleChanges,
   HostListener
} from '@angular/core';

import { StPopOffset, StPopPlacement } from './st-pop.model';

// Internal type
type StCoords = { x: number, y: number, z: number };

/**
 * @description {Component} [Pop]
 *
 * The pop is a component for manage floating elements like popups or dropdown-menu. This element need two element inside,
 * a button element that launch popper and a content element that whose position will be relativo to button element.
 *
 * @example
 *
 * {html}
 *
 * ```
 * <st-pop [hidden]="false" placement="bottom">
 *    <div pop-button>Button</div>
 *    <div pop-content>Content</div>
 * </st-pop>
 * ```
 */
@Component({
   selector: 'st-pop',
   styleUrls: ['./st-pop.component.scss'],
   templateUrl: './st-pop.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StPopComponent implements AfterViewInit, OnChanges {

   /** @Input {StPopPlacement} [placement=StPopPlacement.BOTOM_START] Define position of content relative to button */
   @Input() placement: StPopPlacement = StPopPlacement.BOTTOM_START;

   /** @Input {StPopOffset} [offset={x: 0 , y: 0}] For position with offset in x o y axis */
   @Input() offset: StPopOffset = { x: 0, y: 0 };
   /** @Input {boolean} [openToLeft=false] For calculate all position from right corner */
   @Input() openToLeft: boolean = false;
   /** @Input {boolean} [hidden=true] TRUE: show pop content, FALSE: hide pop content */
   @Input() hidden: boolean = true;


   private button: ClientRect;
   private content: ElementRef;

   constructor(private el: ElementRef) {
   }

   ngAfterViewInit(): void {
      this.calculatePosition();
   }

   ngOnChanges(changes: SimpleChanges): void {
      this.calculatePosition();
   }

   private getContentElement(): HTMLElement {
      return this.el.nativeElement.querySelector('[pop-content]');
   }

   private calculatePosition(): void {
      const buttonParentEl: HTMLElement = this.el.nativeElement.querySelector('[pop-button]');
      const contentEl: HTMLElement = this.getContentElement();
      const buttonEl: Element | undefined = buttonParentEl && buttonParentEl.firstElementChild ?
         buttonParentEl.firstElementChild : undefined;
      if (buttonEl) {
         const coords: StCoords = this.getCoords(buttonEl);

         contentEl.style.position = 'absolute';
         contentEl.style.transform = `translate3d(${coords.x}px, ${coords.y}px, ${coords.z}px)`;
      }
   }


   @HostListener('window:load')
   private updateWidth(): void {
      this.calculatePosition();
   }

   private getCoords(buttonEl: Element): StCoords {
      const coords: StCoords = { x: 0, y: 0, z: 0 };
      const direction: number = this.openToLeft ? this.getContentElement().getBoundingClientRect().width : 0;
      const clientRect: ClientRect = buttonEl.getBoundingClientRect();

      switch (this.placement) {
         case StPopPlacement.BOTTOM:
            coords.x = clientRect.width / 2;
            break;
         case StPopPlacement.BOTTOM_END:
            coords.x = clientRect.width;
            break;
         case StPopPlacement.TOP:
            coords.y = clientRect.height * -1;
            coords.x = clientRect.width / 2;
            break;
         case StPopPlacement.TOP_START:
            coords.y = clientRect.height * -1;
            break;
         case StPopPlacement.TOP_END:
            coords.y = clientRect.height * -1;
            coords.x = clientRect.width;
            break;
         default:
            break;
      }

      coords.x = Math.ceil(coords.x + this.offset.x - direction);
      coords.y = Math.ceil(coords.y + this.offset.y);

      return coords;
   }
}
