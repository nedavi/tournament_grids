import React, { useState } from 'react';
import { Match } from '../../types';
import { Edit, Check } from 'lucide-react';

interface MatchItemProps {
  match: Match;
  participant1: string;
  participant2: string;
  onUpdate?: (score1: number | null, score2: number | null) => void;
  isEditable?: boolean;
}

const MatchItem: React.FC<MatchItemProps> = ({
  match,
  participant1,
  participant2,
  onUpdate,
  isEditable = false
}) => {
  // Состояние для режима редактирования
  const [isEditing, setIsEditing] = useState(false);
  
  // Состояние для счета
  const [score1, setScore1] = useState<string>(match.score1 !== null ? match.score1.toString() : '');
  const [score2, setScore2] = useState<string>(match.score2 !== null ? match.score2.toString() : '');
  
  // Обработка изменения счета
  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>, setScore: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    // Разрешаем только цифры и пустую строку
    if (value === '' || /^\d+$/.test(value)) {
      setScore(value);
    }
  };
  
  // Обработка сохранения счета
  const handleSaveScore = () => {
    if (onUpdate) {
      onUpdate(
        score1 === '' ? null : parseInt(score1, 10),
        score2 === '' ? null : parseInt(score2, 10)
      );
    }
    setIsEditing(false);
  };
  
  // Определение победителя
  const getWinnerStyles = (isWinner: boolean) => {
    if (match.score1 === null || match.score2 === null) return '';
    return isWinner ? 'font-bold text-green-700 bg-green-50' : 'text-gray-500';
  };
  
  // Проверка, является ли участник 1 победителем
  const isParticipant1Winner = match.winnerId === match.participant1Id;
  
  // Проверка, является ли участник 2 победителем
  const isParticipant2Winner = match.winnerId === match.participant2Id;
  
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden w-60">
      {/* Заголовок матча */}
      <div className="px-3 py-1 bg-gray-50 text-xs text-gray-500 font-medium border-b border-gray-200 flex justify-between items-center">
        <span>Матч #{match.position}</span>
        {isEditable && !isEditing && (
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => setIsEditing(true)}
            aria-label="Редактировать счет"
          >
            <Edit size={14} />
          </button>
        )}
        {isEditable && isEditing && (
          <button
            className="text-green-600 hover:text-green-800"
            onClick={handleSaveScore}
            aria-label="Сохранить счет"
          >
            <Check size={14} />
          </button>
        )}
      </div>
      
      {/* Участник 1 */}
      <div className={`px-3 py-2 flex justify-between items-center border-b border-gray-100 ${getWinnerStyles(isParticipant1Winner)}`}>
        <span className="truncate flex-1">{participant1}</span>
        {isEditing ? (
          <input
            type="text"
            value={score1}
            onChange={(e) => handleScoreChange(e, setScore1)}
            className="w-10 text-center border rounded-md"
            aria-label="Счет участника 1"
          />
        ) : (
          <span className="font-mono">{match.score1 !== null ? match.score1 : '-'}</span>
        )}
      </div>
      
      {/* Участник 2 */}
      <div className={`px-3 py-2 flex justify-between items-center ${getWinnerStyles(isParticipant2Winner)}`}>
        <span className="truncate flex-1">{participant2}</span>
        {isEditing ? (
          <input
            type="text"
            value={score2}
            onChange={(e) => handleScoreChange(e, setScore2)}
            className="w-10 text-center border rounded-md"
            aria-label="Счет участника 2"
          />
        ) : (
          <span className="font-mono">{match.score2 !== null ? match.score2 : '-'}</span>
        )}
      </div>
    </div>
  );
};

export default MatchItem;