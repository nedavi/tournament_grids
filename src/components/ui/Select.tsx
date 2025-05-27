import React, { SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  helperText,
  error,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  // Генерируем уникальный ID, если он не был предоставлен
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  
  // Стили для ширины
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Стили для поля выбора
  const selectStyles = `
    block rounded-md border-gray-300 shadow-sm 
    focus:border-blue-500 focus:ring-blue-500 
    ${error ? 'border-red-500' : 'border-gray-300'} 
    ${widthStyles}
    ${className}
  `;
  
  return (
    <div className={`mb-4 ${widthStyles}`}>
      {label && (
        <label 
          htmlFor={selectId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <select
        id={selectId}
        className={selectStyles}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${selectId}-error`}>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p className="mt-1 text-sm text-gray-500" id={`${selectId}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;