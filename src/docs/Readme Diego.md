# Documentación de la Página "Quienes Somos" (`/about`)

Este documento detalla la estructura, propósito y características de la página "Quienes Somos" del proyecto EcoRastro.

## Descripción General

La página `/about` es una página estática e informativa diseñada para presentar la misión, visión y valores de EcoRastro a los visitantes. Su objetivo principal es comunicar quiénes somos, qué hacemos y cómo la comunidad puede ponerse en contacto con nosotros.

**Archivo principal:** `src/app/about/page.tsx`

---

## Estructura de la Página

La página está construida con un diseño limpio y se divide en las siguientes secciones principales:

1.  **Encabezado Principal:**
    *   Muestra el logo de EcoRastro y el lema: "Unimos corazones para devolver a las mascotas su hogar".

2.  **Sección "Quienes Somos":**
    *   Presenta la misión y visión de EcoRastro, combinando una imagen (`catcito.png`) con un texto descriptivo.

3.  **Sección "¿Qué es EcoRastro?":**
    *   Explica en detalle el propósito de la plataforma y el objetivo de la red de apoyo para el rescate y la adopción de mascotas.

4.  **Sección "Nuestras Huertas Comunitarias":**
    *   Destaca la iniciativa de las huertas, combinando una imagen (`huertas.jpg`) con un texto que explica su importancia para la comunidad.

5.  **Sección "Nuestro Equipo":**
    *   Muestra una foto del equipo de desarrollo.

6.  **Sección de Contacto:**
    *   Proporciona enlaces a las redes sociales y un correo electrónico de contacto.

---

## Características Técnicas y Decisiones de Diseño

*   **Página Estática:** Se optó por un enfoque de página estática para mejorar el rendimiento de carga y la optimización para motores de búsqueda (SEO).
*   **Interactividad:** Se han añadido efectos de `hover` (sombras y escalado) en las imágenes y las tarjetas de texto para crear una experiencia de usuario más dinámica.
*   **Diseño Responsivo:** Utilizando **Tailwind CSS**, la página está diseñada para ser completamente funcional y visualmente agradable en diferentes tamaños de pantalla.

---

## Tecnologías Utilizadas

*   **React** y **Next.js**
*   **TypeScript**
*   **Tailwind CSS**
*   **Lucide-React** (para iconos)
