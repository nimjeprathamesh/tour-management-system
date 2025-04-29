import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { TourContextProvider } from './context/tourContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TourContextProvider>
      <App />
    </TourContextProvider>
  </StrictMode>,
)
