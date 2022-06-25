"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const config_dev_1 = require("../config_dev");
module.exports.encryptPassword = function (plainText, pepper) {
    return crypto_1.default
        .createHmac('sha256', plainText)
        .update(config_dev_1.config.secret)
        .update(pepper)
        .digest('base64');
};
