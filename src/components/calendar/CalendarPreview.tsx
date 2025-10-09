'use client';

import React, { useMemo, useState } from 'react';
import { format, getDay, startOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Moon } from 'lucide-react';
import { plantingData, Crop } from '@/lib/data';
import { CropIcon } from '@/components/calendar/CropIcon';

/** Categorías de cultivos permitidas en el preview */
type Category = 'Verduras' | 'Frutas' | 'Hierbas' | 'Todas';

/** Props del preview */
type Props = {
  /** Filtra por categoría (usa 'Todas' para mezclar todas). */
  category?: Category;
  /** Si quieres simular carga con esqueleto. */
  loading?: boolean;
};

/**
 * CalendarPreview
 *  - Renderiza SOLO el mes (encabezados de semana + celdas de días).
 *  - Fondo verde claro + ring para que se note el límite del calendario.
 *  - Client-only (no SSR) para evitar problemas de hidratación con fechas.
 */
export default function CalendarPreview({ category = 'Verduras', loading = false }: Props) {
  // Estado del día actual y seleccionado (client-side).
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Clave del mes en español (coincide con la estructura en plantingData).
  const monthKey = useMemo(
    () => format(currentDate, 'MMMM', { locale: es }).toLowerCase(),
    [currentDate]
  );

  // Filtrado de cultivos por mes y categoría.
  const cropsForMonth: Crop[] = useMemo(() => {
    const all = plantingData[monthKey]?.crops || [];
    return category === 'Todas' ? all : all.filter((c) => c.category === category);
  }, [monthKey, category]);

  // Click en una celda de día (guardamos selección localmente).
  const onDayClick = (day: Date, _crop?: Crop) => {
    setSelectedDate(day);
  };

  // Encabezados de semana (L–D).
  const daysOfWeek = useMemo(
    () =>
      ['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => (
        <div key={i} className="text-center font-bold text-sm text-muted-foreground">
          {d}
        </div>
      )),
    []
  );

  // Cálculo de celdas del mes (incluye espacios al inicio según el día de arranque).
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const firstDayOfMonth = getDay(monthStart);
    const startingDayOfWeek = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const daysInMonthArray = eachDayOfInterval({
      start: monthStart,
      end: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
    });

    // Semana del mes (1..5) para mapear cultivos por semana.
    const getWeekOfMonth = (date: Date): number => {
      const firstDay = startOfMonth(date);
      const dayOfMonth = date.getDate();
      const dayOfWeekOfFirst = getDay(firstDay) === 0 ? 6 : getDay(firstDay) - 1;
      return Math.ceil((dayOfMonth + dayOfWeekOfFirst) / 7);
    };

    // Espacios vacíos antes del día 1.
    const days: React.ReactNode[] = Array.from({ length: startingDayOfWeek }, (_, i) => (
      <div key={`empty-${i}`} className="p-1" />
    ));

    // Celdas de cada día del mes.
    days.push(
      ...daysInMonthArray.map((day) => {
        const weekOfMonth = getWeekOfMonth(day);
        const cropForDay = cropsForMonth.find((c) => c.week === weekOfMonth);
        const selected = selectedDate && isSameDay(day, selectedDate);

        // Contenido base de la celda.
        const dayContent = (
          <div
            onClick={() => onDayClick(day, cropForDay)}
            className="text-center bg-card aspect-square flex flex-col justify-between items-center rounded-lg cursor-pointer transition-all duration-200 group relative p-2"
          >
            {/* Overlay para hover/selección */}
            <div
              className={`absolute inset-0 transition-all duration-300 rounded-lg group-hover:bg-black/5 ${
                selected ? 'ring-2 ring-primary' : ''
              }`}
            />
            {/* Número del día (resalta si es hoy) */}
            <span
              className={`font-semibold z-10 self-start ${
                isToday(day) ? 'font-extrabold text-primary' : 'text-foreground'
              } group-hover:text-black`}
            >
              {format(day, 'd')}
            </span>
            {/* Icono del cultivo o un “placeholder” simpático */}
            <div className="flex-grow flex items-center justify-center z-10">
              {cropForDay ? (
                <CropIcon cropId={cropForDay.id} className="text-2xl" />
              ) : (
                day.getDate() % 7 === 3 && <Moon className="h-4 w-4 text-slate-400/80" />
              )}
            </div>
          </div>
        );

        // Si hay cultivo, envolvemos con tooltip.
        if (cropForDay) {
          return (
            <Tooltip key={day.toString()}>
              <TooltipTrigger asChild>{dayContent}</TooltipTrigger>
              <TooltipContent>
                <p>Ideal para sembrar {cropForDay.name}</p>
              </TooltipContent>
            </Tooltip>
          );
        }
        return <div key={day.toString()}>{dayContent}</div>;
      })
    );

    return days;
  }, [currentDate, selectedDate, cropsForMonth]);

  // Estado de carga opcional (por si lo usas con loading=true).
  if (loading) {
    return (
      <Card className="p-5 rounded-2xl shadow-md ring-1 ring-[#B8E0CF] bg-[#E6F4EC] h-full">
        <div className="grid grid-cols-7 gap-1 mb-3">{daysOfWeek}</div>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square bg-slate-200" />
          ))}
        </div>
      </Card>
    );
  }

  // Render final: verde claro de fondo + ring sutil para delimitar calendario.
  return (
    <TooltipProvider delayDuration={150}>
      <Card className="p-5 rounded-2xl shadow-md ring-1 ring-[#B8E0CF] bg-[#E6F4EC] h-full">
        <div className="grid grid-cols-7 gap-1 mb-3">{daysOfWeek}</div>
        <div className="grid grid-cols-7 gap-1.5">{calendarDays}</div>
      </Card>
    </TooltipProvider>
  );
}
