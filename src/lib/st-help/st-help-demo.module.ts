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

import { StDemoGeneratorModule } from '../utils/demo-generator/demo-generator.module';
import { StHelpComponent } from './st-help.component';
import { StHelpModule } from './st-help.module';

@Component({
   template: `
      <section class="container-liquid">
         <div class="row">
            <div class="col-md-24 st-demo-help-background">
               <st-help qaTag="help-demo-horizontal" textPosition="horizontal" [text]="'Horizontal: ' + text"></st-help>
            </div>
         </div>
         <div class="row">
            <div class="col-md-12 st-demo-help-background">
               <st-help qaTag="help-demo-vertical-left" textPosition="vertical" [text]="'Vertical: ' + text"></st-help>
            </div>
            <div class="col-md-12 st-demo-help-background">
               <st-help qaTag="help-demo-vertical-right" textPosition="vertical" [text]="'Vertical: ' + text"></st-help>
            </div>
         </div>
      </section>
   `,
   styles: [`
      .st-demo-help-background {
         background-color: #efefef;
         padding: 20px;
      }
   `]
})
export class StHelpDemoComponent { 
   text: string = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.";
}

@NgModule({
   imports: [
      CommonModule,
      StHelpModule,
      StDemoGeneratorModule.withComponents({ components: [StHelpDemoComponent, StHelpComponent] })
   ],
   declarations: [StHelpDemoComponent]
})
export class StHelpDemoModule { }
