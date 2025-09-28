/*
 *************************************************************************
 *_ Punto Central de Datos de la Aplicación
 *************************************************************************
 */

// --- Función de Utilidad para crear URL amigables (RESTAURADA) ---
export const slugify = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')       // Reemplaza espacios con -
    .replace(/[^\w\-]+/g, '')   // Elimina caracteres no alfanuméricos excepto -
    .replace(/\-\-+/g, '-')     // Reemplaza múltiples - con uno solo
    .replace(/^-+/, '')          // Elimina - del inicio
    .replace(/-+$/, '');         // Elimina - del final
};


// --- Tipos de Datos ---

// Tipo para los puntos simples del mapa interactivo
export type MapPoint = {
  lat: number;
  lng: number;
  title: string;
  desc: string;
  type: 'pet' | 'garden';
  image: string;
  link: string;
};

// Tipo para los reportes detallados de mascotas
export type ReportedPet = {
  id: string; 
  name: string;
  type: 'Perro' | 'Gato' | 'Pájaro' | 'Otro';
  breed: string;
  status: 'lost' | 'found';
  lastSeenLocation: string;
  lastSeenDate: string;
  description: string;
  reward?: number;
  imageId: string; 
};

// --- Tipos para el Calendario de Siembra ---

export type Crop = {
  id: string; 
  name: string;
  imageId: string; 
  week: number; // Semana del mes (1-4) en la que es ideal plantar
  category: 'Verduras' | 'Frutas' | 'Hierbas';
};

export type MonthlyPlantingData = {
  crops: Crop[];
  tips: string[];
};

export type PlantingData = {
  [month: string]: MonthlyPlantingData;
};


// --- Lista Maestra de Puntos del Mapa ---
export const allMapPoints: MapPoint[] = [
  { lat: -33.45, lng: -70.65, title: 'Perro Perdido Providencia', desc: 'Golden Retriever encontrado.', type: 'pet', image: '/gato-naranjo.jpg', link: `/mascotas/reporte/rp1` },
  { lat: -33.48, lng: -70.58, title: 'Huerta Comunitaria Ñuñoa', desc: 'Cultivos orgánicos en Ñuñoa.', type: 'garden', image: '/gato-naranjo.jpg', link: `/huertas/huerta-comunitaria-nunoa` },
  { lat: -33.50, lng: -70.68, title: 'Gato Encontrado La Cisterna', desc: 'Gato naranja visto en paradero 21.', type: 'pet', image: '/gato-naranjo.jpg', link: `/mascotas/reporte/rp2` },
  { lat: -33.43, lng: -70.62, title: 'Jardín Vertical Santiago', desc: 'Iniciativa vecinal en Santiago Centro.', type: 'garden', image: '/gato-naranjo.jpg', link: `/huertas/jardin-vertical-santiago` },
];

// --- Lista de Reportes de Mascotas ---
export const reportedPets: ReportedPet[] = [
  { id: 'rp1', name: 'Toby', type: 'Perro', breed: 'Golden Retriever', status: 'found', lastSeenLocation: 'Providencia, cerca del Costanera Center', lastSeenDate: '2024-07-20', description: 'Encontrado cerca del Costanera Center. Es muy amigable y parece bien cuidado. Llevaba un collar azul pero sin placa de identificación.', reward: 0, imageId: 'img1' },
  { id: 'rp2', name: 'Milo', type: 'Gato', breed: 'Naranja atigrado', status: 'lost', lastSeenLocation: 'La Cisterna, Paradero 21', lastSeenDate: '2024-07-19', description: 'Gato macho, muy cariñoso. Se perdió desde casa. Es de color naranja con rayas y tiene la punta de la cola blanca.', reward: 50000, imageId: 'img2' },
  { id: 'rp3', name: 'Cachorros en Adopción', type: 'Perro', breed: 'Mestizos', status: 'found', lastSeenLocation: 'Parque Araucano, Las Condes', lastSeenDate: '2024-07-21', description: 'Jornada de adopción este fin de semana. Varios cachorros mestizos de tamaño mediano buscan un hogar responsable y cariñoso.', imageId: 'img3' },
  { id: 'rp4', name: 'Piolín', type: 'Pájaro', breed: 'Canario', status: 'lost', lastSeenLocation: 'Recoleta, cerca del Cerro San Cristóbal', lastSeenDate: '2024-07-22', description: 'Canario de color amarillo intenso. Se escapó de su jaula. Responde al nombre de Piolín y le gusta cantar por las mañanas.', imageId: 'img4' },
];

// --- Datos para el Calendario de Siembra ---
export const plantingData: PlantingData = {
  enero: {
    crops: [
      { id: 'tomate', name: 'Tomate', imageId: 'img_tomato', week: 1, category: 'Frutas' },
      { id: 'albahaca', name: 'Albahaca', imageId: 'img_basil', week: 3, category: 'Hierbas' },
    ],
    tips: ['Siembra: Proteger del sol directo en horas de máximo calor.', 'Riego: Mantener el suelo húmedo para la albahaca.']
  },
  febrero: {
    crops: [{ id: 'lechuga', name: 'Lechuga', imageId: 'img_lettuce', week: 2, category: 'Verduras' }],
    tips: ['Siembra: Buscar variedades de verano resistentes al calor.', 'Cuidado: Vigilar la aparición de pulgones.']
  },
  marzo: {
    crops: [
      { id: 'zanahoria', name: 'Zanahoria', imageId: 'img_carrot', week: 1, category: 'Verduras' },
      { id: 'tomate', name: 'Tomate', imageId: 'img_tomato', week: 4, category: 'Frutas' },
    ],
    tips: ['Siembra: Asegurar suelo suelto y profundo para las zanahorias.', 'Cosecha: Recolectar los últimos tomates antes de que refresque.']
  },
  abril: {
    crops: [{ id: 'espinaca', name: 'Espinaca', imageId: 'img_spinach', week: 2, category: 'Verduras' }],
    tips: ['Siembra: Ideal para climas más frescos que comienzan.', 'Asociación: Crece bien junto a las fresas.']
  },
  mayo: {
    crops: [
      { id: 'ajo', name: 'Ajo', imageId: 'img_garlic', week: 1, category: 'Verduras' },
      { id: 'lechuga', name: 'Lechuga', imageId: 'img_lettuce', week: 3, category: 'Verduras' },
    ],
    tips: ['Siembra: Plantar dientes individuales con la punta hacia arriba.', 'Cosecha: Recolectar hojas exteriores de la lechuga para producción continua.']
  },
  junio: {
    crops: [{ id: 'habas', name: 'Habas', imageId: 'img_beans', week: 1, category: 'Verduras' }],
    tips: ['Siembra: Son muy resistentes al frío, ideal para el mes más corto.', 'Soporte: Pueden necesitar tutores a medida que crecen.']
  },
  julio: {
    crops: [
      { id: 'cebolla', name: 'Cebolla', imageId: 'img_onion', week: 2, category: 'Verduras' },
      { id: 'espinaca', name: 'Espinaca', imageId: 'img_spinach', week: 4, category: 'Verduras' },
    ],
    tips: ['Siembra: Empezar almácigos de cebolla en interior.', 'Cosecha: Última oportunidad para cosechar espinacas antes de que florezcan.']
  },
  agosto: {
    crops: [{ id: 'puerros', name: 'Puerros', imageId: 'img_leek', week: 3, category: 'Verduras' }],
    tips: ['Siembra: Requieren un largo periodo de crecimiento, empezar ahora.', 'Cuidado: Aporcar tierra alrededor de la base para blanquear el tallo.']
  },
  septiembre: {
    crops: [
      { id: 'tomate-cherry', name: 'Tomate Cherry', imageId: 'img_cherry_tomato', week: 3, category: 'Frutas' },
      { id: 'rabanitos', name: 'Rabanitos', imageId: 'img_radish', week: 1, category: 'Verduras' },
    ],
    tips: ['Los rabanitos crecen muy rápido, ideales para la impaciencia primaveral.', 'Los tomates cherry necesitan mucho sol para desarrollar su sabor.']
  },
  octubre: {
    crops: [{ id: 'acelga', name: 'Acelga', imageId: 'img_chard', week: 2, category: 'Verduras' }],
    tips: ['Siembra: Muy productiva y resistente, se puede cosechar hoja por hoja.', 'Cuidado: Tolera bien diferentes tipos de suelo.']
  },
  noviembre: {
    crops: [
      { id: 'zapallo', name: 'Zapallo', imageId: 'img_pumpkin', week: 1, category: 'Frutas' },
      { id: 'zanahoria', name: 'Zanahoria', imageId: 'img_carrot', week: 4, category: 'Verduras' },
    ],
    tips: ['Siembra: El zapallo necesita mucho espacio para expandirse.', 'Cosecha: Sacar las últimas zanahorias sembradas en otoño.']
  },
  diciembre: {
    crops: [{ id: 'pimiento', name: 'Pimiento', imageId: 'img_pepper', week: 1, category: 'Frutas' }],
    tips: ['Siembra: Necesitan mucho calor y sol para germinar y prosperar.', 'Protección: Cuidar de los cambios bruscos de temperatura.']
  }
};


// --- Datos Derivados (para componentes específicos) ---
export const petPoints = allMapPoints.filter(p => p.type === 'pet');
export const gardenPoints = allMapPoints.filter(p => p.type === 'garden');
export const adoptionPets = reportedPets.filter(p => p.status === 'found');
