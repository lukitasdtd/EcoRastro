
# Resumen de Estilos del Proyecto (CSS)

Este documento explica de manera sencilla los estilos globales que definen la apariencia de la aplicación EcoRastro. El proyecto utiliza **Tailwind CSS**, un marco de trabajo que permite construir diseños rápidos y personalizados.

El archivo principal de estilos es `src/app/globals.css`.

## 1. Fuentes (Tipografía)

El proyecto importa dos fuentes específicas desde Google Fonts para mantener una identidad visual consistente:

- **Quicksand:** Se utiliza probablemente para títulos y textos destacados por su estilo redondeado y amigable.
- **Roboto:** Una fuente muy legible, ideal para párrafos y textos largos.

## 2. Configuración de Tailwind CSS

El archivo de estilos incluye tres directivas principales de Tailwind:

- `@tailwind base;`: Restablece los estilos por defecto del navegador para evitar inconsistencias y aplica una base de estilos predefinida.
- `@tailwind components;`: Permite usar clases de componentes pre-construidos.
- `@tailwind utilities;`: Importa todas las clases de utilidad de Tailwind (como `p-4`, `flex`, `text-center`), que son las que más se usan para dar estilo a los elementos.

## 3. Tema y Paleta de Colores

El corazón del diseño de EcoRastro se define mediante variables de CSS. Esto permite cambiar la apariencia de todo el sitio (por ejemplo, de modo claro a modo oscuro) modificando solo unas pocas líneas.

Se definen dos temas principales:

### Tema Claro (Por Defecto)

Este es el tema que se ve por defecto. Los colores principales son:

- `--background (#d0e6da)`: Un color verde pálido y suave que sirve como fondo general de la aplicación.
- `--foreground (#2d3748)`: Un color gris oscuro para todo el texto principal, asegurando una buena legibilidad.
- `--card (#ffffff)`: Blanco, usado como fondo para las "tarjetas" o contenedores de información para que resalten sobre el fondo principal.
- `--primary (#5b9a68)`: El verde característico de la marca EcoRastro. Se usa en botones, enlaces y elementos importantes para llamar la atención.
- `--accent (#f79a3e)`: Un color naranja vibrante. Se usa como "acento" para resaltar elementos interactivos o notificaciones importantes, como el contorno de un campo de formulario seleccionado (`--ring`).
- `--secondary (#182722)`: Un verde muy oscuro, casi negro. Se usa para elementos secundarios o como fondo en ciertas secciones para crear contraste.
- `--muted`: Un color gris muy claro para fondos de elementos menos importantes.

### Tema Oscuro (`.dark`)

Cuando la aplicación está en modo oscuro, estos colores reemplazan a los del tema claro para ofrecer una experiencia de visualización más cómoda en condiciones de poca luz.

- `--background (#0b1120)`: Un fondo azul muy oscuro.
- `--foreground (#f8fafc)`: Un color de texto casi blanco para contrastar con el fondo oscuro.
- `--card` y `--popover`: También usan el fondo oscuro para que los elementos se integren.
- Los colores `--primary` y `--accent` se mantienen similares para conservar la identidad de la marca, pero pueden tener ligeros ajustes para funcionar mejor sobre un fondo oscuro.

## 4. Estilos Base Globales

Finalmente, se aplican algunos estilos básicos a toda la aplicación:

- `* { @apply border-border; }`: Se asegura de que todos los elementos del sitio usen el color de borde definido en las variables del tema. Esto crea consistencia en los bordes y separadores.
- `body`: Al cuerpo de la página se le aplican automáticamente el color de fondo (`--background`) y el color de texto (`--foreground`) del tema activo. También se establece que la fuente principal sea la importada (probablemente `Quicksand` o `Roboto`).

