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
import { Component, ElementRef, OnInit, Input, ViewEncapsulation } from '@angular/core';
import Popper from 'popper.js/dist/umd/popper.js';

export type PopperPlacement = 'top' | 'top-start' | 'top-end' |
   'right' | 'right-start' | 'right-end' |
   'bottom' | 'bottom-start' | 'bottom-end' |
   'left' | 'left-start' | 'left-end';

@Component({
   selector: 'st-pop',
   encapsulation: ViewEncapsulation.None,
   templateUrl: './st-pop.component.html'
})
export class StPopComponent implements OnInit {

   @Input() placement: PopperPlacement = 'left';
   @Input() hidden: boolean = true;
   @Input() gpuAcceleration: boolean = true;

   private popper: any;

   constructor(private el: ElementRef) { }

   ngOnInit(): void {
      let options: Popper.PopperOptions = {
            placement: this.placement,
            removeOnDestroy: true,
            modifiers: {
               applyStyle: {
                  gpuAcceleration: this.gpuAcceleration
               }
            }
      };

      this.popper = new Popper(
         this.el.nativeElement.querySelector('[pop-button]'),
         this.el.nativeElement.querySelector('[pop-content]'),
         options
      );

   }

}
