'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

//componente para hacer una tarjeta volteable
interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

export function FlipCard({ frontContent, backContent, className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div
      className="flip-card h-[250px] w-full [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          'flip-card-inner relative w-full h-full transition-transform duration-700',
          '[transform-style:preserve-3d]',
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        )}
      >
        {/* Front */}
        <div className="absolute w-full h-full [backface-visibility:hidden]">
          <Card className={cn("w-full h-full flex flex-col justify-center items-center text-center p-4", className)}>
            {frontContent}
          </Card>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
           <Card className={cn("w-full h-full flex flex-col justify-center items-center text-center p-6", className)}>
            {backContent}
          </Card>
        </div>
      </div>
    </div>
  );
}
