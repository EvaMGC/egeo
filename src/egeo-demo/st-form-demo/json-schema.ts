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
export const JSON_SCHEMA: any =  {
   'type': 'object',
   'properties': {
      'general': {
         'title': 'General',
         'type': 'object',
         'description': 'Crossdata general configuration properties',
         'additionalProperties': false,
         'properties': {
            'name': {
               'title': 'Application name',
               'description': 'The name of the Crossdata instance.',
               'info': 'More additional information',
               'type': 'string',
               'maxLength': 40,
               'minLength': 5,
               'default': 'crossdata-1',
               'readOnly': true,
               'examples': ['crossdata-65']
            },
            'cores': {
               'title': 'CPUs',
               'description': 'CPU shares to allocate to each Crossdata instance.',
               'type': 'number',
               'default': 1.0,
               'minimum': 0.5,
               'maximum': 10.0
            },
            'memory': {
               'title': 'Memory',
               'description': 'Memory (MiB) to allocate to each Crossdata instance.',
               'type': 'number',
               'default': 2048.0,
               'minimumExclusive': 1023.9,
               'maximumExclusive': 51200
            },
            'more': {
               'type': 'object',
               'description': 'Crossdata general configuration properties',
               'additionalProperties': false,
               'ui': {
                  'component': 'show-more'
               },
               'properties': {
                  'instances': {
                     'title': 'Instances',
                     'description': 'Number of Crossdata instances to run.',
                     'type': 'integer',
                     'default': 1,
                     'minimum': 1
                  },
                  'port': {
                     'title': 'Port',
                     'description': 'Port in which Crossdata will be exposed',
                     'type': 'integer',
                     'default': 10075
                  }
               },
               'required': [
                  'name',
                  'cores',
                  'memory'
               ]
            },
            'storage': {
               'title': 'Storage',
               'type': 'object',
               'description': 'Default storage properties for table creation',
               'additionalProperties': false,
               'properties': {
                  'persistence': {
                     'title': 'Default datasource',
                     'description': 'Default datasource for table creation without datasource',
                     'type': 'string',
                     'enum': ['parquet', 'postgresql'],
                     'default': 'parquet'
                  },
                  'path': {
                     'title': 'Default path',
                     'description': 'Path/URL for default datasource',
                     'type': 'string',
                     'default': '/tmp'
                  },
                  'stratio_security_mode': {
                     'description': 'Stratio security mode.',
                     'type': 'string',
                     'default': 'tls',
                     'enum': ['user_pass', 'tls']
                  }
               },
               'required': ['persistence']
            }
         }
      }
   }
};
