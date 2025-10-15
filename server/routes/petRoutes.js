
const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.get('/', petController.searchPets);

module.exports = router;
