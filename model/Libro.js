const { getConnections } = require('../database')

class Libro {
    static tabla = ' libro '
    #ISBN; #titulo; #descripcion; #genero; #year; #cantidadPaginas
    constructor(ISBN, titulo, descripcion, genero, year, cantidadPaginas) {


        this.#ISBN = ISBN


        this.#titulo = titulo
        this.#descripcion = descripcion
        this.#genero = genero
        this.#year = year
        this.#cantidadPaginas = cantidadPaginas

    }

    static async getAll() {
        let connection;

        try {
            connection = await getConnections();
            const [rows] = await connection.execute(`SELECT * FROM ${Libro.tabla}`);

            return rows;//rows.map(row => new Libro(row.ISBN, row.titulo, row.descripcion, row.genero, row.year, row.cantidadPaginas));
        } catch (error) {
            console.error('No se pudo realizar la consulta:', error);
            throw error;
        } finally {
            connection.release();
        }
    }

    static async getById(isbn) {
        const connection = await getConnections();
        try {
            const [rows] = await connection.execute(`SELECT * FROM ${Libro.tabla} WHERE ISBN = ?`, [isbn]);
            if (rows.length === 1) {
                return new Libro(rows[0].ISBN, rows[0].titulo, rows[0].descripcion, rows[0].genero, rows[0].year, rows[0].cantidadPaginas);
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

            if (this.#ISBN) {
                const [result] = await connection.execute(
                    `UPDATE ${Libro.tabla} SET titulo = ?,descripcion = ?,genero_id = ?,year = ?, cantidadPaginas = ? WHERE ISBN = ?`,
                    [this.#titulo, this.#descripcion, this.#genero, this.#year, this.#cantidadPaginas, this.#ISBN]
                );
                return result.affectedRows > 0
            } else {
                //isbn esta vacio
                //como es un practico no me gasto mucho, en verificar si exite o no en la base de datos
                //En todo caso desde el formulario se devera interntar la insercio de nuevo
                //algo mas pro, eso lo controlaria mejor
                //987-18-9991-03748-2 donde apartir del 9991-... en adelante es aleatorio, es dificil q se forme una convinacion igual, pero no imposible
                //para fines practico no hago mas controles, ya que es un tp

                this.#ISBN = Libro.generarPseudoISBN13Aleatorio()

                const [result] = await connection.execute(
                    `INSERT INTO ${Libro.tabla} (ISBN,titulo,descripcion,genero_id,year,cantidadPaginas) VALUES (?,?,?,?,?,?)`,
                    [this.#ISBN, this.#titulo, this.#descripcion, this.#genero, this.#year, this.#cantidadPaginas]
                );
                return result.affectedRows > 0
            }
        } catch (error) {
            console.error(`Error al guardar / actualizar la Libro ${this.#descripcion} (ISBN: ${this.#ISBN}): `, error);

            return false;
        } finally {
            connection.release();
        }
    }

    static async delete(isbn) {
        const connection = await getConnections();
        try {
            const [result] = await connection.execute(`DELETE FROM ${Libro.tabla} WHERE ISBN = ?`, [isbn]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error(`Error al eliminar la genero con ID ${isbn}: `, error);
            return false;
        } finally {
            connection.release();
        }
    }

    static generarPseudoISBN13Aleatorio() {
        const prefijo = '987';
        const grupoLocal = '18';
        const editorLocal = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const tituloLocal = Math.floor(Math.random() * 100000).toString().padStart(5, '0');


        const control = Math.floor(Math.random() * 10);
        const resultado = `${prefijo}-${grupoLocal}-${editorLocal}-${tituloLocal}-${control}`;
        console.log(resultado)
        return resultado;
    }


    toJSON() {
        return {
            ISBN: this.#ISBN,
            titulo: this.#titulo,
            descripcion: this.#descripcion,
            genero: this.#genero,
            year: this.#year,
            cantidadPaginas: this.#cantidadPaginas
        };
    }




}

module.exports = Libro;


