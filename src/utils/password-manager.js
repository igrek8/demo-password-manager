import CryptoJS from 'crypto-js';

export const createHash = (pass) =>
  CryptoJS.SHA3(pass).toString(CryptoJS.enc.Base64);

export const compareHashes = (hashA, hashB) => {
  return hashA === hashB;
};

export const comparePhraseWithHash = (pass, hash) => {
  const tempHash = createHash(pass);
  return compareHashes(hash, tempHash);
};
