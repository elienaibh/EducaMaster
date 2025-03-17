// src/components/ui/Avatar/index.jsx
import React from 'react';

const Avatar = ({ 
  src, 
  alt = 'Avatar',
  size = 'md',
  status,
  badge,
  className = '',
  ...props 
}) => {
  // Estilos de tamanhos
  const sizeStyles = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  // Estilos de status
  const statusStyles = {
    online: 'bg-success-500',
    away: 'bg-warning-500',
    busy: 'bg-danger-500',
    offline: 'bg-neutral-400',
  };

  // Posição do indicador de status baseado no tamanho
  const statusPositionStyles = {
    xs: '-right-0.5 -bottom-0.5 w-1.5 h-1.5',
    sm: '-right-0.5 -bottom-0.5 w-2 h-2',
    md: '-right-1 -bottom-1 w-2.5 h-2.5',
    lg: '-right-1 -bottom-1 w-3 h-3',
    xl: '-right-1 -bottom-1 w-3.5 h-3.5',
    '2xl': '-right-1 -bottom-1 w-4 h-4',
  };

  // Classe base para todos os avatares
  const baseClasses = 'rounded-full object-cover';
  
  // Combinar todas as classes
  const combinedClassName = `${baseClasses} ${sizeStyles[size]} ${className}`;

  // Gerar iniciais a partir do alt text
  const generateInitials = (name) => {
    if (!name) return '?';
    
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  };

  // Gerar cor de fundo baseada no nome (para consistência)
  const generateColor = (name) => {
    if (!name) return '#6366F1'; // Cor padrão
    
    const colors = [
      '#F43F5E', // Rosa
      '#8B5CF6', // Violeta
      '#3B82F6', // Azul
      '#10B981', // Verde
      '#F59E0B', // Âmbar
      '#6366F1', // Índigo
      '#EC4899', // Rosa claro
      '#06B6D4', // Ciano
      '#14B8A6', // Teal
      '#F97316', // Laranja
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Imagem padrão em caso de erro ou sem imagem definida
  const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=random&color=fff`;

  // Função para renderizar o avatar quando não há imagem
  const renderPlaceholder = () => {
    const initials = generateInitials(alt);
    const bgColor = generateColor(alt);
    
    return (
      <div 
        className={`flex items-center justify-center ${combinedClassName}`}
        style={{ backgroundColor: bgColor }}
      >
        <span className="text-white font-medium">
          {initials}
        </span>
      </div>
    );
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className={combinedClassName}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
            e.target.parentNode.appendChild(renderPlaceholder());
          }}
          {...props}
        />
      ) : renderPlaceholder()}
      
      {status && (
        <span 
          className={`absolute block rounded-full ring-2 ring-white ${statusStyles[status]} ${statusPositionStyles[size]}`}
        />
      )}
      
      {badge && (
        <div className="absolute -top-1 -right-1">
          {badge}
        </div>
      )}
    </div>
  );
};

export default Avatar;