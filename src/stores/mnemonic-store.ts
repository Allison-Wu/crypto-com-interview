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
    setMnemonic: (state, action: PayloadAction<IMnemonic>) => {
      const randomBytes = Mnemonic.getRandomBytes(action.payload.numOfWords);
      const words = Mnemonic.getMnemonic(randomBytes).join(' ');
      const seedBuffer = Mnemonic.getBip39Seed(words);
      return {
        words,
        numOfWords: action.payload.numOfWords,
        seed: seedBuffer.toString('hex'),
        rootKey: Mnemonic.getBip32RootKey(seedBuffer).toBase58(),
      };
    }
  },
});