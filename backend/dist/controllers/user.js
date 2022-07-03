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
exports.UserController = void 0;
const debug_1 = __importDefault(require("debug"));
const http_errors_1 = __importDefault(require("http-errors"));
const httpErr = __importStar(require("http-errors"));
const user_1 = require("../database/user");
const secret_1 = require("../libs/secret");
const debug = (0, debug_1.default)('app:controller:user');
const user = new user_1.UserAccess();
class UserController {
    detail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.locals.edit = true;
            let id = req.params.id;
            debug('detail %o', id);
            try {
                let detail = yield user.getById(id);
                debug('details', detail);
                res.send(detail);
            }
            catch (e) {
                next(e.detail || e);
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            try {
                debug(data);
                let userModel = yield user.register(data);
                debug(userModel);
                res.send(userModel);
            }
            catch (e) {
                next(e);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            try {
                let userModel = yield user.delete(id);
                debug(userModel);
                res.send(userModel);
            }
            catch (e) {
                next(e.detail);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = req.body.email;
            let password = req.body.password;
            debug(email, password);
            let userModel = yield user.getByEmail(email);
            const enc = (0, secret_1.encryptPassword)(password, email);
            const challenge = (0, secret_1.encryptPassword)(userModel.hashPass, userModel.email);
            if (enc != challenge) {
                throw (0, http_errors_1.default)(httpErr.BadRequest, 'invalid email or password');
            }
        });
    }
}
exports.UserController = UserController;
