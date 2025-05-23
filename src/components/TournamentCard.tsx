import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Edit, Settings, Trash } from 'lucide-react';
import { Tournament } from '../types/tournament';
import { formatDate } from '../utils/dateUtils';
import Button from './Button';

interface TournamentCardProps {
  tournament: Tournament;
  onDelete: (id: string) => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, onDelete }) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="tournament-status-active">Активный</span>;
      case 'pending':
        return <span className="tournament-status-pending">Ожидание</span>;
      case 'completed':
        return <span className="tournament-status-completed">Завершен</span>;
      case 'cancelled':
        return <span className="tournament-status-cancelled">Отменен</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-medium">{tournament.name}</h3>
        {getStatusBadge(tournament.status)}
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar size={16} className="mr-2" />
          <span className="text-sm">{formatDate(tournament.startDate)}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Users size={16} className="mr-2" />
          <span className="text-sm">Участников: {tournament.participantsCount}</span>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <Button 
          variant="primary"
          onClick={() => navigate(`/tournaments/${tournament.id}`)}
        >
          Просмотр сетки
        </Button>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(`/tournaments/${tournament.id}/edit`)}
            title="Редактировать"
          >
            <Edit size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(`/tournaments/${tournament.id}/settings`)}
            title="Настройки"
          >
            <Settings size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(tournament.id)}
            title="Удалить"
          >
            <Trash size={16} className="text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;