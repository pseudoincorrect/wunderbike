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
exports.UserController = void 0;
const debug = require('debug')('app:controller:userAccess');
const user_1 = require("../database/user");
const user = new user_1.UserAccess();
class UserController {
    // async showAllUser(req, res) {
    //   let users = (await userAccess.get()).rows;
    //   res.render('index', {
    //     users,
    //   });
    // }
    // async detail(req, res, next) {
    //   res.locals.edit = true;
    //   let id = req.params.id;
    //   debug('detail %o', id);
    //   try {
    //     let detail = (await userAccess.get(id)).rows[0];
    //     res.render('index', {
    //       userAccess: detail,
    //     });
    //   } catch (e) {
    //     next(e.detail || e);
    //   }
    // }
    // async edit(req, res, next) {
    //   let data = req.body;
    //   try {
    //     let result = await userAccess.edit(data);
    //     res.end('ok!');
    //   } catch (e) {
    //     next(e.detail || e);
    //   }
    // }
    // async login(req, res, next) {
    //   let username = req.body.username;
    //   let password = req.body.password;
    //   try {
    //     let result = await userAccess.login(username, password);
    //     req.session.userAccess = result.rows[0];
    //     res.redirect('/');
    //   } catch (e) {
    //     next(e.detail || e);
    //   }
    // }
    // async logout(req, res, next) {
    //   req.session = null;
    //   res.redirect('/');
    // }
    // async delete(req, res, next) {
    //   let id = req.body.id;
    //   try {
    //     let result = await userAccess.delete({ id });
    //     res.redirect('/');
    //   } catch (e) {
    //     next(e.detail);
    //   }
    // }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            try {
                debug(data);
                let result = yield user.register(data);
                debug(result);
                res.send('Hi! New User~');
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.UserController = UserController;
