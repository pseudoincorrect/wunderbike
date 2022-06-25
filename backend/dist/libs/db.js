"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const config_dev_1 = require("../config_dev");
const debug = require('debug')('app:libs:db');
const pg_1 = require("pg");
debug('database', config_dev_1.config.database);
const pool = new pg_1.Pool(config_dev_1.config.database);
exports.pool = pool;
