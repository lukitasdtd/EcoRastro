const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Importar middlewares
const { petValidationRules, validate } = require('../middlewares/dataValidator');
// Corregido: Importar authenticateToken y upload desde el barrel de middlewares (index.js)
const { authenticateToken, upload } = require('../middlewares');

// --- NUEVA RUTA PARA REPORTES ---
// POST /api/pets/report
router.post(
    '/report',
    authenticateToken,
    upload.single('petImage'), // El nombre 'petImage' debe coincidir con el del campo en el formulario
    petController.createPetReport // Nueva función que crearemos en el controlador
);

// --- Rutas existentes ---
router.post('/', authenticateToken, petValidationRules(), validate, petController.createPet);
router.put('/:id', authenticateToken, petValidationRules(), validate, petController.updatePet);
router.delete('/:id', authenticateToken, petController.deletePet);

// Rutas públicas
router.get('/', petController.getPets);
router.get('/:id', petController.getPetById);

module.exports = router;
