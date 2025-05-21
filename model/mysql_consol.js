const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

dotenv.config();

async function main() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'test',
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        });

        console.log('¡Conexión a la base de datos MySQL exitosa!\n\n-------------------------------------------\n');

        const task = process.argv[2]; // Obtiene el argumento de la línea de comandos
        const tableName = process.argv[3];
        async function executeQuery(sql) {
            try {
                const [rows, fields] = await connection.execute(sql);
                console.log('\nResultados:');
                console.table(rows);
                return true;
            } catch (error) {
                console.error('\n Error al ejecutar la consulta:\n', error.message);
                return false;
            }
        }

        if (task === 'show-databases') {
            await executeQuery('SHOW DATABASES;');
            await connection.end();
            readline.close();
            return;
        }

        if (task === 'show-tables') {
            await executeQuery('SHOW TABLES;');
            await connection.end();
            readline.close();
            return;
        }

        if (task === 'show-columns' && tableName) {
            await executeQuery(`SHOW COLUMNS FROM ${tableName};`);
            await connection.end();
            readline.close();
            return;
        } else if (task === 'show-columns' && !tableName) {
            console.log('\nPor favor, especifique el nombre de la tabla después del comando show-columns.');
            await connection.end();
            readline.close();
            return;
        }


        // Si no se proporciona una tarea específica, entra en el modo interactivo
        async function askForQuery() {
            readline.question('\n\nIngrese su consulta SQL (o "exit" para salir):\n', async (query) => {
                if (query.toLowerCase() === 'exit') {
                    console.log('Cerrando conexión...');
                    await connection.end();
                    readline.close();
                } else {
                    await executeQuery(query);
                    askForQuery(); // Pide otra consulta
                }
            });
        }

        await askForQuery();

    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
        readline.close();
    }
}

main();