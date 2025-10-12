'use client';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import IMask from 'imask';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle, Upload, Trash2 } from 'lucide-react';
import { chileanRegions } from "@/lib/chile-locations";

// Regex para validar teléfono chileno
const phoneRegex = new RegExp(
  /^\+56\s9\s\d{4}\s\d{4}$/
);

// Esquema de validación con Zod (incluyendo plantCount temporalmente)
const gardenSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio."),
  location: z.string().min(1, "La ubicación es obligatoria."),
  region: z.string({ required_error: "Por favor selecciona una región." }),
  commune: z.string({ required_error: "Por favor selecciona una comuna." }),
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
  medioPreferido: z.enum(["whatsapp", "correo"], { required_error: "Debes seleccionar un medio de contacto." }),
  photos: z.array(z.string()).optional(),
  visible: z.boolean().default(true),
  comments: z.boolean().default(true),
});

type GardenFormValues = z.infer<typeof gardenSchema>;

export function FormularioHuerta() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [communes, setCommunes] = useState<string[]>([]);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    } else {
      setShowLoginMessage(true);
    }
  }, []);

  const form = useForm<GardenFormValues>({
    resolver: zodResolver(gardenSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      location: '',
      surface: undefined, // Valor por defecto
      description: '',
      nombreContacto: "",
      telefono: "",
      correo: "",
      photos: [],
      visible: true,
      comments: true,
    },
  });

  // Debugging useEffect
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log("Form value changed:", value);
      console.log("Form state:", form.formState);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleRegionChange = (regionName: string) => {
    const region = chileanRegions.find(r => r.name === regionName);
    setCommunes(region ? region.communes : []);
    form.setValue('commune', "");
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImagePreviews(prev => [...prev, event.target.result as string]);
          form.setValue('photos', [...(form.getValues('photos') || []), event.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [form]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
  });

  const removeFile = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    form.setValue('photos', (form.getValues('photos') || []).filter((_, i) => i !== index));
  };

  async function onSubmit(data: GardenFormValues) {
    if (!authToken) {
      setShowLoginMessage(true);
      return;
    }
    setIsSubmitting(true);
    try {
      const rawData = form.getValues();
      const finalData = {
        ...rawData,
        userEmail: localStorage.getItem('userEmail'),
        cont_type: rawData.medioPreferido === 'whatsapp' ? 0 : 1,
      };
      delete (finalData as any).medioPreferido;

      console.log("Datos enviados al backend:", finalData); // Para debugging

      const response = await fetch('/api/gardens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        // Manejo de errores del servidor con más detalle
        let errorMessage = 'Error en la respuesta del servidor';
        try {
          const errorData = await response.json();
          console.log("Error del servidor:", errorData); // Para debugging
          
          // Formatear el mensaje de error de manera más clara
          if (errorData.errors) {
            // Si es un array de errores, los procesamos
            if (Array.isArray(errorData.errors)) {
              errorMessage = errorData.errors.map((e: any) => {
                // Manejar diferentes formatos de error
                if (typeof e === 'string') return e;
                if (typeof e === 'object') {
                  const key = Object.keys(e)[0];
                  return e[key];
                }
                return 'Error desconocido';
              }).join(', ');
            } else {
              // Si es un objeto de errores
              errorMessage = Object.values(errorData.errors).join(', ');
            }
          } else if (errorData.message) {
            errorMessage = errorData.message;
          } else {
            errorMessage = `Error: ${response.status} ${response.statusText}`;
          }
        } catch (e) {
          // Si no podemos parsear el error, usamos el mensaje de estado
          errorMessage = `Error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      toast({
        title: "¡Gracias! Tu huerta fue registrada.",
        description: "La información ha sido guardada con éxito.",
        action: <Button variant="outline" onClick={() => router.push('/')}>Ver huertas</Button>
      });

      form.reset();
      setImagePreviews([]);
      setCommunes([]);
    } catch(error: any) {
      console.error("Error al enviar el formulario:", error);
      toast({ variant: 'destructive', title: "Publicación fallida", description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (showLoginMessage) {
    return (
      <Card className="w-full max-w-2xl mx-auto my-8 shadow-lg">
        <CardHeader>
          <CardTitle>Acceso Restringido</CardTitle>
          <CardDescription>Debes iniciar sesión para poder publicar una huerta.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/login">
            <Button className="w-full">Ir a Iniciar Sesión</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const isFormInvalid = !form.formState.isValid;
  const isPublishDisabled = isSubmitting || isFormInvalid || !authToken;

  return (
    <FormProvider {...form}>
      <Card className="w-full max-w-2xl mx-auto my-8 shadow-lg">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader><CardTitle className="mb-2">Datos principales</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <FormField 
              control={form.control} 
              name="name" 
              render={({ field }) => ( 
                <FormItem> 
                  <FormLabel>Nombre de la huerta</FormLabel> 
                  <FormControl>
                    <Textarea placeholder="Ej: La huerta de María" {...field} />
                  </FormControl> 
                  <FormMessage /> 
                </FormItem> 
              )}
            />
            <div className="space-y-6 rounded-md border p-6">
              <h3 className="font-semibold">Ubicación de la huerta</h3>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Av. Siempre Viva 123" {...field} />
                    </FormControl>
                    <FormDescription>Ingresa la calle y número de la huerta.</FormDescription>
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
                      <Select 
                        onValueChange={(value) => { 
                          field.onChange(value); 
                          handleRegionChange(value); 
                        }} 
                        defaultValue={field.value}
                      >
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
                  name="commune"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comuna</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value} 
                        disabled={communes.length === 0}
                      >
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                control={form.control} 
                name="surface" 
                render={({ field }) => ( 
                  <FormItem> 
                    <FormLabel>Superficie aproximada (m²)</FormLabel> 
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Ej: 50" 
                        {...field} 
                        onChange={e => field.onChange(e.target.valueAsNumber || undefined)} 
                      />
                    </FormControl> 
                    <FormMessage /> 
                  </FormItem> 
                )}
              />
            </div>
          </CardContent>
          <div className="space-y-8">
            <CardHeader><CardTitle className="mb-2">Descripción</CardTitle></CardHeader>
            <CardContent>
              <FormField 
                control={form.control} 
                name="description" 
                render={({ field }) => ( 
                  <FormItem> 
                    <FormLabel>Descripción de la huerta</FormLabel> 
                    <FormControl>
                      <Textarea placeholder="Describe tu huerta, qué la hace especial, incluye actividades etc." {...field} />
                    </FormControl> 
                    <FormMessage /> 
                  </FormItem> 
                )}
              />
            </CardContent>
            <CardHeader><CardTitle className="mb-2">Cultivos y Prácticas</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <FormField 
                control={form.control} 
                name="crops.other" 
                render={({ field }) => ( 
                  <FormItem className="col-span-2"> 
                    <FormLabel>Actividades</FormLabel> 
                    <FormControl>
                      <Textarea placeholder="Ej: Tipo de plantaciones, Compostaje..." {...field} />
                    </FormControl> 
                    <FormMessage /> 
                  </FormItem> 
                )}
              />
            </CardContent>
          </div>
          <CardHeader><CardTitle className="mb-2">Contacto</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
              control={form.control} 
              name="nombreContacto" 
              render={({ field }) => ( 
                <FormItem> 
                  <FormLabel>Nombre de contacto</FormLabel> 
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Teléfono</FormLabel> 
                  <FormControl>
                    <MaskedInput placeholder="+56 9 XXXX XXXX" {...field} />
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
                  <FormControl>
                    <Input type="email" placeholder="tu@correo.com" {...field} />
                  </FormControl> 
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
                      value={field.value} 
                      className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8"
                    >
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
          <CardHeader>
            <CardTitle className="mb-2">Fotos</CardTitle>
            <CardDescription>Arrastra tus fotos aquí o haz clic para seleccionarlas (hasta 5, máx 5MB c/u).</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              {...getRootProps()} 
              className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-primary/5 hover:bg-primary/10 transition-colors ${isDragActive ? 'border-primary' : 'border-input'}`}
            >
              <input {...getInputProps()} />
              <div className="text-center text-muted-foreground">
                <Upload className="mx-auto h-10 w-10 mb-2" />
                {isDragActive ? <p>Suelta las imágenes aquí...</p> : <p>Arrastra tus fotos o haz clic para seleccionarlas</p>}
              </div>
            </div>
            {imagePreviews.length > 0 && (
              <div className="mt-4 space-y-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 border rounded-md bg-muted/50">
                    <img src={preview} alt={`preview ${index}`} className="h-12 w-12 rounded-md object-cover"/>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium truncate">Imagen {index + 1}</p>
                    </div>
                    <Button 
                      type="button" 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8" 
                      onClick={() => removeFile(index)}
                    >
                      <Trash2 className="h-4 w-4"/>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardContent className="pt-6">
            <Button 
              type="submit" 
              disabled={isPublishDisabled} 
              className="w-full font-bold py-6 text-lg"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" /> Publicando...
                </>
              ) : 'Publicar Huerta'}
            </Button>
          </CardContent>
        </form>
      </Card>
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
          setValue(name as any, mask.value, { shouldValidate: true, shouldDirty: true });
        }
      };
      mask.on('accept', handleAccept);
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