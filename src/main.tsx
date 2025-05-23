import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Initialize mock server in development mode
async function startMockServiceWorker() {
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    try {
      const { worker } = await import('./mocks/browser');
      // Ensure proper headers and response type
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
          options: {
            scope: '/'
          }
        }
      });
      console.log('[MSW] Mock Service Worker started successfully');
    } catch (error) {
      console.error('[MSW] Failed to start Mock Service Worker:', error);
    }
  }
}

// Start the mock service worker before rendering the app
startMockServiceWorker().then(() => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');
  
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}).catch(console.error);