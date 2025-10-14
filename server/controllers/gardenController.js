'use strict';
const pool = require('../utils/db');

const controllerName = "gardenController";

// --- FUNCI�N PARA CREAR UNA HUERTA ---
exports.createGarden = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "La imagen de la huerta es requerida." });
        }

        // 1. Extraer todos los datos del cuerpo y del token/middleware
        const userRut = req.user.rut;
        const imageUrl = req.file.path;
        // CORREGIDO: Se a�aden cont_email y cont_tel a la desestructuraci�n
        const { nombre, descripcion, direccion, comuna, region, cont_email, cont_tel } = req.body;

        // 2. Construir el objeto de direcci�n y convertirlo a JSON
        const addressObject = {
            calle: direccion,
            comuna: comuna,
            region: region
        };
        const fullAddressJson = JSON.stringify(addressObject);

        // 3. Insertar en la tabla "huertas" incluyendo los campos de contacto
        // CORREGIDO: Se a�aden las columnas y los valores para el contacto
        const nuevaHuerta = await pool.query(
            'INSERT INTO "huertas" (nombre, descripcion, direccion, image_url, user_rut, cont_email, cont_tel) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nombre, descripcion, fullAddressJson, imageUrl, userRut, cont_email, cont_tel]
        );

        res.status(201).json(nuevaHuerta.rows[0]);

    } catch (err) {
        console.error(`${controllerName}: Error al crear la huerta.`, {
            errorMessage: err.message,
            stack: err.stack,
            requestBody: req.body,
        });
        res.status(500).json({ message: `Error del servidor: No se pudo crear la huerta. Verifique la estructura de la tabla y el formato de los datos.` });
    }
};
