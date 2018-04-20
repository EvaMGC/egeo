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
import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { StSidebarItem } from './st-sidebar-item.interface';

/**
 * @description {Component} [Table]
 *
 * The sidebar component has been designed to navigate through different sections of a web page.
 *
 *  @model
 *
 *   [Sidebar items] {./st-sidebar-item.interface.ts#StSidebarItem}
 *
 * @example
 *
 * {html}
 *
 * ```
 * <st-sidebar class="sidebar" title="Mesos Manager" [items]="items" qaTag="sidebar-demo">
 * </st-sidebar>
 * ```
 *
 */
@Component({
   selector: 'st-sidebar',
   templateUrl: './st-sidebar.component.html',
   styleUrls: ['./st-sidebar.component.scss'],
   providers: [],
   host: { class: 'st-sidebar' },
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StSidebarComponent implements OnInit {
   /** @Input {string} [title=''] Title displayed on the top of menu */
   @Input() title: string = '';
   /** @Input {StSidebarItem[]} [items=''] List of items displayed on the menu */
   @Input() items: StSidebarItem[] = [];
   /** @Output {string} [change=''] Event emitted when the active item  is changed */
   @Output() change: EventEmitter<string> = new EventEmitter<string>();

   private _active: string;

   /** @Input {string} [active=''] The id of the current active item */
   @Input() get active(): string {
      return this._active;
   }

   ngOnInit(): void {
      if (!this._active && this.items) {
         this._active = this.items[0].id;
      }
   }

   set active(active: string) {
      if (active !== this._active) {
         this._active = active;
      }
   }

   getItemClasses(item: StSidebarItem): any {
      let classes: any = {};
      if (item.class) {
         classes[item.class] = true;
      }
      classes.item__active = this.isActive(item.id);
      return classes;
   }

   onSelectItem(itemId: string): void {
      if (itemId !== this._active) {
         this.change.emit(itemId);
      }
   }

   private isActive(itemId: string): boolean {
      return this._active === itemId;
   }

}
