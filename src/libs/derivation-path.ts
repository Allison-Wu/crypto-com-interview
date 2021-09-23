import { BIP32Interface, fromBase58 } from 'bip32';
import { pick } from 'lodash';
import { IDerivationPath, IPathLevel } from '../stores/derivation-path-store';

export class DerivationPath {
  static getDerivationPath(pathLevel: IPathLevel) {
    return `m/${pathLevel.purpose}'/${pathLevel.coin}'/${pathLevel.account}'/${pathLevel.change}`;
  }

  static getBip44DerivationPath(pathLevel: IPathLevel) {
    return `m/${pathLevel.purpose}'/${pathLevel.coin}'/${pathLevel.account}'`;
  }

  static getExtendedKey(derivationPath: string, rootKey: BIP32Interface) {
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
  }

  static getBip32RootKeyByStr(strBip32RootKey: string) {
    return fromBase58(strBip32RootKey);
  }

  static calcDerivationPath(pathLevel: IPathLevel, strBip32RootKey?: string) {
    if (!strBip32RootKey) return;
    const bip32RootKey = this.getBip32RootKeyByStr(strBip32RootKey);
    const bip32DerivationPath = this.getDerivationPath(pathLevel);
    const bip44DerivationPath = this.getBip44DerivationPath(pathLevel);

    const bip32ExtendedKey = this.getExtendedKey(bip32DerivationPath, bip32RootKey);
    const bip44ExtendedKey = this.getExtendedKey(bip44DerivationPath, bip32RootKey);

    const derivationPath: IDerivationPath = {
      ...pick(pathLevel, ['purpose', 'coin', 'account', 'change']),
      derivationPath: bip32DerivationPath,
      bip32PrivateKey: bip32ExtendedKey?.toBase58() || '',
      bip32PublicKey: bip32ExtendedKey?.neutered().toBase58() || '',
      accountPrivateKey: bip44ExtendedKey?.toBase58() || '',
      accountPublicKey: bip44ExtendedKey?.neutered().toBase58() || '',
    };
    return derivationPath;
  }
}