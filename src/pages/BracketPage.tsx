import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Settings } from 'lucide-react';
import Button from '../components/Button';
import BracketGrid from '../components/BracketGrid';
import { Tournament } from '../types/tournament';
import { getTournamentById, updateMatchScore } from '../api/tournaments';
import { toast } from 'react-toastify';

const BracketPage: React.FC = () => {
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
  
  const handleScoreUpdate = async (matchId: string, score1: number, score2: number) => {
    if (!id) return;
    
    try {
      await updateMatchScore(id, matchId, score1, score2);
      
      // Обновляем локальное состояние
      setTournament(prev => {
        if (!prev) return null;
        
        const updatedRounds = prev.rounds.map(round => {
          const updatedMatches = round.matches.map(match => {
            if (match.id === matchId) {
              return { ...match, score1, score2 };
            }
            return match;
          });
          
          return { ...round, matches: updatedMatches };
        });
        
        return { ...prev, rounds: updatedRounds };
      });
      
      toast.success('Счет матча обновлен');
    } catch (error) {
      console.error('Error updating match score:', error);
      toast.error('Не удалось обновить счет матча');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!tournament) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Турнир не найден</h2>
        <p className="text-gray-600 mb-6">Турнир с указанным ID не существует или был удален.</p>
        <Button 
          variant="primary"
          onClick={() => navigate('/')}
        >
          Вернуться на главную
        </Button>
      </div>
    );
  }
  
  const getTournamentStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'pending': return 'Ожидание';
      case 'completed': return 'Завершен';
      case 'cancelled': return 'Отменен';
      default: return status;
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
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">{tournament.name}</h1>
            <div className="flex items-center mt-2 space-x-2">
              <span className={`tournament-status-${tournament.status}`}>
                {getTournamentStatusText(tournament.status)}
              </span>
              <span className="text-sm text-gray-600">
                {tournament.participantsCount} из {tournament.maxParticipants} участников
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button 
              variant="secondary"
              onClick={() => navigate(`/tournaments/${id}/edit`)}
              leftIcon={<Edit size={16} />}
            >
              Редактировать
            </Button>
            <Button 
              variant="secondary"
              onClick={() => navigate(`/tournaments/${id}/settings`)}
              leftIcon={<Settings size={16} />}
            >
              Настройки
            </Button>
          </div>
        </div>
        
        {tournament.rules && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Правила турнира:</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">{tournament.rules}</p>
          </div>
        )}
      </div>
      
      <BracketGrid 
        tournament={tournament} 
        onScoreUpdate={handleScoreUpdate}
      />
    </div>
  );
};

export default BracketPage;