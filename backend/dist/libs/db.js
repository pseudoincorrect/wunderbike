"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const config_dev_1 = require("../config_dev");
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("app:libs:db");
const pg_1 = require("pg");
debug('database', config_dev_1.config.database);
const pool = new pg_1.Pool(config_dev_1.config.database);
exports.pool = pool;
