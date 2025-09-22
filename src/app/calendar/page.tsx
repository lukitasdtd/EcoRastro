// TAREA 7: Integración de API y uso de Hooks en React
// Este componente consume datos desde una API creada con un Route Handler de Next.js.
// Cumple con los siguientes requisitos de la rúbrica:
// - Implementación de `useState` y `useEffect` (Punto 12): Se usan para manejar el estado (datos, carga, error) y para ejecutar el fetch de datos cuando el componente se monta.
// - Gestión de errores (Punto 13): El bloque `try...catch` maneja errores de red o de la API y actualiza el estado para mostrar un mensaje al usuario.
// - Indicadores de carga (Punto 14): Se muestra un spinner y un mensaje de "Cargando..." mientras los datos se están obteniendo, mejorando la UX.
// - El código está dividido en sub-componentes (ej. `CalendarHeader`, `CalendarGrid`) para mayor legibilidad y mantenibilidad (Punto 6 y 10).

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, getDay, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Search, Sprout, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { MonthlyPlantingData, Crop } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

// --- Tipos de Datos ---
type PlantingData = Record<string, MonthlyPlantingData>;

// --- Sub-componentes ---
// Dividir la UI en componentes más pequeños hace que el código sea más fácil de leer y mantener.

const CalendarHeader = ({ currentDate, setCurrentDate }: { currentDate: Date, setCurrentDate: (date: Date) => void }) => {
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={handlePrevMonth} aria-label="Mes anterior"><ChevronLeft className="h-4 w-4" /></Button>
        <h2 className="text-xl md:text-2xl font-bold w-48 text-center capitalize">{format(currentDate, 'MMMM yyyy', { locale: es })}</h2>
        <Button variant="outline" size="icon" onClick={handleNextMonth} aria-label="Mes siguiente"><ChevronRight className="h-4 w-4" /></Button>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {['Verduras', 'Frutas', 'Hierbas'].map(cat => (
          <Button key={cat} variant="ghost" className="rounded-full h-8 px-4 text-sm">{cat}</Button>
        ))}
      </div>
    </div>
  );
};

const SeasonFilters = () => (
  <div className="flex items-center justify-start gap-2 p-4 flex-wrap bg-muted/50 rounded-xl mb-4">
    {['Primavera', 'Verano', 'Otoño', 'Invierno'].map(season => (
      <Badge key={season} variant="secondary" className="cursor-pointer transition-colors px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary/20">
        {season}
      </Badge>
    ))}
  </div>
);

const FeaturedCropCard = ({ date, plantingData }: { date: Date, plantingData: PlantingData | null }) => {
  const monthKey = format(date, 'MMMM', { locale: es }).toLowerCase();
  const featured = plantingData?.[monthKey]?.featuredCrop;
  const image = PlaceHolderImages.find(img => img.id === featured?.imageId);

  // Muestra un esqueleto de carga si los datos aún no están disponibles.
  if (!plantingData) {
    return (
      <Card className="h-full">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-48 rounded-xl" />
          <Skeleton className="h-10 w-full mt-4" />
        </CardContent>
      </Card>
    );
  }

  if (!featured) return <Card className="flex items-center justify-center h-full"><p>No hay cultivo destacado este mes.</p></Card>;

  return (
    <Card className="bg-white rounded-2xl shadow-md border-0 h-full">
      <CardHeader>
        <CardTitle>{featured.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        {image && (
          <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
            <Image src={image.imageUrl} alt={featured.name} fill style={{ objectFit: 'cover' }} data-ai-hint={image.imageHint} />
          </div>
        )}
        <div className="bg-accent/80 text-accent-foreground px-4 py-2 rounded-lg w-full">
          <h3 className="font-bold text-lg">Siembra en {format(date, 'MMMM', { locale: es })}</h3>
          <p className="text-sm">Ideal para esta temporada</p>
        </div>
        <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary/10">Ver más tips</Button>
      </CardContent>
    </Card>
  );
};

const CalendarGrid = ({ currentDate, selectedDate, setSelectedDate, plantingData }: { currentDate: Date, selectedDate: Date | null, setSelectedDate: (date: Date) => void, plantingData: PlantingData | null }) => {
  const monthKey = format(currentDate, 'MMMM', { locale: es }).toLowerCase();
  const cropsForMonth = plantingData?.[monthKey]?.crops.map(c => c.id) || [];

  const daysOfWeek = useMemo(() => ['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
    <div key={i} className="text-center font-bold text-muted-foreground text-sm">{day}</div>
  )), []);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfWeek = getDay(monthStart);
    const days = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-start-${i}`} className="p-1 md:p-2"></div>);
    }

    const daysInMonthArray = eachDayOfInterval({ start: monthStart, end: new Date(currentDate.getFullYear(), currentDate.getMonth(), daysInMonth) });
    daysInMonthArray.forEach(day => {
      const isPlantingDay = (getDay(day) + day.getDate()) % 5 === 0; // Lógica de ejemplo para días de siembra
      days.push(
        <div
          key={day.toString()}
          onClick={() => setSelectedDate(day)}
          className={`text-center p-1 md:p-2 aspect-square flex flex-col justify-center items-center rounded-full cursor-pointer transition-colors text-sm ${
            isToday(day) ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-primary/10'
          } ${selectedDate && isSameDay(day, selectedDate) ? 'ring-2 ring-primary' : ''}`}
        >
          <span>{format(day, 'd')}</span>
          {isPlantingDay && <Sprout className="h-3 w-3 md:h-4 md:w-4 mx-auto text-primary/80 mt-1" />}
        </div>
      );
    });

    return days;
  }, [currentDate, selectedDate, setSelectedDate]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-1 mb-2">{daysOfWeek}</div>
      <div className="grid grid-cols-7 gap-1">{calendarDays}</div>
    </div>
  );
};

// --- Componente Principal ---
export default function CalendarPage() {
  // TAREA 7: Hook `useState` (Punto 12)
  // Se definen varios estados para manejar la fecha actual, la fecha seleccionada,
  // los datos de siembra, el estado de carga y los errores.
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [plantingData, setPlantingData] = useState<PlantingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TAREA 7: Hook `useEffect` para fetch de datos (Punto 12)
  // Este hook se ejecuta una vez, cuando el componente se monta, gracias al array de dependencias vacío `[]`.
  // Su propósito es obtener los datos de la API.
  useEffect(() => {
    const fetchPlantingData = async () => {
      setIsLoading(true); // Activa el indicador de carga (Punto 14)
      setError(null);
      try {
        // Se realiza la petición `fetch` a nuestro endpoint de API.
        const response = await fetch('/api/planting-data');
        // TAREA 7: Gestión de errores y respuestas no exitosas (Punto 13)
        // Se verifica si la respuesta de la API fue exitosa (status 200-299).
        if (!response.ok) {
          throw new Error('No se pudieron cargar los datos de siembra.');
        }
        const data: PlantingData = await response.json();
        setPlantingData(data); // Se guardan los datos en el estado.
      } catch (err) {
        // Si ocurre un error (de red o por el `throw` anterior), se guarda el mensaje en el estado de error.
        setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
      } finally {
        // Se desactiva el indicador de carga, tanto si la petición fue exitosa como si falló.
        setIsLoading(false);
      }
    };

    fetchPlantingData();
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez.

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-foreground">Calendario de Siembra</h1>
        <p className="text-lg text-muted-foreground">Planifica tu huerta mes a mes.</p>
      </section>

      <main className="bg-background p-4 md:p-8 rounded-3xl shadow-lg border">
        {/* TAREA 7: Renderizado condicional basado en el estado */}
        {/* Muestra un mensaje de error si el estado `error` tiene un valor. */}
        {error && <div className="text-center text-red-500 p-4">{error}</div>}
        {/* Muestra un indicador de carga si el estado `isLoading` es true. (Punto 14) */}
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
            <p className="ml-4">Cargando datos del calendario...</p>
          </div>
        )}
        {/* Solo si no está cargando y no hay errores, se muestra el contenido principal del calendario. */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-background rounded-2xl">
                <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
                <SeasonFilters />
                <CalendarGrid currentDate={currentDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} plantingData={plantingData} />
              </div>
            </div>
            <div className="lg:col-span-1">
              <FeaturedCropCard date={selectedDate || currentDate} plantingData={plantingData} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
