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

import { JSONSchema4 } from 'json-schema';
import { StDynamicTableHeader, StDynamicTableUserInterface } from '../st-dynamic-table.model';
import { StFilterHeader } from '../../st-table/shared/table-header.interface';

export class StDynamicTableUtils {

   public static getHeaderFieldsFromJsonSchema(jsonSchema: JSONSchema4, uiDefinitions?: StDynamicTableUserInterface): StDynamicTableHeader[] {
      const fields: StDynamicTableHeader[] = [];

      if (jsonSchema && jsonSchema.properties) {
         const properties = Object.keys(jsonSchema.properties);
         if (properties) {
            properties.forEach(_propertyKey => {
               const _property = jsonSchema.properties[_propertyKey];
               if (_property && _property.type !== 'object') {
                  const filters: StFilterHeader = StDynamicTableUtils.getHeaderFiltersFromJsonSchema(_property);
                  const isSortable = uiDefinitions && uiDefinitions[_propertyKey] && uiDefinitions[_propertyKey].sortable;

                  fields.push({
                     id: _propertyKey,
                     label: _property.title,
                     reference: _property.$ref,
                     filters: filters,
                     filterable: filters && filters.filterConfig.length > 0,
                     sortable: isSortable
                  });
               }
            });
         }
      }
      return fields;
   }

   public static getHeaderFiltersFromJsonSchema(propertyDefinition: JSONSchema4): StFilterHeader {
      let filters: StFilterHeader;
      if (propertyDefinition.enum && propertyDefinition.enum.length) {
         filters = {
            title: propertyDefinition.title,
            filterConfig: []
         };
         propertyDefinition.enum.forEach(_value => {
            filters.filterConfig.push({
               id: <any> _value,
               name: <any> _value
            });
         });
      }

      return filters;
   }
}
