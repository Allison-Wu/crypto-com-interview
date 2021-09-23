import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DerivationPath } from '../libs/derivation-path';
import { DerivedAddress } from '../libs/derivation-addresses';

export interface IDerivedAddress {
  id: string;
  path: string;
  address?: string;
  publicKey?: string;
  privateKey?: string;
}

interface IDerivationAddressState {
  derivationAddresses: IDerivedAddress[];
}

interface IAddDerivedAddress {
  rootKey?: string;
  bip32DerivationPath?: string;
  size: number;
}

export const derivedAddressesSlice = createSlice({
  name: 'derivedAddressesInfos',
  initialState: {
    derivationAddresses: [],
  } as IDerivationAddressState,
  reducers: {
    addDerivedAddress: (state, action: PayloadAction<IAddDerivedAddress>) => {
      const { bip32DerivationPath, rootKey, size } = action.payload;
      if (!rootKey) {
        return { derivationAddresses: [] };
      }

      const originAddresses = state.derivationAddresses;
      const bip32RootKey = DerivationPath.getBip32RootKeyByStr(rootKey);
      const currentLen = originAddresses.length;
      const addresses = DerivedAddress.calcDerivedAddress(currentLen, size, bip32DerivationPath, bip32RootKey);
      return { derivationAddresses: originAddresses.concat(addresses) };
    },
    resetDerivedAddress: () => ({ derivationAddresses: [] })
  },
});