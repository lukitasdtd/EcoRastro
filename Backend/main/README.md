# 🌱 EcoRastro

EcoRastro es un proyecto web educativo y colaborativo que conecta comunidades a través de la agricultura urbana, el cuidado del entorno y la participación ciudadana.  

El sitio incluye varias secciones: calendario de siembra, sección educativa, mapa interactivo y un sistema de publicación.  
Todo está desarrollado con **HTML, CSS, Bootstrap 5, JavaScript y Leaflet.js**.

---

## ⚙️ Tecnologías utilizadas

- **HTML5** → estructura de cada vista.  
- **CSS3** → estilos personalizados, con tipografía *Quicksand*.  
- **Bootstrap 5** → diseño responsivo y componentes básicos.  
- **Leaflet.js** → mapa interactivo con marcadores.  
- **JavaScript** → lógica de interactividad (filtros, carrusel, mapa, etc.).  

---

## 📂 Estructura del proyecto

ecorastro/
├── css/
│ ├── styles.css # Estilos globales (Inicio, navbar, footer, tarjetas)
│ ├── calendario.css # Estilos específicos del calendario de siembra
│ ├── educacion.css # Estilos para la sección educativa
│ └── mapa.css # Estilos para la página del mapa
│
├── js/
│ ├── calendario.js # Lógica para el calendario (eventos, siembras, filtros)
│ ├── educacion.js # Funcionalidad de la sección educativa
│ └── mapa.js # Configuración del mapa Leaflet y filtros
│
├── img/ # Logos, íconos, recursos gráficos
│
├── index.html # Página principal (Inicio)
├── calendario.html # Calendario de siembra
├── educacion.html # Sección educativa
├── mapa.html # Mapa interactivo
├── login.html # Formulario de login
└── README.md

markdown
Copy code

---

## 📖 Explicación por secciones

### 1. **Inicio (`index.html`)**
- Contiene un **carrusel de imágenes automático** para dar la bienvenida.  
- Tarjetas con **tips y novedades**.  
- Sección de navegación clara con íconos.  

### 2. **Calendario (`calendario.html` + `calendario.js` + `calendario.css`)**
- Muestra un calendario con **meses y cultivos recomendados**.  
- Permite **filtrar por temporada o tipo de planta**.  
- Usa colores suaves para resaltar periodos de siembra.  

### 3. **Sección Educativa (`educacion.html` + `educacion.css`)**
- Contiene **artículos y material visual**.  
- Preparada para incluir filtros o un buscador en el futuro.  
- Ideal para mostrar tips de cultivo, reciclaje y cuidado del medio ambiente.  

### 4. **Mapa (`mapa.html` + `mapa.js` + `mapa.css`)**
- Implementado con **Leaflet.js**.  
- Muestra un **mapa interactivo** con marcadores para:  
  - **Mascotas perdidas/encontradas** 🐾  
  - **Huertas urbanas** 🌱  
- Incluye un **formulario de filtros** (categoría, tipo de mascota, distancia).  
- Sección de **lugares cercanos** listados dinámicamente.  
- Botón de **publicar** para compartir huertas o reportes.  

### 5. **Login (`login.html`)**
- Página simple para ingresar o registrarse.  
- Pensada para conectarse con un backend en el futuro.
- Aquí hay que insertar la parte del LogIn

---

## 🎨 Estilos (CSS)

- **`styles.css`** → base global, colores, tipografía Quicksand y navbar.  
- **`calendario.css`** → adapta el calendario con estilos visuales claros.  
- **`educacion.css`** → enfocado en lectura, con tarjetas informativas.  
- **`mapa.css`** → da formato al mapa, tarjetas de filtros, lugares y publicar.  

La paleta de colores está centrada en tonos verdes (naturaleza / eco) y blancos (limpieza visual).  

---

## 🗺️ Funcionamiento del mapa (detalle técnico)

- El archivo **`mapa.js`** inicializa el mapa con:
  ```js
  const map = L.map('map').setView([-33.45, -70.66], 12); // Santiago ejemplo
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
Los filtros se leen desde el formulario y filtran los marcadores dinámicamente.

Los lugares cercanos aparecen en una lista vinculada al mapa.

Se puede ampliar para usar geolocalización (mostrar ubicación del usuario).

🚀 Cómo ejecutar el proyecto
Clonar el repositorio:

bash
Copy code
git clone https://github.com/TU_USUARIO/ecorastro.git
Abrir index.html en un navegador.

Para usar el mapa, asegúrate de tener internet (Leaflet usa CDN de OpenStreetMap).

🤝 Contribución
Este proyecto está abierto a modificaciones y mejoras.
Todo el equipo puede:

Proponer nuevos filtros.
Agregar artículos educativos.
Ampliar el calendario de siembra.
Mejorar el diseño y responsividad.

Pasos para colaborar:

bash
Copy code
git checkout -b mejora-nueva
git commit -m "Agregué mejora"
git push origin mejora-nueva
Y abrir un Pull Request.

📜 Licencia
Proyecto distribuido bajo licencia MIT.
Eres libre de usarlo, modificarlo y compartirlo.
