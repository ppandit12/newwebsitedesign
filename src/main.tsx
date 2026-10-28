import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@fontsource-variable/manrope';
import '@fontsource-variable/inter';
import './styles/index.css';
import { App } from './App';
import { captureAttribution } from './lib/attribution';

captureAttribution();

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Public pages are prerendered at build time; hydrate them. In dev the root is empty.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
