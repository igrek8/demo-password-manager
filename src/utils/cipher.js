import CryptoJS from 'crypto-js';

const IV_LENGTH = 16;

export const INVALID_DATA = Symbol('INVALID_DATA');

export const encryptData = (secret, data) => {
  const seed = CryptoJS.enc.Utf8.parse(secret);
  const ciphertext = data.toString();
  const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
  const options = { mode: CryptoJS.mode.CBC, iv };
  const encoded = CryptoJS.AES.encrypt(ciphertext, seed, options);
  const bytes = encoded.iv.concat(encoded.ciphertext);
  return bytes.toString(CryptoJS.enc.Base64);
};

export const decryptData = (secret, data) => {
  const seed = CryptoJS.enc.Utf8.parse(secret);
  const buf = CryptoJS.enc.Base64.parse(data);
  const bytes = CryptoJS.enc.Hex.stringify(buf);
  const iv = CryptoJS.enc.Hex.parse(bytes.slice(0, IV_LENGTH * 2));
  const ciphertext = CryptoJS.enc.Hex.parse(bytes.slice(IV_LENGTH * 2));
  const options = { mode: CryptoJS.mode.CBC, iv };
  const decoded = CryptoJS.AES.decrypt({ ciphertext }, seed, options);
  if (decoded.sigBytes < 0) {
    throw new Error(`failed to decoded`);
  }
  return decoded.toString(CryptoJS.enc.Utf8);
};

export const decryptDataSafe = (secret, data) => {
  try {
    return decryptData(secret, data);
  } catch (caughtErr) {
    if (/^failed to decoded$/i.test(caughtErr.message)) {
      return INVALID_DATA;
    }
    if (/^malformed utf-8 data/i.test(caughtErr.message)) {
      return INVALID_DATA;
    }
    throw caughtErr;
  }
};
