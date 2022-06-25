"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccess = void 0;
const debug = require('debug')('app:model:user');
const db_1 = require("../libs/db");
const encryptPassword = require('../libs/secret').encryptPassword;
var createError = require('http-errors');
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
                    throw createError(401, 'User already exists');
                }
            }
            return res;
        });
    }
}
exports.UserAccess = UserAccess;
