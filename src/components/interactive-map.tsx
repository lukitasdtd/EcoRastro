import { Card, CardContent } from '@/components/ui/card';

export default function InteractiveMap() {
  return (
    <Card className="w-full h-full rounded-xl shadow-lg border-0 overflow-hidden">
      <CardContent className="p-0 h-full">
        <div className="relative w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d426120.4891131921!2d-70.91001968811802!3d-33.47247285114555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5410425af2f%3A0x8475d53c400f0931!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
          
          <div className="absolute inset-0 pointer-events-none">
            {/* Mock Map Pins */}
            <div className="absolute top-[20%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <div className="flex items-center gap-2 bg-background/90 px-3 py-1.5 rounded-full shadow-md border backdrop-blur-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <span className="text-xs font-medium">Mascota Perdida</span>
              </div>
            </div>
            <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <div className="flex items-center gap-2 bg-background/90 px-3 py-1.5 rounded-full shadow-md border backdrop-blur-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                <span className="text-xs font-medium">Huerta</span>
              </div>
            </div>
            <div className="absolute top-[60%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <div className="flex items-center gap-2 bg-background/90 px-3 py-1.5 rounded-full shadow-md border backdrop-blur-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                <span className="text-xs font-medium">Adopción</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
