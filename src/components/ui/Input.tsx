import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  // Генерируем уникальный ID, если он не был предоставлен
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  // Стили для ширины
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Стили для поля ввода
  const inputStyles = `
    block rounded-md border-gray-300 shadow-sm 
    focus:border-blue-500 focus:ring-blue-500 
    ${error ? 'border-red-500' : 'border-gray-300'} 
    ${leftIcon ? 'pl-10' : ''} 
    ${rightIcon ? 'pr-10' : ''}
    ${widthStyles}
    ${className}
  `;
  
  return (
    <div className={`mb-4 ${widthStyles}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          className={inputStyles}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${inputId}-error`}>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p className="mt-1 text-sm text-gray-500" id={`${inputId}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;