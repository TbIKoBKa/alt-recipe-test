import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './app/App';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { WagmiProvider } from './app/providers/WagmiProvider';
import './app/styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <WagmiProvider>
        <App />
        <ToastContainer position='top-center' />
      </WagmiProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
