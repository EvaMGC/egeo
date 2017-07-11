/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule, Type } from '@angular/core';

import { StMinValidator } from  './st-min-validator/st-min-validator';
import { StMaxValidator } from  './st-max-validator/st-max-validator';


export const SHARED_FORM_DIRECTIVES: Type<any>[] = [
   StMinValidator,
   StMaxValidator
];


@NgModule({
   declarations: SHARED_FORM_DIRECTIVES,
   exports: SHARED_FORM_DIRECTIVES
})

export class StFormDirectiveModule {
}
