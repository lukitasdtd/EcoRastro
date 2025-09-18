import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { plantingCalendar } from "@/lib/data";
import { Sprout } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight mb-4 text-primary">Planting Calendar</h1>
        <p className="max-w-3xl mx-auto text-lg text-foreground/80">
          A yearly guide to help you know what to plant and when. Happy growing!
        </p>
      </section>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plantingCalendar.map(item => (
          <Card key={item.month} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">{item.month}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {item.crops.map(crop => (
                  <li key={crop} className="flex items-center gap-2">
                    <Sprout className="h-4 w-4 text-primary/70" />
                    <span className="text-foreground/90">{crop}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
