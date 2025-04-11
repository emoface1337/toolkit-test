import ReactDOM from 'react-dom/client';
import { AppProvider } from './app';
import './index.scss';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <AppProvider />
  </StrictMode>
);
