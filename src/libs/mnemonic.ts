import * as crypto from 'crypto';
import { mnemonicToSeedSync } from 'bip39';
import { fromSeed } from 'bip32';
import { IMnemonic } from '../stores/mnemonic-store';

export class Mnemonic {
  static getRandomBytes(numbOfWords: number) {
    const size = numbOfWords / 3 * 32;
    return crypto.randomBytes(size / 8);
  }

  static getEntropy(randomBytes: Buffer) {
    let binaryStr = '';
    for (let i = 0; i < randomBytes.length; i++) {
      const bin = randomBytes[i].toString(2);
      binaryStr = binaryStr.concat(this.fillZero(bin, 8).slice(-8));
    }
    return binaryStr;
  }

  static getWordsByIndexes(indexes: number[], wordList: string[]) {
    const words = [];
    for (const index of indexes) {
      if (index === -1) {
        throw new Error(`Invalid index[${index}] for transferring word!`);
      }
      words.push(wordList[index]);
    }
    return words;
  }

  static getMnemonic(randomBytes: Buffer, wordList: string[]) {
    if (randomBytes.length % 4 > 0) {
      throw new Error(`Invalid length[${randomBytes.length}] of the random bytes`);
    }
    const entropy = this.getEntropy(randomBytes);
    const entropyChecksum = this.getEntropyChecksum(randomBytes);
    const indexes = this.getWordsIndexArray(entropy + entropyChecksum);
    return this.getWordsByIndexes(indexes, wordList);
  }

  static calcMnemonic(numOfWords: number, wordList: string[]) {
    if (numOfWords % 3 !== 0) {
      throw new Error(`Invalid length[${numOfWords}] of words!`);
    }
    const randomBytes = this.getRandomBytes(numOfWords);
    const words = this.getMnemonic(randomBytes, wordList).join(' ');
    const seedBuffer = this.getBip39Seed(words);

    const mnemonic: IMnemonic = {
      words,
      numOfWords,
      seed: seedBuffer.toString('hex'),
      rootKey: fromSeed(seedBuffer).toBase58(),
    };
    return mnemonic;
  }

  static getEntropyChecksum(randomBytes: Buffer) {
    const len = randomBytes.length * 8 / 32;
    const hashBuffer = crypto.createHash('sha256').update(randomBytes).digest();
    const binaryString = Array.from(hashBuffer).map((x) => this.fillZero(x.toString(2), 8)).join('');
    return binaryString.substring(0,len);
  }

  static getWordsIndexArray(binaryStrWithCs: string) {
    const len = binaryStrWithCs.length / 11;
    const indexes = [];
    for (let i = 0; i < len; i++) {
      const valueStr = binaryStrWithCs.substring(11 * i, 11 * (i +1));
      indexes.push(parseInt(valueStr, 2));
    }
    return indexes;
  }

  static getBip39Seed(phrase: string, passphrase = '') {
    return mnemonicToSeedSync(phrase, passphrase);
  }

  static fillZero(source: string, length: number) {
    if (source.length >= length) return source;
    return '0'.repeat(length - source.length).concat(source);
  }
}