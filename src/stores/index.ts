import {
  Action, applyMiddleware, combineReducers,
  configureStore, ThunkAction,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { derivationPathSlice } from './derivation-path-store';
import { derivedAddressesSlice } from './derived-addresses-store';
import { mnemonicSlice } from './mnemonic-store';

const isDev = true;

const rootReducer = combineReducers({
  mnemonic: mnemonicSlice.reducer,
  derivedAddresses: derivedAddressesSlice.reducer,
  derivationPath: derivationPathSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: isDev,
  enhancers: isDev ? [applyMiddleware(logger)] : [],
});

export const storeActions = {
  setMnemonic: mnemonicSlice.actions.setMnemonic,
};

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;