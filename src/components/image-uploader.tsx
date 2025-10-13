'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}


export function ImageUploader({ value, onChange, disabled }: ImageUploaderProps) {
  const { toast } = useToast();
  
  // Por simplicidad, este state manejará las URLs de las imágenes.
  // En un caso real, aquí manejaríamos los objetos `File` y sus vistas previas.
  const [imagePreviews, setImagePreviews] = useState<string[]>(value);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      // Simulación: En un caso real, subiríamos `acceptedFiles[0]` a un servicio de storage
      // y obtendríamos una URL. Aquí, usaremos una URL de placeholder.
      const newImageUrl = URL.createObjectURL(acceptedFiles[0]); 
      const newImageUrls = [...imagePreviews, newImageUrl];
      setImagePreviews(newImageUrls);
      onChange(newImageUrls);

      toast({ 
        title: 'Imagen cargada', 
        description: 'La imagen está lista para ser subida con el formulario.',
        className: 'bg-green-100 border-green-400 text-green-700'
      });
    }
  
  }, [imagePreviews, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.webp'] },
    maxFiles: 5,
    disabled,
  });

  const handleRemoveImage = (urlToRemove: string) => {
    const newImageUrls = imagePreviews.filter(url => url !== urlToRemove);
    setImagePreviews(newImageUrls);
    onChange(newImageUrls);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/30 hover:border-primary'}
        ${disabled ? 'cursor-not-allowed bg-muted' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <UploadCloud className="w-10 h-10" />
          {isDragActive ? (
            <p>Suelta la imagen aquí...</p>
          ) : (
            <p>Arrastra una imagen o haz clic para seleccionarla</p>
          )}
          <p className="text-xs">PNG, JPG, GIF hasta 5MB</p>
        </div>
      </div>

      {imagePreviews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagePreviews.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={url}
                alt={`Vista previa ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveImage(url)}
                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Eliminar imagen"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
