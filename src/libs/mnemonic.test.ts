import { Mnemonic } from './mnemonic';
import * as faker from 'faker';
import { mockMnemonics } from '../test/mock/mnemonic';
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
    for (const mock of mockMnemonics) {

      it(`should return a correct entropy with random value for ${mock.numOfWords} words`, () => {
        expect(mock.entropy).toEqual(Mnemonic.getEntropy(mock.randomValue));
      });
    }
  });

  describe('getEntropyChecksum', () => {
    for (const mock of mockMnemonics) {

      it(`should return a correct checksum entropy with random value for ${mock.numOfWords} words`, () => {
        expect(mock.checksum).toEqual(Mnemonic.getEntropyChecksum(mock.randomValue));
      });
    }
  });

  describe('getEntropyChecksum', () => {
    for (const mock of mockMnemonics) {

      it(`should return a correct checksum entropy with random value for ${mock.numOfWords} words`, () => {
        expect(mock.checksum).toEqual(Mnemonic.getEntropyChecksum(mock.randomValue));
      });
    }
  });

  describe('getWordsByIndexes', () => {
    for (const mock of mockMnemonics) {
      it(`should return a correct words array with index array for ${mock.numOfWords} words`, () => {
        const words = Mnemonic.getWordsByIndexes(mock.indexes, mock.wordList);
        expect(mock.words).toEqual(words);
        expect(mock.numOfWords).toEqual(words.length);
      });
    }

    it('should throw error when index array include -1', () => {
      expect(
        () => Mnemonic.getWordsByIndexes(mockMnemonics[0].indexes.concat(-1), mockMnemonics[0].wordList)
      ).toThrowError('Invalid index[-1] for transferring word!');
    });
  });

  describe('getMnemonic', () => {
    for (const mock of mockMnemonics) {
      it(`should return correct mnemonic with random bytes for ${mock.numOfWords} words`, () => {
        const words = Mnemonic.getMnemonic(mock.randomValue, mock.wordList);
        expect(words.length).toEqual(mock.numOfWords);
        expect(words).toEqual(mock.words);
      });
    }

    it('should throw error if number of words cannot divisible by 3', () => {
      expect(
        () => Mnemonic.getMnemonic(Buffer.from([99]), mockMnemonics[0].wordList)
      ).toThrowError('Invalid length[1] of the random bytes');
    });
  });

  describe('calcMnemonic', () => {
    let getRandomBytesStub: SinonStub;
    loadSandbox(sandbox => {
      getRandomBytesStub = sandbox.stub(Mnemonic, 'getRandomBytes');
    });

    for (const mock of mockMnemonics) {
      it(`should return correct mnemonic for ${mock.numOfWords} words`, () => {
        getRandomBytesStub.returns(mock.randomValue);
        const mnemonicInfo = Mnemonic.calcMnemonic(mock.numOfWords, mock.wordList);
        expect(getRandomBytesStub.calledWith(mock.numOfWords)).toBeTruthy();
        expect({
          ...pick(mock, ['numOfWords', 'seed', 'rootKey']),
          words: mock.words.join(' '),
        }).toEqual(mnemonicInfo);
      });
    }
  });
});
