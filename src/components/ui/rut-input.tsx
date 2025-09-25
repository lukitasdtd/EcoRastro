'use client';

import * as React from "react";
import { Input, type InputProps } from "@/components/ui/input";

// Función para formatear el RUT
const formatRut = (value: string) => {
  if (!value) return "";

  // Limpiar el valor de todo lo que no sea número o la letra 'k'
  let cleanValue = value.replace(/[^0-9kK]/g, "").toUpperCase();
  
  if (cleanValue.length === 0) return "";

  // Separar el cuerpo del dígito verificador
  let body = cleanValue.slice(0, -1);
  let verifier = cleanValue.slice(-1);

  // Formatear el cuerpo con puntos
  body = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${body}-${verifier}`;
};

// Función para limpiar el RUT (quitar formato)
const cleanRut = (formattedValue: string) => {
  return formattedValue.replace(/\./g, "").replace(/-/g, "");
};


const RutInput = React.forwardRef<HTMLInputElement, InputProps>(({ onChange, ...props }, ref) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = cleanRut(e.target.value);
    const formattedValue = formatRut(rawValue);

    // Actualizar el valor del input de forma controlada
    e.target.value = formattedValue;

    // Propagar el evento si existe un `onChange`
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Input 
      {...props} 
      ref={ref}
      onChange={handleChange}
      maxLength={12} // ej: 12.345.678-9
      placeholder="12.345.678-9"
    />
  )
});

RutInput.displayName = "RutInput";

export { RutInput };
