import { Button, Grid, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { PageLayout } from '../components/layout';
import { DisableTextField } from '../components/disable-text-filed';
import { RootState, storeActions } from '../stores';

const WORDS_NUM_OPTIONS = [3,6,9,12,15,18,21,24];

interface INumOfWordsSelection {
  numOfWords: number;
  handleChange: (value: number) => void;
}

const NumOfWordsSelection = (props: INumOfWordsSelection) => (
  <Select
    labelId='num-of-words-selection'
    id='num-of-words-select'
    value={props.numOfWords}
    onChange={event => props.handleChange(Number(event.target.value))}
    size='small'
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
      <Grid item>
        <Button variant="contained" onClick={() => props.handleChange(props.numOfWords)}>Generate</Button>
      </Grid>
      <Grid item><p> a random mnemonic:</p></Grid>
      <Grid item>
        <NumOfWordsSelection numOfWords={props.numOfWords} handleChange={props.handleChange} />
      </Grid>
      <Grid item><p>words.</p></Grid>
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
        handleChange={value => dispatch(storeActions.calcMnemonic({ numOfWords: value }))}
      />
      <DisableTextField label='BIP39 Mnemonic' value={mnemonicState.words} />
      <DisableTextField label='BIP39 Seed' value={mnemonicState.seed} />
      <DisableTextField label='BIP32 Root Key' value={mnemonicState.rootKey} />
    </PageLayout>
  );
};

export default Mnemonic;