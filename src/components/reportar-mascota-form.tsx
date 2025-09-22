'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import IMask from 'imask';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '@/lib/firebase/config';

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
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle, Upload, X, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import * as React from 'react';

const storage = getStorage(app);

const LeafletMapDraggable = dynamic(() => import('@/components/leaflet-map-draggable'), {
  ssr: false,
  loading: () => <p className="text-sm text-muted-foreground p-4 bg-muted rounded-md mt-2">Cargando mapa...</p>,
});

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
    lat: z.number({ required_error: "Debes seleccionar una ubicación en el mapa."}),
    lng: z.number({ required_error: "Debes seleccionar una ubicación en el mapa."}),
    nombreContacto: z.string().min(1, "El nombre de contacto es requerido."),
    telefono: z.string().regex(phoneRegex, "Número de teléfono inválido."),
    correo: z.string().email("Correo electrónico inválido.").optional().or(z.literal('')),
    medioPreferido: z.enum(["telefono", "whatsapp", "correo"], { required_error: "Debes seleccionar un medio de contacto." }),
    fotos: z.array(z.string()).optional(), // Se guardarán las URLs
    visibleMapa: z.boolean().default(true),
    permitirComentarios: z.boolean().default(true),
    consentimiento: z.literal<boolean>(true, { errorMap: () => ({ message: "Debes aceptar las condiciones." }) }),
  }).refine(data => data.especie !== 'Otro' || (data.especie === 'Otro' && data.especieOtra && data.especieOtra.length > 0), {
    message: "Debes especificar la especie.",
    path: ["especieOtra"],
  });

type ReportFormValues = z.infer<typeof reportSchema>;

interface FileUpload {
  file: File;
  id: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  source: any; // UploadTask
  preview: string;
}

const MaskedInput = React.forwardRef<HTMLInputElement, any>(({ onChange, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { ref: hookFormRef, ...rest } = props;

    const maskOptions = useMemo(() => ({ mask: '+{56} 9 0000 0000' }), []);
  
    useEffect(() => {
      if (!inputRef.current) return;
      const mask = IMask(inputRef.current, maskOptions);
      mask.on('accept', () => {
        if(onChange) {
            onChange({ target: { value: mask.value } });
        }
      });
      return () => mask.destroy();
    }, [maskOptions, onChange]);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
  
    return <Input ref={inputRef} {...rest} />;
});
MaskedInput.displayName = 'MaskedInput';


export function ReportarMascotaForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<FileUpload[]>([]);

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
      temperamento: [],
      fotos: [],
      llevaCollar: false,
      recompensa: false,
      visibleMapa: true,
      permitirComentarios: true,
    },
  });

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach((error: any) => {
            let message = 'Error desconocido al subir el archivo.';
            if (error.code === 'file-too-large') {
                message = `El archivo ${file.name} es muy grande. El máximo es 5MB.`;
            } else if (error.code === 'file-invalid-type') {
                message = `El tipo de archivo de ${file.name} no es válido. Solo se permiten JPG y PNG.`;
            }
          toast({ variant: 'destructive', title: 'Error de archivo', description: message });
        });
      });
    }

    const newFiles = acceptedFiles.map(file => ({
      file,
      id: `${file.name}-${new Date().getTime()}`,
      progress: 0,
      status: 'pending' as const,
      source: null,
      preview: URL.createObjectURL(file),
    }));

    setFilesToUpload(prev => [...prev, ...newFiles].slice(0, 5));
  }, [toast]);

  useEffect(() => {
    return () => {
      filesToUpload.forEach(f => {
        if (f.preview) URL.revokeObjectURL(f.preview);
        if (f.source) f.source.cancel();
      });
    };
  }, [filesToUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
  });

  const handleLocationChange = useCallback((lat: number, lng: number) => {
    form.setValue('lat', lat, { shouldValidate: true, shouldDirty: true });
    form.setValue('lng', lng, { shouldValidate: true, shouldDirty: true });
  }, [form]);

  const removeFile = (id: string) => {
    setFilesToUpload(prev => {
        const fileToRemove = prev.find(f => f.id === id);
        if (fileToRemove) {
            if (fileToRemove.source) fileToRemove.source.cancel();
            if (fileToRemove.preview) URL.revokeObjectURL(fileToRemove.preview);
        }
        return prev.filter(f => f.id !== id);
    });
  };

  const startUpload = async (fileUpload: FileUpload) => {
    const { file, id } = fileUpload;

    const compressImage = (file: File): Promise<Blob> => {
        return new Promise(async (resolve, reject) => {
            console.log('Comprimiendo...');
            const bmp = await createImageBitmap(file);
            const { width, height } = bmp;
            const max_size = 1600;
            let newWidth = width;
            let newHeight = height;
    
            if (width > height) {
                if (width > max_size) {
                    newHeight = Math.round((height * max_size) / width);
                    newWidth = max_size;
                }
            } else {
                if (height > max_size) {
                    newWidth = Math.round((width * max_size) / height);
                    newHeight = max_size;
                }
            }
    
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('No se pudo obtener el contexto del canvas'));
            ctx.drawImage(bmp, 0, 0, newWidth, newHeight);
    
            canvas.toBlob((blob) => {
                if (!blob) return reject(new Error('La compresión del canvas falló'));
                resolve(blob);
            }, 'image/jpeg', 0.8);
        });
    };
    
    try {
        const compressedBlob = await compressImage(file);
        const storageRef = ref(storage, `pet-reports/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, compressedBlob, { contentType: 'image/jpeg' });
        
        setFilesToUpload(prev => prev.map(f => f.id === id ? { ...f, source: uploadTask, status: 'uploading' } : f));
        
        let timeout: NodeJS.Timeout;
        const resetTimeout = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                uploadTask.cancel();
                toast({ variant: 'destructive', title: 'Error de subida', description: `La subida de ${file.name} tardó demasiado.` });
                setFilesToUpload(prev => prev.map(f => f.id === id ? { ...f, status: 'error' } : f));
            }, 15000);
        };
        
        uploadTask.on('state_changed',
            (snapshot) => {
                resetTimeout();
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Subiendo (${progress.toFixed(0)}%)...`);
                setFilesToUpload(prev => prev.map(f => f.id === id ? { ...f, progress } : f));
            },
            (error) => {
                clearTimeout(timeout);
                console.error("Error de subida:", error);
                toast({ variant: 'destructive', title: 'Error de subida', description: `No se pudo subir ${file.name}.` });
                setFilesToUpload(prev => prev.map(f => f.id === id ? { ...f, status: 'error' } : f));
            },
            async () => {
                clearTimeout(timeout);
                console.log('Completado');
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                form.setValue('fotos', [...(form.getValues('fotos') || []), downloadURL]);
                setFilesToUpload(prev => prev.map(f => f.id === id ? { ...f, status: 'success', progress: 100 } : f));
            }
        );
        resetTimeout();
    } catch(error) {
        toast({ variant: 'destructive', title: 'Error de Compresión', description: 'No se pudo procesar la imagen.' });
        setFilesToUpload(prev => prev.map(f => f.id === id ? { ...f, status: 'error' } : f));
    }
  };

  const uploadAllFiles = async () => {
    const pendingFiles = filesToUpload.filter(f => f.status === 'pending');
    for (const file of pendingFiles) {
        await startUpload(file);
    }
  };

  async function onSubmit(data: ReportFormValues) {
    setIsSubmitting(true);
    await uploadAllFiles();

    // Esperar a que todas las subidas terminen
    const checkUploads = setInterval(() => {
      const uploading = filesToUpload.some(f => f.status === 'uploading' || f.status === 'pending');
      if (!uploading) {
        clearInterval(checkUploads);
        const finalData = form.getValues();
        const success = filesToUpload.every(f => f.status === 'success' || f.status === 'error');

        if (filesToUpload.length > 0 && !success) {
            toast({ variant: 'destructive', title: "Publicación fallida", description: "Algunas imágenes no se subieron. Por favor, revisa y vuelve a intentar." });
            setIsSubmitting(false);
            return;
        }

        console.log("Datos finales a enviar a Firestore:", finalData);
        // Aquí iría la lógica para guardar en Firestore
        // const docRef = await addDoc(collection(db, "mascotas_reportes"), { ... });
        toast({
          title: "¡Gracias! Publicamos tu reporte.",
          description: "La información ha sido guardada con éxito.",
          action: <Button variant="outline" onClick={() => router.push('/mapa')}>Ver en el mapa</Button>
        });
        
        setIsSubmitting(false);
        // router.push('/mascotas');
      }
    }, 500);
  }

  const isUploading = filesToUpload.some(f => f.status === 'uploading');
  const isFormInvalid = !form.formState.isValid;
  const isPublishDisabled = isSubmitting || isUploading || isFormInvalid || !form.getValues('consentimiento');

  const especieValue = form.watch('especie');
  const llevaCollarValue = form.watch('llevaCollar');
  const recompensaValue = form.watch('recompensa');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="max-w-3xl mx-auto shadow-md border rounded-2xl">
          <CardHeader>
            <CardTitle>Datos principales</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="nombreMascota" render={({ field }) => ( <FormItem> <FormLabel>Nombre de la mascota</FormLabel> <FormControl> <Input placeholder="Ej: 'Rocky' o 'Desconocido'" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
            <FormField control={form.control} name="especie" render={({ field }) => ( <FormItem> <FormLabel>Especie</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Selecciona una especie" /> </SelectTrigger> </FormControl> <SelectContent> <SelectItem value="Perro">Perro</SelectItem> <SelectItem value="Gato">Gato</SelectItem> <SelectItem value="Ave">Ave</SelectItem> <SelectItem value="Roedor">Roedor</SelectItem> <SelectItem value="Reptil">Reptil</SelectItem> <SelectItem value="Otro">Otro</SelectItem> </SelectContent> </Select> <FormMessage /> </FormItem> )}/>
            {especieValue === 'Otro' && ( <FormField control={form.control} name="especieOtra" render={({ field }) => ( <FormItem className="md:col-span-2"> <FormLabel>Especifique la especie</FormLabel> <FormControl> <Input placeholder="Ej: Conejo" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/> )}
            <FormField control={form.control} name="raza" render={({ field }) => ( <FormItem> <FormLabel>Raza (opcional)</FormLabel> <FormControl> <Input placeholder="Ej: Quiltro" {...field} /> </FormControl> </FormItem> )}/>
            <FormField control={form.control} name="colorPrincipal" render={({ field }) => ( <FormItem> <FormLabel>Color principal</FormLabel> <FormControl> <Input placeholder="Ej: Café, Negro con blanco" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
            <FormField control={form.control} name="tamano" render={({ field }) => ( <FormItem> <FormLabel>Tamaño</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Selecciona un tamaño" /> </SelectTrigger> </FormControl> <SelectContent> <SelectItem value="Pequeño">Pequeño (hasta 10kg)</SelectItem> <SelectItem value="Mediano">Mediano (10 a 25kg)</SelectItem> <SelectItem value="Grande">Grande (más de 25kg)</SelectItem> </SelectContent> </Select> <FormMessage /> </FormItem> )}/>
            <FormField control={form.control} name="microchip" render={({ field }) => ( <FormItem> <FormLabel>N° de microchip (opcional)</FormLabel> <FormControl> <Input placeholder="Si lo conoces, ingrésalo" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
          </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto shadow-md border rounded-2xl">
            <CardHeader> <CardTitle>Señales y características</CardTitle> </CardHeader>
            <CardContent className="space-y-6">
                <FormField control={form.control} name="senas" render={({ field }) => ( <FormItem> <FormLabel>Señas distintivas (opcional)</FormLabel> <FormControl> <Textarea placeholder="Ej: oreja izquierda caída, cicatriz en pata trasera, mancha blanca en el pecho" {...field} /> </FormControl> </FormItem> )}/>
                <div className="space-y-4">
                    <FormField control={form.control} name="llevaCollar" render={({ field }) => ( <FormItem className="flex flex-row items-center space-x-3 space-y-0"> <FormControl> <Checkbox checked={field.value} onCheckedChange={field.onChange} /> </FormControl> <FormLabel className="font-normal">¿Llevaba collar o placa?</FormLabel> </FormItem> )}/>
                    {llevaCollarValue && ( <FormField control={form.control} name="collarDescripcion" render={({ field }) => ( <FormItem> <FormLabel>Color/Descripción del collar</FormLabel> <FormControl> <Input placeholder="Ej: Collar rojo con una patita" {...field} /> </FormControl> </FormItem> )}/> )}
                </div>
                <FormField control={form.control} name="temperamento" render={() => ( <FormItem> <div className="mb-4"> <FormLabel>Temperamento (opcional)</FormLabel> <FormDescription>Marca las opciones que apliquen.</FormDescription> </div> <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> {['Tímida/o', 'Sociable', 'Nerviosa/o', 'Puede morder'].map((item) => ( <FormField key={item} control={form.control} name="temperamento" render={({ field }) => { return ( <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0"> <FormControl> <Checkbox checked={field.value?.includes(item)} onCheckedChange={(checked) => { return checked ? field.onChange([...(field.value || []), item]) : field.onChange( field.value?.filter( (value) => value !== item ) ) }} /> </FormControl> <FormLabel className="font-normal"> {item} </FormLabel> </FormItem> ) }}/> ))} </div> <FormMessage /> </FormItem> )}/>
                <div className="space-y-4">
                     <FormField control={form.control} name="recompensa" render={({ field }) => ( <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4"> <div className="space-y-0.5"> <FormLabel>¿Se ofrece recompensa?</FormLabel> <FormDescription>Activa si ofreces una recompensa monetaria.</FormDescription> </div> <FormControl> <Switch checked={field.value} onCheckedChange={field.onChange} /> </FormControl> </FormItem> )}/>
                    {recompensaValue && ( <FormField control={form.control} name="montoRecompensa" render={({ field }) => ( <FormItem> <FormLabel>Monto estimado (CLP)</FormLabel> <FormControl> <Input type="number" placeholder="50000" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/> )}
                </div>
            </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto shadow-md border rounded-2xl">
            <CardHeader> <CardTitle>Última vez vista</CardTitle> </CardHeader>
            <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="fechaPerdida" render={({ field }) => ( <FormItem> <FormLabel>Fecha</FormLabel> <FormControl> <Input type="date" {...field} value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''} onChange={(e) => field.onChange(e.target.valueAsDate ? new Date(e.target.valueAsDate.valueOf() + e.target.valueAsDate.getTimezoneOffset() * 60 * 1000) : undefined)} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="horaPerdida" render={({ field }) => ( <FormItem> <FormLabel>Hora aproximada (opcional)</FormLabel> <FormControl> <Input type="time" {...field} /> </FormControl> </FormItem> )}/>
                </div>
                <FormField control={form.control} name="direccion" render={({ field }) => ( <FormItem> <FormLabel>Dirección / Referencia del lugar</FormLabel> <FormControl> <Input placeholder="Ej: Av. Siempre Viva 123, plaza cercana, comuna" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                <div>
                  <Label>Ubicación en el mapa</Label>
                  <div className="h-[400px] mt-2 w-full rounded-md overflow-hidden relative">
                    <LeafletMapDraggable onLocationChange={handleLocationChange} />
                  </div>
                  <FormMessage>{form.formState.errors.lat?.message || form.formState.errors.lng?.message}</FormMessage>
                </div>
            </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto shadow-md border rounded-2xl">
            <CardHeader> <CardTitle>Contacto</CardTitle> </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="nombreContacto" render={({ field }) => ( <FormItem> <FormLabel>Nombre de contacto</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <MaskedInput
                          {...field}
                          type="tel"
                          placeholder="+56 9 XXXX XXXX"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField control={form.control} name="correo" render={({ field }) => ( <FormItem className="md:col-span-2"> <FormLabel>Correo electrónico (opcional)</FormLabel> <FormControl><Input type="email" placeholder="tu@correo.com" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
                <FormField control={form.control} name="medioPreferido" render={({ field }) => ( <FormItem className="space-y-3 md:col-span-2"> <FormLabel>Medio de contacto preferido</FormLabel> <FormControl> <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8"> <FormItem className="flex items-center space-x-3 space-y-0"> <FormControl><RadioGroupItem value="telefono" /></FormControl> <FormLabel className="font-normal">Teléfono</FormLabel> </FormItem> <FormItem className="flex items-center space-x-3 space-y-0"> <FormControl><RadioGroupItem value="whatsapp" /></FormControl> <FormLabel className="font-normal">WhatsApp</FormLabel> </FormItem> <FormItem className="flex items-center space-x-3 space-y-0"> <FormControl><RadioGroupItem value="correo" /></FormControl> <FormLabel className="font-normal">Correo</FormLabel> </FormItem> </RadioGroup> </FormControl> <FormMessage /> </FormItem> )}/>
            </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto shadow-md border rounded-2xl">
          <CardHeader>
            <CardTitle>Fotos</CardTitle>
            <CardDescription>Arrastra tus fotos aquí o haz clic para seleccionarlas (hasta 5, máx 5MB c/u).</CardDescription>
          </CardHeader>
          <CardContent>
            <div {...getRootProps()} className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-primary/5 hover:bg-primary/10 transition-colors ${isDragActive ? 'border-primary' : 'border-input'}`}>
                <input {...getInputProps()} />
                <div className="text-center text-muted-foreground">
                    <Upload className="mx-auto h-10 w-10 mb-2" />
                    {isDragActive ? <p>Suelta las imágenes aquí...</p> : <p>Arrastra tus fotos o haz clic para seleccionarlas</p>}
                </div>
            </div>
            {filesToUpload.length > 0 && (
                <div className="mt-4 space-y-2">
                    {filesToUpload.map(f => (
                        <div key={f.id} className="flex items-center gap-3 p-2 border rounded-md">
                           <img src={f.preview} alt={f.file.name} className="h-12 w-12 rounded-md object-cover"/>
                           <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium truncate">{f.file.name}</p>
                                {f.status === 'uploading' && <Progress value={f.progress} className="h-2" />}
                                {f.status === 'success' && <p className="text-xs text-green-600">¡Subido!</p>}
                                {f.status === 'error' && <p className="text-xs text-red-600">Error en la subida</p>}
                           </div>
                           {f.status === 'pending' && <Button type="button" size="sm" onClick={() => startUpload(f)}>Subir</Button>}
                           {(f.status === 'uploading' || f.status === 'error') && <Button type="button" size="sm" variant="destructive" onClick={() => removeFile(f.id)}><X className="h-4 w-4"/></Button>}
                           {f.status === 'success' && <Button type="button" size="sm" variant="ghost" onClick={() => removeFile(f.id)}><Trash2 className="h-4 w-4"/></Button>}
                        </div>
                    ))}
                </div>
            )}
          </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto shadow-md border rounded-2xl">
            <CardHeader> <CardTitle>Opciones de privacidad y publicación</CardTitle> </CardHeader>
            <CardContent className="space-y-4">
                <FormField control={form.control} name="visibleMapa" render={({ field }) => ( <FormItem className="flex flex-row items-center space-x-3 space-y-0"> <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl> <FormLabel className="font-normal">Visible en el mapa comunitario</FormLabel> </FormItem> )}/>
                <FormField control={form.control} name="permitirComentarios" render={({ field }) => ( <FormItem className="flex flex-row items-center space-x-3 space-y-0"> <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl> <FormLabel className="font-normal">Permitir comentarios en la publicación</FormLabel> </FormItem> )}/>
                 <FormField control={form.control} name="consentimiento" render={({ field }) => ( <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-4 data-[state=unchecked]:border-destructive"> <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl> <div className="space-y-1 leading-none"> <FormLabel> Acepto que los datos proporcionados se hagan públicos para facilitar la búsqueda de la mascota. </FormLabel> <FormMessage /> </div> </FormItem> )}/>
            </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPublishDisabled}>
              {isSubmitting || isUploading ? <LoaderCircle className="animate-spin" /> : 'Publicar Reporte'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
