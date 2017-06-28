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
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

// Component
import { StSearchComponent } from './st-search.component';

// Modules
import { StDropdownMenuModule } from '../st-dropdown-menu/st-dropdown-menu.module';
import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';

let comp: StSearchComponent;
let fixture: ComponentFixture<StSearchComponent>;
let de: DebugElement;

let id: string = 'search-123';
let placeholder: string = 'search a text';

describe('StSearchComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StDropdownMenuModule],
         declarations: [StSearchComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StSearchComponent);
      comp = fixture.componentInstance;

      comp.qaTag = id;
      comp.placeholder = placeholder;
   });

   it('should be initialized correctly', () => {
      fixture.detectChanges();
      let input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      expect(input.id).toEqual(id);  // qaTag
      expect(input.placeholder).toEqual(placeholder); // placeholder value
   });

   it('init with value', () => {
      comp.debounce = 0;
      comp.minLength = 0;
      comp.value = 'Initial value';
      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      expect((<HTMLInputElement>input.nativeElement).value).toEqual('Initial value');
   });

   it('should be search (async)', fakeAsync(() => {
      comp.debounce = 10;
      fixture.detectChanges();
      let result: string = 'test';
      let input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      let outputSearch: string;
      comp.search.subscribe((search: string) => outputSearch = search);
      input.value = result;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(11);
      expect(outputSearch).toEqual(result);
   }));

   it('should be searched with delay', fakeAsync(() => {
      comp.debounce = 1000;
      fixture.detectChanges();

      let result: string = 'test';
      let input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      let outputSearch: string = '';
      comp.search.subscribe((search: string) => outputSearch = search);
      input.value = result;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(500);
      expect(outputSearch).not.toEqual(result);
      tick(501);
      expect(outputSearch).toEqual(result);
   }));

   it('should be searched with new delay', fakeAsync(() => {
      comp.debounce = 1000;
      fixture.detectChanges();

      let result: string = 'test';
      let input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      let outputSearch: string = '';
      comp.search.subscribe((search: string) => outputSearch = search);
      input.value = result;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(500);
      expect(outputSearch).not.toEqual(result);
      tick(501);
      expect(outputSearch).toEqual(result);

      let changes: SimpleChanges = { debounce: new SimpleChange(1000, 250, true) };
      comp.debounce = 250;
      comp.ngOnChanges(changes);
      fixture.detectChanges();

      outputSearch = '';
      result = 'test2';
      input.value = result;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(200);
      expect(outputSearch).not.toEqual(result);
      tick(55);
      expect(outputSearch).toEqual(result);
   }));

   it('should be searched with min length', fakeAsync(() => {
      comp.minLength = 3;
      let responseFunction = jasmine.createSpy('response');
      comp.search.subscribe(responseFunction);
      fixture.detectChanges();

      let input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

      input.value = 'te';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(1);
      expect(responseFunction).not.toHaveBeenCalled();

      input.value = 'test';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(1);
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledWith('test');
   }));

   it('should be searched when press enter', () => {
      comp.debounce = 0;
      comp.minLength = 0;
      let responseFunction = jasmine.createSpy('response');
      comp.search.subscribe(responseFunction);

      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      input.nativeElement.value = 'te';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.triggerEventHandler('keypress', { keyCode: 13 });
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith('te');

      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.triggerEventHandler('keypress', { which: 10 });
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1); // Not again

      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.triggerEventHandler('keypress', { which: 13 });
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(2);
      expect(responseFunction).toHaveBeenCalledWith('test');

      input.triggerEventHandler('keypress', { which: 13 });
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(3);
      expect(responseFunction).toHaveBeenCalledWith('test');
   });

   it('should be searched twice', fakeAsync(() => {
      let responseFunction = jasmine.createSpy('response');
      comp.search.subscribe(responseFunction);

      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      input.nativeElement.value = 'te';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(1);
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith('te');

      input.nativeElement.value = 'te';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(1);
      expect(responseFunction).toHaveBeenCalledTimes(1);

      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(1);
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(2);
      expect(responseFunction).toHaveBeenCalledWith('test');
   }));

   it('should be searched when press enter without liveSearch', () => {
      comp.liveSearch = false;
      let responseFunction = jasmine.createSpy('response');
      comp.search.subscribe(responseFunction);

      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      input.nativeElement.value = 'te';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(responseFunction).not.toHaveBeenCalled();

      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.triggerEventHandler('keypress', { which: 13 });
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledWith('test');
   });

   it('should be able to clear on click', () => {
      comp.debounce = 0;
      comp.minLength = 0;

      fixture.detectChanges();

      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      input.nativeElement.value = 'test';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      let clearButton: DebugElement = fixture.debugElement.query(By.css('.icon-cross'));
      expect(comp.searchBox.value).toEqual('test');

      clearButton.nativeElement.dispatchEvent(new Event('mousedown'));
      expect(comp.searchBox.value).toEqual('');
   });

   it('should be able to change initial Values', () => {
      comp.debounce = 0;
      comp.minLength = 0;
      comp.value = 'Initial value';
      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      expect((<HTMLInputElement>input.nativeElement).value).toEqual('Initial value');

      let changes: SimpleChanges = {
         value: new SimpleChange('Initial value', 'new value', true),
         liveSearch: new SimpleChange(true, false, true)
      };

      comp.value = 'new value';
      comp.liveSearch = false;

      comp.ngOnChanges(changes);
      fixture.detectChanges();

      expect((<HTMLInputElement>input.nativeElement).value).toEqual('new value');


      changes = {
         liveSearch: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false }
      };
      comp.ngOnChanges(changes);
      fixture.detectChanges();

      expect((<HTMLInputElement>input.nativeElement).value).toEqual('new value');
   });

   it('should be able to change to disabled state', () => {
      comp.disabled = true;
      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      let disabledState: string = input.nativeElement.getAttribute('disabled');
      expect(disabledState).not.toBeNull();
   });

   it('should be able to change to disabled state twice', () => {
      comp.disabled = true;
      fixture.detectChanges();
      let input: DebugElement = fixture.debugElement.query(By.css('input'));

      let disabledState: string = input.nativeElement.getAttribute('disabled');
      expect(disabledState).not.toBeNull();

      let changes: SimpleChanges = { disabled: new SimpleChange(true, false, true) };
      comp.ngOnChanges(changes);
      disabledState = input.nativeElement.getAttribute('disabled');
      expect(disabledState).toEqual('');
   });

   it('should destroy correctly', () => {
      comp.isActive = true;
      expect(comp.isActive).toBeTruthy();
      comp.ngOnDestroy();
      expect(comp.isActive).toBeFalsy();
   });

   it('should be search with autocomplete', () => {

      comp.autocompleteList = [{ value: '1', label: '1' }, { value: '2', label: '2' }];
      comp.withAutocomplete = true;
      let responseFunction = jasmine.createSpy('response');
      comp.search.subscribe(responseFunction);

      fixture.detectChanges();
      expect(responseFunction).not.toHaveBeenCalled();

      comp.changeOption(undefined);
      expect(responseFunction).not.toHaveBeenCalled();

      comp.changeOption(comp.autocompleteList[0]);
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith(comp.autocompleteList[0].label);
   });

   it('should be search with autocomplete', fakeAsync(() => {
      comp.autocompleteList = [{ value: '1', label: '1' }, { value: '2', label: '2' }];
      comp.withAutocomplete = true;
      fixture.detectChanges();

      let input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      let dropdownItems: DebugElement[] = fixture.debugElement.queryAll(By.css('st-dropdown-menu-item'));

      expect(input).toBeDefined();
      expect(dropdownItems.length).toEqual(0);


      input.value = 'te';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(1);
      fixture.detectChanges();
      dropdownItems = fixture.debugElement.queryAll(By.css('st-dropdown-menu-item'));
      expect(dropdownItems.length).toEqual(2);


      input.value = '';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick(1);
      fixture.detectChanges();
      dropdownItems = fixture.debugElement.queryAll(By.css('st-dropdown-menu-item'));
      expect(dropdownItems.length).toEqual(0);
   }));

   it('should be change autocomplete list', fakeAsync(() => {
      let initialList: StDropDownMenuItem[] = [{ value: '1', label: '1' }, { value: '2', label: '2' }];
      let finalList: StDropDownMenuItem[] = [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }];
      comp.autocompleteList = initialList;
      comp.withAutocomplete = true;
      fixture.detectChanges();

      let input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      let dropdownItems: DebugElement[] = fixture.debugElement.queryAll(By.css('st-dropdown-menu-item'));

      expect(input).toBeDefined();
      expect(dropdownItems.length).toEqual(0);


      input.value = 'te';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      tick(1);
      fixture.detectChanges();
      dropdownItems = fixture.debugElement.queryAll(By.css('st-dropdown-menu-item'));
      expect(dropdownItems.length).toEqual(initialList.length);


      comp.autocompleteList = finalList;
      let changes: SimpleChanges = { autocompleteList: new SimpleChange(initialList, finalList, true) };
      comp.ngOnChanges(changes);
      fixture.detectChanges();
      dropdownItems = fixture.debugElement.queryAll(By.css('st-dropdown-menu-item'));
      expect(dropdownItems.length).toEqual(finalList.length);
   }));
});
