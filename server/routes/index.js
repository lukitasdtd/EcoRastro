const express = require('express');
const router = express.Router();

const petRoutes = require('./petRoutes');
const reportRoutes = require('./reportroutes');
const userRoutes = require('./userRoutes');
const gardenRoutes = require('./gardenRoutes');

router.use('/pets', petRoutes);
router.use('/reports', reportRoutes);
router.use('/users', userRoutes);
router.use('/gardens', gardenRoutes);

module.exports = router;
