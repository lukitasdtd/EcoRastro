'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, getDay, eachDayOfInterval, isToday, isSameWeek, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Search, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { plantingData, Crop } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// --- Componentes Internos ---

// Componente para la cabecera del calendario (navegación y filtros)
const CalendarHeader = ({ currentDate, setCurrentDate }: { currentDate: Date, setCurrentDate: (date: Date) => void }) => {
  const [activeCategory, setActiveCategory] = useState('Verduras');
  const categories = ['Verduras', 'Frutas', 'Hierbas'];

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="bg-[#1F3D2A] text-white p-4 rounded-t-2xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={handlePrevMonth} aria-label="Mes anterior"><ChevronLeft className="h-6 w-6" /></button>
          <span className="text-xl font-bold w-40 text-center capitalize">{format(currentDate, 'MMMM yyyy', { locale: es })}</span>
          <button onClick={handleNextMonth} aria-label="Mes siguiente"><ChevronRight className="h-6 w-6" /></button>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-[#2A5237] p-1 rounded-full">
          {categories.map(cat => (
            <Button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              variant={activeCategory === cat ? 'secondary' : 'ghost'}
              className={`rounded-full h-8 px-4 text-sm ${activeCategory === cat ? 'bg-white text-[#1F3D2A]' : 'text-white hover:bg-white/10 hover:text-white'}`}
            >
              {cat}
            </Button>
          ))}
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

// Componente para los filtros de estación
const SeasonFilters = () => {
  const [activeSeason, setActiveSeason] = useState('Primavera');
  const seasons = ['Primavera', 'Verano', 'Otoño', 'Invierno'];
  
  return (
    <div className="flex items-center justify-start gap-2 p-4">
      {seasons.map(season => (
        <Badge
          key={season}
          onClick={() => setActiveSeason(season)}
          variant={activeSeason === season ? 'default' : 'secondary'}
          className={`cursor-pointer transition-colors px-4 py-1.5 rounded-full text-sm font-medium ${activeSeason === season ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
        >
          {season}
        </Badge>
      ))}
    </div>
  );
};

// Componente para la tarjeta del cultivo destacado
const FeaturedCropCard = ({ date }: { date: Date }) => {
  const monthData = plantingData[format(date, 'MMMM', { locale: es }).toLowerCase() as keyof typeof plantingData];
  const featured = monthData?.featuredCrop;
  const image = PlaceHolderImages.find(img => img.id === featured?.imageId);

  if (!featured) return null;

  return (
    <Card className="bg-white rounded-2xl shadow-md border-0 h-full">
      <CardContent className="p-4 flex flex-col items-center text-center">
        {image && (
          <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
            <Image
              src={image.imageUrl}
              alt={featured.name}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
        <div className="bg-accent/80 text-accent-foreground px-4 py-2 rounded-lg w-full">
            <h3 className="font-bold text-lg">{featured.name}</h3>
            <p className="text-sm">Ideal para sembrar en esta temporada</p>
        </div>
        <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary/10">
          Ver más tips
        </Button>
      </CardContent>
    </Card>
  );
};

// Componente principal de la página del calendario
export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = useMemo(() => {
    const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    return days.map(day => (
      <div key={day} className="text-center font-bold text-muted-foreground text-sm">
        {day}
      </div>
    ));
  }, []);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfWeek = getDay(monthStart); // 0 (Sun) - 6 (Sat)
    
    const days = [];

    // Días del mes anterior para rellenar
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-start-${i}`} className="p-2"></div>);
    }

    // Días del mes actual
    const daysInMonthArray = eachDayOfInterval({ start: monthStart, end: new Date(currentDate.getFullYear(), currentDate.getMonth(), daysInMonth) });
    daysInMonthArray.forEach(day => {
      const isPlantingDay = (getDay(day) + day.getDate()) % 4 === 0; // Lógica de ejemplo para días de siembra
      days.push(
        <div
          key={day.toString()}
          onClick={() => setSelectedDate(day)}
          className={`text-center p-2 rounded-full cursor-pointer transition-colors ${
            isToday(day) ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-primary/10'
          } ${isSameWeek(day, selectedDate, { weekStartsOn: 0 }) ? 'bg-primary/20' : ''}`}
        >
          <span>{format(day, 'd')}</span>
          {isPlantingDay && <Sprout className="h-4 w-4 mx-auto text-primary/80 mt-1" />}
        </div>
      );
    });

    return days;
  }, [currentDate, selectedDate]);

  return (
    <div className="container mx-auto px-4 py-8">
       <section className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-foreground">Calendario de siembra</h1>
      </section>

      <main className="bg-[#E6F4EC] p-4 md:p-8 rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda: Calendario */}
          <div className="lg:col-span-2">
            <div className="bg-background rounded-2xl shadow-lg">
              <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
              <SeasonFilters />
              <div className="p-4">
                <div className="grid grid-cols-7 gap-1 mb-2">{daysOfWeek}</div>
                <div className="grid grid-cols-7 gap-1">{calendarDays}</div>
              </div>
            </div>
          </div>
          {/* Columna Derecha: Cultivo Destacado */}
          <div className="lg:col-span-1">
            <FeaturedCropCard date={currentDate} />
          </div>
        </div>
      </main>
    </div>
  );
}
