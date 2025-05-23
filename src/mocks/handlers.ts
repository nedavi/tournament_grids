import { http, HttpResponse, delay } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { Tournament, TournamentFormData } from '../types/tournament';

// Initial mock data for tournaments
let tournaments: Tournament[] = [
  {
    id: '1',
    name: 'Чемпионат по шахматам 2025',
    bracketType: 'single-elimination',
    status: 'active',
    startDate: '2025-06-15',
    maxParticipants: 16,
    participantsCount: 16,
    rounds: [
      {
        id: '1-r1',
        name: '1/8 финала',
        matches: [
          {
            id: '1-r1-m1',
            participant1: 'Иванов И.',
            participant2: 'Петров П.',
            score1: 1,
            score2: 0,
            nextMatchId: '1-r2-m1'
          },
          {
            id: '1-r1-m2',
            participant1: 'Сидоров С.',
            participant2: 'Смирнов С.',
            score1: 0,
            score2: 1,
            nextMatchId: '1-r2-m1'
          },
          {
            id: '1-r1-m3',
            participant1: 'Козлов К.',
            participant2: 'Новиков Н.',
            score1: 1,
            score2: 0,
            nextMatchId: '1-r2-m2'
          },
          {
            id: '1-r1-m4',
            participant1: 'Морозов М.',
            participant2: 'Волков В.',
            score1: 0,
            score2: 1,
            nextMatchId: '1-r2-m2'
          },
          {
            id: '1-r1-m5',
            participant1: 'Алексеев А.',
            participant2: 'Лебедев Л.',
            score1: 1,
            score2: 0,
            nextMatchId: '1-r2-m3'
          },
          {
            id: '1-r1-m6',
            participant1: 'Семенов С.',
            participant2: 'Егоров Е.',
            score1: 0,
            score2: 1,
            nextMatchId: '1-r2-m3'
          },
          {
            id: '1-r1-m7',
            participant1: 'Павлов П.',
            participant2: 'Козлов К.',
            score1: 1,
            score2: 0,
            nextMatchId: '1-r2-m4'
          },
          {
            id: '1-r1-m8',
            participant1: 'Степанов С.',
            participant2: 'Николаев Н.',
            score1: 0,
            score2: 1,
            nextMatchId: '1-r2-m4'
          }
        ]
      },
      {
        id: '1-r2',
        name: '1/4 финала',
        matches: [
          {
            id: '1-r2-m1',
            participant1: 'Иванов И.',
            participant2: 'Смирнов С.',
            score1: 1,
            score2: 0,
            nextMatchId: '1-r3-m1'
          },
          {
            id: '1-r2-m2',
            participant1: 'Козлов К.',
            participant2: 'Волков В.',
            score1: 0,
            score2: 1,
            nextMatchId: '1-r3-m1'
          },
          {
            id: '1-r2-m3',
            participant1: 'Алексеев А.',
            participant2: 'Егоров Е.',
            score1: null,
            score2: null,
            nextMatchId: '1-r3-m2'
          },
          {
            id: '1-r2-m4',
            participant1: 'Павлов П.',
            participant2: 'Николаев Н.',
            score1: null,
            score2: null,
            nextMatchId: '1-r3-m2'
          }
        ]
      },
      {
        id: '1-r3',
        name: '1/2 финала',
        matches: [
          {
            id: '1-r3-m1',
            participant1: 'Иванов И.',
            participant2: 'Волков В.',
            score1: null,
            score2: null,
            nextMatchId: '1-r4-m1'
          },
          {
            id: '1-r3-m2',
            participant1: null,
            participant2: null,
            score1: null,
            score2: null,
            nextMatchId: '1-r4-m1'
          }
        ]
      },
      {
        id: '1-r4',
        name: 'Финал',
        matches: [
          {
            id: '1-r4-m1',
            participant1: null,
            participant2: null,
            score1: null,
            score2: null
          }
        ]
      }
    ],
    rules: 'Турнир проводится по олимпийской системе. Каждый матч играется до первой победы.',
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-05-10T15:30:00Z'
  },
  {
    id: '2',
    name: 'Турнир по теннису "Весна 2025"',
    bracketType: 'single-elimination',
    status: 'pending',
    startDate: '2025-05-10',
    maxParticipants: 8,
    participantsCount: 6,
    rounds: [
      {
        id: '2-r1',
        name: '1/4 финала',
        matches: [
          {
            id: '2-r1-m1',
            participant1: 'Федоров Ф.',
            participant2: 'Зайцев З.',
            score1: null,
            score2: null,
            nextMatchId: '2-r2-m1'
          },
          {
            id: '2-r1-m2',
            participant1: 'Макаров М.',
            participant2: 'Андреев А.',
            score1: null,
            score2: null,
            nextMatchId: '2-r2-m1'
          },
          {
            id: '2-r1-m3',
            participant1: 'Тарасов Т.',
            participant2: 'Соколов С.',
            score1: null,
            score2: null,
            nextMatchId: '2-r2-m2'
          },
          {
            id: '2-r1-m4',
            participant1: 'Кузнецов К.',
            participant2: null,
            score1: null,
            score2: null,
            nextMatchId: '2-r2-m2'
          }
        ]
      },
      {
        id: '2-r2',
        name: '1/2 финала',
        matches: [
          {
            id: '2-r2-m1',
            participant1: null,
            participant2: null,
            score1: null,
            score2: null,
            nextMatchId: '2-r3-m1'
          },
          {
            id: '2-r2-m2',
            participant1: null,
            participant2: null,
            score1: null,
            score2: null,
            nextMatchId: '2-r3-m1'
          }
        ]
      },
      {
        id: '2-r3',
        name: 'Финал',
        matches: [
          {
            id: '2-r3-m1',
            participant1: null,
            participant2: null,
            score1: null,
            score2: null
          }
        ]
      }
    ],
    rules: 'Турнир проводится по олимпийской системе. Каждый матч играется до двух побед.',
    createdAt: '2024-04-15T09:30:00Z',
    updatedAt: '2024-04-20T11:45:00Z'
  },
  {
    id: '3',
    name: 'Кубок по футболу 2025',
    bracketType: 'double-elimination',
    status: 'completed',
    startDate: '2025-07-05',
    endDate: '2025-07-20',
    maxParticipants: 16,
    participantsCount: 16,
    rounds: [
      {
        id: '3-r1',
        name: '1/8 финала',
        matches: [
          {
            id: '3-r1-m1',
            participant1: 'Команда А',
            participant2: 'Команда Б',
            score1: 2,
            score2: 1,
            nextMatchId: '3-r2-m1'
          },
          {
            id: '3-r1-m2',
            participant1: 'Команда В',
            participant2: 'Команда Г',
            score1: 3,
            score2: 0,
            nextMatchId: '3-r2-m1'
          },
          {
            id: '3-r1-m3',
            participant1: 'Команда Д',
            participant2: 'Команда Е',
            score1: 1,
            score2: 1,
            nextMatchId: '3-r2-m2'
          },
          {
            id: '3-r1-m4',
            participant1: 'Команда Ж',
            participant2: 'Команда З',
            score1: 0,
            score2: 2,
            nextMatchId: '3-r2-m2'
          },
          {
            id: '3-r1-m5',
            participant1: 'Команда И',
            participant2: 'Команда К',
            score1: 4,
            score2: 2,
            nextMatchId: '3-r2-m3'
          },
          {
            id: '3-r1-m6',
            participant1: 'Команда Л',
            participant2: 'Команда М',
            score1: 1,
            score2: 2,
            nextMatchId: '3-r2-m3'
          },
          {
            id: '3-r1-m7',
            participant1: 'Команда Н',
            participant2: 'Команда О',
            score1: 3,
            score2: 3,
            nextMatchId: '3-r2-m4'
          },
          {
            id: '3-r1-m8',
            participant1: 'Команда П',
            participant2: 'Команда Р',
            score1: 2,
            score2: 0,
            nextMatchId: '3-r2-m4'
          }
        ]
      },
      {
        id: '3-r2',
        name: '1/4 финала',
        matches: [
          {
            id: '3-r2-m1',
            participant1: 'Команда А',
            participant2: 'Команда В',
            score1: 1,
            score2: 2,
            nextMatchId: '3-r3-m1'
          },
          {
            id: '3-r2-m2',
            participant1: 'Команда Д',
            participant2: 'Команда З',
            score1: 0,
            score2: 1,
            nextMatchId: '3-r3-m1'
          },
          {
            id: '3-r2-m3',
            participant1: 'Команда И',
            participant2: 'Команда М',
            score1: 3,
            score2: 1,
            nextMatchId: '3-r3-m2'
          },
          {
            id: '3-r2-m4',
            participant1: 'Команда Н',
            participant2: 'Команда П',
            score1: 2,
            score2: 2,
            nextMatchId: '3-r3-m2'
          }
        ]
      },
      {
        id: '3-r3',
        name: '1/2 финала',
        matches: [
          {
            id: '3-r3-m1',
            participant1: 'Команда В',
            participant2: 'Команда З',
            score1: 2,
            score2: 0,
            nextMatchId: '3-r4-m1'
          },
          {
            id: '3-r3-m2',
            participant1: 'Команда И',
            participant2: 'Команда Н',
            score1: 1,
            score2: 2,
            nextMatchId: '3-r4-m1'
          }
        ]
      },
      {
        id: '3-r4',
        name: 'Финал',
        matches: [
          {
            id: '3-r4-m1',
            participant1: 'Команда В',
            participant2: 'Команда Н',
            score1: 3,
            score2: 1
          }
        ]
      }
    ],
    rules: 'Турнир проводится по олимпийской системе. Если в основное время матч заканчивается вничью, назначается серия пенальти.',
    createdAt: '2024-03-10T08:15:00Z',
    updatedAt: '2024-03-25T14:20:00Z'
  }
];

// Utility function to create empty bracket
const createEmptyBracket = (bracketType: string, maxParticipants: number) => {
  const rounds = [];
  let matchesInFirstRound = maxParticipants / 2;
  let roundCount = Math.log2(maxParticipants);
  
  for (let i = 0; i < roundCount; i++) {
    const matchesInRound = matchesInFirstRound / Math.pow(2, i);
    const matches = [];
    const roundId = `new-r${i + 1}`;
    
    for (let j = 0; j < matchesInRound; j++) {
      const matchId = `${roundId}-m${j + 1}`;
      const nextRoundIndex = i + 1;
      const nextMatchIndex = Math.floor(j / 2) + 1;
      const nextMatchId = nextRoundIndex < roundCount ? `new-r${nextRoundIndex + 1}-m${nextMatchIndex}` : undefined;
      
      matches.push({
        id: matchId,
        participant1: null,
        participant2: null,
        score1: null,
        score2: null,
        nextMatchId
      });
    }
    
    let roundName = '';
    if (i === roundCount - 1) roundName = 'Финал';
    else if (i === roundCount - 2) roundName = '1/2 финала';
    else if (i === roundCount - 3) roundName = '1/4 финала';
    else if (i === roundCount - 4) roundName = '1/8 финала';
    else if (i === roundCount - 5) roundName = '1/16 финала';
    else roundName = `Раунд ${i + 1}`;
    
    rounds.push({
      id: roundId,
      name: roundName,
      matches
    });
  }
  
  return rounds;
};

// MSW request handlers with proper headers and response formatting
export const handlers = [
  // GET /api/tournaments - get all tournaments
  http.get('/api/tournaments', async () => {
    await delay(500);
    return HttpResponse.json(tournaments, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  
  // GET /api/tournaments/:id - get tournament by ID
  http.get('/api/tournaments/:id', async ({ params }) => {
    await delay(300);
    const { id } = params;
    const tournament = tournaments.find((t) => t.id === id);
    
    if (!tournament) {
      return new HttpResponse(null, { 
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return HttpResponse.json(tournament, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  
  // POST /api/tournaments - create new tournament
  http.post('/api/tournaments', async ({ request }) => {
    await delay(600);
    const data: TournamentFormData = await request.json();
    
    const newTournament: Tournament = {
      id: uuidv4(),
      name: data.name,
      bracketType: data.bracketType,
      status: 'pending',
      startDate: data.startDate,
      maxParticipants: data.maxParticipants,
      participantsCount: 0,
      rounds: createEmptyBracket(data.bracketType, data.maxParticipants),
      rules: data.rules || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    tournaments.push(newTournament);
    return HttpResponse.json(newTournament, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  
  // PUT /api/tournaments/:id - update tournament
  http.put('/api/tournaments/:id', async ({ params, request }) => {
    await delay(400);
    const { id } = params;
    const data = await request.json();
    
    const tournamentIndex = tournaments.findIndex((t) => t.id === id);
    
    if (tournamentIndex === -1) {
      return new HttpResponse(null, { 
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const updatedTournament = {
      ...tournaments[tournamentIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    tournaments[tournamentIndex] = updatedTournament;
    return HttpResponse.json(updatedTournament, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  
  // DELETE /api/tournaments/:id - delete tournament
  http.delete('/api/tournaments/:id', async ({ params }) => {
    await delay(400);
    const { id } = params;
    
    const tournamentIndex = tournaments.findIndex((t) => t.id === id);
    
    if (tournamentIndex === -1) {
      return new HttpResponse(null, { 
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    tournaments = tournaments.filter((t) => t.id !== id);
    return new HttpResponse(null, { 
      status: 204,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];