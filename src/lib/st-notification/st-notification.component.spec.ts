import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StNotificationComponent } from "./st-notification.component";
import { StNotificationType } from "./st-notification.type";
import { ViewChild } from '@angular/core';

let fixture: ComponentFixture<StNotificationComponent>;
let component: StNotificationComponent;

@Component({
   selector: 'test-component',
   template: `
<div id ="notification-container-id"></div>
<div class ="notification-container-class"></div>
      <st-notification [containerId]="containerId" [containerClass]="containerClass" [type]="type">
     
      </st-notification>
   `
})
class TestComponent {
   @Input() containerId: string;
   @Input() containerClass: string;
   @Input() type: StNotificationType;

   @ViewChild(StNotificationComponent)
   public notification: StNotificationComponent;
}

describe('StNotificationComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StNotificationComponent, TestComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
   });

   describe('notification is displayed according to its content type', () => {
      it('if content is an error, it is displayed with red color', () => {
         component.type = StNotificationType.ERROR;

         fixture.detectChanges();

         let notification: HTMLDivElement = fixture.nativeElement.querySelector('.st-notification');

         expect(notification.classList).toContain('error');
      });

      it('if content is a warning, it is displayed with orange color', () => {
         component.type = StNotificationType.WARNING;
         fixture.detectChanges();
         let notification: HTMLDivElement = fixture.nativeElement.querySelector('.st-notification');

         expect(notification.classList).toContain('warning');
      });

      it('if content is info, it is displayed with gray color', () => {
         component.type = StNotificationType.INFO;
         fixture.detectChanges();

         let notification: HTMLDivElement = fixture.nativeElement.querySelector('.st-notification');

         expect(notification.classList).toContain('info');
      });
   });

   describe('notification can be displayed at any container', () => {
      beforeEach(() => {
         component.containerId = undefined;
         component.containerClass = undefined;
      });

      it('if container id is introduced as param, notification is added to the container with this id', () => {
         component.containerId = 'notification-container-id';
         component.notification.ngOnInit();

         fixture.detectChanges();

         let notification: HTMLDivElement = fixture.nativeElement.querySelector('st-notification');

         expect(notification.parentElement.id).toContain('notification-container-id');
      });

      it('if container id is not introduced as param but there is a container class, notification is added to the container with this class', () => {
         component.containerClass = 'notification-container-class';
         component.notification.notification.ngOnInit();
         fixture.detectChanges();

         let notification: HTMLDivElement = fixture.nativeElement.querySelector('st-notification');

         expect(notification.parentElement.classList).toContain('notification-container-class');
      });

      it('if there are not container id nor container class, notification is displayed at the top of the screen', () => {
         component.notification.notification.ngOnInit();
         fixture.detectChanges();

         let notification: HTMLDivElement = fixture.nativeElement.querySelector('st-notification');

         expect(notification.parentElement.tagName).toBe('body');
      });

   });
});
