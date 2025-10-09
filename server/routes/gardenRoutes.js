const express = require('express');
const router = express.Router();
const gardenController = require('../controllers/gardenController');

// Rutas CRUD para Jardines
router.post('/', gardenController.createGarden);
router.get('/', gardenController.getGardens);
router.get('/:id', gardenController.getGardenById);
router.put('/:id', gardenController.updateGarden);
router.delete('/:id', gardenController.deleteGarden);

module.exports = router;
