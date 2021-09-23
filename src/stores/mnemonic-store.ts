import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Mnemonic from '../libs/mnemonic';

export interface IMnemonic {
  numOfWords: number;
  entropy?: string;
  words?: string;
  seed?: string;
  rootKey?: string;
}

export const mnemonicSlice = createSlice({
  name: 'mnemonicInfos',
  initialState: {
    numOfWords: 15,
  } as IMnemonic,
  reducers: {
    // It is not necessary to have a separate method in lib, just to facilitate testing the calc flow.
    calcMnemonic: (state, action: PayloadAction<IMnemonic>) => {
      return Mnemonic.calcMnemonic(action.payload.numOfWords);
    },
  },
});