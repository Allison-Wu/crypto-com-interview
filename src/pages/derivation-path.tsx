import { Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { PageLayout } from '../components/layout';
import { DisableTextField } from '../components/disable-text-filed';
import { RootState, storeActions } from '../stores';
import { IPathLevel } from '../stores/derivation-path-store';
import { useEffect } from 'react';

interface IPathLevelTextProps {
  label: string;
  value: number;
}

const PathLevelText = (props: IPathLevelTextProps) => (
  <Grid item xs={3}>
    <TextField
      disabled
      id={`path-level-${props.label}`}
      label={props.label}
      value = {props.value}
    />
  </Grid>
);

const PathLevel = (props: IPathLevel) => {
  return (
    <Grid container>
      <PathLevelText label='Purpose' value={props.purpose} />
      <PathLevelText label='Coin' value={props.coin} />
      <PathLevelText label='Account' value={props.account} />
      <PathLevelText label='External / Internal' value={props.change} />
    </Grid>);
};


const DerivationPath = () => {
  const dpState = useSelector((state: RootState) => state.derivationPath);
  const mnemonicState = useSelector((state: RootState) => state.mnemonic);
  const dispatch = useDispatch();
  useEffect(() => {
    if (mnemonicState.rootKey) {
      dispatch(storeActions.calcDerivationPath(mnemonicState.rootKey));
    }
  }, [dispatch, mnemonicState.rootKey]);

  return (
    <PageLayout title='Derivation Path --BIP44'>
      <PathLevel
        purpose={dpState.purpose}
        account={dpState.account}
        change={dpState.change}
        coin={dpState.coin}
      />
      <DisableTextField label='Account Extended Private Key' value={dpState.accountPrivateKey} />
      <DisableTextField label='Account Extended Public Key' value={dpState.accountPublicKey} />
      <DisableTextField label='BIP32 Derivation Path' value={dpState.derivationPath} rows={1} />
      <DisableTextField label='BIP32 Extended Private Key' value={dpState.bip32PrivateKey} />
      <DisableTextField label='BIP32 Extended Public Key' value={dpState.bip32PublicKey} />
    </PageLayout>
  );
};

export default DerivationPath;