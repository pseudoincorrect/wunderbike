"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_dev_1 = require("../config_dev");
function encryptPassword(plainText, pepper) {
    return crypto_1.default
        .createHmac('sha256', plainText)
        .update(config_dev_1.config.secret)
        .update(pepper)
        .digest('base64');
}
exports.encryptPassword = encryptPassword;
