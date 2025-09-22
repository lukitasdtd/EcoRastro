import type { Pet, Garden, PlantingInfo, Shelter, ReportedPet } from '@/lib/types';

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

export const reportedPets: ReportedPet[] = [
  { id: 'rp1', name: 'Max', species: 'Perro', breed: 'Labrador', status: 'Perdido', date: '2024-07-15', location: 'Ñuñoa, Santiago', description: 'Max es un labrador dorado muy amigable. Se perdió cerca del parque Bustamante.', imageId: 'reported-pet-1', size: 'Grande' },
  { id: 'rp2', name: 'Milo', species: 'Gato', breed: 'Siamés', status: 'Encontrado', date: '2024-07-20', location: 'Providencia, Santiago', description: 'Gato siamés encontrado en la calle. Es muy cariñoso y parece bien cuidado.', imageId: 'reported-pet-2', size: 'Mediano' },
  { id: 'rp3', name: 'Desconocido', species: 'Perro', breed: 'Quiltro', status: 'Encontrado', date: '2024-07-18', location: 'Maipú, Santiago', description: 'Perrita quiltra de tamaño mediano encontrada vagando sola. Tiene un collar rojo.', imageId: 'reported-pet-3', size: 'Mediano' },
  { id: 'rp4', name: 'Pelusa', species: 'Gato', breed: 'Angora', status: 'Perdido', date: '2024-07-21', location: 'Las Condes, Santiago', description: 'Gata blanca muy peluda, responde al nombre de Pelusa. Es algo asustadiza.', imageId: 'reported-pet-4', size: 'Pequeño' },
  { id: 'rp5', name: 'Toby', species: 'Perro', breed: 'Beagle', status: 'Perdido', date: '2024-07-19', location: 'La Florida, Santiago', description: 'Beagle tricolor con una mancha característica en el lomo. Muy juguetón.', imageId: 'reported-pet-5', size: 'Mediano' },
  { id: 'rp6', name: 'Nube', species: 'Gato', breed: 'Común Europeo', status: 'Encontrado', date: '2024-07-22', location: 'Santiago Centro', description: 'Gatito gris y blanco encontrado en el barrio Lastarria. Maúlla mucho.', imageId: 'reported-pet-6', size: 'Pequeño' },
]

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
