import { Grid, MenuItem, Select } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { PageLayout } from '../components/layout';
import { DisableTextField } from '../components/disable-text-filed';
import { RootState, storeActions } from '../stores';

const WORDS_NUM_OPTIONS = [3,6,9,12,15,18,21,24];

interface INumOfWordsSelection {
  numOfWords: number;
  handleChange?: SelectInputProps<number>['onChange'];
}

const NumOfWordsSelection = (props: INumOfWordsSelection) => (
  <Select
    labelId='num-of-words-selection'
    id='num-of-words-select'
    value={props.numOfWords}
    onChange={props.handleChange} size='small'
  >
    {WORDS_NUM_OPTIONS.map((num) => (
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
          storeActions.calcMnemonic({ numOfWords: Number(event.target.value) })
        )}
      />
      <DisableTextField label='BIP39 Mnemonic' value={mnemonicState.words} />
      <DisableTextField label='BIP39 Seed' value={mnemonicState.seed} />
      <DisableTextField label='BIP32 Root Key' value={mnemonicState.rootKey} />
    </PageLayout>
  );
};

export default Mnemonic;