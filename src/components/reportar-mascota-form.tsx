'use client';

//formulario de reporte de mascota perdida
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
import { PawPrint } from "lucide-react";
import { chileanRegions } from "@/lib/chile-locations";

//esquema de reporte de mascota perdida
const mascotaSchema = z.object({
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }).max(50, { message: "El nombre no debe exceder los 50 caracteres." }),
  tipo: z.enum(["perro", "gato"], { required_error: "Por favor selecciona un tipo de mascota." }),
  raza: z.string().min(2, { message: "La raza debe tener al menos 2 caracteres." }).max(50, { message: "La raza no debe exceder los 50 caracteres." }),
  color: z.string().min(3, { message: "El color debe tener al menos 3 caracteres." }).max(30, { message: "El color no debe exceder los 30 caracteres." }),
  direccion: z.string().min(5, { message: "La dirección debe tener al menos 5 caracteres." }),
  region: z.string({ required_error: "Por favor selecciona una región." }),
  comuna: z.string({ required_error: "Por favor selecciona una comuna." }),
  descripcion: z.string().max(500, { message: "La descripción no debe exceder los 500 caracteres." }).optional(),
  fotos: z.array(z.string()).optional(),
});

export function ReportarMascotaForm() {
  const { toast } = useToast();
  const [imageUploads, setImageUploads] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [communes, setCommunes] = useState<string[]>([]);

  const form = useForm<z.infer<typeof mascotaSchema>>({
    resolver: zodResolver(mascotaSchema),
    defaultValues: {
      nombre: "",
      raza: "",
      color: "",
      direccion: "",
      descripcion: "",
      fotos: [],
    },
  });

  const handleRegionChange = (regionName: string) => {
    const region = chileanRegions.find(r => r.name === regionName);
    setCommunes(region ? region.communes : []);
    form.setValue('comuna', ""); // Restablecer el valor de la comuna cuando cambia la región
  };

  async function onSubmit(values: z.infer<typeof mascotaSchema>) {
    setIsSubmitting(true);
    console.log("Formulario enviado:", { ...values, fotos: imageUploads });
    
    try {
      console.log("Datos listos para enviar a Firestore:", values);

      toast({
        title: "¡Reporte enviado con éxito!",
        description: "Gracias por ayudarnos a encontrar a esta mascota.",
        className: "bg-green-100 border-green-400 text-green-700",
      });

      form.reset();
      setImageUploads([]);
      setCommunes([]);

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

            <div className="space-y-6 rounded-md border p-6">
                <h3 className="font-semibold">Ubicación de la mascota</h3>
                 <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Dirección</FormLabel>
                        <FormControl>
                        <Input placeholder="Ej: Av. Siempre Viva 123" {...field} />
                        </FormControl>
                        <FormDescription>Ingresa la calle y número donde fue vista por última vez.</FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Región</FormLabel>
                        <Select onValueChange={(value) => { field.onChange(value); handleRegionChange(value); }} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una región" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {chileanRegions.map(region => (
                                <SelectItem key={region.name} value={region.name}>{region.name}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="comuna"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Comuna</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={communes.length === 0}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una comuna" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {communes.map(commune => (
                                <SelectItem key={commune} value={commune}>{commune}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
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

            <Button type="submit" disabled={isSubmitting} className="w-full font-bold py-6 text-lg">
              {isSubmitting ? "Enviando reporte..." : "Enviar Reporte"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}