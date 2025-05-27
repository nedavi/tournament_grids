// src/pages/BracketPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Settings } from 'lucide-react';
import Button from '../components/Button';
import BracketGrid from '../components/BracketGrid';
import {
  getTournamentById,
  updateMatchScore,
  updateMatchParticipant,
} from '../api/tournaments';
import { Tournament } from '../types/tournament';
import { toast } from 'react-toastify';

const BracketPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getTournamentById(id)
      .then((data) => {
        if (data.participants && data.rounds.length > 0) {
          const first = data.rounds[0];
          const filled = first.matches.map((m, idx) => ({
            ...m,
            participant1: data.participants![idx * 2] || null,
            participant2: data.participants![idx * 2 + 1] || null,
          }));
          data.rounds[0] = { ...first, matches: filled };
        }
        setTournament(data);
      })
      .catch(() => toast.error('Не удалось загрузить турнир'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleScoreUpdate = async (
    matchId: string,
    score1: number,
    score2: number
  ) => {
    if (!id || !tournament) return;

    try {
      await updateMatchScore(id, matchId, score1, score2);

      const updated = { ...tournament };
      updated.rounds = updated.rounds.map((r) => ({
        ...r,
        matches: r.matches.map((m) =>
          m.id === matchId ? { ...m, score1, score2 } : m
        ),
      }));
      setTournament(updated);
      toast.success('Счёт обновлён');

      const parent = updated.rounds.find((r) =>
        r.matches.some((m) => m.id === matchId)
      )!;
      const thisMatch = parent.matches.find((m) => m.id === matchId)!;

      if (thisMatch.nextMatchId) {
        const winner =
          score1 > score2
            ? thisMatch.participant1!
            : thisMatch.participant2!;
        const allMatches = updated.rounds.flatMap((r) => r.matches);
        const next = allMatches.find(
          (m) => m.id === thisMatch.nextMatchId
        )!;
        const side = next.participant1 ? 'participant2' : 'participant1';

        await updateMatchParticipant(id, next.id, side, winner);

        setTournament((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            rounds: prev.rounds.map((r) => ({
              ...r,
              matches: r.matches.map((m) =>
                m.id === next.id
                  ? { ...m, [side]: winner }
                  : m
              ),
            })),
          };
        });

        toast.info(`Победитель ${winner} перешёл в следующий раунд`);
      }
    } catch {
      toast.error('Ошибка при сохранении');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin h-12 w-12 border-t-2 border-blue-500 rounded-full" />
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Турнир не найден</h2>
        <Button
          size="md"
          variant="primary"
          onClick={() => navigate('/')}
        >
          На главную
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* === Навигация === */}
      <Button
        className="mb-4"
        size="md"
        variant="ghost"
        onClick={() => navigate('/')}
        leftIcon={<ArrowLeft size={18} />}
      >
        Назад
      </Button>

      {/* === Заголовок === */}
      <h1 className="text-3xl font-bold mb-6">{tournament.name}</h1>

      {/* === Действия === */}
      <div className="flex space-x-4 mb-8">
        <Button
          size="md"
          variant="secondary"
          onClick={() => navigate(`/tournaments/${id}/edit`)}
          leftIcon={<Edit size={20} />}
        >
          Редактировать
        </Button>
        <Button
          size="md"
          variant="secondary"
          onClick={() => navigate(`/tournaments/${id}/settings`)}
          leftIcon={<Settings size={20} />}
        >
          Настройки
        </Button>
      </div>

      {/* === Сетка === */}
      <BracketGrid
        tournament={tournament}
        onScoreUpdate={handleScoreUpdate}
      />
    </div>
  );
};

export default BracketPage;
