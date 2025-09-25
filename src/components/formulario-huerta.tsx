'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import IMask from 'imask';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, UploadTask } from 'firebase/storage';
import { app } from '@/lib/firebase/config';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle, Upload, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Setup de Firebase Storage
const storage = getStorage(app);

// Carga dinámica del mapa
const LeafletMapDraggable = dynamic(() => import('@/components/leaflet-map-draggable'), {
  ssr: false,
  loading: () => <p className="text-sm text-muted-foreground p-4 bg-muted rounded-md mt-2">Cargando mapa...</p>,
});

// Regex para validar teléfono chileno
const phoneRegex = new RegExp(
  /^(\+?56)?(\s?)(9)(\s?)[987654321]\d{7}$/
);

// Esquema de validación con Zod
const gardenSchema = z.object({
  gardenName: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  lat: z.number({ required_error: "Debes seleccionar una ubicación en el mapa."}),
  lng: z.number({ required_error: "Debes seleccionar una ubicación en el mapa."}),
  surface: z.preprocess(
    (val) => (val === "" ? undefined : Number(String(val).replace(/\D/g, ''))),
    z.number().positive("La superficie debe ser un número positivo.").optional()
  ),
  description: z.string().optional(),
  crops: z.object({
    tomatoes: z.boolean().default(false),
    lettuces: z.boolean().default(false),
    herbs: z.boolean().default(false),
    other: z.string().optional(),
    compostable: z.boolean().default(false),
    efficientWatering: z.boolean().default(false),
    noPesticides: z.boolean().default(false),
  }),
  nombreContacto: z.string().min(1, "El nombre de contacto es requerido."),
  telefono: z.string().regex(phoneRegex, "Número de teléfono inválido."),
  correo: z.union([z.literal(''), z.string().email("Correo electrónico inválido.")]).optional(),
  medioPreferido: z.enum(["telefono", "whatsapp", "correo"], { required_error: "Debes seleccionar un medio de contacto." }),
  photos: z.array(z.string()).optional(),
  visible: z.boolean().default(true),
  comments: z.boolean().default(true),
  consentimiento: z.literal<boolean>(true, { errorMap: () => ({ message: "Debes aceptar las condiciones." }) }),
});

type GardenFormValues = z.infer<typeof gardenSchema>;

interface FileUpload {
  file: File;
  id: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  source: UploadTask | null; 
  preview: string;
}

export function FormularioHuerta() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<FileUpload[]>([]);

  const form = useForm<GardenFormValues>({
    resolver: zodResolver(gardenSchema),
    mode: 'onChange',
    defaultValues: {
      gardenName: '',
      surface: undefined,
      description: '',
      crops: {
        tomatoes: false,
        lettuces: false,
        herbs: false,
        other: '',
        compostable: false,
        efficientWatering: false,
        noPesticides: false,
      },
      nombreContacto: "",
      telefono: "",
      correo: "",
      photos: [],
      visible: true,
      comments: true,
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

  const startUpload = useCallback(async (fileUpload: FileUpload) => {
    const { file, id } = fileUpload;
    // ... (Image compression logic would go here if needed)
    const storageRef = ref(storage, `garden-photos/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    setFilesToUpload(prev => prev.map(f => f.id === id ? { ...f, source: uploadTask, status: 'uploading' } : f));
    
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilesToUpload(prev => prev.map(f => f.id === id ? { ...f, progress } : f));
        },
        (error) => {
            toast({ variant: 'destructive', title: 'Error de subida', description: `No se pudo subir ${file.name}.` });
            setFilesToUpload(prev => prev.map(f => f.id === id ? { ...f, status: 'error' } : f));
        },
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            form.setValue('photos', [...(form.getValues('photos') || []), downloadURL]);
            setFilesToUpload(prev => prev.map(f => f.id === id ? { ...f, status: 'success', progress: 100 } : f));
        }
    );
  }, [form, toast]);

  const uploadAllFiles = useCallback(async () => {
    const pendingFiles = filesToUpload.filter(f => f.status === 'pending');
    await Promise.all(pendingFiles.map(startUpload));
  }, [filesToUpload, startUpload]);

  async function onSubmit(data: GardenFormValues) {
    setIsSubmitting(true);
    await uploadAllFiles();

    const checkUploads = () => new Promise<void>((resolve, reject) => {
        const interval = setInterval(() => {
            const stillUploading = filesToUpload.some(f => f.status === 'uploading' || f.status === 'pending');
            if (!stillUploading) {
                clearInterval(interval);
                const hasErrors = filesToUpload.some(f => f.status === 'error');
                if (hasErrors) {
                    reject(new Error("Algunas imágenes no se subieron. Por favor, revisa y vuelve a intentar."));
                } else {
                    resolve();
                }
            }
        }, 500);
    });

    try {
        await checkUploads();
        const finalData = form.getValues();
        console.log("Datos finales a enviar (simulando CREATE en BBDD):", finalData);
        
        toast({
          title: "¡Gracias! Tu huerta fue registrada.",
          description: "La información ha sido guardada con éxito.",
          action: <Button variant="outline" onClick={() => router.push('/')}>Ver huertas</Button>
        });
        form.reset();
        setFilesToUpload([]);
    } catch(error: any) {
        toast({ variant: 'destructive', title: "Publicación fallida", description: error.message });
    } finally {
        setIsSubmitting(false);
    }
  }

  const isUploading = filesToUpload.some(f => f.status === 'uploading' || f.status === 'pending');
  const isFormInvalid = !form.formState.isValid;
  const isPublishDisabled = isSubmitting || isUploading || isFormInvalid || !form.getValues('consentimiento');

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="max-w-3xl mx-auto shadow-md border rounded-2xl">
          <CardHeader><CardTitle>Datos principales</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <FormField control={form.control} name="gardenName" render={({ field }) => ( <FormItem> <FormLabel>Nombre de la huerta</FormLabel> <FormControl><Input placeholder="Ej: La huerta de María" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
            <div>
              <Label>Ubicación</Label>
              <div className="h-[400px] mt-2 w-full rounded-md overflow-hidden relative">
                 <LeafletMapDraggable onLocationChange={handleLocationChange} />
              </div>
              <FormMessage>{form.formState.errors.lat?.message || form.formState.errors.lng?.message}</FormMessage>
            </div>
             <FormField control={form.control} name="surface" render={({ field }) => ( <FormItem> <FormLabel>Superficie aproximada (m²)</FormLabel> <FormControl><Input type="number" placeholder="Ej: 50" {...field} onChange={e => field.onChange(e.target.valueAsNumber || undefined)} /></FormControl> <FormMessage /> </FormItem> )}/>
          </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto shadow-md border rounded-2xl">
            <CardHeader><CardTitle>Descripción</CardTitle></CardHeader>
            <CardContent>
                <FormField control={form.control} name="description" render={({ field }) => ( <FormItem> <FormLabel>Descripción de la huerta</FormLabel> <FormControl><Textarea placeholder="Describe tu huerta, qué la hace especial, etc." {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
            </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto shadow-md border rounded-2xl">
            <CardHeader><CardTitle>Cultivos y Prácticas</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                {['tomatoes', 'lettuces', 'herbs', 'compostable', 'efficientWatering', 'noPesticides'].map(cropName => (
                    <FormField
                        key={cropName}
                        control={form.control}
                        name={`crops.${cropName}` as any}
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                <FormLabel className="font-normal">{ {tomatoes: 'Tomates', lettuces: 'Lechugas', herbs: 'Hierbas', compostable: 'Compostable', efficientWatering: 'Riego Eficiente', noPesticides: 'Sin pesticidas químicos'}[cropName] }</FormLabel>
                            </FormItem>
                        )}
                    />
                ))}
                 <FormField control={form.control} name="crops.other" render={({ field }) => ( <FormItem className="col-span-2"> <FormLabel>Otros</FormLabel> <FormControl><Input placeholder="Ej: Papas, zanahorias..." {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
            </CardContent>
        </Card>

        <Card className="max-w-3xl mx-auto shadow-md border rounded-2xl">
          <CardHeader><CardTitle>Contacto</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="nombreContacto" render={({ field }) => ( <FormItem> <FormLabel>Nombre de contacto</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
            <FormField control={form.control} name="telefono" render={({ field }) => ( <FormItem> <FormLabel>Teléfono</FormLabel> <FormControl><MaskedInput placeholder="+56 9 XXXX XXXX" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
            <FormField control={form.control} name="correo" render={({ field }) => ( <FormItem className="md:col-span-2"> <FormLabel>Correo electrónico (opcional)</FormLabel> <FormControl><Input type="email" placeholder="tu@correo.com" {...field} /></FormControl> <FormMessage /> </FormItem> )}/>
            <FormField control={form.control} name="medioPreferido" render={({ field }) => (
                <FormItem className="space-y-3 md:col-span-2">
                  <FormLabel>Medio de contacto preferido</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="telefono" /></FormControl><FormLabel className="font-normal">Teléfono</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="whatsapp" /></FormControl><FormLabel className="font-normal">WhatsApp</FormLabel></FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="correo" /></FormControl><FormLabel className="font-normal">Correo</FormLabel></FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}/>
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
                <div className="text-center text-muted-foreground"><Upload className="mx-auto h-10 w-10 mb-2" />{isDragActive ? <p>Suelta las imágenes aquí...</p> : <p>Arrastra tus fotos o haz clic para seleccionarlas</p>}</div>
            </div>
            {filesToUpload.length > 0 && (
                <div className="mt-4 space-y-2">
                    {filesToUpload.map(f => (
                        <div key={f.id} className="flex items-center gap-3 p-2 border rounded-md bg-muted/50">
                           <img src={f.preview} alt={f.file.name} className="h-12 w-12 rounded-md object-cover"/>
                           <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium truncate">{f.file.name}</p>
                                {f.status === 'uploading' && <Progress value={f.progress} className="h-2" />}
                                {f.status === 'success' && <p className="text-xs text-green-600">¡Subido!</p>}
                                {f.status === 'error' && <p className="text-xs text-red-600">Error en la subida</p>}
                                {f.status === 'pending' && <p className="text-xs text-muted-foreground">Pendiente de subida</p>}
                           </div>
                           {(f.status === 'pending' || f.status === 'error') && <Button type="button" size="sm" onClick={() => startUpload(f)}>{f.status === 'error' ? 'Reintentar' : 'Subir'}</Button>}
                           <Button type="button" size="icon" variant="ghost" className="h-8 w-8" onClick={() => removeFile(f.id)}><Trash2 className="h-4 w-4"/></Button>
                        </div>
                    ))}
                </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="max-w-3xl mx-auto shadow-md border rounded-2xl">
            <CardHeader><CardTitle>Opciones de privacidad y publicación</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <FormField control={form.control} name="visible" render={({ field }) => ( <FormItem className="flex flex-row items-center space-x-3 space-y-0"> <FormControl><Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} /></FormControl> <FormLabel className="font-normal">Visible en el mapa comunitario</FormLabel> </FormItem> )}/>
                <FormField control={form.control} name="comments" render={({ field }) => ( <FormItem className="flex flex-row items-center space-x-3 space-y-0"> <FormControl><Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} /></FormControl> <FormLabel className="font-normal">Permitir comentarios en la publicación</FormLabel> </FormItem> )}/>
                 <FormField control={form.control} name="consentimiento" render={({ field }) => ( <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-4 data-[state=unchecked]:border-destructive"> <FormControl><Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(Boolean(v))} /></FormControl> <div className="space-y-1 leading-none"> <FormLabel>Acepto que los datos proporcionados se hagan públicos para facilitar la visibilidad de la huerta.</FormLabel> <FormMessage /> </div> </FormItem> )}/>
            </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit" disabled={isPublishDisabled}>{isSubmitting || isUploading ? <><LoaderCircle className="animate-spin mr-2" /> Publicando...</> : 'Publicar Huerta'}</Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}

const MaskedInput = React.forwardRef<HTMLInputElement, Omit<React.ComponentProps<typeof Input>, 'onChange'>>((props, ref) => {
  const { name, onBlur, ...rest } = props;
  const { getValues, setValue, trigger } = useFormContext();
  const [mask, setMask] = React.useState<IMask.Masked<any> | null>(null);
  const internalRef = React.useRef<HTMLInputElement | null>(null);

  React.useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

  React.useEffect(() => {
    if (!internalRef.current) return;
    const masked = IMask(internalRef.current, { mask: "+{56} 9 0000 0000" });
    setMask(masked);
    return () => { masked.destroy(); };
  }, []);

  
  React.useEffect(() => {
    if (mask && name) {
      const handleAccept = () => {
        if (getValues(name) !== mask.value) {
          // Fix: Cast name as any para evitar error de TypeScript
          setValue(name as any, mask.value, { shouldValidate: true, shouldDirty: true });
        }
      };
      
      mask.on('accept', handleAccept);
      
      // Cleanup del event listener
      return () => {
        mask.off('accept', handleAccept);
      };
    }
  }, [mask, name, getValues, setValue]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
    if (name) {
      trigger(name as any);
    }
  };

  return <Input ref={internalRef} onBlur={handleBlur} {...rest} />;
});

MaskedInput.displayName = 'MaskedInput';