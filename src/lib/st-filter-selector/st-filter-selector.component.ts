/*
 * © 2017 Stratio Big Data Inc., Sucursal en España. All rights reserved.
 *
 * This software – including all its source code – contains proprietary
 * information of Stratio Big Data Inc., Sucursal en España and
 * may not be revealed, sold, transferred, modified, distributed or
 * otherwise made available, licensed or sublicensed to third parties;
 * nor reverse engineered, disassembled or decompiled, without express
 * written authorization from Stratio Big Data Inc., Sucursal en España.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StDropDownMenuItem, StDropDownVisualMode } from '../st-dropdown-menu/st-dropdown-menu.interface';

/**
 * @description {Component} [Filter selector]
 *
 * The filter selector allows display a filter with a list of options
 *
 * @example
 *
 * {html}
 *
 * ```
 * <st-filter-selector
 *    [filterList]="filter"
 *    [openFilter]="openFilter"
 *    [selected]="selectedFilter"
 *    (clickFilter)="onFilter($event)"
 *    (changeFilterVisibility)="onChangeFilterVisibility()"
 *    (closeFilter)="onCloseFilter()">
 * </st-filter-selector>
 * ```
 *
 */
@Component({
   selector: 'st-filter-selector',
   templateUrl: './st-filter-selector.template.html',
   styleUrls: ['./st-filter-selector.style.scss']
})

export class StFilterSelectorComponent implements OnInit {
   /** @Input {boolean} [openFilter=false] This boolean is needed to specify the status of the filter (open or closed) */
   @Input() openFilter: boolean = false;
   /** @Input {StDropDownMenuItem[]} [filterList=] List of options */
   @Input() filterList: StDropDownMenuItem[] = [];
   /** @Input {StDropDownMenuItem} [selected=] Selected option */
   @Input() selected: StDropDownMenuItem;
   /** @Output {StDropDownMenuItem} [clickFilter=] Event emitted when an option is selected */
   @Output() clickFilter: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();
   /** @Output {boolean} [changeFilterVisibility=] Event emitted when visibility of options changes */
   @Output() changeFilterVisibility: EventEmitter<boolean> = new EventEmitter<boolean>();
   /** @Output {boolean} [closeFilter=] Event emitted when option menu is closed */
   @Output() closeFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

   public readonly sectionMenuVisualMode: StDropDownVisualMode = StDropDownVisualMode.MENU_LIST;

   ngOnInit(): void {
      if (!this.selected) {
         this.clickFilter.emit(this.filterList[0]);
      }
   }

   onClickFilter(selectedFilter: StDropDownMenuItem): void {
      this.clickFilter.emit(selectedFilter);
   }

   onChangeFilterVisibility(): void {
      this.changeFilterVisibility.emit(!this.openFilter);
   }

   onCloseFilter(): void {
      this.closeFilter.emit(true);
   }
}
