import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import TournamentForm from '../components/TournamentForm';
import { Tournament } from '../types/tournament';
import { getTournamentById } from '../api/tournaments';
import { toast } from 'react-toastify';

const TournamentEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTournament = async () => {
      if (!id) return;
      try {
        const data = await getTournamentById(id);
        setTournament(data);
      } catch (error) {
        console.error('Error fetching tournament:', error);
        toast.error('Не удалось загрузить данные турнира');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTournament();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Турнир не найден</h2>
        <p className="text-gray-600 mb-6">
          Турнир с указанным ID не существует или был удалён.
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Вернуться на главную
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/tournaments/${id}`)}
          leftIcon={<ArrowLeft size={16} />}
        >
          Назад к турниру
        </Button>
      </div>

      {/* Передаём initialData и флаг isEditing */}
      <TournamentForm initialData={tournament} isEditing />
    </div>
  );
};

export default TournamentEditPage;
