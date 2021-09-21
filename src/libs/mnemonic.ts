import * as crypto from 'crypto';
import { mnemonicToSeedSync } from 'bip39';
import { englishWordList } from '../libs/english-word-list';
import { fromSeed } from 'bip32';

const fillZero = (source: string, length: number) => {
  if (source.length >= length) return source;
  return '0'.repeat(length - source.length).concat(source);
};

export const getRandomBytes = (numbOfWords: number) => {
  const size = numbOfWords / 3 * 32;
  return crypto.randomBytes(size / 8);
};

export const getEntropy = (randomBytes: Buffer) => {
  let binaryStr = '';
  for (let i = 0; i < randomBytes.length; i++) {
    const bin = randomBytes[i].toString(2);
    binaryStr = binaryStr.concat(fillZero(bin, 8).slice(-8));
  }
  return binaryStr;
};

export const getMnemonic = (randomBytes: Buffer) => {
  if (randomBytes.length % 4 > 0) {
    throw new Error('RandomBytes length in bits should be divisible by 32, but it is not '
      + `(${randomBytes.length} bytes = ${randomBytes.length * 8} bits).`);
  }
  const entropy = getEntropy(randomBytes);
  const entropyChecksum = getEntropyChecksum(randomBytes);
  const indexes = getWordsIndexArray(entropy + entropyChecksum);
  const mnemonic = [];
  for (const index of indexes) {
    mnemonic.push(englishWordList[index]);
  }
  return mnemonic;
};

const bytesToBinary = (bytes: number[]) => {
  return bytes.map((x) => fillZero(x.toString(2), 8)).join('');
};

export const getEntropyChecksum = (randomBytes: Buffer) => {
  const len = randomBytes.length * 8 / 32;
  const hashBuffer = crypto.createHash('sha256').update(randomBytes).digest();
  const binaryString = bytesToBinary(Array.from(hashBuffer));
  return binaryString.substring(0,len);
};

export const getWordsIndexArray = (binaryStrWithCs: string) => {
  const len = binaryStrWithCs.length / 11;
  const indexes = [];
  for (let i = 0; i < len; i++) {
    const valueStr = binaryStrWithCs.substring(11 * i, 11 * (i +1));
    indexes.push(parseInt(valueStr, 2));
  }
  return indexes;
};

export const getBip39Seed = (phrase: string, passphrase = '') => {
  return mnemonicToSeedSync(phrase, passphrase);
};

export const getBip32RootKey = (seed: Buffer) => {
  return fromSeed(seed);
};