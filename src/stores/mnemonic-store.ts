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
    calcMnemonic: (state, action: PayloadAction<IMnemonic>) => {
      // It is not necessary to have a separate method in lib, just to facilitate testing the calc flow.
      return Mnemonic.calcMnemonic(action.payload.numOfWords);
    },
  },
});