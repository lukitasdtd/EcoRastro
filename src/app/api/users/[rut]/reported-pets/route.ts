import { NextResponse } from 'next/server';

// Esta API Route actúa como un PROXY.
// Reenvía la solicitud al backend de Express, asegurándose de que
// ninguna respuesta sea cacheada en el servidor de Next.js.

export async function GET(
  request: Request,
  { params }: { params: { rut: string } }
) {
  const { rut } = params;
  const backendUrl = `http://localhost:5000/api/users/${rut}/reported-pets`;

  console.log(`API_PROXY_PETS: Reenviando petición (SIN CACHÉ) para el RUT: ${rut} a ${backendUrl}`);

  try {
    // LA CLAVE: { cache: 'no-store' }.
    // Esto fuerza a Next.js a hacer una petición fresca al backend cada vez,
    // evitando su propio caché de datos del servidor.
    const apiResponse = await fetch(backendUrl, { cache: 'no-store' });

    if (!apiResponse.ok) {
      console.error(`API_PROXY_PETS: Error desde el backend - Status: ${apiResponse.status}`);
      const errorBody = await apiResponse.text();
      console.error(`API_PROXY_PETS: Cuerpo del error - ${errorBody}`);
      return new NextResponse(errorBody, { status: apiResponse.status, statusText: apiResponse.statusText });
    }

    const data = await apiResponse.json();
    console.log(`API_PROXY_PETS: Petición exitosa, datos recibidos del backend.`);
    return NextResponse.json(data);

  } catch (error) {
    console.error('--- ERROR EN EL PROXY DE MASCOTAS ---', error);
    return NextResponse.json(
      { error: 'No se pudo comunicar con el servicio. Inténtelo más tarde.' },
      { status: 503, statusText: 'Service Unavailable' } 
    );
  }
}
