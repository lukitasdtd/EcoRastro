'use client';

import React from 'react';
import { Sprout } from 'lucide-react';

interface CropIconProps {
  cropId: string;
  className?: string;
}

// Mapeo de IDs de cultivos a emojis para una representación visual rápida
const CROP_EMOJI_MAP: Record<string, string> = {
  'tomate-cherry': '🍅',
  'tomate': '🍅',
  'albahaca': '🌿',
  'lechuga': '🥬',
  'zanahoria': '🥕',
  'espinaca': '🍃',
  'ajo': '🧄',
  'habas': '🌱',
  'cebolla': '🧅',
  'puerros': '🥬',
  'rabanitos': '⚪',
  'acelga': '🌿',
  'zapallo': '🎃',
  'pimiento': '🌶️',
};

/**
 * Componente para mostrar un icono visual (emoji) para un cultivo específico.
 * Si no se encuentra un emoji para el ID del cultivo, muestra un icono genérico de Sprout.
 */
export const CropIcon = ({ cropId, className }: CropIconProps) => {
  const emoji = CROP_EMOJI_MAP[cropId];

  if (emoji) {
    return (
        <span role="img" aria-label={cropId} className={`text-sm ${className}`}>
            {emoji}
        </span>
    );
  }

  // Icono por defecto si no se encuentra un emoji específico
  return <Sprout className={`h-3 w-3 text-primary/80 ${className}`} />;
};
