import { mockMultiSig } from '../test/mock/multi-sig';
import { MultiSig } from './multi-sig';

describe('MultiSig', () => {
  describe('getP2ms', () => {
    for (const mock of mockMultiSig) {
      it(`should return correct p2ms and p2sh for ${mock.numOfApprove} of ${mock.publicKeys.keys} multi sig`, () => {
        const result = MultiSig.getP2ms(mock.publicKeys, mock.numOfApprove);
        expect(result.output?.toString('hex')).toEqual(mock.redeemScript);
      });
    }

    it('should throw error if number of approve larger than the length of public keys', () => {
      expect(() => MultiSig.getP2ms(mockMultiSig[0].publicKeys, 100)).toThrowError('Invalid numOfApprove[100]!');
      expect(() => MultiSig.getP2ms(mockMultiSig[0].publicKeys, 0)).toThrowError('Invalid numOfApprove[0]!');
    });
  });

  describe('calcP2sh', () => {
    for (const mock of mockMultiSig) {
      it(`should return correct p2ms and p2sh for ${mock.numOfApprove} of ${mock.publicKeys.keys} multi sig`, () => {
        const result = MultiSig.calcP2sh(mock.publicKeys, mock.numOfApprove);
        expect(result.p2ms.output?.toString('hex')).toEqual(mock.redeemScript);
        expect(result.p2sh.address).toEqual(mock.bitcoinAddress);
      });
    }
  });
});
