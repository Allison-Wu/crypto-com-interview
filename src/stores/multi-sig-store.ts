import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { generateArray, isArrayIncludeEmpty } from '../libs/helpers';
import { MultiSig } from '../libs/multi-sig';

export interface IMultiSig {
  numOfParticipant: number;
  publicKeys: string[];
  numOfApprove: number;
  redeemScript?: string;
  p2shAddress?: string;
}

export const multiSigSlice = createSlice({
  name: 'multiSigInfo',
  initialState: {
    numOfApprove: 2,
    numOfParticipant: 4,
    publicKeys: generateArray(4),
  } as IMultiSig,
  reducers: {
    calcMultiSig: (state, action: PayloadAction<IMultiSig>):IMultiSig => {
      const { numOfApprove, numOfParticipant, publicKeys } = action.payload;
      const result: IMultiSig = { numOfParticipant, publicKeys, numOfApprove };
      if (!numOfApprove || !publicKeys.length) {
        return result;
      }
      try{
        const { p2ms, p2sh } = MultiSig.calcP2sh(publicKeys, numOfApprove);
        result.redeemScript = p2ms.output?.toString('hex');
        result.p2shAddress = p2sh.address;
        return result;
      } catch {
        console.log('Invalid public keys');
        return result;
      }
    },

    setN: (state, action: PayloadAction<number>):IMultiSig => {
      const newValue = action.payload;
      if (newValue >= state.publicKeys.length) return state;
      return {
        ...state,
        numOfApprove: action.payload
      };
    },

    setM: (state, action: PayloadAction<number>):IMultiSig => {
      const newNum = action.payload;
      const currentPublicKeys = state.publicKeys;
      const diff = newNum - state.numOfParticipant;
      if (diff === 0) return state;
      let newKeyLists: string[];
      if (diff > 0) {
        newKeyLists = currentPublicKeys.concat(generateArray(diff));
      } else {
        newKeyLists = currentPublicKeys.slice(0, newNum);
      }
      return {
        ...state,
        numOfParticipant: action.payload,
        publicKeys: newKeyLists,
      };
    },

    setPublicKey: (state, action: PayloadAction<{ index: number, value: string }>):IMultiSig => {
      const { index, value } = action.payload;
      const currentPublicKeys = state.publicKeys;
      if (index > currentPublicKeys.length - 1) {
        throw new Error(`Invalid index[${index}] to update public key`);
      }

      const newPublicKeys = _.clone(currentPublicKeys);
      newPublicKeys[index] = value;

      return {
        ...state,
        publicKeys: newPublicKeys
      };
    },
  },
});