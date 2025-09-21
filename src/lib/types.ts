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
