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
// import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { Subscription } from 'rxjs/Subscription';

import { StAlertsService } from './st-alerts.service';
import { StAlert, STALERT_SEVERITY } from './st-alerts.model';


describe('StAlertsComponent', () => {
   describe('StAlertsService', () => {

      it('Should be get alertList correctly', () => {
         let service: StAlertsService = new StAlertsService();
         let responseFunction = jasmine.createSpy('response');
         let subscription: Subscription = service.alertList.subscribe(responseFunction);

         expect(responseFunction).toHaveBeenCalled();
         expect(responseFunction).toHaveBeenCalledWith([]);
         subscription.unsubscribe();

         service.notifyAlert('fake title', 'fake message', STALERT_SEVERITY.ERROR);
         subscription = service.alertList.subscribe(result => {
            expect(result).toBeDefined();
            expect(result.length).toBe(1);
         });
      });

      it('Should be add with different parameters correctly', () => {
         let service: StAlertsService = new StAlertsService();
         let subscription: Subscription;

         service.notifyAlert('fake title', 'fake message', STALERT_SEVERITY.ERROR);
         subscription = service.alertList.subscribe(result => {
            expect(result).toBeDefined();
            expect(result[0]).toBeDefined();
            expect(result[0].timeout).toEqual(5000);
            expect(result[0].extendedTimeout).toEqual(4000);
            expect(result.length).toBe(1);
         });
         subscription.unsubscribe();

         service.notifyAlert('fake title', 'fake message', STALERT_SEVERITY.ERROR, undefined, 2000, 1000);
         subscription = service.alertList.subscribe(result => {
            expect(result).toBeDefined();
            expect(result.length).toBe(2);
            expect(result[1].timeout).toEqual(2000);
            expect(result[1].extendedTimeout).toEqual(1000);
         });
         subscription.unsubscribe();
      });


      it('Should be remove an alert', fakeAsync(() => {
         let service: StAlertsService = new StAlertsService();
         let subscription: Subscription;
         let alert: StAlert;

         service.notifyAlert('fake title', 'fake message', STALERT_SEVERITY.ERROR);
         subscription = service.alertList.subscribe(result => {
            expect(result).toBeDefined();
            expect(result[0]).toBeDefined();
            expect(result[0].timeout).toEqual(5000);
            expect(result[0].extendedTimeout).toEqual(4000);
            expect(result.length).toBe(1);
            alert = result[0];
         });
         subscription.unsubscribe();

         alert.cancel();
         tick(2000);
         subscription = service.alertList.subscribe(result => {
            expect(result).toBeDefined();
            expect(result.length).toBe(0);
         });

         subscription.unsubscribe();
      }));
   });
});
