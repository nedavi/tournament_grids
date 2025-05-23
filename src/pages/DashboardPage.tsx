import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import Button from '../components/Button';
import TournamentCard from '../components/TournamentCard';
import { Tournament } from '../types/tournament';
import { getAllTournaments, deleteTournament } from '../api/tournaments';
import { toast } from 'react-toastify';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const data = await getAllTournaments();
        setTournaments(data);
        setFilteredTournaments(data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        toast.error('Не удалось загрузить список турниров');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTournaments();
  }, []);
  
  useEffect(() => {
    let result = tournaments;
    
    // Применяем фильтр по поиску
    if (searchTerm) {
      result = result.filter(tournament => 
        tournament.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Применяем фильтр по статусу
    if (statusFilter !== 'all') {
      result = result.filter(tournament => tournament.status === statusFilter);
    }
    
    setFilteredTournaments(result);
  }, [searchTerm, statusFilter, tournaments]);
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот турнир?')) {
      try {
        await deleteTournament(id);
        setTournaments(prev => prev.filter(tournament => tournament.id !== id));
        toast.success('Турнир успешно удален');
      } catch (error) {
        console.error('Error deleting tournament:', error);
        toast.error('Не удалось удалить турнир');
      }
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Турниры</h1>
        <Button 
          variant="primary"
          onClick={() => navigate('/tournaments/new')}
          leftIcon={<Plus size={16} />}
        >
          Создать турнир
        </Button>
      </div>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Поиск турниров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full form-input"
            />
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 w-full form-input appearance-none"
            >
              <option value="all">Все статусы</option>
              <option value="pending">Ожидание</option>
              <option value="active">Активные</option>
              <option value="completed">Завершенные</option>
              <option value="cancelled">Отмененные</option>
            </select>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map(tournament => (
            <TournamentCard 
              key={tournament.id} 
              tournament={tournament} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            {tournaments.length === 0 ? 'Нет доступных турниров' : 'Турниры не найдены'}
          </h3>
          <p className="text-gray-500 mb-6">
            {tournaments.length === 0 
              ? 'Создайте ваш первый турнир, чтобы начать работу.' 
              : 'Попробуйте изменить параметры поиска или фильтрации.'}
          </p>
          {tournaments.length === 0 && (
            <Button 
              variant="primary"
              onClick={() => navigate('/tournaments/new')}
              leftIcon={<Plus size={16} />}
            >
              Создать турнир
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;