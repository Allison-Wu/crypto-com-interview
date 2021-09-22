import { BIP32Interface, fromBase58 } from 'bip32';
import { pick } from 'lodash';
import { IDerivationPath, IPathLevel } from '../stores/derivation-path-store';

export const getDerivationPath = (pathLevel: IPathLevel) =>
  `m/${pathLevel.purpose}'/${pathLevel.coin}'/${pathLevel.account}'/${pathLevel.change}`;

export const getBip44DerivationPath = (pathLevel: IPathLevel) => {
  return `m/${pathLevel.purpose}'/${pathLevel.coin}'/${pathLevel.account}'`;
};

export const getExtendedKey = (derivationPath: string, rootKey: BIP32Interface) => {
  let extendedKey: BIP32Interface | undefined = rootKey;

  const pathBits = derivationPath.split('/');
  for (const bit of pathBits) {
    const idx = Number(bit.replace(/'/g, ''));
    if (isNaN(idx)) {
      continue;
    }
    const hardened = bit[bit.length - 1] === '\'';
    const isPrivate = !extendedKey?.isNeutered();
    const invalidPath = hardened && !isPrivate;
    if (invalidPath) {
      extendedKey = undefined;
    } else if (hardened) {
      extendedKey = extendedKey?.deriveHardened(idx);
    } else {
      extendedKey = extendedKey?.derive(idx);
    }
  }
  return extendedKey;
};

export const calcDerivationPath = (pathLevel: IPathLevel, strBip32RootKey?: string) => {
  if (!strBip32RootKey) return;
  const bip32RootKey = fromBase58(strBip32RootKey);
  const bip32DerivationPath = getDerivationPath(pathLevel);
  const bip44DerivationPath = getBip44DerivationPath(pathLevel);

  const bip32ExtendedKey = getExtendedKey(bip32DerivationPath, bip32RootKey);
  const bip44ExtendedKey = getExtendedKey(bip44DerivationPath, bip32RootKey);

  const derivationPath: IDerivationPath = {
    ...pick(pathLevel, ['purpose', 'coin', 'account', 'change']),
    derivationPath: bip32DerivationPath,
    bip32PrivateKey: bip32ExtendedKey?.toBase58() || '',
    bip32PublicKey: bip32ExtendedKey?.neutered().toBase58() || '',
    accountPrivateKey: bip44ExtendedKey?.toBase58() || '',
    accountPublicKey: bip44ExtendedKey?.neutered().toBase58() || '',
  };
  return derivationPath;
};