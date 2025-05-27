import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Логотип и название */}
          <Link to="/" className="flex items-center space-x-2">
            <Trophy size={24} />
            <span className="font-bold text-xl">ТурнирПро</span>
          </Link>
          
          {/* Навигационные ссылки */}
          <nav>
            <ul className="flex space-x-6">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive 
                      ? "font-medium border-b-2 border-white py-5" 
                      : "hover:text-blue-100 transition-colors"
                  }
                  end
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/tournaments/new" 
                  className={({ isActive }) => 
                    isActive 
                      ? "font-medium border-b-2 border-white py-5" 
                      : "hover:text-blue-100 transition-colors"
                  }
                >
                  Создать турнир
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => 
                    isActive 
                      ? "font-medium border-b-2 border-white py-5" 
                      : "hover:text-blue-100 transition-colors"
                  }
                >
                  О проекте
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;