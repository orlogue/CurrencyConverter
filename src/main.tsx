import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import CurrencyProvider from "./context/CurrencyProvider.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <CurrencyProvider>
    <App />
  </CurrencyProvider>
);
