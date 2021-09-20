import './App.css';
import { Provider } from 'react-redux';
import { store } from './stores';
import Main from './pages/main';

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;