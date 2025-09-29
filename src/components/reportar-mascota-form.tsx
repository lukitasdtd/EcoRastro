'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploader } from "@/components/image-uploader"; 
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import LeafletMapDraggable from "./leaflet-map-draggable";
import { PawPrint } from "lucide-react";

const mascotaSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }).max(50, { message: "El nombre no debe exceder los 50 caracteres." }),
  tipo: z.enum(["perro", "gato", "otro"], { required_error: "Por favor selecciona un tipo de mascota." }),
  raza: z.string().min(2, { message: "La raza debe tener al menos 2 caracteres." }).max(50, { message: "La raza no debe exceder los 50 caracteres." }),
  color: z.string().min(3, { message: "El color debe tener al menos 3 caracteres." }).max(30, { message: "El color no debe exceder los 30 caracteres." }),
  descripcion: z.string().max(500, { message: "La descripción no debe exceder los 500 caracteres." }).optional(),
  ultima_ubicacion: z.string().min(5, { message: "La ubicación debe tener al menos 5 caracteres." }),
  lat: z.number(),
  lng: z.number(),
  fotos: z.array(z.string()).optional(),
});

export function ReportarMascotaForm() {
  const { toast } = useToast();
  const [imageUploads, setImageUploads] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof mascotaSchema>>({
    resolver: zodResolver(mascotaSchema),
    defaultValues: {
      nombre: "",
      raza: "",
      color: "",
      descripcion: "",
      ultima_ubicacion: "",
      fotos: [],
    },
  });

  async function onSubmit(values: z.infer<typeof mascotaSchema>) {
    setIsSubmitting(true);
    console.log("Formulario enviado:", { ...values, fotos: imageUploads });
    
    try {
      // **INICIO: Lógica de CREATE**
      // Aquí es donde añadiríamos la lógica para guardar en Firestore
      // Por ahora, solo mostraremos un mensaje de éxito simulado.
      console.log("Datos listos para enviar a Firestore:", values);
      // **FIN: Lógica de CREATE**

      toast({
        title: "¡Reporte enviado con éxito!",
        description: "Gracias por ayudarnos a encontrar a esta mascota.",
        className: "bg-green-100 border-green-400 text-green-700",
      });

      form.reset();
      setImageUploads([]);

    } catch (error) {
      console.error("Error al enviar el reporte:", error);
      toast({
        variant: "destructive",
        title: "Error al enviar el reporte",
        description: "Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto my-8 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
            <PawPrint className="w-8 h-8 text-primary" />
            <div>
                <CardTitle className="text-2xl font-bold">Reportar Mascota Perdida</CardTitle>
                <CardDescription>Completa el formulario para ayudarnos a encontrarla.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la mascota</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Firulais" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de animal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="perro">Perro</SelectItem>
                        <SelectItem value="gato">Gato</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="raza"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raza</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Quiltro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Negro con manchas blancas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción adicional</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Cualquier detalle extra que pueda ayudar a identificar a la mascota..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription> Collar, cicatrices, comportamiento, etc. </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Fotos de la mascota</FormLabel>
              <FormDescription className="mb-3"> Sube una o más imágenes claras. </FormDescription>
              <ImageUploader 
                value={imageUploads} 
                onChange={setImageUploads} 
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-4">
              <FormLabel>Última vez vista</FormLabel>
              <div className="h-[400px] rounded-lg overflow-hidden border">
                <LeafletMapDraggable 
                  onLocationChange={(lat, lng) => {
                    form.setValue("lat", lat);
                    form.setValue("lng", lng);
                  }}
                />
              </div>
              <FormField
                control={form.control}
                name="ultima_ubicacion"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Describe la ubicación</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Cerca del Parque Forestal, Santiago" {...field} />
                    </FormControl>
                    <FormDescription>Proporciona una dirección o punto de referencia.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full font-bold py-6 text-lg">
              {isSubmitting ? "Enviando reporte..." : "Enviar Reporte"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
