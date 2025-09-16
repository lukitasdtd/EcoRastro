const regiones = require("./cm.json")
regiones.r_c.forEach(id=>{
  console.log(id.comunas)
})

function carga (){
  select.innerHTML = '<option value="">Selecciona una opción</option>'
  const regionElement = document.getElementById("region-select");
  regiones.r_c.forEach(region => {
  const option = document.createElement('option')
  regionElement.value = `${region.numero} - ${region.nombre}`;
  regionElement.textContent = region.nombre
  select.appendChild(option);
  });
}
document.addEventListener('DOMContentLoaded', carga);