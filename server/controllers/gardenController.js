'use strict';
const pool = require('../utils/db');

const controllerName = "gardenController";

// --- FUNCIN PARA CREAR UNA HUERTA ---
exports.createGarden = async (req, res) => {
    const client = await pool.connect(); // Acquire client
    try {
        if (!req.file) {
            return res.status(400).json({ message: "La imagen de la huerta es requerida." });
        }

        // 1. Extraer todos los datos del cuerpo y del token/middleware
        const userRut = req.user.rut;
        const imageUrl = req.file.path;
        const { nombre, descripcion, direccion, comuna, region, cont_email, cont_tel } = req.body;

        // 2. Construir el objeto de direccin y convertirlo a JSON
        const addressObject = {
            calle: direccion,
            comuna: comuna,
            region: region
        };
        const fullAddressJson = JSON.stringify(addressObject);

        // 3. Insertar en la tabla "huertas" incluyendo los campos de contacto
        const nuevaHuerta = await client.query( // Use client
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
    } finally {
        client.release(); // Release client
    }
};

// --- FUNCIN PARA OBTENER TODAS LAS HUERTAS ---
exports.getGardens = async (req, res) => {
    const client = await pool.connect(); // Acquire client
    try {
        const todasLasHuertas = await client.query('SELECT * FROM "huertas"'); // Use client
        res.status(200).json(todasLasHuertas.rows);
    } catch (err) {
        console.error(`${controllerName}: Error al obtener las huertas.`, {
            errorMessage: err.message,
            stack: err.stack,
        });
        res.status(500).json({ message: "Error del servidor: No se pudieron obtener las huertas." });
    } finally {
        client.release(); // Release client
    }
};

// --- FUNCIN PARA OBTENER UNA HUERTA POR ID ---
exports.getGardenById = async (req, res) => {
    const client = await pool.connect(); // Acquire client
    try {
        const { id } = req.params;
        const huerta = await client.query('SELECT * FROM "huertas" WHERE id = $1', [id]); // Use client

        if (huerta.rows.length === 0) {
            return res.status(404).json({ message: "Huerta no encontrada." });
        }

        res.status(200).json(huerta.rows[0]);
    } catch (err) {
        console.error(`${controllerName}: Error al obtener la huerta por ID.`, {
            errorMessage: err.message,
            stack: err.stack,
            params: req.params
        });
        res.status(500).json({ message: "Error del servidor: No se pudo obtener la huerta." });
    } finally {
        client.release(); // Release client
    }
};
