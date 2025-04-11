import ReactDOM from 'react-dom/client';
import { AppProvider } from './app';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <AppProvider />
  </React.StrictMode>
);
