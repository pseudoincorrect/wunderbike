import { config } from '../config_dev';
import Debug from 'debug';
const debug = Debug('app:libs:db');

import { Pool } from 'pg';

let cfg: any;
var environment = process.env.NODE_ENV;
debug('environment(NODE_ENV) = ', environment);

if (environment == 'development') {
  cfg = config.development;
} else if (environment == 'production') {
  cfg = config.production;
} else {
  console.error(
    'Please setup NODE_ENV environment variable to either "development" or "production"'
  );
  console.error('EXITING...');
  process.exit();
}

debug('database', cfg.database);
const pool = new Pool(cfg.database);

export { pool };
