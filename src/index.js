import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Si tienes un archivo de estilos
import App from './App';  // El componente principal de tu aplicación

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);