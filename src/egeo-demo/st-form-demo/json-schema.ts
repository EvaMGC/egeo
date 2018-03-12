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
            'instances': {
               'title': 'Instances',
               'description': 'Number of Crossdata instances to run.',
               'type': 'integer',
               'default': 1,
               'minimum': 1,
               'optional': true
            },
            'log_level': {
               'title': 'Log Level',
               'description': 'Set the log level: TRACE,DEBUG,INFO,WARN,ERROR and FATAL',
               'type': 'string',
               'default': 'INFO',
               'enum': ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'],
               'optional': true
            },
            'label_constraint': {
               'title': 'Contraint label',
               'description': 'Cluster label that will accept to launch Crossdata. (all, intelligence...)',
               'type': 'string',
               'default': '',
               'optional': true
            },
            'accepted_resources_roles': {
               'title': 'Accepted resources roles',
               'description': 'Mesos roles that will accept Crossdata. (slave_public, slave_private...)',
               'type': 'string',
               'default': '',
               'optional': true
            },
            'streams_parallelism': {
               'title': 'Streams parallelism',
               'description': 'Production parallelism of streams for responses',
               'type': 'integer',
               'default': 2,
               'minimum': 1,
               'optional': true
            },
            'federation': {
               'title': 'Federation',
               'description': 'Federation type',
               'type': 'string',
               'enum': ['LDAP', 'AD'],
               'default': 'LDAP',
               'optional': true
            }
         },
         'haproxy_http': {
            'title': 'Exposing Crossdata',
            'type': 'object',
            'additionalProperties': false,
            'description': 'Marathon-lb configuration for expose Crossdata outside DCOS',
            'optional': true,
            'properties': {
               'enabled': {
                  'title': 'Enable Crossdata in Marathon-lb',
                  'description': 'Enable Crossdata in Marathon-lb.',
                  'type': 'boolean',
                  'default': true
               },
               'group': {
                  'title': 'Group',
                  'description': 'Marathon-lb group in which Crossdata will be exposed',
                  'type': 'string',
                  'default': 'external'
               },
               'port': {
                  'title': 'Port',
                  'description': 'Port in which Crossdata will be exposed',
                  'type': 'integer',
                  'default': 10075
               },
               'tunnel_timeout': {
                  'title': 'Tiemout',
                  'description': 'Maximum inactivity time on the client and server side',
                  'type': 'string',
                  'default': '1500m'
               }
            }
         },
         'required': [
            'name',
            'cores',
            'memory'
         ]
      },
      'service_discovery': {
         'title': 'Service discovery',
         'type': 'object',
         'additionalProperties': false,
         'description': 'Enable service discovery using kerberized zookeeper.',
         'properties': {
            'enabled': {
               'title': 'Service discovery',
               'description': 'Enable service discovery using zookeeper for the Crossdata instances.',
               'type': 'boolean',
               'default': true
            },
            'zookeeper_connection_url': {
               'title': 'Zookeeper connection string',
               'description': 'List of ip:port of the nodes where zookeeper is working',
               'type': 'string',
               'default': 'zk-0001.zkuserland.mesos:2181,zk-0002.zkuserland.mesos:2181,zk-0003.zkuserland.mesos:2181'
            },
            'interval_update': {
               'title': 'Update interval',
               'description': 'Interval time for logging nodes of the Crossdata cluster',
               'type': 'integer',
               'default': 120,
               'minimum': 30,
               'optional': true
            },
            'cluster-id': {
               'title': 'Cluster id',
               'description': 'Custom cluster identifier for service discovery',
               'type': 'string',
               'default': 'crossdata',
               'optional': true
            }
         },
         'required': [ 'enabled', 'zookeeper_connection_url' ]
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
               'default': '/tmp',
               'optional': true
            },
            'stratio_security':{
               'title': 'Securized',
               'description': 'Use Stratio security with default storage',
               'type': 'boolean',
               'default': true,
               'optional': true
            },
            'stratio_security_mode': {
               'description': 'Stratio security mode.',
               'type': 'string',
               'default': 'tls',
               'enum': ['user_pass', 'tls'],
               'optional': true
            }
         },
         'required': ['persistence']
      },
      'security': {
         'title': 'Security',
         'type': 'object',
         'additionalProperties': false,
         'description': 'Configuration to secure Crossdata.',
         'properties': {
            'enabled': {
               'title': 'Enable TLS and Kerberos',
               'description': 'Enable TLS and Kerberos in Crossdata. If false, this section doesn`t apply',
               'type': 'boolean',
               'default': true
            },
            'akka_cluster_security': {
               'title': 'Cluster security',
               'description': 'Enable TLS security inside Akka cluster',
               'type': 'boolean',
               'default': true,
               'optional': true
            },
            'allowed_cns': {
               'title': 'Allowed CNS',
               'description': 'List of allowed CNs by Crossdata',
               'type': 'string',
               'default': 'crossdata-1',
               'optional': true
            },
            'kerberos_renewal_interval': {
               'title': 'Kerberos renew interval',
               'description': 'Time interval to renew the Kerberos tickets.',
               'type': 'string',
               'default': '4h',
               'optional': true
            }
         },
         'audit': {
            'title': 'Audition',
            'type': 'object',
            'additionalProperties': false,
            'description': 'Audition properties',
            'optional': true,
            'properties': {
               'kafka_topic': {
                  'title': 'Auditin topic',
                  'description': 'auditing kafka topic',
                  'type': 'string',
                  'default': 'audit'
               },
               'kafka_bootstrap': {
                  'title': 'Kafka connection string',
                  'description': 'kafka connection',
                  'type': 'string',
                  'default': 'gosec1.node.paas.labs.stratio.com:9092,gosec2.node.paas.labs.stratio.com:9092,gosec3.node.paas.labs.stratio.com:9092'
               }
            }
         },
         'gosec': {
            'title': 'Gosec',
            'type': 'object',
            'additionalProperties': false,
            'description': 'Gosec integration properties.',
            'optional': true,
            'properties': {
               'enabled': {
                  'title': 'Gosec Security',
                  'description': 'Use gosec security.',
                  'type': 'boolean',
                  'default': true
               },
               'version': {
                  'title': 'Version',
                  'description': 'GoSec version',
                  'type': 'string',
                  'enum': ['0.11.0', '0.13.2'],
                  'default': '0.13.2'
               },
               'management_principal': {
                  'title': 'Management principal',
                  'description': 'Gosec Management principal',
                  'type': 'string',
                  'default': 'gosec-management'
               },
               'sso_principal': {
                  'title': 'SSO Principal',
                  'description': 'Gosec SSO principal',
                  'type': 'string',
                  'default': 'gosec-sso'
               },
               'zk_watchers': {
                  'title': 'Enable ZK Watchers',
                  'description': 'Enable zookeper watchers for Crossdata plugin leveraging cache interaction',
                  'type': 'boolean',
                  'default': true
               },
               'cache': {
                  'title': 'Enable cache',
                  'description': 'Enable Crossdata Gosec plugin cache',
                  'type': 'boolean',
                  'default': true
               }
            }
         },
         'vault': {
            'title': 'Vault',
            'type': 'object',
            'additionalProperties': false,
            'description': 'Vault properties',
            'optional': true,
            'properties': {
               'host': {
                  'title': 'Host',
                  'description': 'Vault host',
                  'type': 'string',
                  'default': 'vault.service.paas.labs.stratio.com',
                  'readOnly': true
               },
               'port': {
                  'title': 'Port',
                  'description': 'Vault port.',
                  'type': 'integer',
                  'default': 8200,
                  'readOnly': true
               },
               'dynamic_auth_enable': {
                  'title': 'Dynamic Authentication',
                  'description': 'Enable dynamic authentication',
                  'type': 'boolean',
                  'default': true
               },
               'instance_app_role': {
                  'title': 'App Role',
                  'description': 'App role used to recover a Vault token with a pre-defined policy',
                  'type': 'string',
                  'default': 'open'
               }
            }
         },
         'required': [ 'enabled']
      },
      'spark': {
         'title': 'Spark cluster',
         'type': 'object',
         'description': 'External spark configuration. If not enabled it will run with local[2]',
         'properties': {
            'enabled': {
               'title': 'Enable spark cluster on mesos',
               'description': 'Spark configuration',
               'type': 'boolean',
               'default': true
            },
            'app_name': {
               'title': 'Spark app name',
               'description': 'Spark app name',
               'type': 'string',
               'default': 'CrossdataServer'
            },
            'ca-name-datastore': {
               'title': 'CA name',
               'description': 'Trusted CA name used to validate datastores such as postgresql. CA is required by Spark executors',
               'type': 'string',
               'default': 'ca',
               'optional': true
            },
            'ui_enabled': {
               'title': 'Enable Spark UI',
               'description': 'Enable the Spark UI web interface.',
               'type': 'boolean',
               'default': false,
               'optional': true
            },
            'master': {
               'title': 'Spark master URL',
               'description': 'Url of the spark master',
               'type': 'string',
               'default': 'mesos://leader.mesos:5050',
               'optional': true
            },
            'local_dir': {
               'title': 'Spark working directory',
               'description': 'Set the directory where Spark will store shuffle data. (spark.local.dir)',
               'type': 'string',
               'default': '/tmp/spark',
               'optional': true
            },
            'loglevel': {
               'title': 'Log level',
               'description': 'Spark log level',
               'type': 'string',
               'default': 'INFO',
               'enum': ['INFO', 'WARN', 'ERROR', 'DEBUG'],
               'optional': true
            },
            'executor': {
               'title': 'Executor',
               'type': 'object',
               'description': 'Spark executor properties',
               'optional': true,
               'properties': {
                  'cores': {
                     'title': 'Cores',
                     'description': 'Number of per spark`s executor',
                     'type': 'integer',
                     'default': 4,
                     'minimumExclusive': 0,
                     'maximum': 8
                  },
                  'memory': {
                     'title': 'Memory',
                     'description': 'Spark executor memory',
                     'type': 'integer',
                     'default': 512,
                     'minimum': 512,
                     'maximum': 4096
                  },
                  'home': {
                     'title': 'Executor home',
                     'description': 'Set the directory in which Spark is installed on the executors in Mesos.',
                     'type': 'string',
                     'default': '/opt/spark/dist'
                  }
               }
            }
         },

         'runtime': {
            'title': 'Runtime',
            'description':'Spark runtime properties',
            'type': 'object',
            'optional': true,
            'properties':{
               'autobroadcast_join_threshold': {
                  'title': 'Auto broadcast join threshold',
                  'description': 'Configures the maximum size in bytes for a table that will be broadcast to all worker nodes when performing a join',
                  'type': 'integer',
                  'default': 10485760
               },
               'broadcast_join_timeout': {
                  'title': 'Broadcast join timeout',
                  'description': 'Timeout in seconds for the broadcast wait time in broadcast joins',
                  'type': 'integer',
                  'default': 300
               },
               'kryo_serializer_buffer_max': {
                  'title': 'Kryo serializer buffer max size',
                  'description': 'Maximum allowable size of Kryo serialization buffer',
                  'type': 'integer',
                  'default': 256
               },
               'shuffle_partitions': {
                  'title': 'Shuffle partitions',
                  'description': 'Number of shuffle partitions',
                  'type': 'integer',
                  'default': 200,
                  'minimum': 50
               },
               'hdfs_delegation_token_cache': {
                  'title': 'HDFS delegation token cache',
                  'description': 'Enable delegation token cache of HDFS used by Spark',
                  'type': 'boolean',
                  'default': false
               }
            }
         },
         'dynamicAllocation': {
            'title': 'Dynamic Allocation',
            'description': 'Spark Dynamic Allocation properties',
            'type': 'object',
            'optional': true,
            'properties': {
               'enabled': {
                  'title': 'Enable Dynamic Allocation',
                  'description': 'Activate Spark dynamic allocation',
                  'type': 'boolean',
                  'default': true
               },
               'initial': {
                  'title': 'Initial executors',
                  'description': 'Initial number of executors to run',
                  'type': 'integer',
                  'default': 2,
                  'minimum': 1
               },
               'maximum': {
                  'title': 'Maximum number of executors',
                  'description': 'Upper bound for the number of executors',
                  'type': 'integer',
                  'default': 4,
                  'minimumExclusive': 1
               },
               'minimum': {
                  'title': 'Minimum number of executors',
                  'description': 'Lower bound for the number of executors',
                  'type': 'integer',
                  'default': 1,
                  'minimumExclusive': 1
               },
               'dynamic_allocation_executor_idle_timeout': {
                  'title': 'Idle timeout',
                  'description': 'A executor will be removed if the executor has been idle for more than this duration',
                  'type': 'string',
                  'default': '60s'
               }
            }
         },
         'security': {
            'title': 'Security',
            'description': 'Spark security properties',
            'type': 'object',
            'optional': true,
            'properties': {
               'mesos_security_enabled': {
                  'title': 'Enable Mesos security',
                  'description': 'Mesos security enabled to launch frameworks',
                  'type': 'boolean',
                  'default': true
               },
               'mesos_role': {
                  'title': 'Mesos role',
                  'description': 'Selected nodes to deploy Spark framework through Mesos',
                  'type': 'string',
                  'default': 'crossdata-1'
               },
               'ssl_cert_path': {
                  'title': 'certificates` path',
                  'description': 'Path where Spark ssl certificates will be stored',
                  'type': 'string',
                  'default': '/tmp'
               },
               'enable_datastore_tls_security': {
                  'title': 'Datastores TLS security',
                  'description': 'Enable Spark datastore TLS connections',
                  'type': 'boolean',
                  'default': true
               },
               'enable_database_security': {
                  'title': 'Database security',
                  'description': 'Enable Spark database security ( for anonymize jdbc connections to datastores with user&pass )',
                  'type': 'boolean',
                  'default': false
               }
            }
         },
         'scheduler': {
            'title': 'Scheduler',
            'description':'Spark scheduler properties',
            'type': 'object',
            'optional': true,
            'properties':{
               'scheduler_pool_name': {
                  'title': 'Pool name',
                  'description': 'Name of the scheduler pool for executing jobs',
                  'type': 'string',
                  'default': 'production'
               },
               'scheduler_pools_url': {
                  'title': 'Pools URL',
                  'description': 'URL of the XML file with the scheduler pools definitions',
                  'type': 'string',
                  'default': ''
               }
            }
         },
         'required': [ 'enabled' , 'app_name']
      },
      'catalog': {
         'title': 'Catalog',
         'type': 'object',
         'additionalProperties': false,
         'description': 'Persistent catalog using kerberized zookeeper.',
         'properties': {
            'enabled': {
               'title': 'Enable catalog',
               'description': 'Enable Zookeeper as catalog in Crossdata. (Warning, if not enabled, Derby will be used in local, so you won`t have the catalog shared along the cluster',
               'type': 'boolean',
               'default': true
            },
            'prefix': {
               'title': 'Prefix',
               'description': 'Use different prefix in each cluster for multitenant',
               'type': 'string',
               'default': 'crossdataCluster'
            },
            'zk_connection_url': {
               'title': 'Zookeeper connection string',
               'description': 'List of ip:port of the nodes where zookeeper is working',
               'type': 'string',
               'default': 'zk-0001.zkuserland.mesos:2181,zk-0002.zkuserland.mesos:2181,zk-0003.zkuserland.mesos:2181',
               'optional': true
            },
            'connection_timeout': {
               'title': 'Connection timeout',
               'description': 'Zookeeper connection timeout in millis',
               'type': 'integer',
               'default': 15000,
               'optional': true
            },
            'session_timeout': {
               'title': 'Session timeout',
               'description': 'Zookeeper session timeout in millis',
               'type': 'integer',
               'default': 60000,
               'optional': true
            },
            'retry_attempts': {
               'title': 'Max retry attempts',
               'description': 'Retry attempts connecting to Zookeeper',
               'type': 'integer',
               'default': 2,
               'optional': true
            },
            'retry_interval': {
               'title': 'Retry interval',
               'description': 'Interval between attempts connecting to Zookeeper in millis',
               'type': 'integer',
               'default': 10000,
               'optional': true
            }
         },
         'required': [ 'enabled', 'prefix' ]
      }
   }
};
