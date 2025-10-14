const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define el directorio de subida relativo a la ra�z del proyecto
const uploadDir = path.join(__dirname, '..', 'uploads');

// Aseg�rate de que el directorio de subida existe, si no, cr�alo
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuraci�n de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Directorio donde se guardar�n los archivos
    },
    filename: function (req, file, cb) {
        // Crea un nombre de archivo �nico para evitar colisiones
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtro de archivos para aceptar solo im�genes
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Error: �El archivo debe ser una imagen v�lida (jpeg, jpg, png, gif)!'));
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // L�mite de 5MB por archivo
    fileFilter: fileFilter
});

module.exports = upload;
