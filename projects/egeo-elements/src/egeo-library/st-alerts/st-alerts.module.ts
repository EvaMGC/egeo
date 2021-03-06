import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StAlertsComponent, StAlertsModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StAlertsModule],
    entryComponents: [StAlertsComponent]
})
export class StAlertsElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StAlertsComponent, 'st-alerts');
    }
}
