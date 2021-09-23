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
  dispatch: Dispatch<any>;
}

interface IAddressTableProps {
  derivationAddresses: IDerivedAddress[];
  defaultRowsPerPage: number;
  addRows: (size:number) => void;
}

const dispatchAddDa = (params: IDispatchAddDaParams) => {
  const { size, derivationAddresses, bip32DerivationPath, rootKey, dispatch } = params;
  const currentSize = derivationAddresses.length;
  if (currentSize > MAX_ROW_LENGTH) return;

  let rowSize = size;
  if (currentSize + size > MAX_ROW_LENGTH) rowSize = MAX_ROW_LENGTH - currentSize;
  dispatch(storeActions.addDerivedAddress({
    rootKey,
    bip32DerivationPath,
    size: rowSize,
  }));
};

const AddressTable = (props: IAddressTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(props.defaultRowsPerPage);
  
  const addresses = props.derivationAddresses;
  const displayRows = addresses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer style={{ width: '100%' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {ADDRESS_TABLE_HEADER.map((header) => (<TableCell>{header}</TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.path}</TableCell>
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
        onPageChange={(_, newPage) => {
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
  const defaultRowsPerPage = ROWS_PER_PAGE_OPTIONS[0];
  const dispatch = useDispatch();
  const {
    mnemonic: mState, derivationPath: dpState, derivedAddresses: daState
  } = useSelector((state: RootState) => state);

  const addRows = (size: number) => dispatchAddDa({
    dispatch,
    size,
    derivationAddresses: daState.derivationAddresses,
    bip32DerivationPath: dpState.derivationPath,
    rootKey: mState.rootKey,
  });

  useEffect(() => {
    addRows(defaultRowsPerPage);
  }, [dispatch, mState.rootKey, dpState.derivationPath]);

  return (
    <PageLayout title='Derived Addresses'>
      <AddressTable
        derivationAddresses={daState.derivationAddresses}
        defaultRowsPerPage={defaultRowsPerPage}
        addRows={addRows}
      />
    </PageLayout>
  );
};

export default DerivationAddress;