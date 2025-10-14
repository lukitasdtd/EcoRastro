'use client';

import { Input } from "@/components/ui/input";

interface GardenFinderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function GardenFinder({ searchTerm, setSearchTerm }: GardenFinderProps) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-3xl mx-auto -mt-20 z-10 relative border border-gray-200">
      <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4">Busca una huerta</h3>
      <p className="text-center text-gray-500 mb-6">Encuentra huertas por nombre, comuna o región.</p>
      <div className="relative">
        <Input
          type="text"
          placeholder="Ej: 'Mi Huerta', 'Providencia', 'Metropolitana'..."
          className="w-full text-base md:text-lg pl-10 pr-4 py-6 rounded-full border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg className="w-6 h-6 absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}
