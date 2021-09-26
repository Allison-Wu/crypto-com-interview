import {
  Action, applyMiddleware, combineReducers,
  configureStore, ThunkAction,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { derivationPathSlice } from './derivation-path-store';
import { derivedAddressesSlice } from './derived-addresses-store';
import { mnemonicSlice } from './mnemonic-store';
import { multiSigSlice } from './multi-sig-store';

const isDev = true;

const rootReducer = combineReducers({
  mnemonic: mnemonicSlice.reducer,
  derivedAddresses: derivedAddressesSlice.reducer,
  derivationPath: derivationPathSlice.reducer,
  multiSig: multiSigSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: isDev,
  enhancers: isDev ? [applyMiddleware(logger)] : [],
});

export const storeActions = {
  calcMnemonic: mnemonicSlice.actions.calcMnemonic,
  calcDerivationPath: derivationPathSlice.actions.calcDerivationPath,
  addDerivedAddress: derivedAddressesSlice.actions.addDerivedAddress,
  resetDerivedAddress: derivedAddressesSlice.actions.resetDerivedAddress,
  calcMultiSig: multiSigSlice.actions.calcMultiSig,
  setMultiSigN: multiSigSlice.actions.setN,
  setMultiSigM: multiSigSlice.actions.setM,
  setMultiSigPk: multiSigSlice.actions.setPublicKey,
};

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;