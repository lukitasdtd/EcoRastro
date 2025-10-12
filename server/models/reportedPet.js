const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db'); // Asumiendo que db.js exporta una instancia de sequelize

class ReportedPet extends Model {}

ReportedPet.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('perro', 'gato'),
    allowNull: false
  },
  raza: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Guardamos la ubicación como un JSON para mantener la estructura que pediste.
  // Sequelize no tiene un tipo "tupla", pero JSON es perfecto para esto.
  ubicacion: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: 'Almacena un objeto con region, comuna y direccion'
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fotos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  // Podríamos añadir un estado para saber si ya fue encontrado
  status: {
    type: DataTypes.ENUM('perdido', 'encontrado', 'en_adopcion'),
    defaultValue: 'perdido'
  }
}, {
  sequelize,
  modelName: 'ReportedPet',
  tableName: 'reported_pets', // Nombre de la tabla en la BD
  timestamps: true // Para tener createdAt y updatedAt
});

module.exports = ReportedPet;
