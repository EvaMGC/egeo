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
export const JSON_SCHEMA: any = {
      'type': 'object',
      'title': 'Security',
      'ui': {
         'component': 'switch'
      },
      'properties': {
         'enable': {
            'title': 'Security',
            'type': 'boolean'
         },
         "serviceId": {
            "default": "crossdata",
            "type": "string",
            "description": "Name of the service",
            "title": "Service name",
            "optional": false,
            "readonly": false,
            "pattern": "^[a-zA-Z]+$",
            "example": "crossdata",
            "internal_name": "SERVICE_ID"
         },
         'name': {
            'title': 'Name',
            'type': 'string'
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
         'age': {
            'title': 'Age',
            'type': 'integer'
         },
         'log_level': {
            'title': 'Log Level',
            'description': 'Set the log level: TRACE,DEBUG,INFO,WARN,ERROR and FATAL',
            'type': 'string',
            'default': 'INFO',
            'enum': ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL']
         },
         'subsection': {
            'title': 'Subsection',
            'type': 'object',
            'ui': {
               'component': 'switch'
            },
            'properties': {
               'enable-subsection': {
                  'title': 'Subsection',
                  'type': 'boolean'
               },
               'subName': {
                  'title': 'Subname',
                  'type': 'string'
               },
               'subAge': {
                  'title': 'Subage',
                  'type': 'integer'
               }
            }
         },
         'accordion': {
            'title': 'Centralized Configuration',
            'type': 'object',
            'ui': {
               'component': 'accordion'
            },
            'properties': {
               'name': {
                  'title': 'Name',
                  'type': 'string'
               },
               'age': {
                  'title': 'Age',
                  'type': 'integer'
               },
               'subsection': {
                  'title': 'Subsection',
                  'type': 'object',
                  'properties': {
                     'subName': {
                        'title': 'Subname',
                        'type': 'string'
                     },
                     'subAge': {
                        'title': 'Subage',
                        'type': 'integer'
                     }
                  }
               }


            }
         },
         'accordion2': {
            'title': 'Optimization',
            'type': 'object',
            'ui': {
               'component': 'accordion'
            },
            'properties': {
               'name': {
                  'title': 'Name',
                  'type': 'string'
               },
               'age': {
                  'title': 'Age',
                  'type': 'integer'
               },
               'subsection': {
                  'title': 'Subsection',
                  'type': 'object',
                  'properties': {
                     'subName': {
                        'title': 'Subname',
                        'type': 'string'
                     },
                     'subAge': {
                        'title': 'Subage',
                        'type': 'integer'
                     }
                  }
               }


            }
         }
      }
   }
   ;
