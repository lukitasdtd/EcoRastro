require('dotenv').config(); // Carga las variables de entorno del archivo .env

const app = require('./app');
const pool = require('./utils/db');

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    try {
        await pool.query('SELECT NOW()'); // Una consulta simple para verificar la conexión
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    }
});
