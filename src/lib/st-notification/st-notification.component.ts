import { Component, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { StNotificationType } from "./st-notification.type";

@Component({
   selector: 'st-notification',
   templateUrl: './st-notification.component.html',
   styleUrls: ['./st-notification.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StNotificationComponent {
   @Input() containerId: string = '';
   @Input() containerClass: string = '';
   @Input() type: StNotificationType = StNotificationType.INFO;
   @Input() margin: number = 30;
   @Input() maxHeight: number = 40;

   public position: string;
   public top: string;
   public TYPES: any;
   public _visible: boolean = false;

   private notificationElement: any;
   private childElement: any;
   private positionShown: string;
   private hiddenPosition: string;
   private element: ElementRef;

   constructor(element: ElementRef) {
      this.TYPES = StNotificationType;
      this.element = element;
      this._visible = false;
      this.cleanPreviousNotification();
      this.prepareNotificationElement();
   }

   @Input()
   get visible(): boolean {
      return this._visible;
   }

   set visible(value: boolean) {
      this._visible = value;
      this.onChangeVisibility();
   }

   onChangeVisibility(): void {
      if (this._visible) {
         this.showNotification();
      } else {
         this.hideNotification();
      }
   }

   private addNotification(): void {
      if (this.containerId || this.containerClass) {

         let selector: string = this.containerId ? this.containerId.replace('#', '') : this.containerClass.replace('.', '');
         if (this.containerId) {
            this.addToContainerById(selector);
         } else {
            this.addToContainerByClass(selector);
         }

      } else {
         this.addToBody();
      }
   }

   private addToBody(): void {
      this.hiddenPosition = '-' + this.maxHeight + 'px';
      this.positionShown = '0';
      this.position = 'fixed';
      this.top = this._visible ? this.positionShown : this.hiddenPosition;
   }

   private addToContainerById(selectorId: string): void {
      let container = document.getElementById(selectorId);
      console.log(container);
      this.position = 'relative';
      this.putInitialPosition(container);
   }

   private addToContainerByClass(selectorClass: string): void {
      let container = document.getElementsByClassName(selectorClass);
      console.log(container[0]);
      this.position = 'absolute';
      if (container && container.length) {
         this.putInitialPosition(container[0]);
      }
   }

   private putInitialPosition(containerElement: any): void {
      let paddingTop: any = undefined;
      if (containerElement) {
         containerElement.insertBefore(this.notificationElement, containerElement.firstChild);
         if (document.defaultView && document.defaultView.getComputedStyle) {
            paddingTop = window.getComputedStyle(containerElement, undefined).getPropertyValue('padding-top');
            containerElement.style.overflow = 'hidden';
            this.hiddenPosition = '-' + (+paddingTop.replace('px', '') + this.maxHeight) + 'px';
            this.positionShown = '-' + paddingTop;
            this.top = this.hiddenPosition;
         }
      }
   }


   private showNotification(): void {
      this.top = this.positionShown;
   }

   private hideNotification(): void {
      this.top = this.hiddenPosition;
   }

   private cleanPreviousNotification(): void {
      let notificationElement = document.getElementById('notification');
      if (notificationElement) {
         notificationElement.remove();
      }
   }

   private prepareNotificationElement(): void {
      this.element.nativeElement.id = 'notification';
      this.TYPES = StNotificationType;
      this.notificationElement = this.element.nativeElement;
   }
}
