
# Resumen del Proyecto EcoRastro

Este documento resume las diferentes páginas que componen el proyecto EcoRastro, describiendo su propósito y los componentes clave que utilizan.

## Páginas Principales

### `src/app/page.tsx` (Página de Inicio)

- **Descripción:** Esta es la página principal de la aplicación. Da la bienvenida a los usuarios con un mensaje inspirador sobre la conexión de comunidades y la protección de ecosistemas. El objetivo es presentar las dos funciones principales de la aplicación: encontrar mascotas perdidas y fomentar la creación de huertas comunitarias.
- **Componentes Relevantes:**
    - `MapFeatures`: Una sección que destaca las funcionalidades del mapa interactivo.
    - `PlantingCalendar`: Presenta un resumen del calendario de siembra.
    - `EnvironmentalEducation`: Ofrece contenido y recursos sobre educación ambiental.
    - `HomeFooter`: El pie de página específico de la página de inicio.
- **Componentes Generales:**
    - `Button`: Usado para las llamadas a la acción principales.
    - `Image`: Muestra las imágenes de la sección de héroe.
    - `Link`: Para la navegación a otras páginas.

### `src/app/about/page.tsx` (Página Sobre Nosotros)

- **Descripción:** Explica la misión, visión, valores y el equipo detrás de EcoRastro. Utiliza un diseño de varias secciones para presentar la información de manera clara y atractiva.
- **Componentes Relevantes:**
    - La página está estructurada en secciones: Héroe, Misión y Visión, y Equipo.
    - Renderiza dinámicamente la lista de miembros del equipo a partir de un array, mostrando el nombre y rol de cada uno en una `Card`.
- **Componentes Generales:**
    - `Image`: Utilizado para la imagen principal de la sección de héroe.
    - `Card`, `CardContent`, `CardHeader`, `CardTitle`: Componentes de UI para estructurar y mostrar la información de la visión, valores y miembros del equipo.
    - `Users`, `Target`, `Leaf`: Iconos de `lucide-react` que representan visualmente los conceptos de equipo, misión y valores.

### `src/app/adoption/page.tsx` (Página de Adopción)

- **Descripción:** Muestra una galería de mascotas que están actualmente en adopción. El objetivo es conectar animales de refugios con posibles familias.
- **Componentes Relevantes:**
    - `AdoptionCard`: El componente principal de esta página. Cada tarjeta muestra la foto, nombre, edad y una breve descripción de una mascota disponible para adoptar.
- **Componentes Generales:**
    - La página utiliza `map` sobre un array de datos (`adoptionPets`) para renderizar dinámicamente cada `AdoptionCard`.

### `src/app/calendar/page.tsx` (Página del Calendario)

- **Descripción:** Ofrece una herramienta interactiva y detallada del calendario de siembra. Los usuarios pueden ver qué cultivos son ideales para cada mes, filtrar por estaciones y obtener información destacada. La página obtiene sus datos de forma asíncrona desde una API interna.
- **Componentes Relevantes:**
    - `CalendarHeader`: Permite al usuario navegar entre los meses.
    - `SeasonFilters`: Botones tipo `Badge` para filtrar cultivos por estación.
    - `FeaturedCropCard`: Una tarjeta que muestra el "cultivo destacado" del mes o día seleccionado, con una imagen y detalles.
    - `CalendarGrid`: La cuadrícula principal del calendario que muestra los días. Indica el día actual y los días recomendados para la siembra.
- **Componentes Generales:**
    - Hooks de React (`useState`, `useEffect`): Para manejar el estado de la fecha, los datos de la API, los estados de carga y los errores.
    - `Button`, `Card`, `Badge`, `Skeleton`: Componentes de UI generales para construir la página.
    - `LoaderCircle`: Icono que se muestra durante el estado de carga.

### `src/app/gardens/page.tsx` (Página de Huertas)

- **Descripción:** Permite a los usuarios descubrir huertas comunitarias. Presenta una sección de búsqueda y una galería de huertas destacadas, animando a los usuarios a involucrarse en la agricultura urbana.
- **Componentes Relevantes:**
    - `GardenFinder`: Un componente de búsqueda inteligente para que los usuarios encuentren huertas según sus preferencias o ubicación.
    - `GardenCard`: Tarjetas que muestran información detallada sobre cada huerta, como su nombre, ubicación y una breve descripción.
- **Componentes Generales:**
    - `Image`: Para la sección de héroe de la página.
    - `Link`: Para la navegación.
    - `Button`: Utilizado en la llamada a la acción principal.

### `src/app/mapa/page.tsx` (Página del Mapa)

- **Descripción:** Renderiza un mapa interactivo a pantalla completa. Es una herramienta central que visualiza la ubicación de reportes de mascotas, huertas comunitarias y otros puntos de interés. El componente del mapa se carga de forma dinámica para optimizar el rendimiento.
- **Componentes Relevantes:**
    - `LeafletMap`: El componente principal que renderiza el mapa interactivo (importado dinámicamente).
- **Componentes Generales:**
    - `Skeleton`: Se muestra como un indicador de carga mientras el componente del mapa se está inicializando.
    - `next/dynamic`: Utilizado para la carga diferida del lado del cliente del componente del mapa.

### `src/app/mascotas/page.tsx` (Página de Mascotas)

- **Descripción:** Es la página principal de la sección de mascotas. Desde aquí, los usuarios pueden navegar a subsecciones como buscar una mascota, ver el mapa de reportes, etc.
- **Componentes Relevantes:**
    - `ReportedPetCard`: Tarjetas que muestran información sobre las mascotas reportadas.
- **Componentes Generales:**
    - `Image`, `Link`, `Button`: Componentes de UI para la navegación y visualización de contenido.

### `src/app/reportar-mascota/page.tsx` (Página para Reportar Mascota)

- **Descripción:** Contiene un formulario que permite a los usuarios reportar una mascota, ya sea perdida o encontrada. Se solicita información clave como el tipo de mascota, ubicación, descripción y fotos.
- **Componentes Relevantes:**
    - `ReportarMascotaForm`: El formulario principal para ingresar los datos del reporte.
    - `LeafletMapDraggable`: Un mapa donde el usuario puede arrastrar un marcador para fijar la ubicación exacta del reporte.
- **Componentes Generales:**
    - `Logo`: El logo de la aplicación.

### `src/app/fauna-silvestre/page.tsx` (Página de Fauna Silvestre)

- **Descripción:** Una página educativa que enseña a los usuarios sobre la convivencia con la fauna local. Presenta diferentes tipos de animales, una sección de preguntas frecuentes y un llamado a la acción para contactar a las autoridades en caso de emergencia.
- **Componentes Relevantes:**
    - `Accordion`: Utilizado para la sección de preguntas y respuestas frecuentes.
    - `premiumCard`: Una tarjeta especial para promocionar una funcionalidad premium de "Experto con IA".
    - Renderiza dinámicamente tarjetas de fauna y una lista de preguntas frecuentes.
- **Componentes Generales:**
    - `Card`, `CardContent`, `CardHeader`: Para estructurar las diferentes secciones de información.
    - `Button`: Para el botón de llamada de emergencia.
    - `Image`: Para mostrar imágenes de la fauna local.
    - `Phone`, `HelpCircle`, `Sparkles`: Iconos que aportan pistas visuales.

### `src/app/login/page.tsx` y `src/app/signup/page.tsx`

- **Descripción:** Páginas estándar para que los usuarios inicien sesión o se registren en la plataforma.
- **Componentes Relevantes:**
    - Formularios construidos con componentes de UI para la entrada de datos.
- **Componentes Generales:**
    - `Input`, `Button`, `Label`: Componentes de formulario para la entrada de datos.
    - `Card`: Contenedor principal para el formulario.
    - `Logo`: El logo de la aplicación.
