import { Card, CardContent } from '@/components/ui/card';

export default function InteractiveMap() {
  return (
    <Card className="overflow-hidden shadow-sm rounded-2xl w-full h-full border">
      <CardContent className="p-0">
        <div className="relative w-full h-full bg-muted flex items-center justify-center">
            {/* Placeholder for map content */}
            <div className="text-center text-muted-foreground">
                <p className="font-semibold">Mapa Interactivo</p>
                <p className="text-sm">Contenido del mapa se mostrará aquí</p>
            </div>

            {/* Mock Map Pins */}
             <div className="absolute top-[20%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
               <div className="flex items-center gap-2 bg-background/80 px-3 py-1.5 rounded-full shadow-lg border backdrop-blur-sm">
                 <div className="h-2 w-2 rounded-full bg-red-500"></div>
                 <span className="text-xs font-semibold">Mascota Perdida</span>
               </div>
            </div>
             <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center gap-2 bg-background/80 px-3 py-1.5 rounded-full shadow-lg border backdrop-blur-sm">
                 <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-xs font-semibold">Huerta</span>
                </div>
            </div>
             <div className="absolute top-[60%] left-[75%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center gap-2 bg-background/80 px-3 py-1.5 rounded-full shadow-lg border backdrop-blur-sm">
                 <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-semibold">Adopción</span>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
