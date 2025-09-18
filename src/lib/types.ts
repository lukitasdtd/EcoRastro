export interface Pet {
  id: string;
  name: string;
  type: 'Dog' | 'Cat';
  breed: string;
  age: number;
  imageId: string;
}

export interface Garden {
  id: string;
  name: string;
  location: string;
  description: string;
}

export interface PlantingInfo {
  month: string;
  crops: string[];
}
