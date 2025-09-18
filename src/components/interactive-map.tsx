import { Card, CardContent } from '@/components/ui/card';

export default function InteractiveMap() {
  return (
    <Card className="w-full h-full rounded-xl shadow-lg border-0">
      <CardContent className="p-0 h-full">
        <div className="relative w-full h-full bg-muted/50 rounded-xl flex items-center justify-center overflow-hidden">
            <div className="text-center text-muted-foreground">
                <p>Contenido del mapa se mostrará aquí</p>
            </div>

            {/* Mock Map Pins */}
             <div className="absolute top-[20%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
               <div className="flex items-center gap-2 bg-background/90 px-3 py-1.5 rounded-full shadow-md border backdrop-blur-sm">
                 <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                 <span className="text-xs font-medium">Mascota Perdida</span>
               </div>
            </div>
             <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center gap-2 bg-background/90 px-3 py-1.5 rounded-full shadow-md border backdrop-blur-sm">
                 <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                  <span className="text-xs font-medium">Huerta</span>
                </div>
            </div>
             <div className="absolute top-[60%] left-[75%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center gap-2 bg-background/90 px-3 py-1.5 rounded-full shadow-md border backdrop-blur-sm">
                 <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-medium">Adopción</span>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
