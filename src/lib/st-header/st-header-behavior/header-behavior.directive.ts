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
import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({ selector: '[stHeaderBehavior]' })
export class StHeaderBehaviorDirective {

   private expanded: boolean = true;
   private headerChangePos: number = 95;

   constructor(private renderer: Renderer, private elementRef: ElementRef) {
      this.renderer.setElementClass(this.elementRef.nativeElement, 'st-header-normal', true);
   }

   @HostListener('window:scroll', ['$event']) doSomething(event: Event): void {
      if (document.body.scrollTop > this.headerChangePos) {
         if (this.expanded) {
            this.expanded = !this.expanded;
            this.applyClass(this.expanded);
         }
      } else {
         if (!this.expanded) {
            this.expanded = !this.expanded;
            this.applyClass(this.expanded);
         }
      }
   }

   private applyClass(expanded: boolean): void {
      if (expanded) {
         this.renderer.setElementClass(this.elementRef.nativeElement, 'st-header-collapsed', false);
         this.renderer.setElementClass(this.elementRef.nativeElement, 'st-header-normal', true);
      } else {
         this.renderer.setElementClass(this.elementRef.nativeElement, 'st-header-normal', false);
         this.renderer.setElementClass(this.elementRef.nativeElement, 'st-header-collapsed', true);
      }
   }
}
