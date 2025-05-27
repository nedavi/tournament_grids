// Типы турнирной сетки
export enum BracketType {
  SINGLE_ELIMINATION = 'SINGLE_ELIMINATION',
  DOUBLE_ELIMINATION = 'DOUBLE_ELIMINATION',
  ROUND_ROBIN = 'ROUND_ROBIN',
}

// Статус турнира
export enum TournamentStatus {
  DRAFT = 'DRAFT',           // Черновик
  REGISTRATION = 'REGISTRATION', // Регистрация
  IN_PROGRESS = 'IN_PROGRESS',   // В процессе
  COMPLETED = 'COMPLETED',       // Завершен
}

// Типы для участников
export interface Participant {
  id: string;
  name: string;
}

// Типы для матчей
export interface Match {
  id: string;
  tournamentId: string;
  round: number;
  position: number;
  participant1Id: string | null;
  participant2Id: string | null;
  score1: number | null;
  score2: number | null;
  winnerId: string | null;
  nextMatchId: string | null;
}

// Типы для турниров
export interface Tournament {
  id: string;
  name: string;
  bracketType: BracketType;
  maxParticipants: number;
  status: TournamentStatus;
  rules: string;
  createdAt: string;
  participants: Participant[];
  matches: Match[];
}

// Тип для создания турнира
export interface TournamentFormData {
  name: string;
  bracketType: BracketType;
  maxParticipants: number;
  rules: string;
}