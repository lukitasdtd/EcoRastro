'use client';

import { useState } from 'react';
import { reportedPets } from '@/lib/data';
import type { ReportedPet } from '@/lib/types';
import ReportedPetCard from '@/components/reported-pet-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, ListFilter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function SearchPetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    species: 'all',
    status: 'all',
    size: 'all',
  });
  const [filteredPets, setFilteredPets] = useState<ReportedPet[]>(reportedPets);

  // filtros de búsqueda 
  const handleFilterChange = () => {
    let pets = reportedPets.filter(pet => 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filters.species !== 'all') {
      pets = pets.filter(pet => pet.species === filters.species);
    }
    if (filters.status !== 'all') {
      pets = pets.filter(pet => pet.status === filters.status);
    }
    if (filters.size !== 'all') {
      pets = pets.filter(pet => pet.size === filters.size);
    }

    setFilteredPets(pets);
  };

  // se crea función para manejar click en botón de búsqueda
  const handleSearchClick = () => {
      handleFilterChange();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFilters(prev => ({...prev, [name]: value}));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
          Buscar Mascotas Reportadas
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/60">
          Encuentra mascotas perdidas o avistadas por la comunidad. Usa los filtros para afinar tu búsqueda.
        </p>
      </section>

      {/* Barra de Búsqueda y Filtros */}
      <Card className="p-4 md:p-6 mb-12 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="lg:col-span-2">
            <Label htmlFor="search">Palabra clave</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Busca por nombre, raza, comuna..."
                className="pl-10"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="species">Especie</Label>
            <Select value={filters.species} onValueChange={handleSelectChange('species')}>
              <SelectTrigger id="species">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="Perro">Perro</SelectItem>
                <SelectItem value="Gato">Gato</SelectItem>
                <SelectItem value="Otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select value={filters.status} onValueChange={handleSelectChange('status')}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Perdido">Perdido</SelectItem>
                <SelectItem value="Encontrado">Encontrado</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="sm:col-span-2 lg:col-span-1">
            <Label htmlFor="size">Tamaño</Label>
            <Select value={filters.size} onValueChange={handleSelectChange('size')}>
              <SelectTrigger id="size">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Pequeño">Pequeño</SelectItem>
                <SelectItem value="Mediano">Mediano</SelectItem>
                <SelectItem value="Grande">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSearchClick} className="w-full lg:hidden sm:col-span-2">
            <Search className="mr-2 h-4 w-4" /> Buscar
          </Button>
        </div>
         <div className="mt-4 flex justify-end">
            <Button onClick={handleSearchClick} className="hidden lg:flex">
                <ListFilter className="mr-2 h-4 w-4" /> Aplicar Filtros
            </Button>
         </div>
      </Card>

      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredPets.length > 0 ? (
          filteredPets.map(pet => (
            <ReportedPetCard key={pet.id} pet={pet} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-xl text-foreground/70">No se encontraron mascotas con esos criterios.</p>
          </div>
        )}
      </div>
    </div>
  );
}
