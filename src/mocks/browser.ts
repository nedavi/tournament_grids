import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Setup Service Worker for MSW
export const worker = setupWorker(...handlers);