import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthenticationProvider from './components/Context/Authentication';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  </React.StrictMode>
);

