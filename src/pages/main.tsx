import { Container, Grid } from '@mui/material';
import Mnemonic from './mnemonic';

function Main() {
  return (
    <Container maxWidth='md'>
      <Grid container rowGap={3}>
        <Mnemonic />
      </Grid>
    </Container>
  );
}

export default Main;