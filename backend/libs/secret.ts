import crypto from 'crypto';
import {config} from "../config_dev"

module.exports.encryptPassword = function (plainText: any, pepper: any) {
  return crypto
    .createHmac('sha256', plainText)
    .update(config.secret)
    .update(pepper)
    .digest('base64');
};
