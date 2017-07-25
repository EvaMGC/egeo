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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { StBreadcrumbItemComponent } from './st-breadcrumbs-item.component';

describe('StBreadCrumbsItemComponent', () => {
   let component: StBreadcrumbItemComponent;
   let fixture: ComponentFixture<StBreadcrumbItemComponent>;

   beforeEach(
      async(() => {
         TestBed.configureTestingModule({
            declarations: [StBreadcrumbItemComponent],
            schemas: [NO_ERRORS_SCHEMA]
         }).compileComponents(); // compile template and css
      })
   );

   beforeEach(() => {
      fixture = TestBed.createComponent(StBreadcrumbItemComponent);
      component = fixture.componentInstance;
   });

   describe('if initialized', () => {
      it('should create the component', () => {
         expect(component).toBeTruthy();
      });
   });
});
