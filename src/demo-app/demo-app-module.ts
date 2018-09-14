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
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { EgeoModule } from '@stratio/egeo';

import { SharedModule } from './app/shared/shared.module';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { AppService } from './app/app.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
   imports: [
      BrowserModule,
      AppRoutingModule,
      RouterModule,
      HttpModule,
      HttpClientModule,
      EgeoModule.forRoot(),
      SharedModule
   ],
   declarations: [AppComponent],
   providers: [AppService],
   bootstrap: [AppComponent]
})
export class DemoAppModule { }
