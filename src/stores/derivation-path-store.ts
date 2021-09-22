import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import * as DerivationPath from '../libs/derivation-path';

export interface IPathLevel {
  purpose: number;
  coin: number;
  account: number;
  change: number;
}

export interface IDerivationPath extends IPathLevel {
  accountPrivateKey?: string;
  accountPublicKey?: string;
  bip32PrivateKey?: string;
  bip32PublicKey?: string;
  derivationPath?: string;
}

export const derivationPathSlice = createSlice({
  name: 'derivationPathInfos',
  initialState: {
    purpose: 44,
    coin: 0,
    account:0,
    change: 0,
  } as IDerivationPath,
  reducers: {
    calcDerivationPath: (state, action: PayloadAction<string>) => {
      // It is not necessary to have a separate method in lib, just to facilitate testing the calc flow.
      const result = DerivationPath.calcDerivationPath(state, action.payload);
      if (result) return result;
      return pick(state, ['purpose', 'coin', 'account', 'change']);
    }
  },
});