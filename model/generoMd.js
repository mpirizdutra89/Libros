// models/categoria.js
const { getConnections } = require('../database');

class Genero {
    static tabla = ' genero '
    #id; #descripcion
    constructor(id, descripcion) {
        this.#id = id;
        this.#descripcion = descripcion;
    }

    static async getAll() {
        let connection;

        try {
            connection = await getConnections();
            const [rows] = await connection.execute(`SELECT * FROM ${this.tabla}`);
            console.log('Categorías obtenidas :', rows);
            return rows;//rows.map(row => new Genero(row.id, row.descripcion));
        } catch (error) {
            console.error('Error al obtener todas las genero:', error);
            throw error;
        } finally {
            connection.release();
        }
    }
    /* 
        static async findById(id) {
            const connection = await getConnections();
            try {
                const [rows] = await connection.execute(`SELECT * FROM ${this.tabla} WHERE id = ?`, [id]);
                if (rows.length === 1) {
                    return new Genero(rows[0].id, rows[0].descripcion);
                }
                return null;
            } catch (error) {
                console.error(`Error al buscar la genero con ID ${id}: `, error);
                throw error;
            } finally {
                connection.release();
            }
        }
    
        async save() {
            const connection = await getConnections();
            try {
                if (this.#id) {
                    const [result] = await connection.execute(
                        `UPDATE ${tabla} SET descripcion = ? WHERE id = ?`,
                        [this.#descripcion, this.#id]
                    );
                    return result.affectedRows > 0; // Devuelve true si se actualizó al menos una fila
                } else {
                    const [result] = await connection.execute(
                        `INSERT INTO ${tabla} (descripcion) VALUES (?)`,
                        [this.#descripcion]
                    );
                    this.#id = result.insertId; //Si es true puedo revisar si en mi instancia esta el id insertado
                    return true; // Devuelve true si la inserción fue exitosa
                }
            } catch (error) {
                console.error(`Error al guardar / actualizar la genero ${this.#descripcion} (ID: ${this.#id}): `, error);
                throw error;
            } finally {
                connection.release();
            }
        }
    
        static async delete(id) {
            const connection = await getConnections();
            try {
                const [result] = await connection.execute(`DELETE FROM ${tabla} WHERE id = ?`, [id]);
                return result.affectedRows > 0; // Devuelve true si se eliminó al menos una fila
            } catch (error) {
                console.error(`Error al eliminar la genero con ID ${id}: `, error);
                throw error;
            } finally {
                connection.release();
            }
        }
    
     */
}
/* export default Genero; */
module.exports = Genero;