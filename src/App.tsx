import './App.css';
import { Button } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './stores';

function App() {
  return (
    <Provider store={store}>
      <Button variant="contained" onClick={() => console.log('Hello World')} >Hello World</Button>
    </Provider>
  );
}

export default App;
