import { Grid, MenuItem, Select, TextField } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { PageLayout } from '../components/layout';
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

const DisableTextField = (props: IGridItem) => (
  <Grid item xs={12}>
    <TextField
      disabled
      multiline
      rows={2}
      style={{ width: '100%' }}
      id='outlined-disabled'
      label={props.label}
      value = {props.value || ''}
    />
  </Grid>
);

const NumOfWordsSelection = (props: INumOfWordsSelection) => (
  <Select
    labelId='num-of-words-selection'
    id='num-of-words-select'
    value={props.numOfWords}
    onChange={props.handleChange} size='small'
  >
    {wordsNumArray.map((num) => (
      <MenuItem key={num} value={num}>
        {num}
      </MenuItem>
    ))}
  </Select>
);

const SelectSentence = (props: INumOfWordsSelection) => {
  return (
    <Grid container spacing={2}>
      <Grid item><p>Generate a random mnemonic:</p></Grid>
      <Grid item><NumOfWordsSelection numOfWords={props.numOfWords} handleChange={props.handleChange} /></Grid>
      <Grid item><p>words, or enter your own below.</p></Grid>
    </Grid>
  );
};

const Mnemonic = () => {
  const dispatch = useDispatch();
  const mnemonicState = useSelector((state: RootState) => state.mnemonic);
  return (
    <PageLayout title='Mnemonic'>
      <SelectSentence
        numOfWords={mnemonicState.numOfWords}
        handleChange={event => dispatch(
          storeActions.setMnemonic({ numOfWords: Number(event.target.value) })
        )}
      />
      <DisableTextField label='BIP39 Mnemonic' value={mnemonicState.words} />
      <DisableTextField label='BIP39 Seed' value={mnemonicState.seed} />
      <DisableTextField label='BIP32 Root Key' value={mnemonicState.rootKey} />
    </PageLayout>
  );
};

export default Mnemonic;