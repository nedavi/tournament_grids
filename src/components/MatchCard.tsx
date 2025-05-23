import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { Match } from '../types/tournament';
import Button from './Button';

interface MatchCardProps {
  match: Match;
  roundIndex: number;
  onScoreUpdate?: (matchId: string, score1: number, score2: number) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, roundIndex, onScoreUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [score1, setScore1] = useState(match.score1?.toString() || '');
  const [score2, setScore2] = useState(match.score2?.toString() || '');

  const handleSaveScore = () => {
    if (onScoreUpdate) {
      onScoreUpdate(match.id, parseInt(score1) || 0, parseInt(score2) || 0);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setScore1(match.score1?.toString() || '');
    setScore2(match.score2?.toString() || '');
    setIsEditing(false);
  };

  // Определяем статус матча
  const getMatchStatus = () => {
    if (!match.participant1 || !match.participant2) return 'Ожидание участников';
    if (match.score1 !== null && match.score2 !== null) return 'Завершен';
    return 'Не начался';
  };

  // Определяем цвет для статуса
  const getStatusColor = () => {
    const status = getMatchStatus();
    if (status === 'Завершен') return 'text-green-600';
    if (status === 'Не начался') return 'text-blue-600';
    return 'text-gray-500';
  };

  return (
    <div 
      className={`bracket-match ${isEditing ? 'bracket-match-active' : ''}`}
      style={{ 
        marginTop: roundIndex > 0 ? `${Math.pow(2, roundIndex) * 16}px` : '0', 
        marginBottom: roundIndex > 0 ? `${Math.pow(2, roundIndex) * 16}px` : '8px' 
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className={`text-xs font-medium ${getStatusColor()}`}>
          {getMatchStatus()}
        </span>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-blue-600"
            title="Редактировать счет"
          >
            <Edit2 size={14} />
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">{match.participant1 || 'TBD'}</span>
          {!isEditing ? (
            <span className="font-bold">{match.score1 ?? '-'}</span>
          ) : (
            <input 
              type="number" 
              min="0"
              value={score1} 
              onChange={(e) => setScore1(e.target.value)}
              className="w-12 text-center border border-gray-300 rounded"
            />
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-medium">{match.participant2 || 'TBD'}</span>
          {!isEditing ? (
            <span className="font-bold">{match.score2 ?? '-'}</span>
          ) : (
            <input 
              type="number"
              min="0"
              value={score2} 
              onChange={(e) => setScore2(e.target.value)}
              className="w-12 text-center border border-gray-300 rounded"
            />
          )}
        </div>
      </div>
      
      {isEditing && (
        <div className="flex justify-end space-x-2 mt-3">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={handleCancelEdit}
            leftIcon={<X size={14} />}
          >
            Отмена
          </Button>
          <Button 
            size="sm" 
            variant="primary"
            onClick={handleSaveScore}
            leftIcon={<Check size={14} />}
          >
            Сохранить
          </Button>
        </div>
      )}
    </div>
  );
};

export default MatchCard;