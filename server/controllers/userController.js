const pool = require('../utils/db');

// Datos en memoria (simulando una base de datos)
let users = [];
let nextId = 1;

exports.createUser = (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User(nextId++, name, email);
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

exports.getUsers = (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

exports.getUserById = (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

exports.updateUser = (req, res) => {
  try {
    const { name, email } = req.body;
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    const updatedUser = { ...users[userIndex], name: name || users[userIndex].name, email: email || users[userIndex].email };
    users[userIndex] = updatedUser;
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};

exports.deleteUser = (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    users.splice(userIndex, 1);
    res.status(200).json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
  }
};
