import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

export const AppProvider = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
