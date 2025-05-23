import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { Tournament } from '../types/tournament';

interface TournamentFormProps {
  initialData?: Tournament;
  onSubmit: (data: Partial<Tournament>) => Promise<void>;
  isEditing?: boolean;
}

const bracketTypes = [
  { value: 'single-elimination', label: 'Олимпийская система (Single Elimination)' },
  { value: 'double-elimination', label: 'Двойное выбывание (Double Elimination)' },
  { value: 'round-robin', label: 'Круговая система (Round Robin)' },
  { value: 'swiss', label: 'Швейцарская система (Swiss)' },
];

const TournamentForm: React.FC<TournamentFormProps> = ({ 
  initialData, 
  onSubmit,
  isEditing = false
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Tournament>>(
    initialData || {
      name: '',
      bracketType: 'single-elimination',
      maxParticipants: 8,
      startDate: new Date().toISOString().split('T')[0],
      rules: '',
      status: 'pending'
    }
  );
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Название турнира обязательно';
    }
    
    if (!formData.maxParticipants || formData.maxParticipants < 2) {
      newErrors.maxParticipants = 'Минимум 2 участника';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Дата начала обязательна';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;
    
    if (name === 'maxParticipants') {
      parsedValue = parseInt(value) || 0;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Можно добавить отображение ошибки
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-semibold mb-6">
          {isEditing ? 'Редактирование турнира' : 'Создание нового турнира'}
        </h2>
        
        <Input
          label="Название турнира"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Например: Чемпионат по шахматам 2025"
          error={errors.name}
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Тип турнирной сетки"
            id="bracketType"
            name="bracketType"
            value={formData.bracketType}
            onChange={handleChange}
            options={bracketTypes}
          />
          
          <Input
            label="Максимальное количество участников"
            id="maxParticipants"
            name="maxParticipants"
            type="number"
            min="2"
            max="128"
            value={formData.maxParticipants?.toString()}
            onChange={handleChange}
            error={errors.maxParticipants}
            required
          />
        </div>
        
        <Input
          label="Дата начала"
          id="startDate"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          error={errors.startDate}
          required
        />
        
        <div className="mb-4">
          <label htmlFor="rules" className="block text-sm font-medium text-gray-700 mb-1">
            Правила турнира
          </label>
          <textarea
            id="rules"
            name="rules"
            rows={4}
            value={formData.rules}
            onChange={handleChange}
            placeholder="Опишите правила проведения турнира..."
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/')}
            leftIcon={<X size={16} />}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={<Check size={16} />}
          >
            {isEditing ? 'Сохранить изменения' : 'Создать турнир'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TournamentForm;