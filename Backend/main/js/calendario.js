// =============================
// 1. Variables globales
// =============================
let fechaGuardada = localStorage.getItem("fechaActual");
let fechaActual = fechaGuardada ? new Date(fechaGuardada) : new Date();

let filtroTipo = "todos";
let filtroEstacion = "auto";

// ✅ Guardar selección de cultivo en memoria y localStorage
let cultivoSeleccionado = localStorage.getItem("cultivoSeleccionado") || null;

// =============================
// 2. Eventos de ejemplo
// =============================
const eventos = [
  { nombre: "🍅 Tomate Cherry", fecha: "2025-09-10", tipo: "verdura" },
  { nombre: "🥕 Zanahoria", fecha: "2025-09-15", tipo: "verdura" },
  { nombre: "🌿 Albahaca", fecha: "2025-10-05", tipo: "hierba" },
  { nombre: "🍉 Sandía", fecha: "2025-12-01", tipo: "fruta" },
  { nombre: "🥒 Pepino", fecha: "2025-01-12", tipo: "verdura" },
  { nombre: "🌻 Girasol", fecha: "2025-11-20", tipo: "flor" },
  { nombre: "🧄 Ajo", fecha: "2025-06-14", tipo: "verdura" },
  { nombre: "🥬 Lechuga", fecha: "2025-04-07", tipo: "verdura" },
  { nombre: "🌿 Cilantro", fecha: "2025-05-18", tipo: "hierba" },
  { nombre: "🥬 Kale", fecha: "2025-02-11", tipo: "verdura" },
  { nombre: "🥦 Repollo", fecha: "2025-03-09", tipo: "verdura" },
  { nombre: "❤️ Rabanito", fecha: "2025-07-22", tipo: "verdura" }
];

// =============================
// 2b. Tips de cultivos
// =============================
const tipsCultivos = {
  "🍅 Tomate Cherry": {
    tip: "Prefiere un lugar soleado y riego constante sin encharcar.",
    imagen: "assets/img/tomate.jpg"
  },
  "🥕 Zanahoria": {
    tip: "Suelo suelto y profundo para que las raíces crezcan derechas.",
    imagen: "assets/img/zanahoria.jpg"
  },
  "🌿 Albahaca": {
    tip: "Protege del frío, ideal junto a tomates para repeler plagas.",
    imagen: "assets/img/albahaca.jpg"
  },
  "🍉 Sandía": {
    tip: "Requiere mucho sol y espacio para extender sus guías.",
    imagen: "assets/img/sandia.jpg"
  },
  "🥒 Pepino": {
    tip: "Mantén el suelo húmedo y dale soporte vertical si es posible.",
    imagen: "assets/img/pepino.jpg"
  },
  "🌻 Girasol": {
    tip: "Colócalo en un sitio con sol pleno y riego regular.",
    imagen: "assets/img/girasol.jpg"
  },
  "🧄 Ajo": {
    tip: "Plántalo en otoño/invierno, no necesita demasiada agua.",
    imagen: "assets/img/ajo.jpg"
  },
  "🥬 Lechuga": {
    tip: "Siembra escalonada para tener cosechas continuas.",
    imagen: "assets/img/lechuga.jpg"
  },
  "🌿 Cilantro": {
    tip: "Prefiere clima fresco, evita calor excesivo para que no florezca.",
    imagen: "assets/img/cilantro.jpg"
  },
  "🥬 Kale": {
    tip: "Tolera bien el frío, mejora su sabor tras las heladas.",
    imagen: "assets/img/kale.jpg"
  },
  "🥦 Repollo": {
    tip: "Necesita suelo rico en nutrientes y humedad constante.",
    imagen: "assets/img/repollo.jpg"
  },
  "❤️ Rabanito": {
    tip: "Crecen rápido, listos para cosechar en 4 semanas.",
    imagen: "assets/img/rabanito.jpg"
  }
};

// =============================
// 3. Funciones principales
// =============================
function cambiarMes(delta) {
  fechaActual.setMonth(fechaActual.getMonth() + delta);
  localStorage.setItem("fechaActual", fechaActual);
  renderizarCalendario();
}

function aplicarFiltro(valor) {
  filtroTipo = valor;
  renderizarCalendario();
}

function aplicarFiltroEstacion(valor) {
  filtroEstacion = valor;
  renderizarCalendario();
}

function obtenerEstacion(mes) {
  if (mes >= 2 && mes <= 4) return "primavera";
  if (mes >= 5 && mes <= 7) return "verano";
  if (mes >= 8 && mes <= 10) return "otoño";
  return "invierno";
}

function renderizarCalendario() {
  const calendario = document.getElementById("calendario");
  const header = document.getElementById("calendario-header");
  const mesAnio = document.getElementById("mes-anio");
  const estacionLabel = document.getElementById("estacion-label");

  calendario.innerHTML = "";
  header.innerHTML = "";

  const mes = fechaActual.getMonth();
  const anio = fechaActual.getFullYear();

  const nombresMeses = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];
  const nombresDias = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

  mesAnio.textContent = `${nombresMeses[mes]} ${anio}`;

  // Cabecera días
  nombresDias.forEach(dia => {
    const div = document.createElement("div");
    div.textContent = dia;
    div.classList.add("day-name");
    header.appendChild(div);
  });

  const primerDia = new Date(anio, mes, 1).getDay();
  const offset = primerDia === 0 ? 6 : primerDia - 1; // Lunes = 0
  const diasMes = new Date(anio, mes + 1, 0).getDate();

  // Estación
  const estacion = filtroEstacion === "auto" ? obtenerEstacion(mes) : filtroEstacion;
  estacionLabel.textContent = estacion.charAt(0).toUpperCase() + estacion.slice(1);
  estacionLabel.className = `badge ${estacion}`;

  // Celdas vacías
  for (let i = 0; i < offset; i++) {
    const div = document.createElement("div");
    div.classList.add("calendar-day", "empty");
    calendario.appendChild(div);
  }

  // Celdas días
  for (let dia = 1; dia <= diasMes; dia++) {
    const fechaStr = `${anio}-${String(mes+1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;
    const eventosDia = eventos.filter(ev => ev.fecha === fechaStr && (filtroTipo === "todos" || ev.tipo === filtroTipo));

    let eventosHTML = eventosDia.map(
      ev => `<div class="evento" onclick="mostrarTip('${ev.nombre}')">${ev.nombre}</div>`
    ).join("");

    const div = document.createElement("div");
    div.classList.add("calendar-day");
    div.innerHTML = `<div class="day-number">${dia}</div>${eventosHTML}`;

    // Resaltar hoy
    const hoy = new Date();
    if (anio === hoy.getFullYear() && mes === hoy.getMonth() && dia === hoy.getDate()) {
      div.classList.add("hoy");
    }

    calendario.appendChild(div);
  }
}

// =============================
// 6. Mostrar tips en el card
// =============================
function mostrarTip(nombreCultivo) {
  const card = document.getElementById("tip-card");
  const data = tipsCultivos[nombreCultivo];

  if (data) {
    card.innerHTML = `
      <img src="${data.imagen}" class="card-img-top" alt="${nombreCultivo}">
      <div class="card-body">
        <h5 class="card-title">${nombreCultivo}</h5>
        <p class="card-text">${data.tip}</p>
      </div>
    `;
    // ✅ Guardar selección
    cultivoSeleccionado = nombreCultivo;
    localStorage.setItem("cultivoSeleccionado", nombreCultivo);
  }
}

// =============================
// 7. Render inicial
// =============================
renderizarCalendario();

// ✅ Restaurar tip si había un cultivo guardado
if (cultivoSeleccionado) {
  mostrarTip(cultivoSeleccionado);
}
