"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccess = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('app:database:user');
const db_1 = require("../libs/db");
const encryptPassword = require('../libs/secret').encryptPassword;
const http_errors_1 = __importDefault(require("http-errors"));
const httpErr = __importStar(require("http-errors"));
const table = 'users';
class UserAccess {
    // async login (username, password) {
    //   password = encryptPassword(password, username);
    //   const res = await pool.query('SELECT name, username from ' + dbTable + ' where username = $1 and password = $2', [username, password]);
    //   debug('login %o', res);
    //   if (res.rowCount <= 0) {
    //     throw 'login fail';
    //   } else {
    //     return res;
    //   }
    // }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(data);
            let user = [
                data.email,
                data.full_name,
                encryptPassword(data.password, data.email),
            ];
            let res;
            try {
                res = yield db_1.pool.query('INSERT INTO ' +
                    table +
                    ' (email, full_name, hash_pass) VALUES ($1, $2, $3) RETURNING *', user);
            }
            catch (error) {
                if (error.detail.includes('already exists')) {
                    throw (0, http_errors_1.default)(httpErr.BadRequest, 'User already exists');
                }
            }
            const row = res.rows[0];
            const userModel = {
                createdAt: row['created_at'],
                email: row['email'],
                fullName: row['full_name'],
                id: row['id'],
                hashPass: '',
            };
            return userModel;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            try {
                res = yield db_1.pool.query('SELECT * from ' + table + ' where id = $1 ORDER BY id ASC', [id]);
            }
            catch (error) {
                throw (0, http_errors_1.default)(httpErr.NotFound, error.detail);
            }
            debug('get %o', res);
            const row = res.rows[0];
            const userModel = {
                createdAt: row['created_at'],
                email: row['email'],
                fullName: row['full_name'],
                id: row['id'],
                hashPass: '',
            };
            return userModel;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            try {
                res = yield db_1.pool.query('SELECT * from ' + table + ' where email = $1 ORDER BY id ASC', [email]);
            }
            catch (error) {
                throw (0, http_errors_1.default)(httpErr.NotFound, error.detail);
            }
            debug('get %o', res);
            const row = res.rows[0];
            const userModel = {
                createdAt: row['created_at'],
                email: row['email'],
                fullName: row['full_name'],
                id: row['id'],
                hashPass: '',
            };
            return userModel;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.pool.query('DELETE from ' + table + ' where id  = $1 RETURNING *', [id]);
            debug('delete %o', res);
            const row = res.rows[0];
            const userModel = {
                createdAt: row['created_at'],
                email: row['email'],
                fullName: row['full_name'],
                id: row['id'],
                hashPass: '',
            };
            return userModel;
        });
    }
}
exports.UserAccess = UserAccess;
