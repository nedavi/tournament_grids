export interface Match {
  id: string;
  participant1: string | null;
  participant2: string | null;
  score1: number | null;
  score2: number | null;
  nextMatchId?: string | null;
}

export interface Round {
  id: string;
  name: string;
  matches: Match[];
}

export interface Tournament {
  id: string;
  name: string;
  bracketType: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  maxParticipants: number;
  participantsCount: number;
  participants?: string[];
  rounds: Round[];
  rules?: string;
  createdAt: string;
  updatedAt: string;
}

// **Обновили**: добавили participants в форму
export interface TournamentFormData {
  name: string;
  bracketType: string;
  maxParticipants: number;
  startDate: string;
  rules?: string;
  participants: string[];
}
