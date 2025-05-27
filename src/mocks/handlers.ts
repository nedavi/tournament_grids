// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { TournamentFormData } from '../types/tournament';
// Подтягиваем ваши демо-данные (в data.json должен быть массив "tournaments")
import rawData from './data.json';

/** 
 * Начальные турниры берём из data.json, 
 * туда же будут попадать новые по POST
 */
let tournaments = [...rawData.tournaments] as typeof rawData.tournaments;

/** Фабрика: строит пустую сетку single-elimination */
function createEmptyBracket(bracketType: string, maxParticipants: number) {
  const rounds: Array<{ id: string; name: string; matches: any[] }> = [];
  const roundCount = Math.ceil(Math.log2(maxParticipants));
  let matchesInThisRound = maxParticipants / 2;

  for (let r = 1; r <= roundCount; r++) {
    const matches = [];
    for (let m = 1; m <= matchesInThisRound; m++) {
      const nextMatchId =
        r < roundCount ? `${r + 1}-m${Math.floor((m - 1) / 2) + 1}` : undefined;
      matches.push({
        id: `${r}-m${m}`,
        participant1: null,
        participant2: null,
        score1: null,
        score2: null,
        nextMatchId,
      });
    }
    rounds.push({
      id: `${r}`,
      name: r === roundCount
        ? 'Финал'
        : r === roundCount - 1
        ? 'Полуфинал'
        : `Раунд ${r}`,
      matches,
    });
    matchesInThisRound = matchesInThisRound / 2;
  }

  return rounds;
}

export const handlers = [
  // GET /api/tournaments — возвращаем весь массив
  http.get('/api/tournaments', async () => {
    await delay(500);
    return HttpResponse.json(tournaments, {
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // GET /api/tournaments/:id — ищем по id
  http.get('/api/tournaments/:id', async ({ params }) => {
    await delay(300);
    const t = tournaments.find((t) => t.id === params.id);
    if (!t) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(t, {
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // POST /api/tournaments — создаём новый турнир вместе с сеткой
  http.post('/api/tournaments', async ({ request }) => {
    await delay(600);
    const dataIn: TournamentFormData = await request.json();
    const newTournament = {
      id: uuidv4(),
      name: dataIn.name,
      bracketType: dataIn.bracketType,
      status: 'pending' as const,
      startDate: dataIn.startDate,
      maxParticipants: dataIn.maxParticipants,
      participants: dataIn.participants,
      participantsCount: dataIn.participants.length,
      rounds: createEmptyBracket(dataIn.bracketType, dataIn.maxParticipants),
      rules: dataIn.rules || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tournaments.push(newTournament);
    return HttpResponse.json(newTournament, {
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // PUT /api/tournaments/:id — обновляем всё сразу
  http.put('/api/tournaments/:id', async ({ params, request }) => {
    await delay(400);
    const data = await request.json();
    const idx = tournaments.findIndex((t) => t.id === params.id);
    if (idx === -1) return new HttpResponse(null, { status: 404 });
    const updated = {
      ...tournaments[idx],
      ...data,
      ...(data.participants && {
        participantsCount: (data as any).participants.length,
      }),
      updatedAt: new Date().toISOString(),
    };
    tournaments[idx] = updated;
    return HttpResponse.json(updated, {
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // PATCH /api/tournaments/:id — частичное обновление
  http.patch('/api/tournaments/:id', async ({ params, request }) => {
    await delay(200);
    const data = await request.json();
    const idx = tournaments.findIndex((t) => t.id === params.id);
    if (idx === -1) return new HttpResponse(null, { status: 404 });
    const patched = {
      ...tournaments[idx],
      ...data,
      ...(data.participants && {
        participantsCount: (data as any).participants.length,
      }),
      updatedAt: new Date().toISOString(),
    };
    tournaments[idx] = patched;
    return HttpResponse.json(patched, {
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // DELETE /api/tournaments/:id
  http.delete('/api/tournaments/:id', async ({ params }) => {
    await delay(400);
    tournaments = tournaments.filter((t) => t.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];
