# Lenguajes y Tecnologías Utilizadas en EcoRastro

Este documento describe los lenguajes de programación y las tecnologías clave que dan forma al proyecto EcoRastro.

## 1. TypeScript (con sintaxis TSX)

- **Descripción:** Es el lenguaje principal del proyecto. TypeScript es una versión mejorada de JavaScript que añade "tipos" estáticos. Esto significa que podemos definir qué tipo de datos espera cada parte del código (por ejemplo, si una variable debe ser un texto, un número o un objeto más complejo).
- **Uso en el Proyecto:**
    - **Lógica de la Aplicación:** Todo el comportamiento interactivo, la gestión de datos y la comunicación con el servidor están escritos en TypeScript.
    - **Definición de Componentes:** Los componentes de la interfaz de usuario (UI) se crean con TypeScript y la sintaxis TSX, que permite mezclar la lógica de React con una estructura similar a HTML.
    - **Archivos:** Verás esto en todos los archivos con extensión `.ts` y `.tsx`.

## 2. CSS (a través de Tailwind CSS)

- **Descripción:** CSS (Cascading Style Sheets) es el lenguaje estándar para dar estilo y diseño a las páginas web. En este proyecto, no se escribe CSS de la manera tradicional.
- **Uso en el Proyecto:**
    - **Tailwind CSS:** Se utiliza el framework **Tailwind CSS**. En lugar de escribir archivos CSS separados, se aplican clases directamente en el código de los componentes (por ejemplo, `className="text-2xl font-bold"`). Estas clases de "utilidad" controlan desde el color y el tamaño del texto hasta el diseño y la alineación de los elementos.
    - **Archivo Principal:** La configuración global y la paleta de colores se definen en `src/app/globals.css`, como se detalla en `README-CSS_es.md`.

## 3. HTML (implícito a través de JSX/TSX)

- **Descripción:** Aunque no escribimos archivos `.html` directamente, la estructura de todas las páginas y componentes se define con una sintaxis llamada JSX (o TSX en nuestro caso). Esta sintaxis se ve casi idéntica a HTML.
- **Uso en el Proyecto:**
    - **Estructura de la UI:** Dentro de cada componente, el código que se retorna (`return (...)`) es TSX. Define los `<div>`, `<p>`, `<h1>`, `<img>` y otros elementos que componen la interfaz visual.
    - **Generación Automática:** El framework (Next.js) se encarga de convertir este código TSX en HTML real que los navegadores pueden entender y mostrar.

## 4. JSON (JavaScript Object Notation)

- **Descripción:** Es un formato ligero para almacenar e intercambiar datos. Es muy fácil de leer tanto para humanos como para máquinas.
- **Uso en el Proyecto:**
    - **Configuración:** Archivos como `package.json` o `tsconfig.json` usan este formato para configurar el proyecto, sus dependencias y las reglas del compilador de TypeScript.
    - **Datos:** En algunos casos, se puede usar para almacenar listas de datos simples que se muestran en la aplicación.

# ---------------------------------------------------------------------

# TSX vs JSX
    TSX parametros componentes
1. Definir tipos explícitos para props mediante interfaces o tipos
2. Requieren tipado para estados (useState) y referencias (useRef)
3. Valida que las props obligatorias estén presentes
4. Verifica la compatibilidad de tipos entre componentes padres e hijos

#   TSX parametros variables
1. Exige declaración explícita de tipos para parámetros y retornos
2. Detecta errores de tipo en tiempo de desarrollo, no en ejecución
3. Controla que las variables mantengan su tipo asignado
4. Previene el uso de propiedades o métodos inexistentes


# ---------------------------------------------------------------------

# Etiquetas

-   `<a>`: Define un hipervínculo para navegar a otras páginas o sitios web.
-   `<div>`: Es un contenedor genérico para agrupar otros elementos y aplicarles estilos. Es una de las etiquetas más usadas.
-   `<footer>`: Representa el pie de página de una sección o de la página completa.
-   `<h1>`, `<h2>`, `<h3>`: Encabezados de diferentes niveles de importancia, usados para títulos y subtítulos. `<h1>` es el más importante.
-   `<img>`: Se usa para mostrar imágenes. En Next.js, se suele reemplazar por el componente `<Image>` para optimizar el rendimiento.
-   `<input>`: Crea un campo de entrada donde el usuario puede escribir datos, como en formularios de login o búsqueda.
-   `<label>`: Define una etiqueta de texto para un elemento de un formulario, mejorando la accesibilidad.
-   `<main>`: Representa el contenido principal y más importante de la página.
-   `<p>`: Define un párrafo de texto.
-   `<section>`: Agrupa contenido que tiene una relación temática, como una sección de "Sobre Nosotros" o "Contacto".
-   `<span>`: Es un contenedor de línea para agrupar texto o elementos pequeños, usualmente para aplicar estilos específicos a una parte de un texto.

### Componentes Reutilizables (Custom Tags)

Además de las etiquetas HTML estándar, el proyecto utiliza componentes de `shadcn/ui` y `lucide-react` que funcionan como etiquetas personalizadas. Estas son algunas de las más comunes:

-   `<Accordion>`, `<AccordionItem>`, `<AccordionTrigger>`, `<AccordionContent>`: Usados para crear secciones de contenido plegables (acordeones).
-   `<Button>`: Renderiza un botón con los estilos predefinidos del proyecto.
-   `<Card>`, `<CardHeader>`, `<CardContent>`, `<CardTitle>`, `<CardDescription>`, `<CardFooter>`: Componentes para construir "tarjetas" de información de manera estructurada.
-   `<Image>`: Componente de Next.js para mostrar imágenes de forma optimizada.
-   `<Link>`: Componente de Next.js para la navegación entre páginas de la aplicación sin recargar la página completa.
-   `<Skeleton>`: Muestra un marcador de posición con una animación de carga, usado mientras los datos reales se están obteniendo.
-   Iconos (`<PawPrint>`, `<Sprout>`, `<MapPin>`, etc.): Componentes de `lucide-react` que renderizan iconos SVG para mejorar la interfaz visual.


---

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
