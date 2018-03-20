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
   "type": "object",
   "title": "",
   "description": "",
   "ui": {
      "component": "standard"
   },
   "properties": {
      "general": {
         "type": "object",
         "title": "",
         "description": "",
         "ui": {
            "component": "standard"
         },
         "properties": {
            "serviceConfiguration": {
               "title": "Type of Discovery",
               "required": true,
               "readOnly": false,
               "type": "string",
               "default": "/discovery-null",
               "level": 1,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "SERVICE_CONFIGURATION"
            },
            "serviceId": {
               "title": "Name",
               "required": true,
               "readOnly": false,
               "type": "string",
               "default": "",
               "level": 1,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "SERVICE_ID"
            },
            "TENANT_NAME": {
               "title": "Tenant name",
               "required": false,
               "readOnly": false,
               "type": "string",
               "default": "crossdata-1",
               "level": 1,
               "minLength": 3,
               "maxLength": 100,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "TENANT_NAME"
            },
            "resources": {
               "type": "object",
               "title": "Resources",
               "description": "",
               "ui": {
                  "component": "standard"
               },
               "properties": {
                  "mem": {
                     "title": "Memory",
                     "required": true,
                     "readOnly": false,
                     "type": "integer",
                     "default": 1024,
                     "examples": [
                        "1"
                     ],
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "MEM"
                  },
                  "disk": {
                     "title": "Disk",
                     "required": true,
                     "readOnly": false,
                     "type": "integer",
                     "default": 0,
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "DISK"
                  },
                  "instances": {
                     "title": "Instances",
                     "required": true,
                     "readOnly": false,
                     "type": "integer",
                     "default": 0,
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "INSTANCES"
                  },
                  "cpus": {
                     "title": "CPUs",
                     "required": true,
                     "readOnly": false,
                     "type": "integer",
                     "default": 1,
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "CPUs"
                  }
               },
               "required": [
                  "mem",
                  "disk",
                  "instances",
                  "cpus"
               ]
            },
            "export": {
               "type": "object",
               "title": "Export",
               "description": "",
               "ui": {
                  "component": "accordion"
               },
               "properties": {
                  "hostname": {
                     "title": "Hostname",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "",
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "ENDPOINT_HOSTNAME"
                  },
                  "path": {
                     "title": "Path",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "",
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "ENDPOINT_PATH"
                  }
               }
            },
            "vault": {
               "type": "object",
               "title": "Vault",
               "description": "",
               "ui": {
                  "component": "accordion"
               },
               "properties": {
                  "VAULT_HOST": {
                     "title": "Host",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "vault.service.paas.labs.stratio.com",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 100,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "VAULT_HOST"
                  },
                  "VAULT_PORT": {
                     "title": "Port",
                     "required": false,
                     "readOnly": false,
                     "type": "integer",
                     "default": 8200,
                     "level": 1,
                     "minimum": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "VAULT_PORT"
                  }
               }
            },
            "Datio header": {
               "type": "object",
               "title": "Datio header",
               "description": "",
               "ui": {
                  "component": "accordion"
               },
               "properties": {
                  "MB-USER-HEADER": {
                     "title": "User",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "vnd.bbva.user-id",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 100,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "MB-USER-HEADER"
                  },
                  "MB-GROUP-HEADER": {
                     "title": "Group",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "vnd.bbva.user-groups",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 100,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "MB-GROUP-HEADER"
                  }
               }
            }
         },
         "required": [
            "serviceConfiguration",
            "serviceId"
         ]
      },
      "postgresConfiguration": {
         "type": "object",
         "title": "Postgres Configuration",
         "description": "",
         "ui": {
            "component": "standard"
         },
         "properties": {
            "MB_DB_TYPE": {
               "title": "Type",
               "required": false,
               "readOnly": false,
               "type": "string",
               "default": "postgres",
               "level": 1,
               "minLength": 3,
               "maxLength": 100,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "MB_DB_TYPE"
            },
            "MB_DB_HOST": {
               "title": "Host",
               "required": false,
               "readOnly": false,
               "type": "string",
               "default": "pg-0001.postgrestls.mesos",
               "level": 1,
               "minLength": 3,
               "maxLength": 100,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "MB_DB_HOST"
            },
            "MB_DB_PORT": {
               "title": "Port",
               "required": false,
               "readOnly": false,
               "type": "integer",
               "default": 5432,
               "level": 1,
               "minimum": 1,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "MB_DB_PORT"
            },
            "MB_DB_SSL": {
               "title": "SSL",
               "required": false,
               "readOnly": false,
               "type": "boolean",
               "default": true,
               "level": 1,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "MB_DB_SSL"
            },
            "MB_DB_USER": {
               "title": "User",
               "required": false,
               "readOnly": false,
               "type": "string",
               "default": "crossdata-1",
               "level": 1,
               "minLength": 3,
               "maxLength": 100,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "MB_DB_USER"
            },
            "MB_DB_DBNAME": {
               "title": "Name",
               "required": false,
               "readOnly": false,
               "type": "string",
               "default": "discovery",
               "level": 1,
               "minLength": 3,
               "maxLength": 100,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "MB_DB_DBNAME"
            },
            "MB_DB_PASS": {
               "title": "Password",
               "required": false,
               "readOnly": false,
               "type": "string",
               "default": "stratio",
               "level": 1,
               "minLength": 3,
               "maxLength": 100,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "MB_DB_PASS"
            }
         }
      },
      "adminAccess": {
         "type": "object",
         "title": "Admin access",
         "description": "",
         "ui": {
            "component": "standard"
         },
         "properties": {
            "MB-INIT-ADMIN-USER": {
               "title": "User",
               "required": false,
               "readOnly": false,
               "type": "string",
               "default": "Demo",
               "level": 1,
               "minLength": 3,
               "maxLength": 100,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "MB-INIT-ADMIN-USER"
            },
            "MB-INIT-ADMIN-MAIL": {
               "title": "E-mail",
               "required": false,
               "readOnly": false,
               "type": "string",
               "default": "demo@stratio.com",
               "level": 1,
               "minLength": 3,
               "maxLength": 100,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "MB-INIT-ADMIN-MAIL"
            },
            "MB-INIT-ADMIN-PASSWORD": {
               "title": "Password",
               "required": false,
               "readOnly": false,
               "type": "integer",
               "default": 123456,
               "level": 1,
               "minimum": 1,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "MB-INIT-ADMIN-PASSWORD"
            }
         }
      }
   }
}
