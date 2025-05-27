import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Настройка сервера для тестирования
export const server = setupServer(...handlers);

// Запуск сервера, если файл запущен напрямую
if (process.argv[1] === import.meta.url) {
  console.log('🔶 Mock API сервер запущен');
  server.listen({ onUnhandledRequest: 'bypass' });
}