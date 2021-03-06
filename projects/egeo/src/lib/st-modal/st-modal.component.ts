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
   Component,
   ComponentFactoryResolver,
   ComponentRef,
   EventEmitter,
   HostBinding,
   Input,
   OnDestroy,
   AfterViewInit,
   Output,
   ViewChild,
   ViewContainerRef} from '@angular/core';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

import { StModalButton, StModalButtonResponse, StModalConfig, StModalResponse } from './st-modal.model';
import { StWindowRefService } from '../utils/window-service';

@Component({
   selector: 'st-modal',
   templateUrl: './st-modal.component.html',
   styleUrls: ['./st-modal.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   animations: [
      trigger('state', [
         state('void, hidden', style({opacity: 0})),
         state('visible', style({opacity: 1})),
         transition('* => visible', [
            style({opacity: 0}),
            animate(300 )
            ]),
         transition('* => hidden', [
            style({opacity: 1}),
            animate(300 )
            ])
      ])
  ]
})
export class StModalComponent implements OnDestroy, AfterViewInit {
   @Input() modalConfig: StModalConfig;
   @Input() component: any;
   @HostBinding('@.disabled')
   @Input() disabledAnimation: boolean = true;
   @Output() click: EventEmitter<StModalButtonResponse> = new EventEmitter<StModalButtonResponse>();
   @Output() endAnimation: EventEmitter<boolean>  = new EventEmitter<boolean>();
   @ViewChild('stModalBody', { read: ViewContainerRef, static: false }) targetContent: ViewContainerRef;
   @ViewChild('stModalBodyEmpty', { read: ViewContainerRef, static: false }) targetEmpty: ViewContainerRef;

   readonly defaultMaxWidth: number = 600;
   readonly defaultMinWidth: number = 400;

   target: ViewContainerRef;
   visibility: string = 'visible';

   private componentRef: ComponentRef<any>;
   private _subscriptions: Array<Subscription> = [];

   constructor(
      private cfr: ComponentFactoryResolver,
      private windowRef: StWindowRefService
   ) { }

   get hasIcon(): string {
      return this.modalConfig.iconStatus;
   }

   get isFullscreen(): boolean {
      return this.modalConfig.fullscreen;
   }

   get title(): string {
      return this.modalConfig.modalTitle;
   }

   get buttons(): StModalButton[] {
      return this.modalConfig.buttons || [];
   }

   get isMessageModal(): boolean {
      return this.modalConfig.message && this.modalConfig.message.length > 0;
   }

   get isComplexMessageModal(): boolean {
      return this.modalConfig.html && this.modalConfig.html.length > 0;
   }

   get html(): string {
      return this.modalConfig.html;
   }

   get message(): string {
      return this.modalConfig.message;
   }

   get messageTitle(): string {
      return this.modalConfig.messageTitle;
   }

   get modalStyles(): Object {
      const maxWidth = this.modalConfig.maxWidth || this.defaultMaxWidth;
      const minWidth = this.modalConfig.minWidth || this.defaultMinWidth;
      const width = this.getModalActualWidth(maxWidth, minWidth);
      return { 'max-width': `${maxWidth}px`, 'min-width': `${minWidth}px`, 'width': `${width}px` };
   }

   get emptyModal(): boolean {
      return this.modalConfig && this.modalConfig.empty;
   }

   get showCloseBtn(): boolean {
      return this.modalConfig.showCloseBtn;
   }

   animationDone(event: AnimationEvent): void {
      if (event.toState === 'hidden') {
         this.endAnimation.emit(true);
      }
   }

   onClickButtons(event: any): void  {
      this.visibility = 'hidden';
      this._subscriptions.push(this.endAnimation.subscribe((data) => {
         if (data) {
            this.click.emit(event);
         }
      }));
   }

   onClose(): void {
      this.visibility = 'hidden';
      this._subscriptions.push(this.endAnimation.subscribe((data) => {
         if (data) {
            this.click.emit({
               response: StModalResponse.CLOSE,
               close: true
            });
         }
      }));
   }

   /** DYNAMIC MODAL BODY COMPONENT LOAD */
   ngAfterViewInit(): void {
      this.target = this.emptyModal ? this.targetEmpty : this.targetContent;
      if (this.component && !(this.modalConfig.html || this.modalConfig.message)) {
         this.loadBody();
      }
      this.windowRef.nativeWindow.document.body.classList.add('st-modal-overlay');
   }

   ngOnDestroy(): void {
      if (this.componentRef) {
         this.componentRef.destroy();
      }
      this.windowRef.nativeWindow.document.body.classList.remove('st-modal-overlay');
      if (this._subscriptions.length > 0) {
         this._subscriptions.forEach((subscription) => {
            if (subscription) {
               subscription.unsubscribe();
            }
         });
      }
   }

   private getModalActualWidth(maxWidth: number, minWidth?: number): number {
      const screenWidth: number = this.windowRef.nativeWindow.screen.width;
      return screenWidth > maxWidth ? maxWidth : (screenWidth < minWidth ? minWidth : screenWidth);
   }

   private loadBody(): void {
      if (!this.componentRef) {
         this.target.clear();
         const compFactory = this.cfr.resolveComponentFactory(this.component);
         this.componentRef = this.target.createComponent(compFactory);
         this.bindModalInputs();
      }
   }

   private bindModalInputs(): void {
      Object.keys(this.modalConfig.inputs).forEach((key: string) => {
         this.componentRef.instance[key] = (this.modalConfig.inputs as any)[key];
      });
      Object.keys(this.modalConfig.outputs).forEach((key: string) => {
         this.componentRef.instance[key].subscribe((this.modalConfig.outputs as any)[key]);
      });
      this.componentRef.changeDetectorRef.detectChanges();
   }
}
