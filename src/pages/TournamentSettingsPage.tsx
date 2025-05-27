import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Clock, DownloadCloud } from 'lucide-react';
import Button from '../components/Button';
import ExportOptions from '../components/ExportOptions';
import { Tournament } from '../types/tournament';
import { getTournamentById, updateTournament } from '../api/tournaments';
import { toast } from 'react-toastify';

const TournamentSettingsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    enableTimer: false,
    enableNotifications: false,
    autoAdvance: false
  });

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

  const handleToggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    toast.success(`Настройка "${setting}" ${settings[setting] ? 'отключена' : 'включена'}`);
  };

  const handleStatusChange = async (status: string) => {
    if (!id || !tournament) return;
    try {
      await updateTournament(id, { status: status as Tournament['status'] });
      setTournament(prev => prev ? { ...prev, status: status as Tournament['status'] } : null);
      toast.success('Статус турнира обновлён');
    } catch (error) {
      console.error('Error updating tournament status:', error);
      toast.error('Не удалось обновить статус турнира');
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
        <p className="text-gray-600 mb-6">Турнир с указанным ID не существует или был удалён.</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Вернуться на главную
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(`/tournaments/${id}`)} leftIcon={<ArrowLeft size={16} />}>
          Назад к турниру
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Настройки турнира</h1>

      <div className="space-y-6">
        <ExportOptions tournament={tournament} />

        {/* Статус турнира */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold mb-4">Статус турнира</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant={tournament.status === 'pending' ? 'primary' : 'secondary'} onClick={() => handleStatusChange('pending')}>
              Ожидание
            </Button>
            <Button variant={tournament.status === 'active' ? 'primary' : 'secondary'} onClick={() => handleStatusChange('active')}>
              Активный
            </Button>
            <Button variant={tournament.status === 'completed' ? 'primary' : 'secondary'} onClick={() => handleStatusChange('completed')}>
              Завершён
            </Button>
            <Button variant={tournament.status === 'cancelled' ? 'primary' : 'secondary'} onClick={() => handleStatusChange('cancelled')}>
              Отменён
            </Button>
          </div>
        </div>

        {/* Дополнительные настройки */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Дополнительные настройки</h3>
          <div className="space-y-4">
            {/* Таймер матчей */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-3" />
                <span>Включить таймер матчей</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.enableTimer}
                  onChange={() => handleToggleSetting('enableTimer')}
                />
                <div
                  className="
                    relative w-11 h-6 bg-gray-200 rounded-full
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                    after:bg-white after:border-gray-300 after:border after:rounded-full
                    after:h-5 after:w-5 after:transition-all
                    peer-checked:bg-emerald-600 peer-checked:after:translate-x-full
                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white
                  "
                />
              </label>
            </div>

            {/* Уведомления */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-500 mr-3" />
                <span>Включить уведомления</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.enableNotifications}
                  onChange={() => handleToggleSetting('enableNotifications')}
                />
                <div
                  className="
                    relative w-11 h-6 bg-gray-200 rounded-full
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                    after:bg-white after:border-gray-300 after:border after:rounded-full
                    after:h-5 after:w-5 after:transition-all
                    peer-checked:bg-emerald-600 peer-checked:after:translate-x-full
                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white
                  "
                />
              </label>
            </div>

            {/* Автоматическое продвижение */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DownloadCloud className="h-5 w-5 text-gray-500 mr-3" />
                <span>Автоматическое продвижение победителей</span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.autoAdvance}
                  onChange={() => handleToggleSetting('autoAdvance')}
                />
                <div
                  className="
                    relative w-11 h-6 bg-gray-200 rounded-full
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                    after:bg-white after:border-gray-300 after:border after:rounded-full
                    after:h-5 after:w-5 after:transition-all
                    peer-checked:bg-emerald-600 peer-checked:after:translate-x-full
                    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white
                  "
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentSettingsPage;
