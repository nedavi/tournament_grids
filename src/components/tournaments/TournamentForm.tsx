import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TournamentFormData, BracketType, Tournament } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { ArrowLeft, Save } from 'lucide-react';

interface TournamentFormProps {
  initialData?: Tournament;
  onSubmit: (data: TournamentFormData) => Promise<void>;
  isEditing?: boolean;
}

const TournamentForm: React.FC<TournamentFormProps> = ({ 
  initialData, 
  onSubmit,
  isEditing = false
}) => {
  const navigate = useNavigate();
  
  // Состояние формы
  const [formData, setFormData] = useState<TournamentFormData>({
    name: initialData?.name || '',
    bracketType: initialData?.bracketType || BracketType.SINGLE_ELIMINATION,
    maxParticipants: initialData?.maxParticipants || 8,
    rules: initialData?.rules || '',
  });
  
  // Состояние ошибок формы
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Состояние загрузки
  const [isLoading, setIsLoading] = useState(false);
  
  // Обработка изменений полей формы
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Для числовых полей преобразуем строку в число
    if (name === 'maxParticipants') {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Очищаем ошибку для измененного поля
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Название турнира обязательно';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Название должно содержать не менее 3 символов';
    }
    
    if (formData.maxParticipants < 2) {
      newErrors.maxParticipants = 'Минимальное количество участников: 2';
    } else if (formData.maxParticipants > 128) {
      newErrors.maxParticipants = 'Максимальное количество участников: 128';
    } else if (!Number.isInteger(Math.log2(formData.maxParticipants)) && formData.bracketType === BracketType.SINGLE_ELIMINATION) {
      newErrors.maxParticipants = 'Для одиночной элиминации рекомендуется использовать степени двойки (2, 4, 8, 16, 32, 64, 128)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Обработка отправки формы
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      await onSubmit(formData);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при сохранении турнира:', error);
      setErrors({
        form: 'Произошла ошибка при сохранении. Пожалуйста, попробуйте еще раз.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Опции для типа сетки
  const bracketTypeOptions = [
    { value: BracketType.SINGLE_ELIMINATION, label: 'Одиночная элиминация' },
    { value: BracketType.DOUBLE_ELIMINATION, label: 'Двойная элиминация' },
    { value: BracketType.ROUND_ROBIN, label: 'Круговая система' },
  ];
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Редактирование турнира' : 'Создание нового турнира'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditing 
            ? 'Измените информацию о турнире и нажмите "Сохранить изменения"'
            : 'Заполните форму ниже для создания нового турнира'
          }
        </p>
      </div>
      
      {errors.form && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.form}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Input
          label="Название турнира"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          fullWidth
          required
          placeholder="Например: Чемпионат по футболу 2025"
        />
        
        <Select
          label="Тип турнирной сетки"
          name="bracketType"
          value={formData.bracketType}
          onChange={handleChange}
          options={bracketTypeOptions}
          helperText="Выберите подходящий тип сетки для вашего турнира"
          fullWidth
        />
        
        <Input
          label="Максимальное количество участников"
          name="maxParticipants"
          type="number"
          min={2}
          max={128}
          value={formData.maxParticipants.toString()}
          onChange={handleChange}
          error={errors.maxParticipants}
          helperText="Рекомендуется использовать степени двойки: 2, 4, 8, 16, 32, 64, 128"
          fullWidth
        />
        
        <Textarea
          label="Правила турнира"
          name="rules"
          value={formData.rules}
          onChange={handleChange}
          rows={5}
          placeholder="Опишите правила вашего турнира..."
          helperText="Укажите важную информацию о правилах, формате проведения и критериях оценки"
          fullWidth
        />
        
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
          
          <Button
            type="submit"
            isLoading={isLoading}
            rightIcon={<Save size={16} />}
          >
            {isEditing ? 'Сохранить изменения' : 'Создать турнир'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TournamentForm;