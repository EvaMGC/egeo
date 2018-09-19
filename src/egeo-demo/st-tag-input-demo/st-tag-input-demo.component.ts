/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { cloneDeep as _cloneDeep } from 'lodash';
import { StDropDownMenuItem } from '@stratio/egeo';

@Component({
   selector: 'st-tag-input-demo',
   templateUrl: 'st-tag-input-demo.component.html',
   styleUrls: ['./st-tag-input-demo.component.scss']
})
export class StTagInputDemoComponent implements OnInit {
   @ViewChild('templateDrivenForm') public templateDrivenForm: NgForm;

   public tags: any = {
      reactive: [],
      reactiveRequired: [],
      reactiveDisabled: [],
      reactiveAutocomplete: [],
      templateDriven: ['Tag Template Driven1', 'Tag Template Driven2'],
      templateDrivenRequired: [],
      templateDrivenDisabled: [],
      templateDrivenAutocomplete: []
   };

   public list: StDropDownMenuItem[] = [
      { label: 'China', value: 'CN' },
      { label: 'Russia', value: 'RU' },
      { label: 'United States', value: 'US' },
      { label: 'Egypt', value: 'EG' },
      { label: 'Panama', value: 'PA' },
      { label: 'Canada', value: 'CA' },
      { label: 'Indonesia', value: 'ID' },
      { label: 'North Korea', value: 'KP' },
      { label: 'France', value: 'FR' },
      { label: 'Burundi', value: 'BI' },
      { label: 'Poland', value: 'PL' },
      { label: 'Vanuatu', value: 'VU' },
      { label: 'Venezuela', value: 'VE' }
   ];
   public filteredlist: StDropDownMenuItem[] = [];

   public reactiveForm: FormGroup; // our model driven form
   public forceReactiveValidations: boolean = false;
   public forceTemplateDriveValidations: boolean = false;
   public errorReactiveMessage: string | null = null;
   public errorTemplateDriveMessage: string | null = null;
   public disabledReactive: boolean = true;
   public disabledTemplateDrive: boolean = true;
   public pattern: any =  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

   constructor(private _fb: FormBuilder) {
      this.reactiveForm = _fb.group({
         'tag-input-reactive': [this.tags.reactive],
         'tag-input-number': [],
         'tag-input-integer': [],
         'tag-input-reactive-required': [this.tags.reactiveRequired, Validators.required],
         'tag-input-reactive-disabled': [this.tags.reactiveDisabled],
         'tag-input-reactive-autocomplete': [this.tags.reactiveDisabled]
      });
   }

   ngOnInit(): void {
      this.reactiveForm.valueChanges.subscribe(res => console.log('Reactive Form', res));
      this.templateDrivenForm.valueChanges.subscribe(res => console.log('Template Driven Form', res));
   }

   onSubmitReactiveForm(): void {
      this.forceReactiveValidations = true;
      this.errorReactiveMessage = this.reactiveForm.valid ? null : 'Error';
   }

   onSubmitTemplateDrivenForm(): void {
      this.forceTemplateDriveValidations = true;
      this.errorTemplateDriveMessage = this.templateDrivenForm.valid ? null : 'Error';
   }

   changeReactiveFormDisabled(): void {
      this.disabledReactive = !this.disabledReactive;
      if (this.disabledReactive) {
         this.reactiveForm.get('tag-input-reactive-disabled').disable();
      } else {
         this.reactiveForm.get('tag-input-reactive-disabled').enable();
      }
   }

   changeTemplateDrivenFormDisabled(): void {
      this.disabledTemplateDrive = !this.disabledTemplateDrive;
      if (this.disabledTemplateDrive) {
         this.templateDrivenForm.controls['tag-input-template-driven-disabled'].disable();
      } else {
         this.templateDrivenForm.controls['tag-input-template-driven-disabled'].enable();
      }
   }

   onFilterList(event: any): void {
      let text: string = event.target.innerText;
      this.filteredlist = text ? _cloneDeep(this.list.filter(country => country.label.toLowerCase().search(text.toLowerCase()) > -1)) : [];
   }
}
