const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- Middleware de Autenticación ---
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // No hay token, no autorizado
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token inválido o expirado
        }
        req.user = user;
        next();
    });
}

// --- Middleware de Subida de Archivos con Multer ---

// Define el directorio de subida relativo a la raíz del proyecto del servidor
const uploadDir = path.join(__dirname, '..', 'uploads');

// Asegúrate de que el directorio de subida existe, si no, créalo
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        // Crea un nombre de archivo único para evitar colisiones
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro de archivos para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Error: El archivo debe ser una imagen (jpeg, jpg, png)'));
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Límite de 5MB por archivo
    fileFilter: fileFilter
});


// --- Exportar todos los middlewares ---
module.exports = {
    authenticateToken,
    upload
};
