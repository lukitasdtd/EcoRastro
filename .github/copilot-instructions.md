# Instrucciones para agentes AI en EcoRastro

## Arquitectura general
- Proyecto basado en Next.js con estructura de rutas en `src/app/` y componentes en `src/components/`.
- Utiliza Tailwind CSS (`tailwind.config.ts`) para estilos y PostCSS (`postcss.config.mjs`).
- Datos y utilidades en `src/lib/`, incluyendo validadores, datos de ubicaciones y helpers.
- Integración con Firebase (ver `src/lib/firebase/` y referencias en flows).
- Flujos de IA en `src/ai/flows/` para lógica avanzada (ej: matching de huertas comunitarias).

## Convenciones y patrones
- Los componentes React siguen la convención de archivos `.tsx` y están organizados por dominio (ej: `adoption-card.tsx`, `garden-card.tsx`).
- Las páginas principales están en `src/app/` y subcarpetas por funcionalidad (ej: `about/`, `login/`, `mapa/`).
- Hooks personalizados en `src/hooks/` (ej: `use-mobile.tsx`, `use-toast.ts`).
- Imágenes y recursos estáticos en `public/` y `src/img/`.
- Datos de ejemplo y configuraciones en `src/lib/data/` y `src/lib/placeholder-images.json`.

## Workflows de desarrollo
- Instalar dependencias: `npm install`
- Ejecutar en desarrollo: `npm run dev`
- Compilar para producción: `npm run build`
- No hay tests automatizados detectados; validar cambios manualmente en la app.
- Los cambios en estilos requieren reiniciar el servidor de desarrollo.

## Integraciones y dependencias
- Firebase: configuración y lógica en `src/lib/firebase/`.
- Leaflet para mapas interactivos (`leaflet-map.tsx`, `leaflet-map-draggable.tsx`).
- Flujos de IA y lógica avanzada en `src/ai/flows/` y `src/ai/genkit.ts`.

## Ejemplos de patrones clave
- Para agregar una nueva página, crear una carpeta en `src/app/` y un archivo `page.tsx`.
- Para nuevos componentes, ubicarlos en `src/components/` y seguir la convención de nombres por dominio.
- Para lógica compartida, usar `src/lib/utils.ts` o crear hooks en `src/hooks/`.

## Archivos y directorios clave
- `src/app/`: páginas y rutas principales
- `src/components/`: componentes reutilizables
- `src/lib/`: utilidades, datos y lógica compartida
- `src/ai/flows/`: flujos de IA y lógica avanzada
- `public/`, `src/img/`: recursos estáticos

---
¿Falta alguna convención, integración o workflow relevante? Indica detalles para mejorar estas instrucciones.