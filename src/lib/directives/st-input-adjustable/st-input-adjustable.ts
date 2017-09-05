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
   AfterViewInit,
   Directive,
   ElementRef,
   Input
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
   selector: '[st-input-adjustable]'
})
export class StInputAdjustable implements AfterViewInit {
   @Input() placeholder: string;

   private text: string;
   private hiddenTitle: HTMLSpanElement;

   constructor(private el: ElementRef,
               private ngModel: NgModel) {
   }

   ngAfterViewInit(): void {
      this.createHiddenTitle();
      this.ngModel.valueChanges.subscribe(value => {
         this.text = value || this.placeholder;
         this.hiddenTitle.innerText = this.text;
         setTimeout(() => {
            this.el.nativeElement.parentNode.style.width = this.hiddenTitle.clientWidth + 10 + 'px';
         });
      });
   }

   private createHiddenTitle(): void {
      if (!this.ngModel.value) {
         this.el.nativeElement.value = null;
         this.el.nativeElement.placeholder = this.placeholder;
      }
      this.hiddenTitle = this.el.nativeElement.parentNode.querySelector('.hidden-text');
      if (!this.hiddenTitle) {
         this.hiddenTitle = document.createElement('span');
         this.el.nativeElement.parentNode.appendChild(this.hiddenTitle);
      }

      this.hiddenTitle.className = 'hidden-text';
      this.hiddenTitle.style.visibility = 'hidden';
      this.hiddenTitle.style.position = 'absolute';
      this.hiddenTitle.style.textTransform = 'none';
      this.hiddenTitle.style.whiteSpace = 'nowrap';
      this.hiddenTitle.style.width = 'auto';
      this.hiddenTitle.style.height = 'auto';
   }

}
