'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { format, addMonths, subMonths, getDay, startOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Search, Moon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { plantingData, Crop } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { cropDetails, CropDetail } from '@/lib/crop-details';
import { CropDetailModal, ModalData } from '@/components/calendar/CropDetailModal';
import { CropIcon } from '@/components/calendar/CropIcon';

// --- Tipos ---
type Category = 'Verduras' | 'Frutas' | 'Hierbas';
type Season = 'Primavera' | 'Verano' | 'Otoño' | 'Invierno';
type SearchableCrop = CropDetail & { id: string };

// --- Lógica de Estaciones ---
const getSeason = (date: Date): Season => {
    const month = date.getMonth(); // 0-11
    if (month >= 8 && month <= 10) return 'Primavera'; // Sep, Oct, Nov (HS)
    if (month >= 11 || month <= 1) return 'Verano';    // Dic, Ene, Feb (HS)
    if (month >= 2 && month <= 4) return 'Otoño';      // Mar, Abr, May (HS)
    return 'Invierno'; // Jun, Jul, Ago (HS)
};

// --- Sub-componentes ---

const CalendarNav = ({ currentDate, setCurrentDate, activeCategory, setActiveCategory, onSearchClick }: { 
  currentDate: Date, 
  setCurrentDate: (date: Date) => void,
  activeCategory: Category,
  setActiveCategory: (category: Category) => void,
  onSearchClick: () => void
}) => {
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <nav className="bg-secondary text-secondary-foreground p-3 rounded-xl flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handlePrevMonth} aria-label="Mes anterior" className="hover:bg-primary/20 rounded-full"><ChevronLeft className="h-5 w-5" /></Button>
            <h2 className="text-lg font-bold w-40 text-center capitalize">{format(currentDate, 'MMMM yyyy', { locale: es })}</h2>
            <Button variant="ghost" size="icon" onClick={handleNextMonth} aria-label="Mes siguiente" className="hover:bg-primary/20 rounded-full"><ChevronRight className="h-5 w-5" /></Button>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-black/10 p-1 rounded-full">
            {(['Verduras', 'Frutas', 'Hierbas'] as Category[]).map(cat => (
                <Button key={cat} variant='ghost' onClick={() => setActiveCategory(cat)}
                    className={`rounded-full h-8 px-4 text-sm font-medium transition-colors duration-300 ${activeCategory === cat ? 'bg-background text-foreground hover:bg-background/90' : 'text-secondary-foreground hover:bg-secondary-foreground/80'}`}>
                    {cat}
                </Button>
            ))}
        </div>
        <Button variant="ghost" size="icon" onClick={onSearchClick} className="hover:bg-primary/20 rounded-full"><Search className="h-5 w-5" /></Button>
    </nav>
  );
};

const SearchBar = ({ query, onQueryChange, onCancel }: { query: string, onQueryChange: (q: string) => void, onCancel: () => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="bg-secondary text-secondary-foreground p-3 rounded-xl flex justify-between items-center shadow-lg animate-in fade-in-0">
            <div className="flex-grow flex items-center gap-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <Input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Buscar cultivo (ej: Tomate...)"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    className="bg-transparent border-0 text-lg focus:ring-0 focus:outline-none placeholder:text-muted-foreground/80 w-full" 
                />
            </div>
            <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full"><X className="h-5 w-5" /></Button>
        </div>
    );
};

const SearchResults = ({ results, onSelect }: { results: SearchableCrop[], onSelect: (cropId: string) => void }) => {
    if (results.length === 0) {
        return <div className="p-4 text-center text-muted-foreground">No se encontraron cultivos.</div>
    }
    return (
        <div className="bg-background rounded-b-xl shadow-lg p-2 animate-in fade-in-0">
            <ul className="space-y-1">
                {results.map(crop => (
                    <li key={crop.id} onClick={() => onSelect(crop.id)} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-secondary">
                        <CropIcon cropId={crop.id} className="text-xl" />
                        <span className="font-semibold">{crop.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const SeasonPills = ({ activeSeason }: { activeSeason: Season }) => {
    const seasonStyles: Record<Season, string> = {
        Primavera: 'bg-pink-400 text-white',
        Verano:    'bg-primary text-primary-foreground',
        Otoño:     'bg-accent text-accent-foreground',
        Invierno:  'bg-sky-500 text-white',
    };
    const neutralStyle = 'bg-slate-200 text-slate-800';

    return (
        <div className="flex items-center justify-center md:justify-start gap-3 p-2 flex-wrap mb-4">
            {(['Primavera', 'Verano', 'Otoño', 'Invierno'] as Season[]).map(season => (
                <div key={season} className={`rounded-full transition-all duration-300 px-5 py-2 h-auto text-sm font-semibold border-0 cursor-default ${activeSeason === season ? seasonStyles[season] : neutralStyle}`}>
                    {season}
                </div>
            ))}
        </div>
    );
};

const InfoCard = ({ activeCrop, isLoading, onOpenModal }: { activeCrop: Crop | null, isLoading: boolean, onOpenModal: (cropId: string) => void }) => {
    const image = PlaceHolderImages.find(img => img.id === activeCrop?.imageId);

    if (isLoading) {
        return (
            <Card className="rounded-2xl shadow-lg h-full border-0"><CardContent className="p-4 text-center"><Skeleton className="w-full h-40 rounded-xl mb-4 bg-slate-200" /><Skeleton className="h-8 w-3/4 mb-2 mx-auto bg-slate-200" /><Skeleton className="h-5 w-full mb-4 bg-slate-200" /><Skeleton className="h-10 w-32 mx-auto bg-slate-200" /></CardContent></Card>
        );
    }
    if (!activeCrop) return <Card className="flex items-center justify-center h-full rounded-2xl shadow-lg border-0"><p className="text-muted-foreground p-4 text-center">No hay cultivos para esta categoría en este mes.</p></Card>;

    return (
        <Card className="rounded-2xl shadow-lg h-full overflow-hidden flex flex-col border-0">
            <CardContent className="p-0 text-center flex-grow flex flex-col justify-center bg-card">
                {image && <div className="relative w-full h-40 flex-shrink-0"><Image src={image.imageUrl} alt={activeCrop.name} fill style={{ objectFit: 'cover' }} data-ai-hint={image.imageHint} /></div>}
                <div className='bg-accent text-primary-foreground font-bold p-2 text-lg'><h3>{activeCrop.name}</h3></div>
                <div className='p-4'>
                    <p className="mb-4 text-base text-foreground">Ideal para sembrar este mes.</p>
                    <Button variant='outline' onClick={() => onOpenModal(activeCrop.id)} className="border-primary text-primary font-semibold transition-colors hover:bg-primary hover:text-primary-foreground">Ver más tips</Button>
                </div>
            </CardContent>
        </Card>
    );
};

const CalendarGrid = ({ currentDate, selectedDate, cropsForMonth, onDayClick, isLoading }: { 
    currentDate: Date, 
    selectedDate: Date | null, 
    cropsForMonth: Crop[],
    onDayClick: (day: Date, crop: Crop | undefined) => void, 
    isLoading: boolean 
}) => {
    const daysOfWeek = useMemo(() => ['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => <div key={i} className="text-center font-bold text-sm text-muted-foreground">{day}</div>), []);

    const calendarDays = useMemo(() => {
        const monthStart = startOfMonth(currentDate);
        const firstDayOfMonth = getDay(monthStart);
        const startingDayOfWeek = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

        const daysInMonthArray = eachDayOfInterval({ start: monthStart, end: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0) });

        const getWeekOfMonth = (date: Date): number => {
            const firstDay = startOfMonth(date);
            const dayOfMonth = date.getDate();
            const dayOfWeekOfFirst = (getDay(firstDay) === 0) ? 6 : getDay(firstDay) - 1;
            return Math.ceil((dayOfMonth + dayOfWeekOfFirst) / 7);
        }

        const days = Array.from({ length: startingDayOfWeek }, (_, i) => <div key={`empty-${i}`} className="p-1"></div>);

        days.push(...daysInMonthArray.map(day => {
            const weekOfMonth = getWeekOfMonth(day);
            const cropForDay = cropsForMonth.find(c => c.week === weekOfMonth);
            const isSelected = selectedDate && isSameDay(day, selectedDate);

            const dayContent = (
                <div onClick={() => onDayClick(day, cropForDay)} className={`text-center bg-card aspect-square flex flex-col justify-between items-center rounded-lg cursor-pointer transition-all duration-200 group relative p-2`}>
                    <div className={`absolute inset-0 transition-all duration-300 rounded-lg group-hover:bg-black/5 ${isSelected ? 'ring-2 ring-primary' : ''}`} ></div>
                    <span className={`font-semibold z-10 self-start ${isToday(day) ? 'font-extrabold text-primary' : 'text-foreground'} group-hover:text-black`}>{format(day, 'd')}</span>
                    <div className="flex-grow flex items-center justify-center z-10">
                        {cropForDay ? (
                            <CropIcon cropId={cropForDay.id} className="text-2xl" />
                        ) : (day.getDate() % 7 === 3 && <Moon className={`h-4 w-4 text-slate-400/80`} />)}
                    </div>
                </div>
            );

            if (cropForDay) {
                return (
                    <TooltipProvider key={day.toString()} delayDuration={150}><Tooltip><TooltipTrigger asChild>{dayContent}</TooltipTrigger><TooltipContent><p>Ideal para sembrar {cropForDay.name}</p></TooltipContent></Tooltip></TooltipProvider>
                );
            }
            return <div key={day.toString()}>{dayContent}</div>;
        }));

        return days;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDate, selectedDate, cropsForMonth, onDayClick]);

    if (isLoading) {
        return (
            <Card className="p-4 rounded-2xl shadow-lg border-0 bg-card">
                <div className="grid grid-cols-7 gap-1 mb-3">{daysOfWeek}</div>
                <div className="grid grid-cols-7 gap-1.5">{Array.from({ length: 35 }).map((_, i) => <Skeleton key={i} className="aspect-square bg-slate-200" />)}</div>
            </Card>
        );
    }

    return (
        <Card className="p-4 rounded-2xl shadow-lg border-0 bg-card">
            <div className="grid grid-cols-7 gap-1 mb-3">{daysOfWeek}</div>
            <div className="grid grid-cols-7 gap-1.5">{calendarDays}</div>
        </Card>
    );
};

// --- Componente Principal ---
export default function CalendarPage() {
    // Estados generales
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<Category>('Verduras');
    
    // Estados de búsqueda
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Estados de la tarjeta de información y el modal
    const [activeCrop, setActiveCrop] = useState<Crop | null>(null);
    const [selectedModalCrop, setSelectedModalCrop] = useState<ModalData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const realSeason = getSeason(new Date());

    // --- Lógica de Datos ---
    const monthKey = useMemo(() => format(currentDate, 'MMMM', { locale: es }).toLowerCase(), [currentDate]);

    const cropsForCurrentMonth = useMemo(() => {
        const allCropsInMonth = plantingData[monthKey]?.crops || [];
        return allCropsInMonth.filter(crop => crop.category === activeCategory);
    }, [monthKey, activeCategory]);

    const allCropsForSearch: SearchableCrop[] = useMemo(() => 
        Object.entries(cropDetails).map(([id, data]) => ({ id, ...data }))
    , []);

    const allCropsFromPlantingData = useMemo(() => 
        Object.values(plantingData).flatMap(month => month.crops)
    , []);

    const searchResults = useMemo(() => {
        if (!searchQuery) return [];
        return allCropsForSearch.filter(crop => crop.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, allCropsForSearch]);

    // --- Efectos ---

    // Efecto para la selección de cultivo por defecto al cambiar de mes o categoría
    useEffect(() => {
        if (isSearching) return;
        
        const firstCropOfMonth = cropsForCurrentMonth[0];
        
        if (firstCropOfMonth) {
            setActiveCrop(firstCropOfMonth);
            const dayOfFirstCrop = (firstCropOfMonth.week - 1) * 7 + 1;
            const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayOfFirstCrop);
            setSelectedDate(newSelectedDate);
        } else {
            setActiveCrop(null);
            setSelectedDate(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cropsForCurrentMonth]); // Se ejecuta cuando cambian los cultivos (mes o categoría)

    // Efecto para el estado de carga
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [monthKey, activeCategory]);


    // --- Manejadores de Eventos ---

    const handleDayClick = (day: Date, crop: Crop | undefined) => {
        setSelectedDate(day);
        if (crop) {
            setActiveCrop(crop);
        }
    };
    
    const handleOpenModal = (cropId: string) => {
        const details = cropDetails[cropId];
        if (details) {
            const originalCrop = allCropsFromPlantingData.find(c => c.id === cropId);
            const modalData: ModalData = {
                id: cropId,
                imageId: originalCrop?.imageId, 
                ...details
            };
            setSelectedModalCrop(modalData);
            setIsModalOpen(true);
        }
    };

    const handleSelectSearchResult = (cropId: string) => {
        handleOpenModal(cropId);
        setIsSearching(false);
        setSearchQuery('');
    };

    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="bg-slate-50 text-foreground font-quicksand min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-10"><h1 className="text-4xl md:text-5xl font-bold text-foreground">Calendario de siembra</h1></header>
                <main>
                    <div className="bg-background p-6 md:p-8 rounded-2xl shadow-xl">
                        <div className="mb-4">
                            {isSearching ? (
                                <SearchBar query={searchQuery} onQueryChange={setSearchQuery} onCancel={() => setIsSearching(false)} />
                            ) : (
                                <CalendarNav 
                                    currentDate={currentDate} 
                                    setCurrentDate={setCurrentDate} 
                                    activeCategory={activeCategory}
                                    setActiveCategory={setActiveCategory}
                                    onSearchClick={() => setIsSearching(true)}
                                />
                            )}
                             {isSearching && searchQuery && <SearchResults results={searchResults} onSelect={handleSelectSearchResult} />}
                        </div>
                       
                        {!isSearching && (
                            <>
                                <SeasonPills activeSeason={realSeason} />
                                <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start animate-in fade-in-0">
                                    <div className="lg:col-span-10 xl:col-span-7">
                                        <CalendarGrid currentDate={currentDate} selectedDate={selectedDate} cropsForMonth={cropsForCurrentMonth} onDayClick={handleDayClick} isLoading={isLoading}/>
                                    </div>
                                    <div className="lg:col-span-10 xl:col-span-3">
                                        <InfoCard activeCrop={activeCrop} isLoading={isLoading} onOpenModal={handleOpenModal} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </main>
                {isModalOpen && <CropDetailModal crop={selectedModalCrop} onClose={handleCloseModal} />}
            </div>
        </div>
    );
}
