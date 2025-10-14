'use client';

import { useState, useEffect, useMemo } from 'react';
import { chileanRegions } from '@/lib/chile-locations';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, Info } from 'lucide-react';

// ayudante de la función para obtener la hora actual en Chile (GMT-4)
const getChileanTime = () => {
  const now = new Date();
  const chileanOffset = -4 * 3600 * 1000;
  const localOffset = now.getTimezoneOffset() * 60000;
  const chileanTime = new Date(now.getTime() + localOffset + chileanOffset);
  return chileanTime.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export function CommentForm({ petName }: { petName: string }) {
  const [time, setTime] = useState<string>(getChileanTime());
  
  // Estado para la preferencia de ubicación del usuario: null (sin decidir), 'auto', o 'manual'
  const [locationPreference, setLocationPreference] = useState<'auto' | 'manual' | null>(null);
  
  // Estados para la ubicación automática
  const [autoLocation, setAutoLocation] = useState<string>('Obteniendo ubicación...');
  const [locationError, setLocationError] = useState<string>('');
  
  // Estados para la ubicación manual
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedComuna, setSelectedComuna] = useState<string>('');
  const [street, setStreet] = useState<string>('');

  // Actualizar la hora cada minuto
  useEffect(() => {
    const timerId = setInterval(() => setTime(getChileanTime()), 60000);
    return () => clearInterval(timerId);
  }, []);

  const handleAutoLocation = () => {
    setLocationPreference('auto');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAutoLocation('Ubicación aproximada obtenida');
          setLocationError('');
        },
        (error) => {
          let errorMessage = 'Error al obtener la ubicación.';
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = 'Permiso de ubicación denegado.';
          }
          setLocationError(errorMessage);
          setAutoLocation('No se pudo obtener la ubicación');
        }
      );
    } else {
      setAutoLocation('Geolocalización no es soportada.');
    }
  };

  const comunas = useMemo(() => {
    if (!selectedRegion) return [];
    const region = chileanRegions.find(r => r.name === selectedRegion);
    return region ? region.communes : [];
  }, [selectedRegion]);

  useEffect(() => {
    setSelectedComuna(''); // Resetear comuna cuando cambia la región
  }, [selectedRegion]);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>¿Has visto a {petName}?</CardTitle>
        <CardDescription>Deja un comentario aquí para ayudar a encontrarlo.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">

          {/* Contenedor de Hora (siempre visible) */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
            <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div className="flex flex-col">
                <span className="text-xs font-semibold text-muted-foreground">Hora del avistamiento (Chile, GMT-4)</span>
                <span className="text-sm font-medium text-foreground">{time}</span>
            </div>
          </div>

          {/* --- Selector de Ubicación --- */}
          {!locationPreference && (
            <Card className="border-dashed border-primary/50 bg-primary/5">
                <CardContent className="pt-6 flex flex-col items-center justify-center text-center gap-4">
                    <Info className="h-8 w-8 text-primary"/>
                    <p className="font-semibold">¿Cómo deseas agregar la ubicación?</p>
                    <div className="flex gap-4">
                        <Button onClick={handleAutoLocation}>Usar mi ubicación actual</Button>
                        <Button variant="secondary" onClick={() => setLocationPreference('manual')}>Ingresar manualmente</Button>
                    </div>
                </CardContent>
            </Card>
          )}

          {/* --- Opción 1: Ubicación Automática --- */}
          {locationPreference === 'auto' && (
             <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
              <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-semibold text-muted-foreground">Ubicación Actual</span>
                <span className="text-sm font-medium text-foreground truncate">{autoLocation}</span>
                {locationError && <span className="text-xs text-destructive">{locationError}</span>}
              </div>
            </div>
          )}

          {/* --- Opción 2: Ubicación Manual --- */}
          {locationPreference === 'manual' && (
            <div className="space-y-4 p-4 border rounded-lg">
              <Label>Ubicación del avistamiento</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <Select onValueChange={setSelectedRegion} value={selectedRegion}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona una región" />
                        </SelectTrigger>
                        <SelectContent>
                            {chileanRegions.map(region => (
                                <SelectItem key={region.name} value={region.name}>{region.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                     <Select onValueChange={setSelectedComuna} value={selectedComuna} disabled={!selectedRegion}>
                        <SelectTrigger>
                            <SelectValue placeholder={!selectedRegion ? "Elige una región" : "Selecciona una comuna"} />
                        </SelectTrigger>
                        <SelectContent>
                            {comunas.map(comuna => (
                                <SelectItem key={comuna} value={comuna}>{comuna}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <Input 
                    placeholder="Calle y número / Referencia"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
            </div>
          )}
          
          {/* --- Área de Comentario y Botón (solo visible si se eligió una opción de ubicación) --- */}
          {locationPreference && (
            <>
              <div>
                <Label htmlFor="comment" className="sr-only">Comentario</Label>
                <Textarea id="comment" placeholder="Describe el avistamiento: ¿qué hacía la mascota?, ¿en qué estado se encontraba?, etc." rows={4} />
              </div>
              <Button>Publicar Comentario</Button>
            </>
          )}

        </form>
      </CardContent>
    </Card>
  );
}
