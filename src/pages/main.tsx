import { Box, Container, Grid, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import DerivationAddress from './derivation-address';
import DerivationPath from './derivation-path';
import Mnemonic from './mnemonic';
import MultiSig from './multi-sig';

const MnemonicInfo = () => (
  <Grid container rowGap={3}>
    <Mnemonic />
    <DerivationPath />
    <DerivationAddress />
  </Grid>
);

const Main = () => {
  const [value, setValue] = useState(0);
  return (
    <Container maxWidth='md'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered value={value} onChange={(event, value) => { setValue(value); }}>
          <Tab label="Mnemonic Generate" />
          <Tab label="Multiple signature address Generate" />
        </Tabs>
      </Box>
      {value === 0 && <MnemonicInfo />}
      {value === 1 && (<MultiSig />)}
    </Container>
  );
};

export default Main;