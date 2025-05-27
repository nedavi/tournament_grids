import React from 'react';
import { Github as GitHub, Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">ТурнирПро</p>
            <p className="text-gray-400 text-sm">Организуйте турниры легко и профессионально</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors flex items-center"
              aria-label="GitHub репозиторий"
            >
              <GitHub className="mr-1" size={18} />
              <span>GitHub</span>
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors flex items-center"
              aria-label="Документация API"
            >
              <Code className="mr-1" size={18} />
              <span>API Docs</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm border-t border-gray-700 pt-6">
          <p>© {new Date().getFullYear()} ТурнирПро. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;