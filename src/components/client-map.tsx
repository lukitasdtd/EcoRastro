'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Los tipos de datos se pueden importar de forma segura en componentes de cliente
// porque no se incluyen en el bundle final del navegador.
import type { MapPoint } from '@/lib/data';

// El mapa se importa dinámicamente con ssr: false, ya que depende de APIs del navegador.
const Map = dynamic(() => import('@/components/leaflet-map'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
});

// Este es un componente "envoltorio" que renderiza el mapa.
// Al estar en un archivo con 'use client', es seguro usar la lógica de carga dinámica aquí.
export default function ClientMap({ points }: { points: MapPoint[] }) {
  return <Map points={points} />;
}
