import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Страница не найдена</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Извините, запрашиваемая страница не существует или была перемещена.
        </p>
        <Button 
          variant="primary"
          onClick={() => navigate('/')}
          leftIcon={<Home size={18} />}
        >
          На главную
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;