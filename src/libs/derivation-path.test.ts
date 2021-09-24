import { derivationPath, pathLevel } from '../test/mock/derivation-path';
import { DerivationPath } from './derivation-path';

describe('DerivationPath', () => {
  describe('getDerivationPath', () => {
    it('should return correct derivation path with path level', () => {
      expect(derivationPath.derivationPath).toEqual(DerivationPath.getDerivationPath(pathLevel));
    });
  });

  describe('getBip44DerivationPath', () => {
    it('should return correct bip44 derivation path with path level', () => {
      expect('m/44\'/0\'/0\'').toEqual(DerivationPath.getBip44DerivationPath(pathLevel));
    });
  });
});
