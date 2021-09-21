import { useDispatch, useSelector } from 'react-redux';
import { PageLayout } from '../components/layout';
import { RootState } from '../stores';

const DerivationPath = () => {
  const dispatch = useDispatch();
  const derivationPathState = useSelector((state: RootState) => state.derivationPath);
  return (
    <PageLayout title='Derivation Path --BIP44'>
    </PageLayout>
  );
};

export default DerivationPath;