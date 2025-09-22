'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useMemo, forwardRef, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDropzone } from 'react-dropzone';
import IMask from 'imask';
import { LoaderCircle, MapPin, UploadCloud, X, FileUp, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { storage } from '@/lib/firebase/config';

// Esquema de validación y tipos...
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
    fotos: z.array(z.string()).max(5, "Puedes subir hasta 5 imágenes.").default([]),
    visibleMapa: z.boolean().default(true),
    permitirComentarios: z.boolean().default(true),
    consentimiento: z.literal<boolean>(true, { errorMap: () => ({ message: "Debes aceptar las condiciones." }) }),
  }).refine(data => data.especie !== 'Otro' || (data.especie === 'Otro' && data.especieOtra && data.especieOtra.length > 0), {
    message: "Debes especificar la especie.",
    path: ["especieOtra"],
  });

type ReportFormValues = z.infer<typeof reportSchema>;

const MaskedInput = forwardRef<HTMLInputElement, { name: 'telefono' } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>>((props, ref) => {
  const { setValue } = useFormContext<ReportFormValues>();
  
  useEffect(() => {
    if (typeof window === 'undefined' || !ref || !('current' in ref) || !ref.current) return;
    const mask = IMask(ref.current, {
      mask: '+{56} 9 0000 0000',
    });

    mask.on('accept', () => {
      setValue('telefono', mask.value, { shouldValidate: true, shouldDirty: true });
    });

    return () => mask.destroy();
  }, [ref, setValue]);
  
  return <Input {...props} ref={ref} />;
});
MaskedInput.displayName = 'MaskedInput';

type FileUpload = {
  file: File;
  preview: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  uploadTask?: any;
};


export function ReportarMascotaForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploads, setUploads] = useState<FileUpload[]>([]);

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
  
  const compressImage = async (file: File): Promise<Blob> => {
    console.log("Comprimiendo imagen...");
    const bmp = await createImageBitmap(file);
    const { width, height } = bmp;
    const max_side = 1600;

    let newWidth = width;
    let newHeight = height;

    if (width > height) {
      if (width > max_side) {
        newHeight = Math.round((height * max_side) / width);
        newWidth = max_side;
      }
    } else {
      if (height > max_side) {
        newWidth = Math.round((width * max_side) / height);
        newHeight = max_side;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(bmp, 0, 0, newWidth, newHeight);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
             console.log("Compresión completada.");
            resolve(blob);
          } else {
            reject(new Error('Error al comprimir la imagen.'));
          }
        },
        'image/jpeg',
        0.8
      );
    });
  };
  
  const handleUpload = async (file: File, index: number) => {
    try {
      const compressedBlob = await compressImage(file);
      const filePath = `reports/${Date.now()}-${file.name}`;
      const fileStorageRef = storageRef(storage, filePath);
      const uploadTask = uploadBytesResumable(fileStorageRef, compressedBlob, { contentType: 'image/jpeg' });
      
      setUploads(prev => {
        const newUploads = [...prev];
        newUploads[index].uploadTask = uploadTask;
        newUploads[index].status = 'uploading';
        return newUploads;
      });

      let timeoutId: NodeJS.Timeout;

      const unsubscribe = uploadTask.on('state_changed',
        (snapshot) => {
          console.log(`Subiendo (${snapshot.bytesTransferred / snapshot.totalBytes * 100}%)...`);
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploads(prev => {
            const newUploads = [...prev];
            if (newUploads[index]) newUploads[index].progress = progress;
            return newUploads;
          });

          // Reset timeout on progress
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            console.log("Cancelado por Timeout");
            uploadTask.cancel();
            toast({ variant: 'destructive', title: 'Error de subida', description: `La subida de ${file.name} ha tardado demasiado y fue cancelada.` });
          }, 60000);
        },
        (error) => {
           console.error("Error en la subida:", error.code);
           clearTimeout(timeoutId);
           setUploads(prev => {
              const newUploads = [...prev];
              if(newUploads[index]) {
                newUploads[index].status = 'error';
                newUploads[index].error = 'La subida falló. Intenta de nuevo.';
              }
              return newUploads;
           });
        },
        async () => {
          console.log("Completado");
          clearTimeout(timeoutId);
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          form.setValue('fotos', [...form.getValues('fotos'), downloadURL]);
          setUploads(prev => {
             const newUploads = [...prev];
             if(newUploads[index]) {
                newUploads[index].status = 'success';
             }
             return newUploads;
          });
        }
      );

    } catch (error) {
       console.error("Error al procesar la imagen:", error);
       toast({ variant: 'destructive', title: 'Error de procesamiento', description: 'No se pudo procesar una de las imágenes.'});
    }
  };


  const onDrop = useCallback((acceptedFiles: File[]) => {
    const currentUploadsCount = uploads.length;
    if (currentUploadsCount + acceptedFiles.length > 5) {
      toast({ variant: 'destructive', title: 'Límite de archivos', description: 'Puedes subir un máximo de 5 imágenes.' });
      return;
    }

    const newFileUploads: FileUpload[] = acceptedFiles.map(file => {
      // Validación de tipo y tamaño
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast({ variant: 'destructive', title: 'Tipo de archivo no válido', description: `${file.name} no es una imagen JPG o PNG.` });
        return null;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({ variant: 'destructive', title: 'Archivo demasiado grande', description: `${file.name} supera los 5MB.` });
        return null;
      }
      return {
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: 'pending',
      };
    }).filter((f): f is FileUpload => f !== null);

    setUploads(prev => [...prev, ...newFileUploads]);
    newFileUploads.forEach((upload, i) => handleUpload(upload.file, currentUploadsCount + i));

  }, [uploads.length, toast, form]);

  useEffect(() => {
    return () => uploads.forEach(upload => URL.revokeObjectURL(upload.preview));
  }, [uploads]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    maxFiles: 5,
    disabled: uploads.length >= 5
  });

  const removeFile = (indexToRemove: number) => {
    const upload = uploads[indexToRemove];
    if (upload.uploadTask && (upload.status === 'uploading' || upload.status === 'pending')) {
        console.log("Cancelado");
        upload.uploadTask.cancel();
    }
    
    setUploads(prev => {
        const newUploads = prev.filter((_, index) => index !== indexToRemove);
        const successfulUrls = newUploads
            .filter(u => u.status === 'success')
            .map(u => {
                const url = form.getValues('fotos').find(url => url.includes(u.file.name));
                return url;
            })
            .filter((url): url is string => !!url);
        form.setValue('fotos', successfulUrls);
        return newUploads;
    });
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
    
    if (uploads.some(u => u.status === 'uploading')) {
        toast({ variant: 'destructive', title: 'Espera un momento', description: 'Algunos archivos aún se están subiendo.'});
        setIsSubmitting(false);
        return;
    }
    
    // Aquí iría la lógica para guardar los datos en Firestore, usando data.fotos que ya contiene las URLs.
    console.log("Datos finales a guardar en Firestore:", data);

    await new Promise(resolve => setTimeout(resolve, 1000));

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
                                      onChange={(e) => field.onChange(e.target.valueAsDate ? new Date(e.target.valueAsDate.valueOf() + e.target.valueAsDate.getTimezoneOffset() * 60 * 1000) : undefined)}
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
                              <MaskedInput {...field} />
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
                <div {...getRootProps({ 'aria-disabled': uploads.length >= 5 })} className={`flex items-center justify-center w-full p-6 border-2 border-dashed rounded-lg ${uploads.length < 5 ? 'cursor-pointer hover:bg-muted' : 'bg-muted/50 cursor-not-allowed'}`}>
                    <input {...getInputProps()} />
                    <div className="text-center">
                        <UploadCloud className="w-10 h-10 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">{uploads.length >= 5 ? 'Has alcanzado el límite de 5 fotos' : 'Arrastra tus fotos aquí, o haz clic para seleccionarlas'}</p>
                    </div>
                </div>
                 {uploads.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {uploads.map((upload, i) => (
                            <div key={i} className="relative aspect-square">
                                <Image
                                    src={upload.preview}
                                    alt={`Preview ${i}`}
                                    fill
                                    className="object-cover rounded-md"
                                />
                                {upload.status === 'uploading' && (
                                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-2 rounded-md">
                                        <Progress value={upload.progress} className="w-full h-2" />
                                        <p className="text-white text-xs mt-1">{Math.round(upload.progress)}%</p>
                                    </div>
                                )}
                                {upload.status === 'success' && (
                                    <div className="absolute top-1 left-1 bg-green-500 text-white rounded-full p-1">
                                        <CheckCircle className="w-3 h-3" />
                                    </div>
                                )}
                                {upload.status === 'error' && (
                                    <div className="absolute inset-0 bg-red-900/70 flex flex-col items-center justify-center text-center p-2 rounded-md">
                                        <AlertCircle className="w-6 h-6 text-white" />
                                        <p className="text-white text-xs mt-1 leading-tight">{upload.error}</p>
                                    </div>
                                )}
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removeFile(i)}
                                    className="absolute top-1 right-1 h-6 w-6"
                                >
                                    <X className="w-3 h-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
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
            <Button type="submit" disabled={isSubmitting || uploads.some(u => u.status === 'uploading')}>
              {isSubmitting ? <LoaderCircle className="animate-spin" /> : 'Publicar Reporte'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
