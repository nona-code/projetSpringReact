import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.baseURL = '/';

// Pour éviter les problèmes de cache lors des suppressions (DELETE),
// on peut ajouter un header ou désactiver le cache pour les requêtes DELETE.
axios.interceptors.request.use(config => {
  if (config.method === 'delete') {
    config.headers['Cache-Control'] = 'no-cache';
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
