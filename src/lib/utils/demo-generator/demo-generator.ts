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
   ChangeDetectionStrategy,
   Component,
   ComponentFactoryResolver,
   ComponentRef,
   Input,
   OnDestroy,
   AfterViewInit,
   ViewChild,
   ViewContainerRef,
   Type
} from '@angular/core';
import * as ReflectMetadata from 'reflect-metadata';

import { DemoGeneratorProviders } from './demo-generator.interface';

import { StDemoGeneratorModule } from './demo-generator.module';

@Component({
   selector: 'st-demo-body',
   template: '<div #stDemoBody></div>',
   styles: [`
      :host {
         height: 100%;
         width: 100%;
         display: block;
         padding: 30px;
      }
   `],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StDemoGenerator implements OnDestroy, AfterViewInit {
   @ViewChild('stDemoBody', { read: ViewContainerRef }) target: ViewContainerRef;

   inputs: Object;
   outputs: Object;
   component: Type<any>;

   private componentRef: ComponentRef<any>;

   constructor(
      private cfr: ComponentFactoryResolver,
      private config: DemoGeneratorProviders
   ) {
      this.inputs = config.inputs;
      this.outputs = config.outputs;
      this.component = config.components[0];
   }

   /** DYNAMIC BODY DEMO COMPONENT LOAD */
   ngOnDestroy(): void {
      if (this.componentRef) {
         this.componentRef.destroy();
      }
   }

   ngAfterViewInit(): void {
      if (this.component) {
         this.loadDemo();
      }
   }

   private loadDemo(): void {
      if (!this.componentRef) {
         this.target.clear();
         let compFactory = this.cfr.resolveComponentFactory(this.component);
         this.componentRef = this.target.createComponent(compFactory);
         this.bindDemoInputsAndOutputs();
      }
   }

   // tslint:disable:
   private bindDemoInputsAndOutputs(): void {
      // Inputs its not necesary to be defined
      if (this.inputs) {
         Object.keys(this.inputs).map(key => this.componentRef.instance[key] = (<any>this.inputs)[key]);
      }

      // Inputs must be defined for subscribe to them
      if (this.outputs) {
         Object.keys(this.outputs).map(key => {
            if ((this.componentRef.instance as Object).hasOwnProperty(key)) {
               this.componentRef.instance[key].subscribe((<any>this.outputs)[key]);
            }
         });
      }

      this.componentRef.changeDetectorRef.detectChanges();
   }
}
