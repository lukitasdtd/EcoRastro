'use client';

import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import IMask from 'imask';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '@/lib/firebase/config';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CalendarIcon, Dog, Cat, Bird, Rabbit, Turtle, HelpCircle, AlertTriangle, UploadCloud, File, X, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { useFormContext } from 'react-hook-form';


const petReportSchema = z.object({
  nombreMascota: z.string().min(2, "El nombre debe tener al menos 2 caracteres.").max(40, "El nombre no puede exceder los 40 caracteres."),
  especie: z.enum(["Perro", "Gato", "Ave", "Roedor", "Reptil", "Otro"], { required_error: "Debes seleccionar una especie." }),
  especieOtra: z.string().optional(),
  raza: z.string().optional(),
  colorPrincipal: z.string().min(1, "El color principal es requerido."),
  tamano: z.enum(["Pequeño", "Mediano", "Grande"], { required_error: "Debes seleccionar un tamaño." }),
  microchip: z.string().max(15, "El microchip no puede tener más de 15 caracteres.").optional(),
  senas: z.string().optional(),
  llevaCollar: z.boolean().default(false),
  collarDescripcion: z.string().optional(),
  temperamento: z.array(z.string()).optional(),
  recompensa: z.boolean().default(false),
  montoRecompensa: z.number().positive("El monto debe ser un número positivo.").optional(),
  fechaPerdida: z.date({ required_error: "La fecha es requerida." }).max(new Date(), "La fecha no puede ser en el futuro."),
  horaPerdida: z.string().optional(),
  direccion: z.string().min(1, "La dirección es requerida."),
  lat: z.number({ required_error: "La ubicación en el mapa es requerida." }),
  lng: z.number({ required_error: "La ubicación en el mapa es requerida." }),
  nombreContacto: z.string().min(2, "El nombre de contacto es requerido."),
  telefono: z.string().regex(/^\+56 9 \d{4} \d{4}$/, "El formato del teléfono es inválido.").optional(),
  correo: z.string().email("El correo electrónico es inválido.").optional(),
  medioPreferido: z.enum(["telefono", "whatsapp", "correo"], { required_error: "Debes seleccionar un medio de contacto." }),
  fotos: z.array(z.string().url()).optional(),
  visibleMapa: z.boolean().default(true),
  permitirComentarios: z.boolean().default(true),
  consentimiento: z.literal(true, { errorMap: () => ({ message: "Debes aceptar los términos para publicar." }) }),
}).refine(data => data.especie !== 'Otro' || (data.especie === 'Otro' && data.especieOtra), {
  message: "Debes especificar la especie si seleccionas 'Otro'.",
  path: ["especieOtra"],
}).refine(data => !data.llevaCollar || (data.llevaCollar && data.collarDescripcion), {
  message: "Debes describir el collar si marcaste que lo lleva.",
  path: ["collarDescripcion"],
}).refine(data => !data.recompensa || (data.recompensa && data.montoRecompensa), {
  message: "Debes especificar un monto si ofreces recompensa.",
  path: ["montoRecompensa"],
});

type PetReportFormValues = z.infer<typeof petReportSchema>;

const LeafletMapDraggable = dynamic(() => import('@/components/leaflet-map-draggable'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[250px] rounded-md" />,
});

const MaskedInput = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  (props, ref) => {
    const { getValues, setValue } = useFormContext();
    const internalRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);
    const maskOptions = React.useMemo(() => ({ mask: "+{56} 9 0000 0000" }), []);

    React.useEffect(() => {
      if (typeof window === "undefined" || !internalRef.current) return;
      const mask = IMask(internalRef.current, maskOptions);
      mask.on("accept", () => {
        if (getValues("telefono") !== mask.value) {
          setValue("telefono", mask.value, { shouldValidate: true, shouldDirty: true });
        }
      });
      return () => mask.destroy();
    }, [maskOptions, getValues, setValue]);

    return <Input ref={internalRef} inputMode="tel" autoComplete="tel" {...props} />;
  }
);
MaskedInput.displayName = "MaskedInput";

const speciesIcons: { [key: string]: React.ElementType } = {
  Perro: Dog,
  Gato: Cat,
  Ave: Bird,
  Roedor: Rabbit,
  Reptil: Turtle,
  Otro: HelpCircle
};

type FileUploadState = {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  url?: string;
  cancel?: () => void;
  error?: string;
};

export function ReportarMascotaForm() {
  const { toast } = useToast();
  const form = useForm<PetReportFormValues>({
    resolver: zodResolver(petReportSchema),
    defaultValues: {
      llevaCollar: false,
      recompensa: false,
      visibleMapa: true,
      permitirComentarios: true,
      temperamento: [],
      fotos: [],
    },
  });
  const [uploads, setUploads] = React.useState<FileUploadState[]>([]);
  const isUploading = uploads.some(u => u.status === 'uploading');

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (uploads.length + acceptedFiles.length > 5) {
      toast({ variant: 'destructive', title: 'Límite de archivos excedido', description: 'Puedes subir un máximo de 5 fotos.' });
      return;
    }

    const newUploads: FileUploadState[] = acceptedFiles.map(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast({ variant: 'destructive', title: 'Archivo demasiado grande', description: `${file.name} excede los 5MB.` });
        return null;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast({ variant: 'destructive', title: 'Tipo de archivo no válido', description: `${file.name} no es JPG o PNG.` });
        return null;
      }
      return { file, progress: 0, status: 'pending' };
    }).filter(Boolean) as FileUploadState[];

    setUploads(prev => [...prev, ...newUploads]);
  }, [uploads, toast]);
  
  React.useEffect(() => {
    uploads.forEach((upload, index) => {
      if (upload.status === 'pending') {
        handleUpload(upload, index);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploads]);

  const handleUpload = (upload: FileUploadState, index: number) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `reports/${Date.now()}_${upload.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, upload.file);
    
    let timeout: NodeJS.Timeout;
    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        uploadTask.cancel();
        updateUploadState(index, { status: 'error', error: 'Timeout: La subida se estancó.' });
        toast({ variant: 'destructive', title: 'Error en la subida', description: `La subida de ${upload.file.name} se ha cancelado por inactividad.` });
      }, 15000);
    };

    updateUploadState(index, { status: 'uploading', cancel: () => uploadTask.cancel() });
    resetTimeout();
    
    uploadTask.on('state_changed',
      (snapshot) => {
        resetTimeout();
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        updateUploadState(index, { progress });
      },
      (error) => {
        clearTimeout(timeout);
        let errorMessage = 'Ocurrió un error desconocido.';
        if (error.code === 'storage/canceled') {
          errorMessage = 'Subida cancelada por el usuario.';
        }
        updateUploadState(index, { status: 'error', error: errorMessage });
      },
      () => {
        clearTimeout(timeout);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateUploadState(index, { status: 'completed', url: downloadURL, progress: 100 });
          const currentPhotos = form.getValues('fotos') || [];
          form.setValue('fotos', [...currentPhotos, downloadURL], { shouldValidate: true });
        });
      }
    );
  };

  const updateUploadState = (index: number, newState: Partial<FileUploadState>) => {
    setUploads(prev => {
      const newUploads = [...prev];
      newUploads[index] = { ...newUploads[index], ...newState };
      return newUploads;
    });
  };

  const removeUpload = (index: number) => {
    const upload = uploads[index];
    if (upload.status === 'uploading' && upload.cancel) {
      upload.cancel();
    }
    if (upload.url) {
      const currentPhotos = form.getValues('fotos') || [];
      form.setValue('fotos', currentPhotos.filter(url => url !== upload.url));
    }
    setUploads(prev => prev.filter((_, i) => i !== index));
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    noClick: true,
    noKeyboard: true
  });

  async function onSubmit(data: PetReportFormValues) {
    console.log("Datos del formulario para enviar:", data);
    toast({
      title: "¡Reporte enviado con éxito!",
      description: "Gracias por tu colaboración. Tu reporte ha sido publicado.",
    });
    // Aquí iría la lógica para enviar a Firestore, etc.
    // form.reset();
    // setUploads([]);
  }
  
  const watchedEspecie = form.watch("especie");
  const watchedCollar = form.watch("llevaCollar");
  const watchedRecompensa = form.watch("recompensa");

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="max-w-4xl mx-auto shadow-sm border border-gray-200 rounded-xl">
          <CardHeader>
            <CardTitle>1. Datos de la mascota</CardTitle>
            <CardDescription>
              Describe a la mascota para que otros puedan identificarla.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nombreMascota"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la mascota</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ej: Fido, Luna" />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una especie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(speciesIcons).map(([name, Icon]) => (
                          <SelectItem key={name} value={name}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" /> {name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {watchedEspecie === 'Otro' && (
              <FormField
                control={form.control}
                name="especieOtra"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especifica la especie</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="Ej: Hurón, Conejo" />
                     </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
             <div className="grid md:grid-cols-2 gap-6">
               <FormField
                control={form.control}
                name="raza"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raza (opcional)</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="Ej: Quiltro, Poodle, Siamés" />
                     </FormControl>
                    <FormMessage />
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
                        <Input {...field} placeholder="Ej: Negro, Café claro, Blanco con manchas" />
                     </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             </div>
             <FormField
                control={form.control}
                name="tamano"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tamaño</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tamaño aproximado" />
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
          </CardContent>
        </Card>
        
        <Card className="max-w-4xl mx-auto shadow-sm border border-gray-200 rounded-xl">
            <CardHeader>
                <CardTitle>2. Señales y características</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <FormField
                    control={form.control}
                    name="microchip"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Número de microchip (opcional)</FormLabel>
                             <FormControl>
                                <Input {...field} placeholder="Ej: 981020001234567" />
                             </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="senas"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Señas particulares (opcional)</FormLabel>
                             <FormControl>
                                <Textarea {...field} placeholder="Ej: Cojea de una pata, tiene una mancha en el lomo, le falta un ojo." />
                             </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="llevaCollar"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel>¿Lleva collar?</FormLabel>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {watchedCollar && (
                     <FormField
                        control={form.control}
                        name="collarDescripcion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Describe el collar</FormLabel>
                                 <FormControl>
                                    <Input {...field} placeholder="Ej: Collar rojo con cascabel, placa con su nombre" />
                                 </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                )}
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
                        {["Tímida/o", "Sociable", "Nerviosa/o", "Puede morder"].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="temperamento"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), item])
                                          : field.onChange(
                                              (field.value || []).filter(
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

                <FormField
                    control={form.control}
                    name="recompensa"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel>¿Ofreces recompensa?</FormLabel>
                                <FormDescription>Esto puede motivar a la comunidad a ayudar.</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {watchedRecompensa && (
                     <FormField
                        control={form.control}
                        name="montoRecompensa"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Monto de la recompensa (CLP)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} placeholder="Ej: 50000" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                )}

            </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto shadow-sm border border-gray-200 rounded-xl">
            <CardHeader>
                <CardTitle>3. Última vez vista</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="fechaPerdida"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Fecha</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP", { locale: es })
                                    ) : (
                                        <span>Elige una fecha</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="direccion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dirección o sector</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Ej: Calle Falsa 123, Plaza Ñuñoa" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormItem>
                    <FormLabel>Ubicación en el mapa</FormLabel>
                    <FormDescription>Arrastra el marcador al punto exacto donde fue vista por última vez.</FormDescription>
                    <div className="h-[250px] w-full rounded-md border">
                         <FormControl>
                            <LeafletMapDraggable onLocationChange={(lat, lng) => {
                                form.setValue('lat', lat, { shouldValidate: true });
                                form.setValue('lng', lng, { shouldValidate: true });
                            }} />
                         </FormControl>
                    </div>
                     <FormMessage>{form.formState.errors.lat?.message || form.formState.errors.lng?.message}</FormMessage>
                </FormItem>
            </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto shadow-sm border border-gray-200 rounded-xl">
            <CardHeader>
                <CardTitle>4. Información de contacto</CardTitle>
                 <CardDescription>Estos datos se mostrarán públicamente en el reporte.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="nombreContacto"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tu nombre</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Ej: Juan Pérez" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="telefono"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Teléfono de contacto</FormLabel>
                            <FormControl>
                                <MaskedInput placeholder="+56 9 1234 5678" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="correo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo electrónico (opcional)</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} placeholder="tu@correo.com" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="medioPreferido"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Medio de contacto preferido</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-col space-y-1"
                            >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="telefono" />
                                </FormControl>
                                <FormLabel className="font-normal">Teléfono</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                               <FormControl>
                                <RadioGroupItem value="whatsapp" />
                               </FormControl>
                                <FormLabel className="font-normal">WhatsApp</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="correo" />
                                </FormControl>
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
        
        <Card className="max-w-4xl mx-auto shadow-sm border border-gray-200 rounded-xl">
          <CardHeader>
            <CardTitle>5. Fotos de la mascota</CardTitle>
            <CardDescription>Sube hasta 5 fotos claras. Arrastra los archivos o haz clic para seleccionar.</CardDescription>
          </CardHeader>
          <CardContent>
            <div {...getRootProps()} className={cn("relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors", isDragActive ? "border-primary bg-primary/10" : "border-gray-300 bg-gray-50 hover:bg-gray-100")}>
              <FormControl>
                <input {...getInputProps()} />
              </FormControl>
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-sm text-gray-600">
                  {isDragActive ? "Suelta las fotos aquí..." : "Arrastra tus fotos o haz clic para seleccionar"}
                </p>
                <p className="text-xs text-gray-500">JPG, PNG de hasta 5MB cada una.</p>
              </div>
            </div>
            {uploads.length > 0 && (
              <div className="mt-6 space-y-4">
                {uploads.map((upload, index) => (
                  <div key={index} className="flex items-center gap-4 p-2 border rounded-lg">
                    <File className="h-6 w-6 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">{upload.file.name}</p>
                      <Progress value={upload.progress} className="h-2 mt-1" />
                      {upload.status === 'error' && <p className="text-xs text-red-500 mt-1">{upload.error}</p>}
                    </div>
                    {upload.status === 'uploading' && <p className="text-sm text-gray-500">{Math.round(upload.progress)}%</p>}
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeUpload(index)} className="h-8 w-8">
                      {upload.status === 'uploading' ? <X className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto shadow-sm border border-gray-200 rounded-xl">
            <CardHeader>
                <CardTitle>6. Opciones de publicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormField
                    control={form.control}
                    name="visibleMapa"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Reporte visible en el mapa</FormLabel>
                                <FormDescription>Tu reporte aparecerá públicamente en el mapa interactivo.</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="permitirComentarios"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Permitir comentarios</FormLabel>
                                <FormDescription>Otros usuarios podrán comentar en tu reporte para ofrecer ayuda.</FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="consentimiento"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-4 bg-amber-50 border-amber-200">
                             <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                             </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                Acepto que la información de contacto y los detalles proporcionados serán públicos.
                                </FormLabel>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>


        <div className="max-w-4xl mx-auto flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={() => form.reset()}>Cancelar</Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Subiendo fotos...</> : 'Publicar Reporte'}
            </Button>
        </div>
      </form>
    </FormProvider>
  );
}
