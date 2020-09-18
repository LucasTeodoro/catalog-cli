import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'elasticv7',
  connector: 'es',
  index: 'catalog',
  apiVersion: '_default',
  defaultSize: null,
  debug: process.env.APP_ENV === 'dev',
  hosts: process.env.ELASTICSEARCH_HOST,
  requestTimeout: process.env.ELASTICSEARCH_REQUEST_TIMEOUT,
  pingTimeout: process.env.ELASTICSEARCH_PING_TIMEOUT,
  mappings: {

  }
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class Elasticv7DataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'elasticv7';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.elasticv7', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
