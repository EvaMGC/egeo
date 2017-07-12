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
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { StAlertsComponent } from './st-alerts.component';
import { StAlertsService } from './st-alerts.service';
import { StAlertBoxComponent } from './alert-box/st-alert-box.component';
import { StAlert, STALERT_SEVERITY, StAlertLink } from './st-alerts.model';


class MockService {
   alertList: Observable<StAlert[]> = Observable.create((observer: Observer<StAlert[]>) => {
      observer.next([new StAlert(0, 'Error', 'error message', STALERT_SEVERITY.ERROR, 1000, 500, undefined)]);
      observer.complete();
   });
}


describe('StAlertsComponent', () => {
   let component: StAlertsComponent;
   let fixture: ComponentFixture<StAlertsComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StAlertsComponent, StAlertBoxComponent],
         providers: [{ provide: StAlertsService, useClass: MockService }]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StAlertsComponent);
      component = fixture.componentInstance;
   });

   it('Should be init correctly', fakeAsync(() => {
      spyOn(console, 'error');
      component.qaTag = 'test';
      component.showInConsole = true;

      fixture.detectChanges();
      expect(console.error).toHaveBeenCalled();

      tick(500);
      let alerts: DebugElement[] = fixture.debugElement.queryAll(By.css('.sth-alert-box'));
      expect(alerts).toBeDefined();
      expect(alerts.length).toBe(1);

      discardPeriodicTasks();
   }));
});
