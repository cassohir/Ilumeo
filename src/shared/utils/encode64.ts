import { Buffer } from 'node:buffer';

export const encodeStringToBase64 = (str: string): string => {
  const buffer = Buffer.from(str, 'utf-8');
  return buffer.toString('base64');
};
