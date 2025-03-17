// src/components/ui/Input/index.jsx
import React from 'react';

const Input = ({ 
  label, 
  name,
  type = 'text', 
  placeholder = '', 
  value, 
  onChange, 
  error,
  helperText,
  className = '',
  inputClassName = '',
  required = false,
  disabled = false,
  icon,
  ...props 
}) => {
  // ID único para o input
  const id = `input-${name}`;
  
  // Classe base para o container
  const containerClasses = `mb-4 ${className}`;
  
  // Classe base para todos os inputs
  const baseInputClasses = 'w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200';
  
  // Classes adicionais baseadas no erro ou desabilitado
  const stateInputClasses = error
    ? 'border-danger-500 focus:ring-danger-500 bg-danger-50'
    : disabled
    ? 'bg-neutral-100 cursor-not-allowed opacity-60'
    : '';
  
  // Combinar todas as classes do input
  const combinedInputClassName = `${baseInputClasses} ${stateInputClasses} ${inputClassName}`;

  return (
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={id} 
          className="block mb-2 font-medium text-neutral-700"
        >
          {label} {required && <span className="text-danger-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`${combinedInputClassName} ${icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-danger-500">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;