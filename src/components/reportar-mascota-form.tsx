'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useDropzone } from 'react-dropzone';
import { IMaskMixin } from 'react-imask';
import { LoaderCircle, MapPin, UploadCloud, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const phoneRegex = new RegExp(
  /^(\+?56)?(\s?)(9)(\s?)[987654321]\d{7}$/
);

const reportSchema = z.object({
    nombreMascota: z.string().min(2, "El nombre debe tener al menos 2 caracteres.").max(40, "El nombre no puede tener más de 40 caracteres."),
    especie: z.string({ required_error: "Debes seleccionar una especie." }),
    especieOtra: z.string().optional(),
    raza: z.string().optional(),
    colorPrincipal: z.string().min(1, "El color es requerido."),
    tamano: z.string({ required_error: "Debes seleccionar un tamaño." }),
    microchip: z.string().min(9, "El microchip debe tener entre 9 y 15 caracteres.").max(15, "El microchip debe tener entre 9 y 15 caracteres.").regex(/^[a-zA-Z0-9]+$/, "El microchip solo puede contener letras y números.").optional().or(z.literal('')),
    senas: z.string().optional(),
    llevaCollar: z.boolean().default(false),
    collarDescripcion: z.string().optional(),
    temperamento: z.array(z.string()).optional(),
    recompensa: z.boolean().default(false),
    montoRecompensa: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number().positive("El monto debe ser un número positivo.").optional()
    ),
    fechaPerdida: z.date({ required_error: "La fecha es requerida." }).max(new Date(), "La fecha no puede ser en el futuro."),
    horaPerdida: z.string().optional(),
    direccion: z.string().min(1, "La dirección es requerida."),
    lat: z.number({ required_error: "La ubicación en el mapa es requerida." }),
    lng: z.number({ required_error: "La ubicación en el mapa es requerida." }),
    nombreContacto: z.string().min(1, "El nombre de contacto es requerido."),
    telefono: z.string().regex(phoneRegex, "Número de teléfono inválido."),
    correo: z.string().email("Correo electrónico inválido.").optional().or(z.literal('')),
    medioPreferido: z.enum(["telefono", "whatsapp", "correo"], { required_error: "Debes seleccionar un medio de contacto." }),
    fotos: z.array(z.instanceof(File)).max(5, "Puedes subir hasta 5 imágenes."),
    visibleMapa: z.boolean().default(true),
    permitirComentarios: z.boolean().default(true),
    consentimiento: z.literal<boolean>(true, { errorMap: () => ({ message: "Debes aceptar las condiciones." }) }),
  }).refine(data => data.especie !== 'Otro' || (data.especie === 'Otro' && data.especieOtra && data.especieOtra.length > 0), {
    message: "Debes especificar la especie.",
    path: ["especieOtra"],
  });

type ReportFormValues = z.infer<typeof reportSchema>;

const IMaskInput = IMaskMixin(({...props}) => <Input {...props} />);

export function ReportarMascotaForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      nombreMascota: "",
      raza: "",
      colorPrincipal: "",
      microchip: "",
      senas: "",
      collarDescripcion: "",
      montoRecompensa: undefined,
      horaPerdida: "",
      direccion: "",
      nombreContacto: "",
      telefono: "",
      correo: "",
      fotos: [],
      temperamento: [],
      llevaCollar: false,
      recompensa: false,
      visibleMapa: true,
      permitirComentarios: true,
    },
  });

  const especieValue = form.watch('especie');
  const llevaCollarValue = form.watch('llevaCollar');
  const recompensaValue = form.watch('recompensa');
  const files = form.watch('fotos');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const currentFiles = form.getValues('fotos');
    const newFiles = acceptedFiles.slice(0, 5 - currentFiles.length);
    form.setValue('fotos', [...currentFiles, ...newFiles], { shouldValidate: true });
  }, [form]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
  });

  const removeFile = (file: File) => {
    const newFiles = form.getValues('fotos').filter(f => f !== file);
    form.setValue('fotos', newFiles, { shouldValidate: true });
  };
  
  const Map = useMemo(() => dynamic(
    () => import('@/components/leaflet-map-draggable'),
    { 
      loading: () => <Skeleton className="w-full h-full rounded-md" />,
      ssr: false 
    }
  ), []);

  async function onSubmit(data: ReportFormValues) {
    setIsSubmitting(true);
    // Simular subida y procesamiento de datos
    console.log("Datos del formulario:", data);
    
    // Aquí iría la lógica para subir las imágenes a un storage
    // y luego guardar los datos en Firestore.

    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "¡Reporte enviado!",
      description: "Gracias por tu colaboración. Tu reporte ha sido publicado.",
    });

    router.push('/mascotas');
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="max-w-3xl mx-auto shadow-sm">
          <CardHeader>
            <CardTitle>Datos principales</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="nombreMascota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la mascota</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 'Rocky' o 'Desconocido'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="especie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especie</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una especie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Perro">Perro</SelectItem>
                      <SelectItem value="Gato">Gato</SelectItem>
                      <SelectItem value="Ave">Ave</SelectItem>
                      <SelectItem value="Roedor">Roedor</SelectItem>
                      <SelectItem value="Reptil">Reptil</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {especieValue === 'Otro' && (
              <FormField
                control={form.control}
                name="especieOtra"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Especifique la especie</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Conejo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="raza"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raza (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Quiltro" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorPrincipal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Café, Negro con blanco" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tamano"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamaño</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tamaño" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pequeño">Pequeño (hasta 10kg)</SelectItem>
                      <SelectItem value="Mediano">Mediano (10 a 25kg)</SelectItem>
                      <SelectItem value="Grande">Grande (más de 25kg)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="microchip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>N° de microchip (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Si lo conoces, ingrésalo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto shadow-sm">
            <CardHeader>
                <CardTitle>Señales y características</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                control={form.control}
                name="senas"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Señas distintivas (opcional)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Ej: oreja izquierda caída, cicatriz en pata trasera, mancha blanca en el pecho" {...field} />
                    </FormControl>
                    </FormItem>
                )}
                />
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="llevaCollar"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="font-normal">¿Llevaba collar o placa?</FormLabel>
                            </FormItem>
                        )}
                    />
                    {llevaCollarValue && (
                        <FormField
                        control={form.control}
                        name="collarDescripcion"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Color/Descripción del collar</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Collar rojo con una patita" {...field} />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                    )}
                </div>
                <FormField
                    control={form.control}
                    name="temperamento"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel>Temperamento (opcional)</FormLabel>
                                <FormDescription>Marca las opciones que apliquen.</FormDescription>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Tímida/o', 'Sociable', 'Nerviosa/o', 'Puede morder'].map((item) => (
                                <FormField
                                key={item}
                                control={form.control}
                                name="temperamento"
                                render={({ field }) => {
                                    return (
                                    <FormItem
                                        key={item}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...(field.value || []), item])
                                                : field.onChange(
                                                    field.value?.filter(
                                                    (value) => value !== item
                                                    )
                                                )
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        {item}
                                        </FormLabel>
                                    </FormItem>
                                    )
                                }}
                                />
                            ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-y-4">
                     <FormField
                        control={form.control}
                        name="recompensa"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel>¿Se ofrece recompensa?</FormLabel>
                                    <FormDescription>Activa si ofreces una recompensa monetaria.</FormDescription>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {recompensaValue && (
                         <FormField
                            control={form.control}
                            name="montoRecompensa"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Monto estimado (CLP)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="50000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>
            </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto shadow-sm">
            <CardHeader>
                <CardTitle>Última vez vista</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="fechaPerdida"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} 
                                      value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="horaPerdida"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hora aproximada (opcional)</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dirección / Referencia del lugar</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Av. Siempre Viva 123, plaza cercana, comuna" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                  <Label>Ubicación en el mapa</Label>
                  <p className="text-sm text-muted-foreground">Arrastra el marcador al punto exacto.</p>
                  <div className="w-full h-80 rounded-md mt-2 relative">
                    <Map onLocationChange={(lat, lng) => {
                      form.setValue('lat', lat, { shouldValidate: true });
                      form.setValue('lng', lng, { shouldValidate: true });
                    }}/>
                  </div>
                  {form.formState.errors.lat && <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.lat.message}</p>}
                </div>
            </CardContent>
        </Card>

         <Card className="max-w-3xl mx-auto shadow-sm">
            <CardHeader>
                <CardTitle>Contacto</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="nombreContacto"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de contacto</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <IMaskInput
                                {...field}
                                mask="+{56} 9 0000 0000"
                                placeholder="+56 9 XXXX XXXX"
                                onAccept={(value) => field.onChange(value)}
                              />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="correo"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Correo electrónico (opcional)</FormLabel>
                            <FormControl><Input type="email" placeholder="tu@correo.com" {...field} /></FormControl>
                             <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="medioPreferido"
                    render={({ field }) => (
                        <FormItem className="space-y-3 md:col-span-2">
                            <FormLabel>Medio de contacto preferido</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8"
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="telefono" /></FormControl>
                                    <FormLabel className="font-normal">Teléfono</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="whatsapp" /></FormControl>
                                    <FormLabel className="font-normal">WhatsApp</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="correo" /></FormControl>
                                    <FormLabel className="font-normal">Correo</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto shadow-sm">
            <CardHeader>
                <CardTitle>Fotos</CardTitle>
                <CardDescription>Sube hasta 5 fotos (JPG, PNG, máx. 5MB cada una).</CardDescription>
            </CardHeader>
            <CardContent>
                <div {...getRootProps()} className="flex items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                    <input {...getInputProps()} />
                    <div className="text-center">
                        <UploadCloud className="w-10 h-10 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Arrastra tus fotos aquí, o haz clic para seleccionarlas</p>
                    </div>
                </div>
                 {files.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {files.map((file, i) => (
                            <div key={i} className="relative aspect-square">
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${i}`}
                                    fill
                                    className="object-cover rounded-md"
                                    onLoad={() => URL.revokeObjectURL(file.name)}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFile(file)}
                                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <FormMessage>{form.formState.errors.fotos?.message}</FormMessage>
            </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto shadow-sm">
            <CardHeader>
                <CardTitle>Opciones de privacidad y publicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormField
                    control={form.control}
                    name="visibleMapa"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <FormLabel className="font-normal">Visible en el mapa comunitario</FormLabel>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="permitirComentarios"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <FormLabel className="font-normal">Permitir comentarios en la publicación</FormLabel>
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="consentimiento"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-4">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                                Acepto que los datos proporcionados se hagan públicos para facilitar la búsqueda de la mascota.
                            </FormLabel>
                            <FormMessage />
                        </div>
                        </FormItem>
                    )}
                />
            </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <LoaderCircle className="animate-spin" /> : 'Publicar Reporte'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

    