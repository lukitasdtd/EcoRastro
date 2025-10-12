//Exporta un solo objeto que contiene todos los modelos que se acaban de importar, así se evita tener que importar cada modelo por separado en los controladores.

const User = require('./user');
const Pet = require('./pet');
const Garden = require('./garden');

module.exports = {
  User,
  Pet,
  Garden,
};

