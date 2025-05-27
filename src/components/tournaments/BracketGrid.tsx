import React, { useMemo } from 'react';
import { Tournament, Match } from '../../types';
import MatchItem from './MatchItem';

interface BracketGridProps {
  tournament: Tournament;
  onMatchUpdate?: (matchId: string, score1: number | null, score2: number | null) => void;
  isEditable?: boolean;
}

const BracketGrid: React.FC<BracketGridProps> = ({ 
  tournament, 
  onMatchUpdate,
  isEditable = false
}) => {
  // Группируем матчи по раундам
  const matchesByRound = useMemo(() => {
    const result: Record<number, Match[]> = {};
    
    // Определяем максимальное количество раундов
    const maxRound = Math.max(...tournament.matches.map(match => match.round));
    
    // Инициализируем пустые массивы для каждого раунда
    for (let i = 1; i <= maxRound; i++) {
      result[i] = [];
    }
    
    // Заполняем матчи по раундам
    tournament.matches.forEach(match => {
      if (result[match.round]) {
        result[match.round].push(match);
      }
    });
    
    // Сортируем матчи внутри каждого раунда по позиции
    Object.keys(result).forEach(round => {
      result[Number(round)].sort((a, b) => a.position - b.position);
    });
    
    return result;
  }, [tournament.matches]);
  
  // Определяем максимальное количество раундов
  const maxRound = Object.keys(matchesByRound).length;
  
  // Определяем количество матчей в первом раунде для расчета высоты сетки
  const firstRoundMatchCount = matchesByRound[1]?.length || 0;
  
  // Вычисляем высоту одного матча (в пикселях)
  const matchHeight = 80;
  
  // Вычисляем размеры контейнера
  const gridHeight = Math.max(500, firstRoundMatchCount * matchHeight * 2);
  
  // Функция для получения имени участника по ID
  const getParticipantName = (participantId: string | null) => {
    if (!participantId) return 'TBD';
    const participant = tournament.participants.find(p => p.id === participantId);
    return participant?.name || 'Неизвестный участник';
  };
  
  return (
    <div className="overflow-x-auto pb-6">
      <div 
        className="relative" 
        style={{ 
          width: `${maxRound * 280}px`,
          minWidth: '100%',
          height: `${gridHeight}px`,
        }}
      >
        {/* Заголовки раундов */}
        <div className="flex absolute top-0 left-0 right-0 h-12">
          {Object.keys(matchesByRound).map((round, index) => (
            <div 
              key={`round-${round}`}
              className="flex-1 flex items-center justify-center font-medium text-gray-700 bg-gray-100 rounded-t-lg mx-2"
            >
              {parseInt(round) === maxRound ? 'Финал' : 
               parseInt(round) === maxRound - 1 ? 'Полуфинал' : 
               parseInt(round) === maxRound - 2 ? 'Четвертьфинал' : 
               `Раунд ${round}`}
            </div>
          ))}
        </div>
        
        {/* Сетка матчей */}
        <div className="flex absolute top-12 bottom-0 left-0 right-0">
          {Object.entries(matchesByRound).map(([round, matches], roundIndex) => {
            const currentRound = parseInt(round);
            const roundMatches = matches;
            
            // Рассчитываем расстояние между матчами для текущего раунда
            const matchSpacing = Math.pow(2, currentRound - 1) * matchHeight;
            
            return (
              <div 
                key={`round-${round}-matches`}
                className="flex-1 relative mx-2"
              >
                {/* Матчи текущего раунда */}
                {roundMatches.map((match, matchIndex) => {
                  // Рассчитываем позицию для каждого матча
                  const matchPosition = matchIndex * matchSpacing * 2 + matchSpacing;
                  
                  // Находим следующий матч (если есть)
                  const nextMatch = match.nextMatchId 
                    ? tournament.matches.find(m => m.id === match.nextMatchId) 
                    : null;
                  
                  // Рассчитываем позицию следующего матча (если есть)
                  const nextMatchIndex = nextMatch 
                    ? roundMatches.findIndex(m => m.id === nextMatch.id) 
                    : -1;
                  
                  const nextMatchPosition = nextMatchIndex >= 0 
                    ? nextMatchIndex * matchSpacing * 2 + matchSpacing 
                    : 0;
                  
                  return (
                    <React.Fragment key={match.id}>
                      <div 
                        className="absolute" 
                        style={{ 
                          top: `${matchPosition}px`,
                          left: '0', 
                          right: '0'
                        }}
                      >
                        <MatchItem 
                          match={match}
                          participant1={getParticipantName(match.participant1Id)}
                          participant2={getParticipantName(match.participant2Id)}
                          onUpdate={isEditable && onMatchUpdate ? 
                            (score1, score2) => onMatchUpdate(match.id, score1, score2) : 
                            undefined
                          }
                          isEditable={isEditable}
                        />
                      </div>
                      
                      {/* Линии соединения с следующим матчем */}
                      {match.nextMatchId && currentRound < maxRound && (
                        <svg 
                          className="absolute" 
                          style={{ 
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none'
                          }}
                        >
                          <path
                            d={`
                              M ${220} ${matchPosition + matchHeight / 2}
                              H ${260}
                              V ${nextMatchPosition + matchHeight / 2}
                              H ${280}
                            `}
                            fill="none"
                            stroke="#CBD5E1"
                            strokeWidth="2"
                          />
                        </svg>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BracketGrid;