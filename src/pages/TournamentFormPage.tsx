import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import TournamentForm from '../components/TournamentForm';

const TournamentFormPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          leftIcon={<ArrowLeft size={16} />}
        >
          Назад к списку
        </Button>
      </div>

      {/* Сам компонент формы создаёт или обновляет турнир */}
      <TournamentForm />
    </div>
  );
};

export default TournamentFormPage;
