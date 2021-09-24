import { IDerivationPath, IPathLevel } from '../../stores/derivation-path-store';

export const pathLevel: IPathLevel = {
  purpose: 44,
  coin: 0,
  account: 0,
  change: 0,
};

export const derivationPath: IDerivationPath = {
  ...pathLevel,
  derivationPath: 'm/44/0\'/0\'/0',
  bip32PrivateKey: '',
  bip32PublicKey: '',
  accountPrivateKey: '',
  accountPublicKey: '',
};