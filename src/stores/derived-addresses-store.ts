
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as DerivationAddress from '../libs/derivation-addresses';
import { getBip32RootKeyByStr } from '../libs/derivation-path';

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
      // It is not necessary to have a separate method in lib, just to facilitate testing the calc flow.
      const { bip32DerivationPath, rootKey, size } = action.payload;
      if (!rootKey) {
        return { derivationAddresses: [] };
      }
      const bip32RootKey = getBip32RootKeyByStr(rootKey);
      const currentLen = state.derivationAddresses.length;
      const addresses = DerivationAddress.calcDerivedAddress(currentLen, size, bip32DerivationPath, bip32RootKey);
      return { derivationAddresses: state.derivationAddresses.concat(addresses) };
    },
  },
});