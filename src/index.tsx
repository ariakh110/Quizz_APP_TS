import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'jotai';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

