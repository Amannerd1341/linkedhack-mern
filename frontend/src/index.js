import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
// 1. Create root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 2. Render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 3. Performance monitoring (optional)


reportWebVitals(console.log);