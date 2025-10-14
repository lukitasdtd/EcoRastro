export interface Address {
    calle: string;
    comuna: string;
    region: string;
}

export interface Garden {
    id: number;
    nombre: string;
    descripcion: string;
    direccion: Address | string; // Puede ser un objeto o un JSON string
    image_url: string;
    user_rut: string;
    cont_email: string;
    cont_tel: string;
    fecha_creacion: string; // ISO 8601 string
}

export interface PetComment {
    id: string; // O number, dependiendo de la implementación futura
    author: string;
    date: string;
    location: string;
    comment: string;
}

export interface ReportedPet {
    id: number;
    nombre_mascota: string;
    especie: string;
    raza: string;
    color: string;
    tamano: string;
    descripcion: string;
    image_url: string;
    ultimo_lugar_visto: string;
    fecha_reporte: string; // ISO 8601 string
    estado_reporte: 'encontrado' | 'perdido';
    user_rut: string;
    // Los campos de contacto y otros detalles se podrían añadir si es necesario en el futuro
    // Por ejemplo: contactName, contactPhone, etc.
}

// --- Tipos que ya no parecen estar en uso activo en el backend ---
// Se mantienen por si algún componente antiguo aún los necesita, pero deberían ser deprecados.

export interface Pet {
    id: string;
    name: string;
    type: 'Perro' | 'Gato';
    breed: string;
    age: number;
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
