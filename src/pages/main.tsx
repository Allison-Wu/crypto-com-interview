import { Container, Grid } from '@mui/material';
import DerivationAddress from './derivation-address';
import DerivationPath from './derivation-path';
import Mnemonic from './mnemonic';

const Main = () => {
  return (
    <Container maxWidth='md'>
      <Grid container rowGap={3}>
        <Mnemonic />
        <DerivationPath />
        <DerivationAddress />
      </Grid>
    </Container>
  );
};

export default Main;