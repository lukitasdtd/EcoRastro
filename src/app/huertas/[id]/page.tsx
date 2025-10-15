import { Garden } from "@/lib/types";
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';

// función para obtener los datos de la huerta
async function getGardenData(id: string): Promise<Garden | null> {
  try {
    const res = await fetch(`http://localhost:3001/api/gardens/${id}`);
    if (!res.ok) {
      console.error("Error fetching garden:", res.status, res.statusText);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch garden data:", error);
    return null;
  }
}

// función para formatear la dirección en huerta
const formatAddress = (address: Garden['direccion']) => {
    if (typeof address === 'string') {
        try {
            const parsed = JSON.parse(address);
            return `${parsed.calle}, ${parsed.comuna}, ${parsed.region}`;
        } catch (e) {
            return address;
        }
    }
    if (typeof address === 'object' && address !== null) {
        return `${address.calle}, ${address.comuna}, ${address.region}`;
    }
    return 'Ubicación no disponible';
};

//componente de página de detalle de huertas
export default async function GardenDetailPage({ params }: { params: { id: string } }) {
  const garden = await getGardenData(params.id);

  if (!garden) {
    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-2xl font-bold">Huerta no encontrada.</h1>
        </div>
    );
  }

  const imageUrl = garden.image_url ? `http://localhost:3001/${garden.image_url}` : '/placeholder.jpg';
  const location = formatAddress(garden.direccion);

  //contenido de la página
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Columna de la imagen */}
            <div className="w-full h-96 relative rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={imageUrl}
                    alt={garden.nombre}
                    layout="fill"
                    objectFit="cover"
                    onError={(e) => { e.currentTarget.src = '/placeholder.jpg'; }}
                />
            </div>

            {/* Columna de la información */}
            <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-4">{garden.nombre}</h1>
                
                <div className="flex items-center text-lg text-gray-600 mb-4">
                    <MapPin className="h-6 w-6 mr-2" />
                    <span>{location}</span>
                </div>
                
                <p className="text-gray-700 text-base mb-6">{garden.descripcion}</p>
                
                <div className="space-y-3">
                    {garden.cont_email && (
                        <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-3 text-gray-500" />
                            <a href={`mailto:${garden.cont_email}`} className="text-blue-600 hover:underline">{garden.cont_email}</a>
                        </div>
                    )}
                    {garden.cont_tel && (
                        <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-3 text-gray-500" />
                            <span className="text-gray-800">{garden.cont_tel}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}
