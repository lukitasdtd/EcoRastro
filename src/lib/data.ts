import type { Pet, Garden, PlantingInfo, Shelter } from '@/lib/types';

export interface Crop {
  id: string;
  name: string;
  type: 'Verdura' | 'Fruta' | 'Hierba';
  imageId: string;
  imageHint: string;
}

export interface MonthlyPlantingData {
  crops: Crop[];
  featuredCrop: Crop;
}

export const adoptionPets: Pet[] = [
  { id: '1', name: 'Buddy', type: 'Perro', breed: 'Golden Retriever', age: 3, imageId: 'pet1' },
  { id: '2', name: 'Bigotes', type: 'Gato', breed: 'Atigrado', age: 2, imageId: 'pet2' },
  { id: '3', name: 'Rocky', type: 'Perro', breed: 'Quiltro', age: 5, imageId: 'pet3' },
  { id: '4', name: 'Luna', type: 'Gato', breed: 'Gato Negro', age: 1, imageId: 'pet4' },
];

export const communityGardens: Garden[] = [
  { id: 'g1', name: 'Huerta Comunitaria Greenleaf', location: 'Av. Jardín 123, Villa Alegre', description: 'Una huerta comunitaria vibrante, enfocada en el cultivo de verduras orgánicas y eventos para la comunidad.', imageId: 'garden1' },
  { id: 'g2', name: 'Parcelas El Sol', location: 'Pasaje Las Flores 456, Pueblito', description: 'Parcelas individuales disponibles para arriendo. Ofrecemos herramientas y agua.', imageId: 'garden1' },
  { id: 'g3', name: 'El Huerto del Barrio', location: 'Calle Las Raíces 789, Metrópolis', description: 'Una huerta colaborativa donde todos comparten el trabajo y la cosecha.', imageId: 'garden1' },
];

export const plantingData: Record<string, MonthlyPlantingData> = {
  enero: {
    crops: [{ id: 'cebolla', name: 'Cebolla', type: 'Verdura', imageId: 'crop-onion', imageHint: 'onion bulb' }],
    featuredCrop: { id: 'cebolla', name: 'Cebolla', type: 'Verdura', imageId: 'crop-onion', imageHint: 'onion bulb' },
  },
  febrero: {
    crops: [{ id: 'rabano', name: 'Rábano', type: 'Verdura', imageId: 'crop-radish', imageHint: 'radish vegetable' }],
    featuredCrop: { id: 'rabano', name: 'Rábano', type: 'Verdura', imageId: 'crop-radish', imageHint: 'radish vegetable' },
  },
  marzo: {
    crops: [{ id: 'zanahoria', name: 'Zanahoria', type: 'Verdura', imageId: 'crop-carrot', imageHint: 'carrot bunch' }],
    featuredCrop: { id: 'zanahoria', name: 'Zanahoria', type: 'Verdura', imageId: 'crop-carrot', imageHint: 'carrot bunch' },
  },
  abril: {
    crops: [{ id: 'brocoli', name: 'Brócoli', type: 'Verdura', imageId: 'crop-broccoli', imageHint: 'broccoli head' }],
    featuredCrop: { id: 'brocoli', name: 'Brócoli', type: 'Verdura', imageId: 'crop-broccoli', imageHint: 'broccoli head' },
  },
  mayo: {
    crops: [{ id: 'pepino', name: 'Pepino', type: 'Verdura', imageId: 'crop-cucumber', imageHint: 'cucumber fresh' }],
    featuredCrop: { id: 'pepino', name: 'Pepino', type: 'Verdura', imageId: 'crop-cucumber', imageHint: 'cucumber fresh' },
  },
  junio: {
    crops: [{ id: 'choclo', name: 'Choclo', type: 'Verdura', imageId: 'crop-corn', imageHint: 'corn cob' }],
    featuredCrop: { id: 'choclo', name: 'Choclo', type: 'Verdura', imageId: 'crop-corn', imageHint: 'corn cob' },
  },
  julio: {
    crops: [{ id: 'zapallo', name: 'Zapallo', type: 'Verdura', imageId: 'crop-pumpkin', imageHint: 'pumpkin squash' }],
    featuredCrop: { id: 'zapallo', name: 'Zapallo', type: 'Verdura', imageId: 'crop-pumpkin', imageHint: 'pumpkin squash' },
  },
  agosto: {
    crops: [{ id: 'coliflor', name: 'Coliflor', type: 'Verdura', imageId: 'crop-cauliflower', imageHint: 'cauliflower head' }],
    featuredCrop: { id: 'coliflor', name: 'Coliflor', type: 'Verdura', imageId: 'crop-cauliflower', imageHint: 'cauliflower head' },
  },
  septiembre: {
    crops: [{ id: 'tomate', name: 'Tomate Cherry', type: 'Fruta', imageId: 'crop-tomato', imageHint: 'cherry tomato' }],
    featuredCrop: { id: 'tomate', name: 'Tomate Cherry', type: 'Fruta', imageId: 'crop-tomato', imageHint: 'cherry tomato' },
  },
  octubre: {
    crops: [{ id: 'lechuga', name: 'Lechuga', type: 'Verdura', imageId: 'crop-lettuce', imageHint: 'lettuce head' }],
    featuredCrop: { id: 'lechuga', name: 'Lechuga', type: 'Verdura', imageId: 'crop-lettuce', imageHint: 'lettuce head' },
  },
  noviembre: {
    crops: [{ id: 'albahaca', name: 'Albahaca', type: 'Hierba', imageId: 'crop-basil', imageHint: 'basil leaves' }],
    featuredCrop: { id: 'albahaca', name: 'Albahaca', type: 'Hierba', imageId: 'crop-basil', imageHint: 'basil leaves' },
  },
  diciembre: {
    crops: [{ id: 'pimiento', name: 'Pimiento', type: 'Verdura', imageId: 'crop-pepper', imageHint: 'bell pepper' }],
    featuredCrop: { id: 'pimiento', name: 'Pimiento', type: 'Verdura', imageId: 'crop-pepper', imageHint: 'bell pepper' },
  },
};

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

export { type Shelter };
