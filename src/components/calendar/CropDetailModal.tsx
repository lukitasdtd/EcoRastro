'use client';

import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CropIcon } from './CropIcon';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CropDetail } from '@/lib/crop-details';

export type ModalData = CropDetail & { 
    id: string;
    imageId?: string;
};

export const CropDetailModal = ({ crop, onClose }: { crop: ModalData | null, onClose: () => void }) => {
    if (!crop) return null;

    const image = PlaceHolderImages.find(img => img.id === crop.imageId);

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-in fade-in-0" 
            onClick={onClose}
        >
            <Card 
                className="w-[90vw] max-w-2xl h-[80vh] bg-background rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className='bg-accent text-primary-foreground font-bold p-3 text-2xl flex items-center gap-3 justify-between'>
                    <div className="flex items-center gap-3">
                        <CropIcon cropId={crop.id} className="text-3xl" />
                        <h3>{crop.name}</h3>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-primary-foreground hover:bg-black/20">
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                
                <CardContent className="p-0 flex-grow overflow-y-auto">
                    {image && (
                        <div className="relative w-full h-56">
                            <Image src={image.imageUrl} alt={crop.name} fill style={{objectFit: 'cover'}} data-ai-hint={image.imageHint} />
                        </div>
                    )}
                    <div className="p-6 space-y-6">
                        <div>
                            <h4 className="font-bold text-lg text-primary mb-2">Guía de Siembra</h4>
                            <p className="text-base text-foreground/90 whitespace-pre-wrap">{crop.sowingGuide}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-primary mb-2">Cosecha</h4>
                            <p className="text-base text-foreground/90 whitespace-pre-wrap">{crop.harvesting}</p>
                        </div>
                         <div>
                            <h4 className="font-bold text-lg text-primary mb-2">Tips</h4>
                            <ul className="list-disc pl-5 space-y-2 text-foreground/90">
                                {crop.tips.map((tip, index) => <li key={index}>{tip}</li>)}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
