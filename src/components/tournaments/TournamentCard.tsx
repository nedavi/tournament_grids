import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Flag, Edit, Settings, Trash2 } from 'lucide-react';
import { Tournament, TournamentStatus } from '../../types';
import Button from '../ui/Button';

interface TournamentCardProps {
  tournament: Tournament;
  onDelete: (id: string) => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, onDelete }) => {
  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  // Получение статуса турнира на русском
  const getStatusText = (status: TournamentStatus) => {
    switch (status) {
      case TournamentStatus.DRAFT:
        return 'Черновик';
      case TournamentStatus.REGISTRATION:
        return 'Регистрация';
      case TournamentStatus.IN_PROGRESS:
        return 'В процессе';
      case TournamentStatus.COMPLETED:
        return 'Завершен';
      default:
        return 'Неизвестно';
    }
  };
  
  // Получение цвета для статуса
  const getStatusColor = (status: TournamentStatus) => {
    switch (status) {
      case TournamentStatus.DRAFT:
        return 'bg-gray-200 text-gray-800';
      case TournamentStatus.REGISTRATION:
        return 'bg-blue-100 text-blue-800';
      case TournamentStatus.IN_PROGRESS:
        return 'bg-green-100 text-green-800';
      case TournamentStatus.COMPLETED:
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{tournament.name}</h2>
          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tournament.status)}`}>
            {getStatusText(tournament.status)}
          </span>
        </div>
        
        <div className="mt-4 space-y-2 text-gray-600">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-gray-500" />
            <span>Создан: {formatDate(tournament.createdAt)}</span>
          </div>
          
          <div className="flex items-center">
            <Users size={16} className="mr-2 text-gray-500" />
            <span>Участники: {tournament.participants.length} / {tournament.maxParticipants}</span>
          </div>
          
          <div className="flex items-center">
            <Flag size={16} className="mr-2 text-gray-500" />
            <span>Тип: {tournament.bracketType === 'SINGLE_ELIMINATION' ? 'Одиночная элиминация' : 
                  tournament.bracketType === 'DOUBLE_ELIMINATION' ? 'Двойная элиминация' : 'Круговая система'}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-t border-gray-100">
        <Link to={`/tournaments/${tournament.id}`}>
          <Button variant="primary" size="sm">
            Просмотр сетки
          </Button>
        </Link>
        
        <div className="flex space-x-2">
          <Link to={`/tournaments/${tournament.id}/edit`}>
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<Edit size={14} />}
              aria-label="Редактировать турнир"
            >
              Ред.
            </Button>
          </Link>
          
          <Link to={`/tournaments/${tournament.id}/settings`}>
            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<Settings size={14} />}
              aria-label="Настройки турнира"
            >
              Наст.
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Trash2 size={14} />}
            className="text-red-600 hover:bg-red-50"
            onClick={() => onDelete(tournament.id)}
            aria-label="Удалить турнир"
          >
            Удал.
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;