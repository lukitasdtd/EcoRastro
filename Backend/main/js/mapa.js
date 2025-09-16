// Inicializar mapa
const map = L.map('map').setView([-33.45, -70.66], 13);

// Capa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:'&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Datos de ejemplo (mascotas y huertas)
const lugares = [
  { categoria: "mascota", tipo: "perro", nombre: "Fido", coords: [-33.44, -70.65] },
  { categoria: "mascota", tipo: "gato", nombre: "Luna", coords: [-33.46, -70.67] },
  { categoria: "mascota", tipo: "perro", nombre: "Max", coords: [-33.45, -70.68] },
  { categoria: "huerta", nombre: "Huerta Comunitaria Bellavista", coords: [-33.43, -70.64] },
  { categoria: "huerta", nombre: "EcoHuerta Ñuñoa", coords: [-33.47, -70.65] }
];

// Marcadores activos
let marcadores = [];

// Calcular distancia en km (Haversine)
function distanciaKm(coord1, coord2) {
  const R = 6371;
  const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
  const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Renderizar lugares según filtros
function renderLugares() {
  // Limpiar marcadores previos
  marcadores.forEach(m => map.removeLayer(m));
  marcadores = [];

  // Leer filtros
  const categoria = document.getElementById('categoria-filtro').value;
  const tipo = document.getElementById('tipo-filtro').value;
  const distancia = parseInt(document.getElementById('distancia-filtro').value);
  const centro = [-33.45, -70.66]; // punto de referencia (Santiago)

  // Filtrar
  const filtrados = lugares.filter(l => {
    const d = distanciaKm(centro, l.coords);
    return (
      (categoria === "" || l.categoria === categoria) &&
      (l.categoria !== "mascota" || tipo === "" || l.tipo === tipo) &&
      d <= distancia
    );
  });

  // Renderizar en mapa
  filtrados.forEach(l => {
    const icono = l.categoria === "huerta" ? "🌱" : (l.tipo === "perro" ? "🐶" : "🐱");
    const marker = L.marker(l.coords)
      .addTo(map)
      .bindPopup(`${icono} ${l.nombre}`);
    marcadores.push(marker);
  });

  // Actualizar lista
  const lista = document.getElementById("lista-lugares");
  lista.innerHTML = "";
  filtrados.forEach(l => {
    const d = distanciaKm(centro, l.coords).toFixed(1);
    const icono = l.categoria === "huerta" ? "🌱" : (l.tipo === "perro" ? "🐶" : "🐱");
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${icono} ${l.nombre} (${d} km)`;
    lista.appendChild(li);
  });
}

// Inicializar render
renderLugares();

// Manejar filtros
document.getElementById("filtros-form").addEventListener("submit", e => {
  e.preventDefault();
  renderLugares();
});
