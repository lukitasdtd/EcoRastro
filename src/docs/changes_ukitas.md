# Historial de Cambios - Rama "ukitas"

Este documento registra las modificaciones realizadas en la rama "ukitas".
---

## Sesión 4 
##  Funcionalidad de Geolocalización en Formulario de Reporte

### Archivos Modificados:
- `src/components/location-picker.tsx` (Nuevo)
- `src/components/leaflet-map-draggable.tsx`
- `src/components/reportar-mascota-form.tsx`

### Cambios Realizados:
- Se integró la funcionalidad de geolocalización en el formulario de reporte de mascotas.

## Mejoras en la Página de Perfil de Usuario

### Archivos Modificados:
- `src/app/usuario/page.tsx`

### Cambios Realizados:
- Se implementaron pestañas y contadores para organizar y resumir la actividad del usuario.
- Se corrigió un error de sintaxis en el JSX.

## Componente de Input para RUT y Actualización del Formulario de Registro

### Archivos Modificados:
- `src/components/ui/rut-input.tsx` (Nuevo)
- `src/app/signup/page.tsx`

### Cambios Realizados:
- Se creó un componente reutilizable (`RutInput`) para formatear automáticamente el RUT chileno.
- Se actualizó el formulario de registro para usar este nuevo componente y alinear los campos con el perfil de usuario.

## Implementación de la Validación de RUT en el Formulario de Registro

### Archivos Modificados:
- `src/lib/rut-validator.ts` (Nuevo)
- `src/app/signup/page.tsx`

### Cambios Realizados:
- Se creó una función de utilidad `validateRut` para centralizar la lógica de validación del RUT chileno.
- Se integró la validación en tiempo real en el formulario de registro, con feedback visual (borde rojo y mensaje) y deshabilitación del botón de envío para RUTs inválidos.

## Validación Completa del Formulario de Registro

### Archivos Modificados:
- `src/app/signup/page.tsx`

### Cambios Realizados:
- Se implementó una validación integral que requiere que todos los campos del formulario de registro (Nombre, Apellido, RUT, Correo Electrónico y Contraseña) estén completos antes de habilitar el botón de envío.
- Se añadió `useState` para gestionar el estado de cada uno de los campos del formulario.
- Se consolidó la lógica de validación en una única condición (`isFormValid`) que verifica que todos los campos estén llenos y que el RUT sea válido.
- El botón "Crear Cuenta" ahora permanece deshabilitado (`disabled`) hasta que se cumplan todas las condiciones, asegurando la integridad de los datos enviados.
---

## Sesión 3: Correcciones en el Navbar y Menú Móvil

### Archivos Modificados:
- `src/lib/menu-data.ts`
- `src/components/header.tsx`

### Cambios Realizados:
- Se realizaron ajustes visuales y funcionales en la navegación principal.

---

## Sesión 2: Actualización de la Paleta de Colores

### Archivos Modificados:
- `src/app/globals.css`

### Cambios Realizados:
- Se actualizó la paleta de colores de la aplicación.

---

## Sesión 1: Ajustes en la Página de Perfil de Mascota

### Archivos Modificados:
- `src/app/mascotas/reporte/[id]/page.tsx`

### Cambios Realizados:
- Se mejoró el diseño de la página de detalle de la mascota.
