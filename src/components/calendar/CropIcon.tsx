import React from 'react';

// Mapeo de ID de cultivo a un emoji estándar.
const CROP_ICONS: { [key: string]: string } = {
  tomate: '🍅',
  albahaca: '🌿',
  lechuga: '🥬',
  zanahoria: '🥕',
  espinaca: '🍃',
  ajo: '🧄',
  habas: '🌱',
  puerros: '🌱',
  rabanitos: '🌱',
  acelga: '🍃',
  pimiento: '🌶️',
};

interface CropIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  cropId: string;
}

export const CropIcon: React.FC<CropIconProps> = ({ cropId, className, ...props }) => {
  const icon = CROP_ICONS[cropId] || '🌱'; // Icono por defecto

  return (
    <span
      {...props}
      className={className}
      role="img"
      aria-label={`Icono de ${cropId}`}
    >
      {icon}
    </span>
  );
};
