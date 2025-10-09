//rutas para huertas
const express = require('express');
const router = express.Router();
const gardenController = require('../controllers/gardenController');
const { gardenValidationRules, validate, basicAuth } = require('../middlewares');

// Rutas CRUD para Jardines
router.post('/', gardenValidationRules(), validate, gardenController.createGarden);
router.get('/', gardenController.getGardens);
router.get('/:id', gardenController.getGardenById);
router.put('/:id', gardenValidationRules(), validate, gardenController.updateGarden);
router.delete('/:id', gardenController.deleteGarden);

module.exports = router;
