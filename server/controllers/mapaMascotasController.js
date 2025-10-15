
const MascotaMapa = require('../models/mascotaMapa');

async function getMascotas(req, res) {
  try {
    const mascotas = await MascotaMapa.findAll();
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getMascotas };
