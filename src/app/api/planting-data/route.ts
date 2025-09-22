// TAREA: Crear una API para el Calendario de Siembra
// Este archivo crea un "Route Handler" en Next.js, que actúa como un endpoint de API.
// Cumple con los siguientes requisitos:
// - Define una función `GET` que se ejecuta cuando se hace una petición a `/api/planting-data`.
// - Por ahora, devuelve los datos estáticos desde `src/lib/data.ts` en formato JSON.
// - Simula el comportamiento de una API real, preparando el terreno para una futura conexión a una base de datos.
// - Utiliza `NextResponse` para enviar una respuesta JSON estandarizada.

import { NextResponse } from 'next/server';
import { plantingData } from '@/lib/data';

export async function GET() {
  try {
    // Cuando tengamos una base de datos, aquí iría la lógica para consultarla.
    // Por ahora, simplemente devolvemos los datos estáticos.
    return NextResponse.json(plantingData);
  } catch (error) {
    // Manejo básico de errores
    return NextResponse.json({ message: 'Error al obtener los datos de siembra' }, { status: 500 });
  }
}
