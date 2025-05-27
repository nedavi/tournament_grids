import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  error,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  // Генерируем уникальный ID, если он не был предоставлен
  const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
  
  // Стили для ширины
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Стили для поля ввода
  const textareaStyles = `
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
          htmlFor={textareaId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        className={textareaStyles}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${textareaId}-error`}>
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p className="mt-1 text-sm text-gray-500" id={`${textareaId}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Textarea;