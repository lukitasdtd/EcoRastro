export interface Pet {
  id: string;
  name: string;
  type: 'Perro' | 'Gato';
  breed: string;
  age: number;
  imageId: string;
}

export interface Garden {
  id: string;
  name: string;
  location: string;
  description: string;
  imageId: string;
}

export interface PlantingInfo {
  month: string;
  crops: string[];
}

export interface Shelter {
  id: string;
  name: string;
  location: string;
  imageId: string;
  rating: number;
  reviewCount: number;
}

export interface ReportedPet {
  id: string;
  name: string;
  species: 'Perro' | 'Gato' | 'Otro';
  breed: string;
  status: 'Perdido' | 'Encontrado';
  date: string;
  location: string;
  description: string;
  imageId: string;
  size: 'Pequeño' | 'Mediano' | 'Grande';
  temperament?: string[];
  distinguishingMarks?: string;
  wearsCollar?: boolean;
  reward?: boolean;
  contactName?: string;
  contactPhone?: string;
  preferredContact?: 'telefono' | 'whatsapp' | 'correo';
}
