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
import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core';

import { StInfoBoxModule } from './st-info-box.module';
import { StDemoGeneratorModule } from '../utils/demo-generator/demo-generator.module';
import { StInfoBoxComponent } from './st-info-box.component';


/**
 * Way 1 of generate a demo
 *
 * In this way you declare a component that act as demo and inject itself and component to be used in demo
 * in the demo module
 *
 */

@Component({
   template: `
      <section class="container-liquid">
         <div class="row">
            <div class="col-md-24">
               <st-info-box class="st-info-box-container" [height]="250" title="MAIN TITLE">
                  <p>You can put any content here</p>
               </st-info-box>
            </div>
         </div>
         <div class="row">
            <div class="col-md-12">
               <st-info-box class="st-info-box-container" icon="icon-cassandra" title="CASSANDRA">
                  <p>You can put any content here</p>
               </st-info-box>
            </div>
            <div class="col-md-12">
               <st-info-box class="st-info-box-container" icon="icon-hdfs" title="HDFS">
                  <p>You can put any content here</p>
               </st-info-box>
            </div>
         </div>
      </section>
   `,
   styles: [`
      .st-info-box-container{
         margin: 0 0 30px 0;
      }
   `]
})
export class StInfoBoxDemoComponent { }


@NgModule({
   imports: [
      CommonModule,
      StInfoBoxModule,
      StDemoGeneratorModule.withComponents({ components: [StInfoBoxDemoComponent, StInfoBoxComponent] })
   ],
   declarations: [StInfoBoxDemoComponent]
})
export class StInfoBoxDemoModule { }


/**
 * Way 2 of generate a demo
 *
 * In this way you declare only the component and pass inputs and outputs of this components to demo module
 *
 */

// @NgModule({
//    imports: [
//       CommonModule,
//       StInfoBoxModule,
//       StDemoGeneratorModule.withComponents({components: [StInfoBoxComponent], inputs: {title: 'Test'}} )
//    ],
//    declarations: []
// })
// export class StInfoBoxDemoModule { }


