import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Button from './Button';
import { Match, Round, Tournament } from '../types/tournament';
import MatchCard from './MatchCard';

interface BracketGridProps {
  tournament: Tournament;
  onScoreUpdate?: (matchId: string, score1: number, score2: number) => void;
}

const BracketGrid: React.FC<BracketGridProps> = ({ tournament, onScoreUpdate }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const newPosition = scrollPosition - 300;
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(Math.max(0, newPosition));
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      const newPosition = scrollPosition + 300;
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Сетка турнира</h2>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleScrollLeft}
            leftIcon={<ChevronLeft size={16} />}
          >
            Назад
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleScrollRight}
            rightIcon={<ChevronRight size={16} />}
          >
            Вперед
          </Button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="bracket-container pb-4"
        style={{ overflowX: 'auto' }}
      >
        {tournament.rounds.map((round, roundIndex) => (
          <div key={round.id} className="bracket-round">
            <div className="text-center mb-4 sticky top-0 bg-gray-50 py-2">
              <h3 className="text-sm font-medium text-gray-600">
                {round.name}
              </h3>
            </div>
            
            <div className="flex flex-col justify-around h-full">
              {round.matches.map((match) => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  roundIndex={roundIndex}
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