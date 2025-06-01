import * as crypto from 'crypto';

export const genId = () => {
  return crypto
    .randomBytes(16)
    .toString('hex')
    .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
};
