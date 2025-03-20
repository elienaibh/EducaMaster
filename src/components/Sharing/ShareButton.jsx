// src/components/sharing/ShareButton.jsx
import React from 'react';
import { Share2 } from 'lucide-react';
import { useSharingContext } from '../../contexts/SharingContext';

/**
 * Botão de compartilhamento reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.content - Conteúdo a ser compartilhado
 * @param {string} props.contentType - Tipo do conteúdo (quiz, flashcard, achievement)
 * @param {string} [props.variant='primary'] - Variante do botão (primary, secondary, ghost)
 * @param {string} [props.size='md'] - Tamanho do botão (sm, md, lg)
 * @param {string} [props.label] - Texto do botão
 * @param {boolean} [props.iconOnly=false] - Se deve mostrar apenas o ícone
 */
const ShareButton = ({
  content,
  contentType,
  variant = 'primary',
  size = 'md',
  label = 'Compartilhar',
  iconOnly = false,
  className = '',
}) => {
  const { initiateSharing } = useSharingContext();

  // Definições de classe com base na variante
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-300',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };

  // Definições de tamanho
  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-2 px-3',
    lg: 'text-base py-2.5 px-4',
  };

  // Determina a classe do ícone com base no tamanho
  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const handleClick = () => {
    initiateSharing(content, contentType);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        rounded-lg font-medium transition-colors flex items-center justify-center
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${className}
      `}
      aria-label={label}
      title={iconOnly ? label : undefined}
    >
      <Share2 className={`${iconSizeClasses[size]} ${!iconOnly ? 'mr-2' : ''}`} />
      {!iconOnly && <span>{label}</span>}
    </button>
  );
};

export default ShareButton;