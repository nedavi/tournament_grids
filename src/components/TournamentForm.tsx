// src/components/TournamentForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { Tournament, TournamentFormData } from '../types/tournament';
import { createTournament, updateTournament } from '../api/tournaments';
import { toast } from 'react-toastify';

interface TournamentFormProps {
  initialData?: Tournament;
  isEditing?: boolean;
}

const bracketTypes = [
  { value: 'single-elimination', label: 'Single Elimination' },
  { value: 'double-elimination', label: 'Double Elimination' },
  { value: 'round-robin', label: 'Round Robin' },
  { value: 'swiss', label: 'Swiss' },
];

const TournamentForm: React.FC<TournamentFormProps> = ({
  initialData,
  isEditing = false,
}) => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>(initialData?.name || '');
  const [bracketType, setBracketType] = useState<string>(
    initialData?.bracketType || 'single-elimination'
  );
  const [maxParticipants, setMaxParticipants] = useState<number>(
    initialData?.maxParticipants || 8
  );
  const [startDate, setStartDate] = useState<string>(
    initialData?.startDate ||
      new Date().toISOString().split('T')[0]
  );
  const [rules, setRules] = useState<string>(initialData?.rules || '');

  // Массив участников
  const [participants, setParticipants] = useState<string[]>(
    initialData?.participants || Array<string>(maxParticipants).fill('')
  );

  // Когда меняется maxParticipants, подгоняем длину массива участников
  useEffect(() => {
    setParticipants((prev) => {
      if (maxParticipants > prev.length) {
        return [...prev, ...Array<string>(maxParticipants - prev.length).fill('')];
      } else {
        return prev.slice(0, maxParticipants);
      }
    });
  }, [maxParticipants]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Введите название турнира');
      return;
    }

    const payload: TournamentFormData = {
      name,
      bracketType,
      maxParticipants,
      startDate,
      rules,
      participants,
    };

    try {
      if (isEditing && initialData) {
        await updateTournament(initialData.id, payload);
        toast.success('Турнир обновлён');
        navigate(`/tournaments/${initialData.id}`);
      } else {
        const newT = await createTournament(payload);
        toast.success('Турнир создан');
        navigate(`/tournaments/${newT.id}`);
      }
    } catch (error) {
      toast.error('Ошибка при сохранении турнира');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* Название */}
      <Input
        label="Название турнира"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Тип сетки */}
      <Select
        label="Тип сетки"
        value={bracketType}
        options={bracketTypes}
        onChange={(e) => setBracketType(e.target.value)}
      />

      {/* Максимум участников */}
      <Input
        label="Максимум участников"
        type="number"
        min={2}
        value={maxParticipants.toString()}
        onChange={(e) => setMaxParticipants(parseInt(e.target.value, 10) || 2)}
        required
      />

      {/* Дата начала */}
      <Input
        label="Дата начала"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      {/* Правила */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Правила турнира
        </label>
        <textarea
          className="block w-full px-3 py-2 border border-gray-300 rounded"
          rows={4}
          value={rules}
          onChange={(e) => setRules(e.target.value)}
        />
      </div>

      {/* Список участников */}
      <div>
        <h3 className="text-lg font-medium mb-2">Участники</h3>
        <div className="space-y-2">
          {participants.map((p, idx) => (
            <Input
              key={idx}
              placeholder={`Участник ${idx + 1}`}
              value={p}
              onChange={(e) => {
                const copy = [...participants];
                copy[idx] = e.target.value;
                setParticipants(copy);
              }}
              required
            />
          ))}
        </div>
      </div>

      {/* Кнопки */}
      <div className="flex justify-end space-x-4">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          leftIcon={<X size={16} />}
        >
          Отмена
        </Button>
        <Button type="submit" variant="primary" leftIcon={<Check size={16} />}>
          {isEditing ? 'Сохранить' : 'Создать'}
        </Button>
      </div>
    </form>
  );
};

export default TournamentForm;
