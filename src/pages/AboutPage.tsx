// src/pages/AboutPage.tsx
import React from 'react';
import { Github } from 'lucide-react';
import Button from '../components/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">О проекте</h1>
      
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Цели проекта</h2>
        <p className="mb-4 text-gray-900">
          Наш проект "Мастер Турниров" предназначен для упрощения организации и проведения турниров различных форматов. 
          От спортивных соревнований до киберспортивных турниров — наша платформа поможет вам:
        </p>
        
        <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-900">
          <li>Создавать турниры с различными типами сеток</li>
          <li>Отслеживать результаты матчей в реальном времени</li>
          <li>Автоматизировать процесс распределения участников</li>
          <li>Экспортировать данные для использования в других приложениях</li>
        </ul>
        
        <p className="text-gray-900">
          Это open-source проект, и мы приветствуем вклад сообщества в его развитие.
        </p>
      </div>
      
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Технологический стек</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Фронтенд:</h3>
            <ul className="list-disc list-inside space-y-1 pl-4 text-gray-900">
              <li>React + TypeScript</li>
              <li>React Router v6</li>
              <li>Tailwind CSS</li>
              <li>Lucide Icons</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-2">API и бэкенд:</h3>
            <ul className="list-disc list-inside space-y-1 pl-4 text-gray-900">
              <li>Mock Service Worker (MSW)</li>
              <li>JSON Server</li>
              <li>RESTful API</li>
              <li>Node.js + Express (планируется)</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-2">Инструменты разработки:</h3>
          <ul className="list-disc list-inside space-y-1 pl-4 text-gray-900">
            <li>Vite</li>
            <li>ESLint</li>
            <li>Prettier</li>
            <li>Jest + React Testing Library</li>
            <li>Cypress</li>
          </ul>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Ресурсы</h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-gray-100 p-2 rounded-full">
              <Github className="h-6 w-6 text-gray-900" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Репозиторий проекта</h3>
              <p className="text-gray-700 text-sm mb-2">
                Посетите наш GitHub репозиторий, чтобы посмотреть исходный код и внести свой вклад.
              </p>
              <Button variant="secondary" size="sm">
                Перейти на GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
