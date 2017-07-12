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
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { StAlert, STALERT_SEVERITY, StAlertLink } from './st-alerts.model';

@Injectable()
export class StAlertsService {
   private _alertsList: StAlert[] = [];
   private _nextId: number = 0;

   private _alertsStream: BehaviorSubject<StAlert[]> = new BehaviorSubject<StAlert[]>([]);

   get alertList(): Observable<StAlert[]> {
      return this._alertsStream.asObservable();
   }

   public notifyAlert(title: string, message: string, severity: STALERT_SEVERITY, link?: StAlertLink, timeout?: number, extendedTimeout?: number): void {
      timeout = timeout !== undefined ? timeout : 5000;
      extendedTimeout = extendedTimeout !== undefined ? extendedTimeout : 4000;
      let alert: StAlert = new StAlert(this._nextId, title, message, severity, timeout, extendedTimeout, link);
      alert.removeAlertEvent.subscribe(alertToRemove => this.onNotifyRemove(alertToRemove));
      this.insertAlert(alert);
      this._nextId++;
   }

   private insertAlert(alert: StAlert): void {
      this._alertsList.push(alert);
      this._alertsStream.next(this._alertsList);
   }

   private onNotifyRemove(alert: StAlert): void {
      let pos: number = this._alertsList.findIndex(internalAlert => internalAlert.id === alert.id);
      this._alertsList.splice(pos, 1);
      this._alertsStream.next(this._alertsList);
   }
}
