import { Grid, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DisableTextField } from '../components/disable-text-filed';
import { PageLayout } from '../components/layout';
import { RootState, storeActions } from '../stores';

interface INumberTextFieldProps {
  value: number;
  onChange: (num: number) => void;
  title: string;
}

interface IFillSentenceProps {
  n: INumberTextFieldProps,
  m: INumberTextFieldProps,
}

interface IPublicKeyLists {
  publicKeys: string[];
  updateList: (index: number, value: string) => void;
}

interface IHexResultProps {
  redeemScript?: string;
  p2shAddress?: string;
}

const NumberTextField = (props: INumberTextFieldProps) => {
  const { title, value, onChange } = props;
  return (
    <TextField
      id={`${title}}-number`}
      label={title}
      type='number'
      size='small'
      InputLabelProps={{
        shrink: true,
      }}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
};

const FillSentence = (props: IFillSentenceProps) => {
  const { n, m } = props;
  return (
    <Grid container spacing={2}>
      <Grid item><p>Generate </p></Grid>
      <Grid item>
        <NumberTextField {...n} />
      </Grid>
      <Grid item><p>of </p></Grid>
      <Grid item>
        <NumberTextField {...m} />
      </Grid>
      <Grid item><p>multi-signature with a legacy P2SH transaction.</p></Grid>
    </Grid>
  );
};

const PublicKeyLists = (props: IPublicKeyLists) => {
  return (
    <Grid container rowGap={2}>
      {
        props.publicKeys.map((key, i) => (
          <Grid item xs={12}>
            <TextField
              required
              id={`public-key-${i}`}
              label={`Public Key ${i + 1}`}
              value={key}
              style={{ width: '100%' }}
              onChange={event => props.updateList(i, event.target.value)}
            />
          </Grid>
        ))
      }
    </Grid>
  );
};

const HexResult = (props: IHexResultProps) => {
  return (
    <Grid container rowGap={2}>
      <DisableTextField value={props.redeemScript} label="Pay-To-Script-Hash (P2SH)" rows={3} />
      <DisableTextField value={props.p2shAddress} label="Bitcoin Address" />
    </Grid>
  );
};

const MultiSig = () => {
  const { numOfApprove, numOfParticipant, publicKeys, p2shAddress, redeemScript } = useSelector((state: RootState) => state.multiSig);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeActions.calcMultiSig({ numOfApprove, numOfParticipant, publicKeys }));
  }, [dispatch, numOfApprove, numOfParticipant, publicKeys]);
  return (
    <PageLayout title='Multiple Signature'>
      <FillSentence
        n={{ value: numOfApprove, title:'Number Of Approve', onChange: num => dispatch(storeActions.setMultiSigN(num))}}
        m={{ value: numOfParticipant, title:'Number Of Participant', onChange: num => dispatch(storeActions.setMultiSigM(num))}}
      />
      <PublicKeyLists publicKeys={publicKeys} updateList={(index, value) => dispatch(storeActions.setMultiSigPk({index, value}))}/>
      <HexResult p2shAddress={p2shAddress} redeemScript={redeemScript} />
    </PageLayout>
  );
};

export default MultiSig;