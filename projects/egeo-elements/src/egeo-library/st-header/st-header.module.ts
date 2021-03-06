import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StHeaderComponent, StHeaderModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StHeaderModule],
    entryComponents: [StHeaderComponent]
})
export class StHeaderElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StHeaderComponent, 'st-header');
    }
}
