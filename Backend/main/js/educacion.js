// =============================
// Interactividad básica
// =============================

// Capturar clicks en "Leer más"
document.querySelectorAll(".leer-mas").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const titulo = btn.closest(".card-body").querySelector(".card-title").textContent;
      alert(`Próximamente: contenido detallado de "${titulo}"`);
    });
  });
   
// =============================
// Buscador con alerta simulada
// =============================
document.querySelector(".search-form").addEventListener("submit", e => {
  e.preventDefault();
  const query = e.target.querySelector(".search-input").value.trim();
  if (query) {
    alert(`🔍 Resultados de búsqueda para: "${query}"`);
  } else {
    alert("Escribe algo para buscar.");
  }
});
