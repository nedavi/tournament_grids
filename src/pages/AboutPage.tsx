import React from 'react';
import { Github } from 'lucide-react';
import Button from '../components/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">О проекте</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Цели проекта</h2>
        <p className="mb-4">
          Наш проект "ТурнирПро" предназначен для упрощения организации и проведения турниров различных форматов. 
          От спортивных соревнований до киберспортивных турниров — наша платформа поможет вам:
        </p>
        
        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
          <li>Создавать турниры с различными типами сеток</li>
          <li>Отслеживать результаты матчей в реальном времени</li>
          <li>Автоматизировать процесс распределения участников</li>
          <li>Экспортировать данные для использования в других приложениях</li>
        </ul>
        
        <p>
          Это open-source проект, и мы приветствуем вклад сообщества в его развитие.
        </p>
      </div>
      
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Технологический стек</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Фронтенд:</h3>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>React + TypeScript</li>
              <li>React Router v6</li>
              <li>Tailwind CSS</li>
              <li>Lucide Icons</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-2">API и бэкенд:</h3>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Mock Service Worker (MSW)</li>
              <li>JSON Server</li>
              <li>RESTful API</li>
              <li>Node.js + Express (планируется)</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-2">Инструменты разработки:</h3>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>Vite</li>
            <li>ESLint</li>
            <li>Prettier</li>
            <li>Jest + React Testing Library</li>
            <li>Cypress</li>
          </ul>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Ресурсы и документация</h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-gray-100 p-2 rounded-full">
              <Github className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Репозиторий проекта</h3>
              <p className="text-gray-600 text-sm mb-2">
                Посетите наш GitHub репозиторий, чтобы посмотреть исходный код и внести свой вклад.
              </p>
              <Button variant="secondary" size="sm">
                Перейти на GitHub
              </Button>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-gray-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Документация API</h3>
              <p className="text-gray-600 text-sm mb-2">
                Подробная документация по всем эндпоинтам API и примеры использования.
              </p>
              <Button variant="secondary" size="sm">
                Документация API
              </Button>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-gray-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Руководство пользователя</h3>
              <p className="text-gray-600 text-sm mb-2">
                Инструкции по использованию платформы и лучшие практики организации турниров.
              </p>
              <Button variant="secondary" size="sm">
                Руководство пользователя
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;