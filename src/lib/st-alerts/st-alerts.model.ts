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
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

// tslint:disable:max-classes-per-file
export enum STALERT_SEVERITY { SUCCESS, WARNING, ERROR }

export class StAlertLink {
   public title: string;
   public link: string;
}

export class StAlert {
   private _changeVisibilityInterval: number;
   private _lifeTimeout: number;
   private _readed: boolean = false;
   private _opacity: number = 0;
   private _opacityState: Subject<number> = new Subject<number>();
   private _removeEvent: Subject<StAlert> = new Subject<StAlert>();

   constructor(
      public id: number,
      public title: string,
      public message: string,
      public severity: STALERT_SEVERITY,
      public timeout: number,
      public extendedTimeout: number,
      public link: StAlertLink
   ) { }

   get opacity(): Observable<number> {
      return this._opacityState.asObservable();
   }

   get removeAlertEvent(): Observable<StAlert> {
      return this._removeEvent.asObservable();
   }

   notify(): void {
      this.setVisible(true);
   }

   pauseNotify(): void {
      this._opacity = 1;
      this._readed = true;
      this.clearAnimation();
      this.stopLife();
      this._opacityState.next(this._opacity);
   }

   continueNotify(): void {
      this.startLife();
   }

   cancel(): void {
      this.setVisible(false);
   }


   private setVisible(increase: boolean): void {
      this.clearAnimation();
      this._changeVisibilityInterval = window.setInterval(() => this.modifyVisibility(increase), 50);
   }

   private modifyVisibility(increase: boolean): void {
      this._opacity += increase ? 0.1 : -0.1;
      if (this._opacity >= 1 || this._opacity <= 0) {
         this.clearAnimation();
         if (increase) {
            this.startLife();
         } else {
            this.notifyForRemove();
         }
      }
      this._opacityState.next(this._opacity);
   }

   private notifyForRemove(): void {
      this._opacityState.complete();
      this._removeEvent.next(this);
      this._removeEvent.complete();
   }

   private clearAnimation(): void {
      window.clearInterval(this._changeVisibilityInterval);
   }

   private stopLife(): void {
      window.clearTimeout(this._lifeTimeout);
   }

   private startLife(): void {
      let timeout: number = this._readed ? this.extendedTimeout : this.timeout;
      this._lifeTimeout = window.setTimeout(() => this.setVisible(false), timeout);
   }
}
