import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import { Tournament } from '../types/tournament';
import MatchCard from './MatchCard';

interface BracketGridProps {
  tournament: Tournament;
  onScoreUpdate?: (matchId: string, score1: number, score2: number) => void;
}

const BracketGrid: React.FC<BracketGridProps> = ({
  tournament,
  onScoreUpdate,
}) => {
  const [scrollPos, setScrollPos] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    if (!scrollRef.current) return;
    const next = scrollPos + delta;
    scrollRef.current.scrollTo({ left: next, behavior: 'smooth' });
    setScrollPos(next);
  };

  return (
    <div className="relative">
      {/* Заголовок сетки + стрелки */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Сетка турнира</h2>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => scrollBy(-300)}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => scrollBy(300)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* Сам контейнер раундов */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto pb-4"
      >
        {tournament.rounds.map((round, idx) => (
          <div key={round.id} className="min-w-[280px] px-4">
            <div className="sticky top-0 py-2 text-center bg-gray-50 z-10">
              <h3 className="font-medium">{round.name}</h3>
            </div>
            <div className="flex flex-col justify-around h-full">
              {round.matches.map((m) => (
                <MatchCard
                  key={m.id}
                  match={m}
                  roundIndex={idx}
                  onScoreUpdate={onScoreUpdate}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BracketGrid;
