import crypto from 'crypto';
import { config } from '../config_dev';

function encryptPassword(plainText: any, pepper: any): string {
  return crypto
    .createHmac('sha256', plainText)
    .update(config.secret)
    .update(pepper)
    .digest('base64');
}

export { encryptPassword };
