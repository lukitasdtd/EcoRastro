'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Sun, ListChecks } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CropDetail } from '@/lib/crop-details';
import { CropIcon } from './CropIcon';

// modal para mostrar detalles de cultivos
export type ModalData = CropDetail & {
  id: string;
  imageId?: string;
};

interface CropDetailModalProps {
  crop: ModalData | null;
  onClose: () => void;
}

export const CropDetailModal: React.FC<CropDetailModalProps> = ({ crop, onClose }) => {
  if (!crop) return null;

  const image = PlaceHolderImages.find(img => img.id === crop.imageId);

  // Using DialogPortal to ensure the modal is rendered on top of everything
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-4xl w-11/12 max-h-[90vh] bg-white rounded-2xl shadow-2xl p-0 grid grid-rows-[auto_1fr] overflow-hidden">
          <DialogHeader className="relative p-4 border-b">
            <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
              <CropIcon cropId={crop.id} className="text-3xl" />
              {crop.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-0 overflow-y-auto">
            <div className="relative h-64 md:h-full w-full">
              {image ? (
                <Image 
                  src={image.imageUrl} 
                  alt={crop.name} 
                  fill 
                  sizes="(max-width: 768px) 90vw, 448px"
                  style={{ objectFit: 'cover' }} 
                  data-ai-hint={image.imageHint}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Sin imagen</span>
                </div>
              )}
            </div>

            <div className="p-6 space-y-6 bg-gray-50">
              <p className="text-lg text-gray-700 leading-relaxed">{crop.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-800">Época de Siembra</h4>
                    <p className="text-gray-600">{crop.planting_time}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Sun className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-800">Época de Cosecha</h4>
                    <p className="text-gray-600">{crop.harvest_time}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><ListChecks className="h-6 w-6 text-primary" />Cuidados Esenciales</h4>
                <ul className="space-y-2 list-disc list-inside text-gray-600 pl-2">
                  {crop.care.map((tip, index) => (
                    <li key={index} className="leading-snug">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
