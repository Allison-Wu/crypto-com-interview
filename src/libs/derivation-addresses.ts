import { BIP32Interface } from 'bip32';
import * as DerivationPath from '../libs/derivation-path';
import { payments } from 'bitcoinjs-lib';
import { IDerivedAddress } from '../stores/derived-addresses-store';

export const getPaymentAddress = (addressDerivationPath: string, rootKey: BIP32Interface) => {
  const extendedKey = DerivationPath.getExtendedKey(addressDerivationPath, rootKey);
  return { payment: payments.p2pkh({ pubkey: extendedKey?.publicKey }), extendedKey };
};

export const calcDerivedAddress = (startIndex: number, size: number, bip32DerivationPath?: string, rootKey?: BIP32Interface) => {
  const addresses: IDerivedAddress[] = [];
  if (!bip32DerivationPath || !rootKey) return [];
  for (let i = startIndex; i < startIndex + size; i++) {
    const addressDerivationPath = bip32DerivationPath + `/${i}`;
    const { payment, extendedKey } = getPaymentAddress(addressDerivationPath, rootKey);
    const addressObject: IDerivedAddress = {
      path: addressDerivationPath,
      id: `address-${i}`,
      address: payment.address,
      privateKey: extendedKey?.toWIF(),
      publicKey: extendedKey?.publicKey?.toString('hex'),
    };

    addresses.push(addressObject);
  }
  return addresses;
};