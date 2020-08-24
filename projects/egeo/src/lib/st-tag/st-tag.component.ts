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

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { StTagItem } from './st-tag.model';

/**
 * @description {Component} [Tag]
 *
 * The tag component allows to display small texts.
 *
 * @model
 *
 *   [StTagItem] {./st-tag.model.ts#StTagItem}
 *
 * @example
 *
 * {html}
 *
 * ```
 *  <st-tag [tag]="simpleTag" class="small" [removable]="true"></st-tag>
 *
 * ```
 *
 */
@Component({
   selector: 'st-tag',
   templateUrl: 'st-tag.component.template.html',
   styleUrls: ['st-tag.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush})

export class StTagComponent {
   /** @Input {StTagItem} [tag=] Item that contains the tag info  */
   @Input() tag: StTagItem;
   /** @Input {string} [class=] Classes applied from outside */
   @Input() class: string;
   /** @Input {boolean} [clickable=] Boolean to specify if tag can be clickable */
   @Input() clickable: boolean;
   /** @Output {boolean} [clickButton=] Even emitted when right icon is clicked  */
   @Output() clickButton: EventEmitter<boolean> = new EventEmitter<boolean>();
   /** @Output {StTagItem} [click=] Event emitted when tag is clicked */
   @Output() click: EventEmitter<StTagItem> = new EventEmitter<StTagItem>();

   showBubble: boolean;
   @HostBinding('class')
   classes: string;

   constructor(private _cd: ChangeDetectorRef) {

   }

   ngOnInit(): void {
      this.classes = 'st-tag';
      if (this.clickable) {
         this.classes += ' st-tag--clickable';
      }
      this.classes += ' ' + this.class;
      this._cd.markForCheck();
   }

   onClickButton(): void {
      if (!this.clickable) {
         this.clickButton.emit(true);
      }
   }

   onClick(filter: StTagItem): void {
      this.click.emit(filter);
   }

   onChangeBubbleVisibility(visible: boolean): void {
      this.showBubble = visible;
      this._cd.markForCheck();
   }

}
