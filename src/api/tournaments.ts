import { Tournament, TournamentFormData } from '../types/tournament';

// Base API URL
const API_URL = import.meta.env.DEV
  ? '/api/tournaments'
  : '/api/tournaments';

/** Получить все турниры */
export const getAllTournaments = async (): Promise<Tournament[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
};

/** Получить турнир по ID */
export const getTournamentById = async (id: string): Promise<Tournament> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
};

/** Создать новый турнир */
export const createTournament = async (
  data: TournamentFormData
): Promise<Tournament> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
};

/**
 * Обновить произвольные поля турнира, включая статус, participants, rounds и т.д.
 * Принимает Partial<Tournament>.
 */
export const updateTournament = async (
  id: string,
  data: Partial<Tournament>
): Promise<Tournament> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
};

/** Обновить счёт конкретного матча в турнире */
export const updateMatchScore = async (
  tournamentId: string,
  matchId: string,
  score1: number,
  score2: number
): Promise<void> => {
  const tournament = await getTournamentById(tournamentId);
  const updatedRounds = tournament.rounds.map((r) => ({
    ...r,
    matches: r.matches.map((m) =>
      m.id === matchId ? { ...m, score1, score2 } : m
    ),
  }));
  await updateTournament(tournamentId, { rounds: updatedRounds });
};

/**
 * Автопереход победителя:
 * Обновляет participant1 или participant2 в указанном матче.
 */
export const updateMatchParticipant = async (
  tournamentId: string,
  matchId: string,
  side: 'participant1' | 'participant2',
  name: string
): Promise<void> => {
  const tournament = await getTournamentById(tournamentId);
  const updatedRounds = tournament.rounds.map((r) => ({
    ...r,
    matches: r.matches.map((m) =>
      m.id === matchId ? { ...m, [side]: name } : m
    ),
  }));
  await updateTournament(tournamentId, { rounds: updatedRounds });
};

/** Удалить турнир */
export const deleteTournament = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
};
