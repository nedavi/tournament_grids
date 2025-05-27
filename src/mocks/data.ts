import { Tournament, BracketType, TournamentStatus, Match, Participant } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Функция для генерации структуры матчей одиночной элиминации
function createSingleEliminationMatches(tournamentId: string, participantCount: number): Match[] {
  // ... ваш код без изменений ...
}

// Демо-участники
const demoParticipants: Participant[] = [
  { id: 'participant_1', name: 'Команда A' },
  { id: 'participant_2', name: 'Команда B' },
  { id: 'participant_3', name: 'Команда C' },
  { id: 'participant_4', name: 'Команда D' },
  { id: 'participant_5', name: 'Команда E' },
  { id: 'participant_6', name: 'Команда F' },
  { id: 'participant_7', name: 'Команда G' },
  { id: 'participant_8', name: 'Команда H' },
];

// Наши первоначальные турниры
export const initialTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Чемпионат по футболу 2025',
    bracketType: BracketType.SINGLE_ELIMINATION,
    maxParticipants: 8,
    status: TournamentStatus.IN_PROGRESS,
    rules: 'Стандартные правила FIFA',
    createdAt: new Date(2025, 0, 15).toISOString(),
    participants: demoParticipants,
    matches: createSingleEliminationMatches('1', 8),
  },
  {
    id: '2',
    name: 'Киберспортивный турнир "Весна 2025"',
    bracketType: BracketType.DOUBLE_ELIMINATION,
    maxParticipants: 16,
    status: TournamentStatus.REGISTRATION,
    rules: 'Правила согласно регламенту ESL',
    createdAt: new Date(2025, 1, 20).toISOString(),
    participants: demoParticipants.slice(0, 4),
    matches: createSingleEliminationMatches('2', 4),
  },
  {
    id: '3',
    name: 'Шахматный турнир "Гроссмейстер"',
    bracketType: BracketType.ROUND_ROBIN,
    maxParticipants: 10,
    status: TournamentStatus.DRAFT,
    rules: 'Правила FIDE с контролем времени 10+5',
    createdAt: new Date(2025, 2, 5).toISOString(),
    participants: [],
    matches: [],
  },
];

// Текущий “state” наших турниров для MSW
export let tournaments: Tournament[] = [...initialTournaments];

// Функция сброса к исходному состоянию (если понадобится)
export function resetData(): void {
  tournaments = [...initialTournaments];
}
