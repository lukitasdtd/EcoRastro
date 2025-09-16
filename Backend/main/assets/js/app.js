// Toggle del campo "Otros" en cultivos
const otrosCk = document.getElementById('otrosCk');
const otrosInp = document.getElementById('otrosInp');

if (otrosCk && otrosInp) {
  otrosCk.addEventListener('change', () => {
    const activo = otrosCk.checked;
    otrosInp.disabled = !activo;
    otrosInp.classList.toggle('is-disabled', !activo);
    if (activo) otrosInp.focus();
  });
}

// Uploader: previsualización de imagen local
document.querySelectorAll('[data-uploader]').forEach(box => {
  const input = box.querySelector('input[type="file"]');
  const preview = box.querySelector('.er-uploader__preview');

  input.addEventListener('change', () => {
    const file = input.files && input.files[0];
    if (!file) return;

    // Validación simple de tipo
    if (!file.type.startsWith('image/')) {
      alert('Selecciona una imagen JPG o PNG.');
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      preview.src = e.target.result;
      box.classList.add('is-filled');
    };
    reader.readAsDataURL(file);
  });
});

// Demo de publicar
const publishBtn = document.getElementById('publishBtn');
if (publishBtn) {
  publishBtn.addEventListener('click', () => {
    alert('✅ ¡Tu huerta fue publicada! (demo)');
  });
}
