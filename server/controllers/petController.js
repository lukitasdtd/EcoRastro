const pool = require('../utils/db');

const controllerName = "petController";

exports.createPetReport = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "La imagen de la mascota es requerida." });
        }

        const userRut = req.user.rut;
        const imageUrl = req.file.path;
        const { nombre, tipo, raza, color, direccion, region, comuna, descripcion } = req.body;

        const addressObject = {
            calle: direccion,
            comuna: comuna,
            region: region
        };
        const fullAddressJson = JSON.stringify(addressObject);

        const newPetReport = await pool.query(
            'INSERT INTO "pets" (nombre, tipo, raza, color, direccion, descripcion, image_url, user_rut) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nombre, tipo, raza, color, fullAddressJson, descripcion, imageUrl, userRut]
        );

        res.status(201).json(newPetReport.rows[0]);

    } catch (err) {
        console.error(`${controllerName}: Error al crear reporte de mascota.`, {
            errorMessage: err.message,
            stack: err.stack,
            requestBody: req.body,
        });
        res.status(500).json({ message: `Error del servidor: No se pudo crear el reporte. Verifique la estructura de la tabla y el formato de los datos.` });
    }
};

exports.createPet = async (req, res) => {
    try {
        const ownerRut = req.user.rut;
        const { name, age, adopted } = req.body;

        const newPet = await pool.query(
            'INSERT INTO "pets" (name, age, adopted, owner_rut) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, age, adopted, ownerRut]
        );

        res.status(201).json(newPet.rows[0]);
    } catch (err) {
        console.error(`${controllerName}: Error al crear mascota - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo crear la mascota.` });
    }
};

exports.getPets = async (req, res) => {
    try {
        const allPets = await pool.query('SELECT * FROM "pets"');
        res.json(allPets.rows);
    } catch (err) {
        console.error(`${controllerName}: Error al obtener mascotas - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo obtener las mascotas.` });
    }
};

exports.getPetById = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await pool.query('SELECT * FROM "pets" WHERE id = $1', [id]);

        if (pet.rows.length === 0) {
            return res.status(404).json({ message: "Mascota no encontrada." });
        }

        res.json(pet.rows[0]);
    } catch (err) {
        console.error(`${controllerName}: Error al obtener mascota por ID - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo obtener la mascota.` });
    }
};

exports.updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const ownerRut = req.user.rut;
        const { name, age, adopted } = req.body;

        const updatePet = await pool.query(
            'UPDATE "pets" SET name = $1, age = $2, adopted = $3 WHERE id = $4 AND owner_rut = $5 RETURNING *',
            [name, age, adopted, id, ownerRut]
        );

        if (updatePet.rows.length === 0) {
            return res.status(404).json({ message: "Mascota no encontrada o no tienes permiso para modificarla." });
        }

        res.json(updatePet.rows[0]);
    } catch (err) {
        console.error(`${controllerName}: Error al actualizar mascota - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo actualizar el usuario.` });
    }
};

exports.deletePet = async (req, res) => {
    try {
        const { id } = req.params;
        const ownerRut = req.user.rut;

        const deletePet = await pool.query(
            'DELETE FROM "pets" WHERE id = $1 AND owner_rut = $2 RETURNING *',
            [id, ownerRut]
        );

        if (deletePet.rows.length === 0) {
            return res.status(404).json({ message: "Mascota no encontrada o no tienes permiso para eliminarla." });
        }

        res.json({ message: "Mascota eliminada correctamente." });
    } catch (err) {
        console.error(`${controllerName}: Error al eliminar mascota - ${err.message}`);
        res.status(500).json({ message: `Error del servidor: No se pudo eliminar la mascota.` });
    }
};
