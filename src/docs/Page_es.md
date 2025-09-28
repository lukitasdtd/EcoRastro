# Lenguajes y Tecnologías Utilizadas en EcoRastro

Este documento describe los lenguajes de programación y las tecnologías clave que dan forma al proyecto EcoRastro.

## Workflows de desarrollo
- Instalar dependencias: `npm install`
- Ejecutar en desarrollo: `npm run dev`
- Compilar para producción: `npm run build`
- No hay tests automatizados detectados; validar cambios manualmente en la app.
- Los cambios en estilos requieren reiniciar el servidor de desarrollo.

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
# TSX
## TSX parametros componentes
1. Definir tipos explícitos para props mediante interfaces o tipos
2. Requieren tipado para estados (useState) y referencias (useRef)
3. Valida que las props obligatorias estén presentes
4. Verifica la compatibilidad de tipos entre componentes padres e hijos

##   TSX parametros variables
1. Exige declaración explícita de tipos para parámetros y retornos
2. Detecta errores de tipo en tiempo de desarrollo, no en ejecución
3. Controla que las variables mantengan su tipo asignado
4. Previene el uso de propiedades o métodos inexistentes

## TSX Funciones
Las funciones tienen las mismas indicaciones en las que se deben considerar en JavaScript, con diferencias en:

1. Los parametros requieren definicion explíicita de tipo.
    Estos deben presentarse entre => { } <=
2. Los retornos pueden ser explícitos o inferidos
3. Preservan el contexto del this
4. Pueden incluirse dentro de estos propiedades ("prop")
    Esto se realiza posterior a las => { } <= que indican las variables
    Las propiedades indican como 
5. Si los parametros poseen un => ? <= delante de su nombre, este es opcional

## TSX Propiedades
Propiedades o prop
Obtiene datos de entrada hacia un componente, similar a parámetros de función pero para componentes React dentro de ello puedes definir tipo de la entrada, permite personalizar el comportamiento y apariencia del componente

### Propiedades Tipo:
 Los tipos pueden ser primitivos primitivos (string, number, boolean), complejos (uniones, intersecciones, genéricos).
 Actualmente en el proyecto se utilizan los primitivos
 Se pueden definir que los datos de entrada puedan ser obligatorios u opcionales
 Se definen el dato como el nombre de la variable separado de : y postesterior el tipo a usar

####  Propiedades Children (Hijo):
 Representa contenido anidado, vale decir, componente/elemento dentro de otro
 Estos pueden estar contenido entre etiquetas
  
  - Para Acceder a ellos se utiliza => props.children <=
    Ejemplo:
    children seria el contenedor : el tipo de componente que contiene
  - children: React.ReactNode => *tipo más flexible (recomendado)*
  - children: React.ReactElement => *solo un elemento React*
  - children: string => **solo contenido textual*
  - children: JSX.Element => *elemento JSX específico*
  
#### Propieades Eventos:
 Funciones callback que se ejecutan ante interacciones del usuario, con ello los componentes reaccionan ante dichas acciones
 Siguen el modelo de => onEvento <=
 Ejemplo:
  - onClick
  - onChange 
##### Tipos de Eventos:
 1. Mouse
 -React.MouseEvent<HTMLElement> => *Eventos generales de mouse*
 -React.MouseEvent<HTMLButtonElement> => *Eventos especificos de botones*
 -React.MouseEvent<HTMLDivElement> => *Elementos div*
 *clicks, doble clicks, movimiento del mouse*
 2. Teclado
 -React.KeyboardEvent<HTMLElement> => *Evento de teclado general*
 -React.KeyboardEvent<HTMLInputElement> => *Inputs del teclado*
 *atajos de teclado, validación de input*
 3. Formulario
 -React.FormEvent<HTMLFormElement> => *Envio de formularios*
 -React.ChangeEvent<HTMLInputElement> => *Cambio de inputs*
 -React.ChangeEvent<HTMLSelectElement> => *Cambio de Selects*
 -React.ChangeEvent<HTMLTextAreaElement> => *Cambio en texto tareas*
 *Validación, manejo y envio de formularios*
 4. Foco
 -React.FocusEvent<HTMLElement> => *Eventos focus/blur*
 -React.FocusEvent<HTMLInputElement> => *Foco de inputs*
 *validación en tiempo real, UI de focus*
 5. Arrastra y Suelta (Drag & Drop)
 -React.DragEvent<HTMLElement> => *Arrastrar y soltar*
 *interfaces drag-and-drop, subida de archivos*
 6. Toque (Touch)
 -React.TouchEvent<HTMLElement> => *Pantallas tactiles*
 *dispositivos móviles, gestos táctiles*
 7. Rueda (Wheel)
 -React.WheelEvent<HTMLElement> => *Rueda de raton*
 *zoom, scroll personalizado*
 8. Portapapeles (Clipboard)
 -React.ClipboardEvent<HTMLElement> => *Portapapeles*
 *copiar/pegar contenido*
 9. Interfaz Usuario (UI)
 -React.UIEvent<HTMLElement> => *interfaz generales*
 *eventos de actualización de UI*
 10. Animaciones
 -React.AnimationEvent<HTMLElement> => *Animaciones de CSS*
 *controlar transiciones y animaciones*
 11. Transiciones
 -React.TransitionEvent<HTMLElement> => *Transiciones CSS*
 *inicio/fin de transiciones*
 
 Recomendadio utilizar "React.evento" para mejor tipado y seguridad.
  
#### Propiedades de Estilo:
    
#### Propiedades Avazadas:
    
Tiene flujo unidireccional (solo de padre a hijo) en el concepto de etiquetas contenedoras y subcontenedores

Se definen mediante interfaces o tipos, pueden ser obligatorios u opcionales
Soporta tipos complejos (objetos, arrays, uniones)

---------------------------------------------------------------------

# Etiquetas
1. div => Contenedor genérico para agrupar elementos
2. header => Encabezado de sección o página
3. h1 => Título principal de mayor jerarquía
4. br => salto de línea forzado
5. span => Elemento en línea para aplicar estilo específico
6. p => Párrafo de texto 
7. Button => Componente reutilizable de botón
8. Link => Componente de navegación entre páginas
9. Image => Componente optimizado para imággenes
10. MapFeatures => Componente personalizado de funcionalidades de mapa
11. PlantingCalendar => Componente personalizado de calendario de siembra
12. EnvironmentalEducation => Componente personalizado de educación ambiental
13. HomeFooter => Componente personalizado de pie de página
14.  


---------------------------------------------------------------------

# LOGO
Internamente posee una funcion la cual es exportada al ser llamada

---------------------------------------------------------------------


---------------------------------------------------------------------
# DIVISIONES INTERNAS EN "@" O src/

## Carpetas y contenido

## src/app
*Carpeta Principal del proyecto*
Define la estructura de todas las paginas presentes
Cada subcarpeta se convierte en una ruta de URL
Ejemplo:
    src/app/usuario/page.tsx
    Renderiza la pagina de usuario en el dominio

Los archivos *page.tsx* son el componente principal de una pagina
Los archivos *layout.tsx* define la estructura visual de la pagina, es reciclable
El archivo *global.css* contiene el estilo que se aplica en toda la aplicación

### api/
Crea puntos de acceso (endpoints) para el backend

## src/components
*Carpeta de componentes*
Componentes reutilizables en react, que forman parte de la interfaz, tambien los denominados "bloques" que de permite dividir esta misma en piezas pequeñas

### ui/
Componentes de interfaz genericos y bajo nivel
    Botones, Card, entradas

### messaging/
Componente especifico de mensajeria

### home/


### pets/


## src/lin
Biblioteca no visual que contiene utilidades, logica y datos

### utils.ts
### data.ts
### menu-data.ts
### firebase/
Contiene configuracion para conectar la aplicacion a servicios de Firebase

### types.ts

## src/ai
Carpeta contenedora de funcionalidades de Inteligencia Artificial

### gentik.ts
### flows/

## src/hooks
Contiene los "custom hooks" de React. Funciones logicas gancho, tales como el estado de formulario, deteccion de dispositivo conectado, notificaciones, entre otros

## src/docs
Contenedor de documentacion del proyecto
Contiene archivos *.md* Markdown, que dan explicación de funcionamiento del codigo, decisiones de diseño o guias

## src/img
Contenedor de recursos graficos como imagenes.

---------------------------------------------------------------------
# APIs
## MAPA
Leaflet (biblioteca para crear mapas interactivos)y React Leaflet (componentes que envuelven la integración en la aplicación)

### src/components/leatflet-map.tsx
Corazon de funcionalidad del mapa
Este afecta el DOM (estructura de la pagina del navegador), afecta al navegador del cliente y no el servidor como tal en su renderizado
Se extraen los *hooks* o *ganchos* de react:
    - useEffect => *ejecuta el codigo cuando el componente renderiza o carga*
    - useRef => *para mantener la referencia en la etiqueta contenedora sin que se vuelva a renderizar*
Dentro de la funcion que incorpora el archivo se importa leaflet, evitando la carga en el servidor


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