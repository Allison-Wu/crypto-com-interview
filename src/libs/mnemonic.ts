import * as crypto from 'crypto';
import { mnemonicToSeedSync } from 'bip39';
import { englishWordList } from '../libs/english-word-list';
import { fromSeed } from 'bip32';
import { codec, hash } from 'sjcl';

const fillZero = (source: string, length: number) => {
  if (source.length >= length) return source;
  return source.concat('0'.repeat(length - source.length));
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
  const entropyChecksum = getEntropyChecksum(entropy);
  const indexes = getWordsIndexArray(entropy + entropyChecksum);
  const mnemonic = [];
  for (const index of indexes) {
    mnemonic.push(englishWordList[index]);
  }
  return mnemonic;
};

const hexStringToBinaryString = (hex: string) => {
  let binaryString = '';
  for (let i = 0; i < hex.length; i++) {
    binaryString += fillZero(parseInt(hex[i], 16).toString(2), 4);
  }
  return binaryString;
};

export const getEntropyChecksum = (entropy: string) => {
  const len = entropy.length / 32;
  const hashed = hash.sha256.hash(entropy);
  const hex = codec.hex.fromBits(hashed);
  const binaryString = hexStringToBinaryString(hex);
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