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
import {
   Directive,
   Input
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class RouterStub {
   readonly events: Observable<Event>;
   private subject: Subject<any> = new Subject<any>();
   private _url: string = '';

   set url(value: string) { this._url = value; }
   get url(): string { return this._url; }

   constructor() { this.events = this.subject.asObservable(); }
   navigateByUrl(url: string): string { return url; }
   navigate(commands: any[], extras?: any): Promise<boolean> { return Promise.resolve(true); }
   launchNewEvent(event: any): void { this.subject.next(event); }
   closeSubscriptions(): void { this.subject.complete(); }
}


@Directive({
   selector: '[routerLink]',
   host: {
      '(click)': 'onClick()'
   }
})
export class RouterLinkStubDirective {
   @Input('routerLink') linkParams: any;
   navigatedTo: any = null;

   onClick(): void {
      this.navigatedTo = this.linkParams;
   }
}
