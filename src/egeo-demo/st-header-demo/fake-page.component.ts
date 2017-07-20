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
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'fake-page',
   template: `
      <div>
         <h1>YOU NAVIGATE TO PAGE</h1>
           <p [innerHTML]="pageName"></p>
         <br><br>
         <router-outlet></router-outlet>
      </div>`,
   styles: [' div { max-width: 1700px; margin: auto; } '],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StFakePageComponent {
   public pageName: string = 'ERROR';

   constructor(private _router: ActivatedRoute) {
      let id: string = 'pageName';
      this._router.data.subscribe(data => this.pageName = data[id]);
   }
}
