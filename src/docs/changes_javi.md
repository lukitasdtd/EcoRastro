# Resumen de Cambios y Desarrollo (Javi)

Este documento detalla el trabajo realizado en varias secciones clave de la aplicación EcoRastro, explicando las funcionalidades implementadas, las tecnologías utilizadas y la justificación detrás de las decisiones de desarrollo.

----------------------------------------------------------------------------------------------------------------------

## 1. Página "Redes de Apoyo"

- **Archivo Principal**: `src/app/redes-de-apoyo/page.tsx`

### Resumen de Cambios
Se creó una página estática para mostrar una colección de "redes de apoyo" o fundaciones. El diseño se centra en una cuadrícula (grid) de tarjetas, donde cada tarjeta representa una organización. La página incluye un título principal, una breve descripción y la cuadrícula de tarjetas, cada una con una imagen, nombre, descripción y un botón para contactar.

### Tecnologías y Lenguajes Utilizados
- **Lenguaje**: `TypeScript (TSX)`
- **Framework/Librería**: `React` (a través de `Next.js`)
- **Estilos**: `Tailwind CSS`
- **Componentes**: `shadcn/ui` (para `Card`, `Button`, etc.)

### Justificación de las Decisiones
- **TypeScript (TSX)**: Se eligió para escribir los componentes de React por su seguridad de tipos. Esto ayuda a prevenir errores comunes al pasar datos a los componentes y asegura que la estructura de los datos (ej. los datos de cada tarjeta) sea consistente.
- **React y Componentes**: La página se construyó siguiendo una arquitectura de componentes. Se crearon componentes reutilizables como `SupportCard` para cada tarjeta, lo que hace que el código sea más limpio, fácil de leer y mantener. Si en el futuro se necesita añadir más redes de apoyo, solo hay que agregar nuevos datos sin tocar la lógica de la interfaz.
- **Tailwind CSS**: Se utilizó para un desarrollo rápido y un diseño responsivo. Las clases de utilidad permiten aplicar estilos directamente en el JSX, manteniendo el estilo y la estructura juntos, lo que agiliza la maquetación y asegura la consistencia visual con el resto del sitio.

----------------------------------------------------------------------------------------------------------------------

## 2. Página "Cuidado de Mascotas" (Sección de Educación)

- **Archivo Principal**: `src/app/cuidado-de-mascotas/page.tsx`

### Resumen de Cambios
Se desarrolló una página educativa estática sobre el cuidado de mascotas. El objetivo principal era presentar información de manera clara y accesible. La página se estructuró con un título, una introducción y varias secciones o artículos con consejos y guías.

### Tecnologías y Lenguajes Utilizados
- **Lenguaje**: `TypeScript (TSX)`
- **Framework/Librería**: `React` (a través de `Next.js`)
- **Estilos**: `Tailwind CSS`

### Justificación de las Decisiones
- **Contenido Estático**: Al ser una página principalmente informativa cuyo contenido no cambia dinámicamente, se optó por un enfoque de página estática, lo que mejora el rendimiento y el SEO.
- **React y TypeScript**: Al igual que en otras partes del sitio, esta combinación permite crear una estructura de componentes bien definida y con seguridad de tipos, lo que facilita la lectura y el mantenimiento a largo plazo.
- **Tailwind CSS**: Ideal para maquetar páginas con mucho contenido de texto. Permitió dar estilo a los títulos, párrafos y listas de forma rápida y asegurar que la página sea legible y atractiva en todos los tamaños de pantalla.

----------------------------------------------------------------------------------------------------------------------

## 3. Página "Formulario de Huerta"

- **Archivo Principal**: `src/app/formulario-huerta/page.tsx`

### Resumen de Cambios
Se implementó un formulario completo para que los usuarios puedan registrar su huerta. El formulario incluye diversos campos de entrada como texto, áreas de texto y listas desplegables. Se gestionó el estado de cada campo y se incluyó un botón de envío.

### Tecnologías y Lenguajes Utilizados
- **Lenguaje**: `TypeScript (TSX)`
- **Framework/Librería**: `React` (Hook `useState`)
- **Estilos**: `Tailwind CSS`
- **Componentes**: `shadcn/ui` (para `Input`, `Label`, `Select`, `Button`)

### Justificación de las Decisiones
- **React (`useState`)**: Para una interfaz interactiva como un formulario, es necesario gestionar el estado de los datos que el usuario introduce. El hook `useState` de React es la herramienta estándar y perfecta para manejar el valor de cada campo de forma individual y reactiva.
- **shadcn/ui**: Se eligió esta librería de componentes para acelerar el desarrollo del formulario. Proporciona componentes de alta calidad, accesibles y estilizados (como `Input`, `Select`) que se integran perfectamente con Tailwind CSS. Esto evita tener que construir y estilizar cada elemento del formulario desde cero y asegura una experiencia de usuario consistente.
- **TypeScript**: Fue especialmente útil aquí para definir una interfaz (`type` o `interface`) para los datos del formulario. Esto asegura que los datos que se recopilan tengan la estructura correcta antes de ser enviados a un servidor, previniendo errores de formato.

----------------------------------------------------------------------------------------------------------------------

## 4. Página de "Mensajes"

- **Archivo Principal**: `src/app/mensajes/page.tsx`
- **Componentes Clave**:
    - `src/components/messaging/chat-sidebar.tsx`
    - `src/components/messaging/chat-window.tsx`
- **Datos de Ejemplo**: `src/lib/data/mock-chat-data.ts`
- **Enlace de Navegación**: `src/components/layout/navbar-routes.tsx`

### Resumen de Cambios
Esta fue la funcionalidad más compleja implementada. Se creó una página de chat completamente funcional desde cero.
1.  **Estructura y Navegación**: Se añadió la ruta `/mensajes` y un enlace en la barra de navegación.
2.  **Refactorización a Componentes**: El código se modularizó en componentes reutilizables como `ChatSidebar` (lista de chats), `ChatWindow` (ventana de chat), `MessageBubble` (burbuja de mensaje), etc. Esto es crucial para la mantenibilidad.
3.  **Diseño Responsivo**: La interfaz funciona en dos columnas en escritorio, pero cambia a una vista de una sola columna en móviles. El usuario navega desde la lista de chats a una conversación y puede volver atrás con un botón.
4.  **Funcionalidad de Búsqueda**: Se añadió una barra de búsqueda funcional para filtrar conversaciones.
5.  **Indicadores Visuales**: Se implementaron indicadores de estado "online" y contadores de mensajes no leídos para mejorar la experiencia de usuario.
6.  **Datos Similados**: Se usaron datos de ejemplo (`mock data`) para simular las conversaciones.

### Tecnologías y Lenguajes Utilizados
- **Lenguaje**: `TypeScript (TSX)`
- **Framework/Librería**: `React` (Hooks `useState`, `useEffect`)
- **Estilos**: `Tailwind CSS` (para diseño, responsividad y transiciones)
- **Componentes**: `shadcn/ui` (para `Avatar`, `Input`, `Button`)
- **Iconos**: `lucide-react`

### Justificación de las Decisiones
- **Arquitectura de Componentes y Refactorización**: Dada la complejidad de una interfaz de chat, dividirla en componentes pequeños y especializados era la única forma de mantener el código limpio y escalable. Un solo componente monolítico habría sido imposible de mantener.
- **Gestión de Estado (`useState`, `useEffect`)**: El chat es altamente interactivo. Se usó `useState` para manejar el estado de la conversación seleccionada, el término de búsqueda y la visibilidad de la ventana de chat en móviles. `useEffect` se usó para cargar una conversación por defecto en la vista de escritorio.
- **TypeScript**: Imprescindible en esta sección. Se definieron interfaces para `Conversation` y `Message`, lo que garantizó que los datos fluyeran correctamente entre componentes sin errores, haciendo el código mucho más robusto.
- **Tailwind CSS para Responsividad**: La capacidad de Tailwind para aplicar estilos condicionales según el tamaño de la pantalla (ej. `md:flex`, `hidden`) fue fundamental para crear la experiencia responsiva de manera eficiente y declarativa. Las clases de transición (`transition-all`) se usaron para animar el cambio de vista en móviles.

----------------------------------------------------------------------------------------------------------------------

## Puntos Clave para el Equipo y Siguientes Pasos

**Es fundamental que el equipo tenga en cuenta los siguientes puntos sobre el estado actual del desarrollo:**

1.  **Funcionalidad Basada en Datos de Prueba (Mocks):** La funcionalidad más compleja, como la página de **Mensajes**, opera actualmente con **datos simulados** (archivos estáticos en el código, ej: `mock-chat-data.ts`). Esto significa que las conversaciones no son reales ni persistentes. El objetivo de esta fase fue construir y validar la **interfaz de usuario (UI)** y la **experiencia de usuario (UX)**.

2.  **Arquitectura Preparada para el Backend:** La estructura de la aplicación, especialmente la división en componentes (como `ChatSidebar`, `ChatWindow`), se diseñó pensando en el futuro. Esta modularidad permite que la conexión a un backend real sea el siguiente paso lógico y se pueda realizar de forma limpia. Cada componente tiene props bien definidas (ej. `onSelectConversation`, `onSearchChange`) que actúan como "enchufes" listos para ser conectados a la lógica del servidor.

3.  **No hay Persistencia de Datos:** Ningún dato generado por el usuario (nuevos mensajes, registros de formularios) se guarda permanentemente. Todo se reinicia al recargar la página.

4.  **Próximos Pasos Críticos:** Para convertir este prototipo en una aplicación funcional, los siguientes pasos son:
    *   **Implementar un Backend y una Base de Datos:** Para almacenar usuarios, mensajes, huertas, etc.
    *   **Añadir Autenticación de Usuarios:** Para gestionar sesiones y saber quién es cada usuario.
    *   **Conectar la UI con el Backend:** Reemplazar los datos simulados por llamadas a una API real.

Este enfoque de **"UI primero"** ha permitido desarrollar y refinar la interfaz de forma rápida y visual, estableciendo una base sólida sobre la cual construir la lógica del servidor.

