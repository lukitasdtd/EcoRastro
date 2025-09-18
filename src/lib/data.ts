import type { Pet, Garden, PlantingInfo } from '@/lib/types';

export const adoptionPets: Pet[] = [
  { id: '1', name: 'Buddy', type: 'Dog', breed: 'Golden Retriever', age: 3, imageId: 'pet1' },
  { id: '2', name: 'Whiskers', type: 'Cat', breed: 'Tabby', age: 2, imageId: 'pet2' },
  { id: '3', name: 'Rocky', type: 'Dog', breed: 'Mixed Breed', age: 5, imageId: 'pet3' },
  { id: '4', name: 'Luna', type: 'Cat', breed: 'Black Cat', age: 1, imageId: 'pet4' },
];

export const communityGardens: Garden[] = [
  { id: 'g1', name: 'Jardín Comunitario Greenleaf', location: '123 Garden Lane, Cityville', description: 'Un vibrante jardín comunitario enfocado en el cultivo de vegetales orgánicos y eventos comunitarios.' },
  { id: 'g2', name: 'Parcelas Sunshine', location: '456 Bloom Blvd, Townburg', description: 'Parcelas individuales disponibles para alquilar. Proporcionamos herramientas y agua.' },
  { id: 'g3', name: 'El Huerto del Pueblo', location: '789 Root Road, Metropolis', description: 'Un jardín colaborativo donde todos comparten el trabajo y la cosecha.' },
];

export const plantingCalendar: PlantingInfo[] = [
  { month: 'Enero', crops: ['Cebollas', 'Espinacas', 'Lechuga'] },
  { month: 'Febrero', crops: ['Guisantes', 'Rábanos', 'Col Rizada'] },
  { month: 'Marzo', crops: ['Zanahorias', 'Remolachas', 'Acelgas'] },
  { month: 'Abril', crops: ['Tomates', 'Pimientos', 'Brócoli'] },
  { month: 'Mayo', crops: ['Pepinos', 'Calabacines', 'Frijoles'] },
  { month: 'Junio', crops: ['Maíz', 'Calabaza', 'Melones'] },
  { month: 'Julio', crops: ['Calabazas', 'Batatas', 'Okra'] },
  { month: 'Agosto', crops: ['Repollo', 'Coliflor', 'Tomates de otoño'] },
  { month: 'Septiembre', crops: ['Espinacas', 'Lechuga', 'Ajo'] },
  { month: 'Octubre', crops: ['Col Rizada', 'Berzas', 'Nabos'] },
  { month: 'Noviembre', crops: ['Cultivos de cobertura', 'Ajo', 'Cebollas'] },
  { month: 'Diciembre', crops: ['Planificando para la Primavera'] },
];
