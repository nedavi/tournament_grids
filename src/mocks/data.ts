import { Tournament, BracketType, TournamentStatus, Match, Participant } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Функция для создания структуры матчей одиночной элиминации
function createSingleEliminationMatches(tournamentId: string, participantCount: number): Match[] {
  const matches: Match[] = [];
  
  // Рассчитываем количество раундов, необходимых для турнира
  const roundCount = Math.ceil(Math.log2(participantCount));
  
  // Общее количество матчей в турнире
  const totalMatches = 2 ** roundCount - 1;
  
  // Создаем все матчи, начиная с финала и двигаясь к первому раунду
  for (let matchIndex = 0; matchIndex < totalMatches; matchIndex++) {
    // Рассчитываем раунд и позицию для текущего матча
    const round = Math.floor(Math.log2(matchIndex + 1)) + 1;
    const position = (matchIndex + 1) - (2 ** (round - 1) - 1);
    
    // Определяем следующий матч, в который попадет победитель
    let nextMatchId: string | null = null;
    if (matchIndex > 0) { // Не финальный матч
      const nextMatchIndex = Math.floor((matchIndex - 1) / 2);
      nextMatchId = `${tournamentId}_match_${nextMatchIndex}`;
    }
    
    // Создаем матч
    const match: Match = {
      id: `${tournamentId}_match_${matchIndex}`,
      tournamentId,
      round: roundCount - round + 1, // Инвертируем нумерацию раундов
      position,
      participant1Id: null,
      participant2Id: null,
      score1: null,
      score2: null,
      winnerId: null,
      nextMatchId,
    };
    
    matches.push(match);
  }
  
  // Добавляем участников в матчи первого раунда
  const firstRoundMatches = matches.filter(m => m.round === 1);
  const participantIds = Array.from({ length: participantCount }, (_, i) => `participant_${i + 1}`);
  
  // Распределяем участников по матчам первого раунда
  for (let i = 0; i < firstRoundMatches.length; i++) {
    const match = firstRoundMatches[i];
    match.participant1Id = i * 2 < participantIds.length ? participantIds[i * 2] : null;
    match.participant2Id = i * 2 + 1 < participantIds.length ? participantIds[i * 2 + 1] : null;
  }
  
  return matches;
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

// Генерируем демо-турниры
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
    matches: createSingleEliminationMatches('1', 8)
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
    matches: []
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
    matches: []
  }
];

// Имитация базы данных
export let tournaments: Tournament[] = [...initialTournaments];

// Функция для сброса данных к исходному состоянию (для тестирования)
export function resetData(): void {
  tournaments = [...initialTournaments];
}

export { tournaments }