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
import { DebugElement } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

// Component
import { StDemoGenerator } from './demo-generator';
import { DemoGeneratorProviders } from './demo-generator.interface';

@Component({
   selector: 'st-demo-generator-test',
   template: `
      <h1>Hello World</h1>
      <h2>{{name}}</h2>
      <div (click)="onClick()" id="st-modal-test-out">Out</div>
   `
})
export class DemoGeneratorTestComponent {
   @Input() name: string;
   @Output() notify: EventEmitter<string> = new EventEmitter<string>();

   onClick(): void {
      this.notify.emit(this.name);
   }
}


let comp: StDemoGenerator;
let fixture: ComponentFixture<StDemoGenerator>;
let de: DebugElement;


let config: DemoGeneratorProviders = {
   inputs: { name: 'test' },
   outputs: { notify: '' },
   components: [DemoGeneratorTestComponent]
};

describe('DemoGenerator', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [],
         declarations: [StDemoGenerator, DemoGeneratorTestComponent],
         providers: [
            { provide: DemoGeneratorProviders, useValue: config }
         ]
      });

      TestBed.overrideModule(BrowserDynamicTestingModule, {
         set: { entryComponents: [DemoGeneratorTestComponent] }
      }).compileComponents();  // compile template and css

   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StDemoGenerator);
      comp = fixture.componentInstance;
   });

   it('should be init', () => {
      fixture.detectChanges();
      expect(comp.inputs).toEqual(config.inputs);
      expect(comp.outputs).toEqual(config.outputs);
      expect(comp.component).toEqual(config.components[0]);
   });

   it('should be init empty', () => {
      comp.inputs = undefined;
      comp.outputs = undefined;
      comp.component = undefined;
      fixture.detectChanges();

      let div: DebugElement = fixture.debugElement.query(By.css('st-demo-generator-test'));
      expect(div).toBeNull();
   });


   it('should load a component', () => {
      fixture.detectChanges();
      let nameProp: string = 'name';

      let div: HTMLDivElement = fixture.debugElement.query(By.css('st-demo-generator-test')).nativeElement;
      expect(div.children.length).toEqual(3);
      expect(div.children[0]).toBeDefined();
      expect(div.children[1]).toBeDefined();
      expect(div.children[0].textContent).toEqual('Hello World');
      expect(div.children[1].textContent).toEqual(config.inputs[nameProp]);
   });

   it('should try to load a component twice', () => {
      fixture.detectChanges();
      comp.ngAfterViewInit();
      fixture.detectChanges();

      let div: HTMLDivElement = fixture.debugElement.query(By.css('st-demo-generator-test')).nativeElement;
      expect(div.children.length).toEqual(3);
      expect(div.children[0]).toBeDefined();
      expect(div.children[0].textContent).toEqual('Hello World');
   });


   it('should bind inputs and outputs to component', () => {
      let name: string = 'Test Name';
      let outFunc = jasmine.createSpy('outFunc');
      comp.inputs = { name, notAnInput: '' };
      comp.outputs = { notify: outFunc, notAnOutput: '' };
      fixture.detectChanges();

      let div: HTMLDivElement = fixture.debugElement.query(By.css('st-demo-generator-test')).nativeElement;
      expect(div.children.length).toEqual(3);
      expect(div.children[0]).toBeDefined();
      expect(div.children[1]).toBeDefined();
      expect(div.children[2]).toBeDefined();
      expect(div.children[0].textContent).toEqual('Hello World');
      expect(div.children[1].textContent).toEqual(name);

      let divOut: HTMLDivElement = fixture.debugElement.query(By.css('#st-modal-test-out')).nativeElement;
      expect(divOut).toBeDefined();
      divOut.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(outFunc).toHaveBeenCalled();
      expect(outFunc).toHaveBeenCalledWith(name);
   });
});
