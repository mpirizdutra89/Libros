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

const getConnection = async () => {
    try {
        return await pool.getConnection();
    } catch (error) {
        console.error(' getConnection()-> Error en la conexión del pool:', error.message);
        throw new DatabaseConnectionError(`No se pudo conectar con la base de datos: ${process.env.DB_DATABASE}`);
    }
}

async function obtenerTodasLasCategorias() {
    let connection;
    let sql = 'SELECT * FROM genero'
    try {
        connection = await getConnection();

        const [rows] = await connection.execute(sql);

        return rows;
    } catch (error) {
        if (error instanceof DatabaseConnectionError) {
            console.error(error.message, `(Codigo: ${error.code})`);


        } else if (error instanceof mysql.Error) {
            // Los errores específicos de mysql también son instancias de Error
            console.error('Error en la consulta a la base de datos:', error.message, `(Código: ${error.code})`);
            throw new DatabaseQueryError('Error al obtener las categorías', sql);
        } else {
            console.error('Ocurrió un error inesperado:', error);
        }
        return null;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}


async function main() {
    let categorias;

    categorias = await obtenerTodasLasCategorias();
    if (!categorias) {
        console.log("No se pudieron obtener las categorías.");
    } else {
        console.log(categorias);
    }
    /* finally { ESto se hace en otro lado: en el chat de geminis (pool de conexiones casi al final se hanal de l tema)
        // Asegúrate de cerrar el pool de conexiones en el bloque finally
        if (pool) {
            await pool.end();
            console.log('Pool de conexiones cerrado.');
        }
    } */
}
main();//en la consola veremos que la pool sigue abierta pero es normal ya que la app, necesita de esa conexion
// si la cerramos depues de cada conexion ,podemos traer latencia al sistema
//lo ideal es cerrarla cuando  el entorno (hostin, compu local) manada la orden
//en el express que esta corriendo todo el tiempo , podemos tener escuchadores para cerra la pool