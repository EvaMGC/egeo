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
import { DebugElement, SimpleChanges, SimpleChange } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { cloneDeep as _cloneDeep } from 'lodash';


import { StTreeNodeExpandComponent } from './st-tree-node-expand.component';

let fixture: ComponentFixture<StTreeNodeExpandComponent>;

describe('StTreeComponent', () => {
   describe('StTreeNodeExpandComponent', () => {

      let comp: StTreeNodeExpandComponent;

      beforeEach(async(() => {
         TestBed.configureTestingModule({
            declarations: [StTreeNodeExpandComponent]
         })
            .compileComponents();  // compile template and css
      }));

      beforeEach(() => {
         fixture = TestBed.createComponent(StTreeNodeExpandComponent);
         comp = fixture.componentInstance;
      });

      it('should init correctly when type is empty', () => {
         fixture.detectChanges();

         expect(comp.getPathDots()).toEqual('M2.5 4.5h4M4.5 2.5v4');
         expect(comp.getGraphDots()).toEqual('M.5.5h8v8h-8z');
         expect(comp.getDeffDots()).toEqual('M0 0h9v9H0z');
         expect(comp.getWidth()).toEqual('9');
         expect(comp.getViewBox()).toEqual('0 0 9 9');
         expect(comp.isRoot()).toBeFalsy();
      });

      it('should init correctly when type is collapsed', () => {
         comp.type = 'collapsed';
         fixture.detectChanges();

         expect(comp.getPathDots()).toEqual('M2.5 4.5h4M4.5 2.5v4');
         expect(comp.getGraphDots()).toEqual('M.5.5h8v8h-8z');
         expect(comp.getDeffDots()).toEqual('M0 0h9v9H0z');
         expect(comp.getWidth()).toEqual('9');
         expect(comp.getViewBox()).toEqual('0 0 9 9');
         expect(comp.isRoot()).toBeFalsy();
      });

      it('should init correctly when type is expanded', () => {
         comp.type = 'expanded';
         fixture.detectChanges();

         expect(comp.getPathDots()).toEqual('M2.5 4.5h4');
         expect(comp.getGraphDots()).toEqual('M.5.5h8v8h-8z');
         expect(comp.getDeffDots()).toEqual('M0 0h9v9H0z');
         expect(comp.getWidth()).toEqual('9');
         expect(comp.getViewBox()).toEqual('0 0 9 9');
         expect(comp.isRoot()).toBeFalsy();
      });

      it('should init correctly when type is root', () => {
         comp.type = 'root';
         fixture.detectChanges();

         expect(comp.getPathDots()).toEqual('');
         expect(comp.getGraphDots()).toEqual('M.5.5h17v8H.5z');
         expect(comp.getDeffDots()).toEqual('M0 0h18v9H0z');
         expect(comp.getWidth()).toEqual('18');
         expect(comp.getViewBox()).toEqual('0 0 18 9');
         expect(comp.isRoot()).toBeTruthy();
      });
   });
});
