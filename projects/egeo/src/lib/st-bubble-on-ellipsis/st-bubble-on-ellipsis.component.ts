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
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { get as _get } from 'lodash';


import { StPopOffset } from '../st-pop/st-pop.model';

/**
 * @description {Component} [StBubbleLabel]
 *
 * This component displays a bubble below a content if its width is longer than container
 *
 * @example
 *
 * {html}
 *
 * ```
 *    <st-bubble-label [qaTag]="qaTag" [text]="text" [hidden]="hidden">
 *    </st-bubble-label>
 * ```
 */
@Component({
   selector: 'st-bubble-on-ellipsis',
   styleUrls: ['./st-bubble-on-ellipsis.component.scss'],
   templateUrl: './st-bubble-on-ellipsis.component.html'
})
export class StBubbleOnEllipsisComponent {

   /** @Input {string} [text=] Text of the bubble */
   @Input() text: string;

   /** @Input {string} [minWidth=] min width for bubble  */
   @Input() minWidth?: string;
   /** @Input {string} [maxWidth=] max width for bubble  */
   @Input() maxWidth?: string;

   @ViewChild('bubbleTrigger', { static: false }) bubbleTrigger: ElementRef;

   offset: StPopOffset;
   visible: boolean;

   private _openToLeft: boolean;

   constructor(private _cd: ChangeDetectorRef) {
   }

   /** @Input {boolean} [openToLeft=true] when true, bubble is displayed with the arrow to the right  */
   @Input()
   get openToLeft(): boolean {
      return this._openToLeft;
   }

   set openToLeft(_openToLeft: boolean) {
      this._openToLeft = _openToLeft;
      this.offset = this._openToLeft ? { x: 38, y: 7 } : { x: 0, y: 7 };
      this._cd.markForCheck();
   }

   onShowBubble(): void {
      if (_get(this.bubbleTrigger, 'nativeElement.parentElement.offsetWidth') < _get(this.bubbleTrigger, 'nativeElement.parentElement.scrollWidth')) {
         this.visible = true;
      }
   }

   onHideBubble(): void {
      this.visible = false;
   }

}
