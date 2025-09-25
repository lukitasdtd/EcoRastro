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
1. div => Contenedor genérico para agrupar elementos
2. header => Encabezado de sección o página
3. h1 => 
4. br => 
5. span => 
6. p => 
7. Button => 
8. Link => 
9. Image => 
10. MapFeatures => 
11. PlantingCalendar => 
12. EnvironmentalEducation => 
13. HomeFooter => 