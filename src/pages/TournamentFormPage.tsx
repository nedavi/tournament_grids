import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import TournamentForm from '../components/TournamentForm';
import { TournamentFormData } from '../types/tournament';
import { createTournament } from '../api/tournaments';
import { toast } from 'react-toastify';

const TournamentFormPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (data: TournamentFormData) => {
    try {
      await createTournament(data);
      toast.success('Турнир успешно создан');
      navigate('/');
    } catch (error) {
      console.error('Error creating tournament:', error);
      toast.error('Не удалось создать турнир');
      throw error;
    }
  };
  
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
      
      <TournamentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default TournamentFormPage;