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
         "title": "General",
         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
         "ui": {
            "component": "show-more"
         },
         "properties": {
            "serviceConfiguration": {
               "title": "Type of Sparta",
               "type": "string",
               "enum": ['a', '/sparta/sparta-server/null', 'c'],
               "examples": ['/sparta/sparta-server/null'],
               "default": "/sparta/sparta-server/null",
               'ui': { 'relatedTo': 'serviceId' }
            },
            "serviceId": {
               "title": "Name",
               "type": "string",
               "default": ""
            },

            "a": {
               "title": "a",
               "type": "string",
               'ui': { 'relatedTo': 'b'}
            },
            "b": {
               "title": "b",
               "type": "string",
               "enum": ['a', '/sparta/sparta-server/null', 'c'],
               "default": "/sparta/sparta-server/null"
            },
            "c": {
               "title": "c",
               "type": "string",
               "default": "",
               'ui': {
                  'relatedTo': 'd'
               }
            },
            "d": {
               "title": "d",
               "type": "string",
               "enum": ['a', '/sparta/sparta-server/null', 'c'],
               "default": "/sparta/sparta-server/null",
               'ui': { 'relatedTo': 'e' }
            },
            "e": {
               "title": "e",
               "type": "string",
               "enum": ['a', '/sparta/sparta-server/null', 'c'],
               "default": "/sparta/sparta-server/null"
            },
            "runMode": {
               "title": "Run mode",
               "required": false,
               "readOnly": false,
               "type": "string",
               "default": "production",
               "level": 1,
               "minLength": 3,
               "maxLength": 100,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "RUN_MODE"
            },
            "resources": {
               "type": "object",
               "title": "Scheduler resources",
               "description": "",
               "ui": {
                  "component": "accordion"
               },
               "properties": {
                  "Sparta_Docker_Image": {
                     "title": "Docker image",
                     "required": false,
                     "readOnly": true,
                     "type": "string",
                     "default": "qa.stratio.com/stratio/sparta:2.0.0-RC3",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 100,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "SPARTA_DOCKER_IMAGE"
                  },
                  "Sparta_Marathon_Force_Pull_Image": {
                     "title": "Is downloaded scheduler image each time?",
                     "required": false,
                     "readOnly": true,
                     "type": "boolean",
                     "default": true,
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "SPARTA_MARATHON_FORCE_PULL_IMAGE"
                  },
                  "mem": {
                     "title": "Memory",
                     "required": true,
                     "readOnly": true,
                     "type": "integer",
                     "default": 1024,
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "MEM"
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
                     "title": "CPU",
                     "required": true,
                     "readOnly": true,
                     "type": "integer",
                     "default": 1,
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "CPUs"
                  }
               },
               "required": ["mem", "instances", "cpus"]
            },
            "zookeeper": {
               "type": "object",
               "title": "Zookeeper",
               "description": "",
               "ui": {
                  "component": "accordion"
               },
               "properties": {
                  "Sparta_Zookeeper_Connection_String": {
                     "title": "Zookeeper connection String",
                     "required": false,
                     "readOnly": true,
                     "type": "string",
                     "default": "zk-0001.zkuserland.mesos:2181,zk-0002.zkuserland.mesos:2181,zk-0003.zkuserland.mesos:2181",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 256,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "SPARTA_ZOOKEEPER_CONNECTION_STRING"
                  },
                  "SpartaPluginZkConnect": {
                     "title": "Plugin Zookeeper connection",
                     "required": false,
                     "readOnly": true,
                     "type": "string",
                     "default": "gosec1.node.paas.labs.stratio.com:2181,gosec2.node.paas.labs.stratio.com:2181,gosec3.node.paas.labs.stratio.com:2181",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 256,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "SPARTA_PLUGIN_ZK_CONNECT"
                  },
                  "Sparta_Zookeeper_Path": {
                     "title": "Path",
                     "readOnly": true,
                     "type": "string",
                     "default": "/stratio/sparta",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 100,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "SPARTA_ZOOKEEPER_PATH"
                  },
                  "Sparta_Plugin_Zookeeper_Watchers": {
                     "title": "Watchers",
                     "required": false,
                     "readOnly": false,
                     "type": "boolean",
                     "default": true,
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "SPARTA_PLUGIN_ZOOKEEPER_WATCHERS"
                  },
                  "Sparta_Zookeeper_Retry_Interval": {
                     "title": "Retry interval",
                     "required": false,
                     "readOnly": false,
                     "type": "integer",
                     "default": 10000,
                     "level": 1,
                     "minimum": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "SPARTA_ZOOKEEPER_RETRY_INTERVAL"
                  },
                  "Sparta_Zookeeper_Retry_Atempts": {
                     "title": "Retry atempts",
                     "required": false,
                     "readOnly": false,
                     "type": "integer",
                     "default": 5,
                     "level": 1,
                     "minimum": 1,
                     "maximum": 100,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "SPARTA_ZOOKEEPER_RETRY_ATEMPTS"
                  },
                  "Sparta_Zookeeper_Connection_Timeout": {
                     "title": "Connection TimeOut",
                     "required": false,
                     "readOnly": false,
                     "type": "integer",
                     "default": 15000,
                     "level": 1,
                     "minimum": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "SPARTA_ZOOKEEPER_CONNECTION_TIMEOUT"
                  },
                  "Sparta_Zookeeper_Session_Timeout": {
                     "title": "Session TimeOut",
                     "required": false,
                     "readOnly": false,
                     "type": "integer",
                     "default": 60000,
                     "level": 1,
                     "minimum": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "SPARTA_ZOOKEEPER_SESSION_TIMEOUT"
                  }
               }
            }
         }
      },
      "security": {
         "type": "object",
         "title": "Security",
         "description": "",
         "ui": {
            "component": "standard"
         },
         "properties": {
            "Security_Mesos_Enable": {
               "title": "Security Mesos",
               "required": false,
               "readOnly": false,
               "type": "boolean",
               "default": true,
               "level": 1,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "SECURITY_MESOS_ENABLE"
            },
            "Security_Tls_Enable": {
               "title": "Security TLS",
               "required": false,
               "readOnly": false,
               "type": "boolean",
               "default": false,
               "level": 1,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "SECURITY_TLS_ENABLE"
            },
            "Security_Truststore_Enable": {
               "title": "Security truststore",
               "required": false,
               "readOnly": false,
               "type": "boolean",
               "default": false,
               "level": 1,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "SECURITY_TRUSTSTORE_ENABLE"
            },
            "Security_Krb_Enable": {
               "title": "Security Kerberos",
               "required": false,
               "readOnly": false,
               "type": "boolean",
               "default": false,
               "level": 1,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "SECURITY_KRB_ENABLE",
               "ui": {
                  'visible': {'Security_Truststore_Enable': true}
               }
            },
            "Security_Marathon_Enabled": {
               "title": "Security Marathon",
               "required": false,
               "readOnly": false,
               "type": "boolean",
               "default": false,
               "level": 1,
               "exclusiveMinimum": false,
               "exclusiveMaximum": false,
               "internalName": "SECURITY_MARATHON_ENABLED",
               "ui": {
                  'visible': {'Security_Krb_Enable': true}
               }
            },
            "calico": {
               "type": "object",
               "title": "Calico",
               "description": "",
               "ui": {
                  "component": "switch",
                  'visible': {'Security_Marathon_Enabled': true}
               },
               "properties": {
                  "Calico_Enabled": {
                     "title": "Calico",
                     "required": false,
                     "readOnly": false,
                     "type": "boolean",
                     "default": true,
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "CALICO_ENABLED"
                  },
                  "Calico_Network": {
                     "title": "Calico network",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "stratio",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 100,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "CALICO_NETWORK"
                  }
               }
            },
            "authentication": {
               "type": "object",
               "title": "Authentication",
               "description": "",
               "ui": {
                  "component": "switch"
               },
               "properties": {
                  "Use_Dynamic_Authentication": {
                     "title": "Dynamic authentication",
                     "required": false,
                     "readOnly": false,
                     "type": "boolean",
                     "default": true,
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "USE_DYNAMIC_AUTHENTICATION"
                  },
                  "Approlename": {
                     "title": "App role name",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "open",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 100,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "APPROLENAME"
                  }
               }
            },
            "Oauth2": {
               "type": "object",
               "title": "OAuth2",
               "description": "",
               "ui": {
                  "component": "switch"
               },
               "properties": {
                  "Security_Oauth2_Enable": {
                     "title": "Security oauth2",
                     "required": false,
                     "readOnly": false,
                     "type": "boolean",
                     "default": true,
                     "level": 1,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "SECURITY_OAUTH2_ENABLE"
                  },
                  "Oauth2_Ssl_Authorize": {
                     "title": "SSL authorize",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "https://megadev.labs.stratio.com:9005/sso/oauth2.0/authorize",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 256,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "OAUTH2_SSL_AUTHORIZE"
                  },
                  "Oauth2_Url_Profile": {
                     "title": "URL profile",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "https://megadev.labs.stratio.com:9005/sso/oauth2.0/profile",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 256,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "OAUTH2_URL_PROFILE"
                  },
                  "Oauth2_Url_Callback": {
                     "title": "Callback",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "https://sparta.megadev.labs.stratio.com/sparta-server/login",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 256,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "OAUTH2_URL_CALLBACK"
                  },
                  "Oauth2_Cookie_Name": {
                     "title": "Cookie name",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "user",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 100,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "OAUTH2_COOKIE_NAME"
                  },
                  "Oauth2_Url_Access_Token": {
                     "title": "URL access token",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "https://megadev.labs.stratio.com:9005/sso/oauth2.0/accessToken",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 256,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "OAUTH2_URL_ACCESS_TOKEN"
                  },
                  "Oauth2_Url_On_Login_Go_To": {
                     "title": "URL login",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "/sparta-server",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 100,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "OAUTH2_URL_ON_LOGIN_GO_TO"
                  },
                  "Oauth2_Url_Logout": {
                     "title": "URL logout",
                     "required": false,
                     "readOnly": false,
                     "type": "string",
                     "default": "https://megadev.labs.stratio.com:9005/sso/logout",
                     "level": 1,
                     "minLength": 3,
                     "maxLength": 100,
                     "exclusiveMinimum": false,
                     "exclusiveMaximum": false,
                     "internalName": "OAUTH2_URL_LOGOUT"
                  }
               }
            }
         }
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
