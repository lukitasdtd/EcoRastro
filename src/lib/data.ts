import type { Pet, Garden, PlantingInfo } from '@/lib/types';

export const adoptionPets: Pet[] = [
  { id: '1', name: 'Buddy', type: 'Perro', breed: 'Golden Retriever', age: 3, imageId: 'pet1' },
  { id: '2', name: 'Bigotes', type: 'Gato', breed: 'Atigrado', age: 2, imageId: 'pet2' },
  { id: '3', name: 'Rocky', type: 'Perro', breed: 'Quiltro', age: 5, imageId: 'pet3' },
  { id: '4', name: 'Luna', type: 'Gato', breed: 'Gato Negro', age: 1, imageId: 'pet4' },
];

export const communityGardens: Garden[] = [
  { id: 'g1', name: 'Huerta Comunitaria Greenleaf', location: 'Av. Jardín 123, Villa Alegre', description: 'Una huerta comunitaria vibrante, enfocada en el cultivo de verduras orgánicas y eventos para la comunidad.' },
  { id: 'g2', name: 'Parcelas El Sol', location: 'Pasaje Las Flores 456, Pueblito', description: 'Parcelas individuales disponibles para arriendo. Ofrecemos herramientas y agua.' },
  { id: 'g3', name: 'El Huerto del Barrio', location: 'Calle Las Raíces 789, Metrópolis', description: 'Una huerta colaborativa donde todos comparten el trabajo y la cosecha.' },
];

export const plantingCalendar: PlantingInfo[] = [
  { month: 'Enero', crops: ['Cebollas', 'Espinacas', 'Lechuga'] },
  { month: 'Febrero', crops: ['Arvejas', 'Rábanos', 'Kale'] },
  { month: 'Marzo', crops: ['Zanahorias', 'Betarragas', 'Acelgas'] },
  { month: 'Abril', crops: ['Tomates', 'Pimientos', 'Brócoli'] },
  { month: 'Mayo', crops: ['Pepinos', 'Zapallitos italianos', 'Porotos'] },
  { month: 'Junio', crops: ['Choclo', 'Calabaza', 'Melones'] },
  { month: 'Julio', crops: ['Zapallos', 'Camotes', 'Okra'] },
  { month: 'Agosto', crops: ['Repollo', 'Coliflor', 'Tomates de otoño'] },
  { month: 'Septiembre', crops: ['Espinacas', 'Lechuga', 'Ajo'] },
  { month: 'Octubre', crops: ['Kale', 'Berzas', 'Nabos'] },
  { month: 'Noviembre', crops: ['Cultivos de cobertura', 'Ajo', 'Cebollas'] },
  { month: 'Diciembre', crops: ['Planificando para la Primavera'] },
];
