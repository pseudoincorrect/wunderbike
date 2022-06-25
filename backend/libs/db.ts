import {config} from "../config_dev"
import Debug from "debug";
const debug = Debug("app:libs:db");

import { Pool } from 'pg';

debug('database', config.database);

const pool = new Pool(config.database);

export {pool}
