/*
 *************************************************************************
 *_ Punto Central de Datos de la Aplicación
 *************************************************************************
 */

import type { ReportedPet } from './types';

// --- Función de Utilidad para crear URL amigables ---
export const slugify = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// --- Tipos de Datos ---

// Tipo para los puntos simples del mapa interactivo
export type MapPoint = {
  id: number; // ID numérico único para cada punto
  lat: number;
  lng: number;
  title: string;
  desc: string;
  type: 'pet' | 'garden';
  image: string;
  link: string; // El link original se mantiene por si se usa en otro lado
};

// TIPO NUEVO: para el calendario de siembra
export type Crop = {
  id: string;          // ej: "tomate"
  name: string;        // ej: "Tomate"
  category: 'Verduras' | 'Frutas' | 'Hierbas';
  week: number;        // Semana del mes (1-4) para la siembra/plantación
  imageId: string;     // ID para vincular a una imagen de placeholder
};

// Tipo para la estructura de datos de siembra
export type PlantingData = {
  [month: string]: {
    crops: Crop[];
  };
};


// --- Lista Maestra de Puntos del Mapa ---
// Se ha añadido un ID numérico único a cada punto.
export const allMapPoints: MapPoint[] = [
  { id: 1, lat: -33.45, lng: -70.65, title: 'Perro Perdido Providencia', desc: 'Golden Retriever encontrado.', type: 'pet', image: '/gato-naranjo.jpg', link: `/mascotas/reporte/rp1` },
  { id: 2, lat: -33.48, lng: -70.58, title: 'Huerta Comunitaria Ñuñoa', desc: 'Cultivos orgánicos en Ñuñoa.', type: 'garden', image: '/gato-naranjo.jpg', link: `/huertas/huerta-comunitaria-nunoa` },
  { id: 3, lat: -33.50, lng: -70.68, title: 'Gato Encontrado La Cisterna', desc: 'Gato naranja visto en paradero 21.', type: 'pet', image: '/gato-naranjo.jpg', link: `/mascotas/reporte/rp2` },
  { id: 4, lat: -33.43, lng: -70.62, title: 'Jardín Vertical Santiago', desc: 'Iniciativa vecinal en Santiago Centro.', type: 'garden', image: '/gato-naranjo.jpg', link: `/huertas/jardin-vertical-santiago` },
  { id: 5, lat: -33.46, lng: -70.60, title: 'Punto de Adopción Las Condes', desc: 'Jornada de adopción de cachorros.', type: 'pet', image: '/gato-naranjo.jpg', link: `/mascotas/reporte/rp3` },
  { id: 6, lat: -33.49, lng: -70.70, title: 'Huerta Escolar Maipú', desc: 'Proyecto educativo en Maipú.', type: 'garden', image: '/gato-naranjo.jpg', link: `/huertas/huerta-escolar-maipu` },
  { id: 7, lat: -33.42, lng: -70.66, title: 'Canario Perdido Recoleta', desc: 'Canario amarillo visto cerca del cerro.', type: 'pet', image: '/gato-naranjo.jpg', link: `/mascotas/reporte/rp4` },
  { id: 8, lat: -33.51, lng: -70.61, title: 'Composta Comunitaria La Florida', desc: 'Centro de compostaje en La Florida.', type: 'garden', image: '/gato-naranjo.jpg', link: `/huertas/composta-comunitaria-la-florida` },
];

// --- Lista de Reportes de Mascotas ---
// CORREGIDO: Se ajustan los datos para que coincidan con el tipo `ReportedPet`
export const reportedPets: ReportedPet[] = [
  {
    id: 1,
    nombre_mascota: 'Toby',
    especie: 'Perro',
    raza: 'Golden Retriever',
    color: 'Dorado',
    tamano: 'Grande',
    descripcion: 'Encontrado cerca del Costanera Center. Es muy amigable y parece bien cuidado. Llevaba un collar azul pero sin placa de identificación.',
    image_url: '/img1.jpg',
    ultimo_lugar_visto: 'Providencia, cerca del Costanera Center',
    fecha_reporte: '2024-07-20',
    estado_reporte: 'encontrado',
    user_rut: '11111111-1',
  },
  {
    id: 2,
    nombre_mascota: 'Milo',
    especie: 'Gato',
    raza: 'Naranja atigrado',
    color: 'Naranja',
    tamano: 'Mediano',
    descripcion: 'Gato macho, muy cariñoso. Se perdió desde casa. Es de color naranja con rayas y tiene la punta de la cola blanca.',
    image_url: '/img2.jpg',
    ultimo_lugar_visto: 'La Cisterna, Paradero 21',
    fecha_reporte: '2024-07-19',
    estado_reporte: 'perdido',
    user_rut: '22222222-2',
  },
  {
    id: 3,
    nombre_mascota: 'Cachorros en Adopción',
    especie: 'Perro',
    raza: 'Mestizos',
    color: 'Varios',
    tamano: 'Mediano',
    descripcion: 'Jornada de adopción este fin de semana. Varios cachorros mestizos de tamaño mediano buscan un hogar responsable y cariñoso.',
    image_url: '/img3.jpg',
    ultimo_lugar_visto: 'Parque Araucano, Las Condes',
    fecha_reporte: '2024-07-21',
    estado_reporte: 'encontrado',
    user_rut: '33333333-3',
  },
  {
    id: 4,
    nombre_mascota: 'Piolín',
    especie: 'Otro',
    raza: 'Canario',
    color: 'Amarillo',
    tamano: 'Pequeño',
    descripcion: 'Canario de color amarillo intenso. Se escapó de su jaula. Responde al nombre de Piolín y le gusta cantar por las mañanas.',
    image_url: '/img4.jpg',
    ultimo_lugar_visto: 'Recoleta, cerca del Cerro San Cristóbal',
    fecha_reporte: '2024-07-22',
    estado_reporte: 'perdido',
    user_rut: '44444444-4',
  },
];

// --- Datos para el Calendario de Siembra ---
export const plantingData: PlantingData = {
  enero: {
    crops: [
      { id: 'tomate', name: 'Tomate', category: 'Verduras', week: 1, imageId: 'img1' },
      { id: 'albahaca', name: 'Albahaca', category: 'Hierbas', week: 3, imageId: 'img5' }
    ]
  },
  febrero: {
    crops: [
      { id: 'lechuga', name: 'Lechuga', category: 'Verduras', week: 2, imageId: 'img3' }
    ]
  },
  marzo: {
    crops: [
      { id: 'zanahoria', name: 'Zanahoria', category: 'Verduras', week: 1, imageId: 'img6' }
    ]
  },
  abril: {
    crops: [
      { id: 'espinaca', name: 'Espinaca', category: 'Verduras', week: 2, imageId: 'img7' }
    ]
  },
  mayo: {
    crops: [
      { id: 'ajo', name: 'Ajo', category: 'Verduras', week: 4, imageId: 'img8' }
    ]
  },
  junio: {
    crops: [
      { id: 'habas', name: 'Habas', category: 'Verduras', week: 3, imageId: 'img9' }
    ]
  },
  julio: {
    crops: []
  },
  agosto: {
    crops: [
      { id: 'puerros', name: 'Puerros', category: 'Verduras', week: 1, imageId: 'img10' }
    ]
  },
  septiembre: {
    crops: [
      { id: 'rabanitos', name: 'Rabanitos', category: 'Verduras', week: 2, imageId: 'img11' }
    ]
  },
  octubre: {
    crops: [
      { id: 'acelga', name: 'Acelga', category: 'Verduras', week: 1, imageId: 'img12' }
    ]
  },
  noviembre: {
    crops: []
  },
  diciembre: {
    crops: [
      { id: 'pimiento', name: 'Pimiento', category: 'Verduras', week: 3, imageId: 'img13' }
    ]
  }
};

// --- Datos Derivados (para componentes específicos) ---
export const petPoints = allMapPoints.filter(p => p.type === 'pet');
export const gardenPoints = allMapPoints.filter(p => p.type === 'garden');
// CORREGIDO: Se usa `estado_reporte` para filtrar las mascotas en adopción
export const adoptionPets = reportedPets.filter(p => p.estado_reporte === 'encontrado');
