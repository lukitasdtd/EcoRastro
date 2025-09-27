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

## Sesión 5: Mejoras en la Página de Reporte y Comentarios

### 1. Historial y Flujo de Comentarios en Reporte de Mascota

#### Archivos Modificados:
- `src/lib/types.ts`
- `src/lib/data.ts`
- `src/app/mascotas/reporte/[id]/page.tsx`
- `src/components/pets/comment-form.tsx` (Nuevo)
- `src/components/reportar-mascota-form.tsx` (Analizado)
- `src/docs/changes_ukitas.md`

#### Cambios Realizados:
- **Historial de Comentarios:** Se añadió una nueva sección en la página de reporte para mostrar un historial de avistamientos o comentarios sobre la mascota.
- **Reorganización de la Página:** Se ajustó el diseño de la página de reporte para que, en la vista de escritorio, el "Historial de comentarios" aparezca en la columna izquierda, debajo de la información de contacto.
- **Formulario de Comentario Interactivo:** Se reemplazó el formulario de comentarios estático por un nuevo **Componente de Cliente** (`CommentForm`). Este componente es responsable de:
    1.  **Solicitar Consentimiento de Ubicación:** Antes de acceder a la geolocalización, el componente pregunta explícitamente al usuario si desea compartir su ubicación actual o si prefiere ingresarla manualmente.
    2.  **Captura Automática:** Si el usuario acepta, el componente obtiene y muestra la ubicación aproximada del usuario y la hora actual de Chile (GMT-4).
    3.  **Entrada Manual de Ubicación:** Si el usuario se niega, el componente muestra campos para Región, Comuna y Calle, replicando el formato del formulario principal para reportar mascotas. La lista de comunas se actualiza dinámicamente según la región seleccionada.
- **Visibilidad Condicional:** El campo de texto para escribir el comentario y el botón para publicarlo solo se muestran después de que el usuario ha completado uno de los dos flujos de ubicación, garantizando que cada comentario tenga una ubicación asociada.
