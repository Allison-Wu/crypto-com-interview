import { Container, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, storeActions } from '../stores';

const wordsNumArray = [3,6,9,12,15,18,21,24];

interface INumOfWordsSelection {
  numOfWords: number;
  handleChange?: SelectInputProps<number>['onChange'];
}

interface IGridItem {
  label?: string;
  value?: string;
}

const NumOfWordsSelect = (props: INumOfWordsSelection) => {
  return (
    <Select
      labelId='num-of-words-selection'
      id='num-of-words-select'
      value={props.numOfWords}
      onChange={props.handleChange}
      size='small'
    >
      {wordsNumArray.map((num) => (
        <MenuItem key={num} value={num}>
          {num}
        </MenuItem>
      ))}
    </Select>
  );
};

const GridItem = (props: IGridItem) => (
  <Grid item xs={12}>
    <TextField
      disabled
      multiline
      rows={2}
      style={{ width: '100%' }}
      id='outlined-disabled'
      label={props.label}
      defaultValue=''
      value = {props.value || ''}
    />
  </Grid>
);

const Mnemonic = () => {
  const dispatch = useDispatch();
  const mnemonicState = useSelector((state: RootState) => state.mnemonic);
  return (
    <Container style={{ width: '100%' }}>
      <Typography variant='h4' component='div' gutterBottom>
        Mnemonic
      </Typography>
      <Typography>
        Generate a random mnemonic:
        <NumOfWordsSelect
          numOfWords={mnemonicState.numOfWords}
          handleChange={event => dispatch(
            storeActions.setMnemonic({ numOfWords: Number(event.target.value) })
          )}
        />
        words, or enter your own below.
      </Typography>
      <Grid container rowGap={2}>
        <GridItem label='BIP39 Mnemonic' value={mnemonicState.words} />
        <GridItem label='BIP39 Seed' value={mnemonicState.seed} />
        <GridItem label='BIP32 Root Key' value={mnemonicState.rootKey} />
      </Grid>
    </Container>
  );
};

export default Mnemonic;