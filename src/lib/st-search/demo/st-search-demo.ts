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
import { Component } from '@angular/core';
import * as _ from 'lodash';

import { StDropDownMenuItem } from '../../st-dropdown-menu/st-dropdown-menu.interface';

@Component({
   selector: 'st-search-demo',
   templateUrl: './st-search-demo.html',
   styles: [`
      .search-container {
         width: 210px;
         margin-bottom: 50px;
      }
      .search-example {
         margin-bottom: 20px;
      }
      h3 {
         margin-bottom: 5px;
         padding: 0;
      }
      .option {
          margin-bottom: 10px;
      }
      .option-value {
         margin-left: 5px;
      }
   `]
})
export class StSearchDemoComponent {
   public placeholder: string = 'Text for search';
   public qaTag: string = 'search';
   public debounceTime: number = 0;
   public minLength: number = 0;
   public searched: string = '';
   public searchedAutocomplete: string = '';
   public menu: StDropDownMenuItem[] = [
      { label: 'China', value: 'CN' },
      { label: 'Russia', value: 'RU' },
      { label: 'China', value: 'CN' },
      { label: 'United States', value: 'US' },
      { label: 'Egypt', value: 'EG' },
      { label: 'Panama', value: 'PA' },
      { label: 'Canada', value: 'CA' },
      { label: 'Indonesia', value: 'ID' },
      { label: 'North Korea', value: 'KP' },
      { label: 'China', value: 'CN' },
      { label: 'Indonesia', value: 'ID' },
      { label: 'France', value: 'FR' },
      { label: 'Burundi', value: 'BI' },
      { label: 'Poland', value: 'PL' },
      { label: 'Russia', value: 'RU' },
      { label: 'Vanuatu', value: 'VU' },
      { label: 'Venezuela', value: 'VE' },
      { label: 'France', value: 'FR' },
      { label: 'Indonesia', value: 'ID' },
      { label: 'Indonesia', value: 'ID' }
   ];

   public filteredMenu: StDropDownMenuItem[] = [];

   onSearchResult(value: string): void {
      this.searched = value;
   }

   filter(filterValue: string): void {
      this.filteredMenu = _.clone(this.menu.filter(country => country.label.toLowerCase().search(filterValue.toLowerCase()) > -1));
   }

   searchWithAutocompleteSearch(searchValue: string): void {
      console.log('search');
      this.searchedAutocomplete = searchValue;
      this.filter(searchValue);
   }
}
