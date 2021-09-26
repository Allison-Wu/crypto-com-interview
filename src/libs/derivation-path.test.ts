import { mockDerivationPath, mockPathLevel } from '../test/mock/derivation-path';
import { DerivationPath } from './derivation-path';

describe('DerivationPath', () => {
  describe('getDerivationPath', () => {
    it('should return correct derivation path with path level', () => {
      expect(mockDerivationPath.derivationPath).toEqual(DerivationPath.getDerivationPath(mockPathLevel));
    });
  });

  describe('getBip44DerivationPath', () => {
    it('should return correct bip44 derivation path with path level', () => {
      expect('m/44\'/0\'/0\'').toEqual(DerivationPath.getBip44DerivationPath(mockPathLevel));
    });
  });

  describe('getBip32RootKeyByStr', () => {
    it('should return correct bip32 root key with str root key', () => {
      const result = DerivationPath.getBip32RootKeyByStr(mockDerivationPath.strBip32RootKey);
      expect(result.toBase58()).toEqual(mockDerivationPath.strBip32RootKey);
    });
  });
});
