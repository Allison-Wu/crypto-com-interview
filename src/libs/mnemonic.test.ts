import { Mnemonic } from './mnemonic';
import * as faker from 'faker';
import { mnemonicResults } from '../test/result';
import { pick } from 'lodash';
import { SinonStub } from 'sinon';
import { loadSandbox } from '../test/load-sandbox';

describe('Mnemonic', () => {
  describe('fillZero', () => {
    it('should fill zero to specific length if its length less than a specific length', () => {
      const source = faker.random.alphaNumeric(3);
      expect(`00000${source}`).toEqual(Mnemonic.fillZero(source, 8));
    });

    it('should return origin source if its length equal or more than a specific length', () => {
      const source = faker.random.alphaNumeric(10);
      expect(source).toEqual(Mnemonic.fillZero(source, 8));
      expect(source).toEqual(Mnemonic.fillZero(source, 10));
    });
  });

  describe('getRandomBytes', () => {
    it('should return 16 bytes when num is 12', () => {
      const bytes = Mnemonic.getRandomBytes(12);
      expect(bytes.length).toEqual(16);
    });
  });

  describe('getEntropy', () => {
    for (const result of mnemonicResults) {

      it(`should return a correct entropy with random value for ${result.numOfWords} words`, () => {
        expect(result.entropy).toEqual(Mnemonic.getEntropy(result.randomValue));
      });
    }
  });

  describe('getEntropyChecksum', () => {
    for (const result of mnemonicResults) {

      it(`should return a correct checksum entropy with random value for ${result.numOfWords} words`, () => {
        expect(result.checksum).toEqual(Mnemonic.getEntropyChecksum(result.randomValue));
      });
    }
  });

  describe('getEntropyChecksum', () => {
    for (const result of mnemonicResults) {

      it(`should return a correct checksum entropy with random value for ${result.numOfWords} words`, () => {
        expect(result.checksum).toEqual(Mnemonic.getEntropyChecksum(result.randomValue));
      });
    }
  });

  describe('getWordsByIndexes', () => {
    for (const result of mnemonicResults) {
      it(`should return a correct words array with index array for ${result.numOfWords} words`, () => {
        const words = Mnemonic.getWordsByIndexes(result.indexes, result.wordList);
        expect(result.words).toEqual(words);
        expect(result.numOfWords).toEqual(words.length);
      });
    }

    it('should throw error when index array include -1', () => {
      expect(
        () => Mnemonic.getWordsByIndexes(mnemonicResults[0].indexes.concat(-1), mnemonicResults[0].wordList)
      ).toThrowError('Invalid index[-1] for transferring word!');
    });
  });

  describe('getMnemonic', () => {
    for (const result of mnemonicResults) {
      it(`should return correct mnemonic with random bytes for ${result.numOfWords} words`, () => {
        const words = Mnemonic.getMnemonic(result.randomValue, result.wordList);
        expect(words.length).toEqual(result.numOfWords);
        expect(words).toEqual(result.words);
      });
    }

    it('should throw error if number of words cannot divisible by 3', () => {
      expect(
        () => Mnemonic.getMnemonic(Buffer.from([99]), mnemonicResults[0].wordList)
      ).toThrowError('Invalid length[1] of the random bytes');
    });
  });

  describe('calcMnemonic', () => {
    let getRandomBytesStub: SinonStub;
    loadSandbox(sandbox => {
      getRandomBytesStub = sandbox.stub(Mnemonic, 'getRandomBytes');
    });

    for (const result of mnemonicResults) {
      it(`should return correct mnemonic for ${result.numOfWords} words`, () => {
        getRandomBytesStub.returns(result.randomValue);
        const mnemonicInfo = Mnemonic.calcMnemonic(result.numOfWords, result.wordList);
        expect(getRandomBytesStub.calledWith(result.numOfWords)).toBeTruthy();
        expect({
          ...pick(result, ['numOfWords', 'seed', 'rootKey']),
          words: result.words.join(' '),
        }).toEqual(mnemonicInfo);
      });
    }
  });
});
