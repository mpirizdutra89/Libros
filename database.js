const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();//variables de entorno

// Definición de clases de error personalizadas
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name; // Establece el nombre de la clase como nombre del error
        Error.captureStackTrace(this, this.constructor); // Captura la traza de la pila, excluyendo el constructor
    }
}

class DatabaseConnectionError extends CustomError {
    constructor(message) {
        super(message);
        this.code = 'DB_CONNECTION_FAILED';
    }
}

class DatabaseQueryError extends CustomError {
    constructor(message, sql) {
        super(message);
        this.code = 'DB_QUERY_FAILED';
        this.sql = sql; // Puedes incluir la consulta SQL fallida para depuración
    }
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306
});

const getConnections = async () => {
    try {
        return await pool.getConnection();
    } catch (error) {
        console.error(' getConnection()-> Error en la conexión del pool:', error.message);
        throw new DatabaseConnectionError(`No se pudo conectar con la base de datos: ${process.env.DB_DATABASE}`);
    }
}

module.exports = { getConnections };  