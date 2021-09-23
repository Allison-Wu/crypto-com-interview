import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageLayout } from '../components/layout';
import { RootState, storeActions } from '../stores';
import { IDerivedAddress } from '../stores/derived-addresses-store';

const ADDRESS_TABLE_HEADER = ['Path', 'Address', 'Public Key', 'Private Key'];

const MAX_ROW_LENGTH = 500;
const ROWS_PER_PAGE_OPTIONS = [10, 25, 100];
const MAX_DISPLAY_ROW = ROWS_PER_PAGE_OPTIONS[ROWS_PER_PAGE_OPTIONS.length - 1];

interface IDispatchAddDaParams {
  size: number;
  derivationAddresses: IDerivedAddress[];
  bip32DerivationPath?: string;
  rootKey?: string;
  reset?: boolean
  dispatch: Dispatch<any>;
}

interface IAddressTableProps {
  derivationAddresses: IDerivedAddress[];
  rowsPerPage: number;
  addRows: (size:number) => void;
  setRowsPerPage: Dispatch<React.SetStateAction<number>>;
}

const dispatchAddDa = (params: IDispatchAddDaParams) => {
  const { size, derivationAddresses, bip32DerivationPath, rootKey, reset, dispatch } = params;
  let rowSize = size;
  if (reset) {
    dispatch(storeActions.resetDerivedAddress());
  } else {
    const currentSize = derivationAddresses.length;
    if (currentSize > MAX_ROW_LENGTH) return;
  
    if (currentSize + size > MAX_ROW_LENGTH) rowSize = MAX_ROW_LENGTH - currentSize;
  }

  dispatch(storeActions.addDerivedAddress({
    rootKey,
    bip32DerivationPath,
    size: rowSize,
  }));
};

const AddressTable = (props: IAddressTableProps) => {
  const [page, setPage] = useState(0);
  
  const { derivationAddresses: addresses, rowsPerPage, setRowsPerPage } = props;
  const displayRows = addresses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer style={{ width: '100%' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {ADDRESS_TABLE_HEADER.map((header) => (<TableCell key={header}>{header}</TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.path}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.publicKey}</TableCell>
                <TableCell>{row.privateKey}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        component='div'
        count={MAX_ROW_LENGTH}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => {
          props.addRows(MAX_DISPLAY_ROW);
          setPage(newPage);
        }}
        onRowsPerPageChange={event => {
          setRowsPerPage(+event.target.value);
          setPage(0);
          props.addRows(MAX_DISPLAY_ROW);
        }}
      />
    </Paper>
  );
};

const DerivationAddress = () => {
  const dispatch = useDispatch();
  const {
    mnemonic: mState, derivationPath: dpState, derivedAddresses: daState
  } = useSelector((state: RootState) => state);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);

  const addRows = (size: number, reset = false) => dispatchAddDa({
    dispatch,
    size,
    reset,
    derivationAddresses: daState.derivationAddresses,
    bip32DerivationPath: dpState.derivationPath,
    rootKey: mState.rootKey,
  });

  useEffect(() => {
    addRows(rowsPerPage, true);
  }, [dispatch, mState.rootKey, dpState.derivationPath]);

  return (
    <PageLayout title='Derived Addresses'>
      <AddressTable
        derivationAddresses={daState.derivationAddresses}
        rowsPerPage={rowsPerPage}
        addRows={addRows}
        setRowsPerPage={setRowsPerPage}
      />
    </PageLayout>
  );
};

export default DerivationAddress;