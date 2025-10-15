
const HuertaMapa = require('../models/huertaMapa');

async function getHuertas(req, res) {
  try {
    const huertas = await HuertaMapa.findAll();
    res.json(huertas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getHuertas };
