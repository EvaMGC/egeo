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
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

/* App Root */
import { AppComponent } from './app/app.component';

/* Other modules Imports */
import { routing } from './app/app.routing';
import { SharedModule } from './app/shared/shared.module';
import { LayoutComponent } from './app/layout/layout.component';
import { MainComponent } from './app/main/main';

// Hot Loader
import { AppStore, State } from './app/app.store';
import {
   removeNgStyles,
   createNewHosts,
   createInputTransfer
} from '@angularclass/hmr';

import { EgeoModule } from '@stratio/egeo';

// Libs and external dependencies
import 'rxjs';
import './styles/global.scss';

@NgModule({
   imports: [
      BrowserModule,
      HttpModule,
      routing,
      SharedModule,
      EgeoModule.forRoot()
   ],
   declarations: [
      AppComponent,
      LayoutComponent,
      MainComponent
   ],
   entryComponents: [AppComponent],
   providers: [AppStore]
})
export class DemoAppModule {
   constructor(public appRef: ApplicationRef, public appStore: AppStore) { }

   ngDoBootstrap(): void {
      this.appRef.bootstrap(AppComponent);
   }

   hmrOnInit(store: any): void {
      if (!store || !store.state) {
         return;
      }
      console.log('HMR store', JSON.stringify(store, undefined, 2));
      // restore state
      this.appStore.setState(store.state);
      // restore input values
      if ('restoreInputValues' in store) {
         store.restoreInputValues();
      }
      this.appRef.tick();
      Object.keys(store).forEach(prop => delete store[prop]);
   }

   hmrOnDestroy(store: any): void {
      const cmpLocation = this.appRef.components.map(
         cmp => cmp.location.nativeElement
      );
      const currentState = this.appStore.getState();
      store.state = currentState;
      // recreate elements
      store.disposeOldHosts = createNewHosts(cmpLocation);
      // save input values
      store.restoreInputValues = createInputTransfer();
      // remove styles
      removeNgStyles();
   }

   hmrAfterDestroy(store: any): void {
      // display new elements
      store.disposeOldHosts();
      delete store.disposeOldHosts;
   }
}
