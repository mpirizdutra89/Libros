const Genero = require('../model/generoMd')
const Libro = require('../model/Libro')

const sendResponse = (res, ok, data = null, error = null, msj = "", statusCode = 200) => {
    res.status(statusCode).json({ ok, data, error, msj });
};

exports.nuevoLibro = async (req, res) => {
    try {
        /* console.log(req.body) */
        if (req.body && Object.keys(req.body).length > 0) {
            const form = req.body;

            const libro = new Libro(form.isbn, form.titulo, form.descripcion, form.genero, form.year, form.cantidadPaginas);
            const resultado = await libro.save()
            if (resultado) {
                sendResponse(res, true, libro.toJSON(), null, "Libro agregado con exito")
            } else {
                sendResponse(res, false, libro, 400, "No se pudo agregar el libro (isbn repetido)")
            }
        }



    } catch (error) {
        console.error('Falla NuevoLibro():', error);
        sendResponse(res, false, 500, "No se pudo agregar el libro")
    }
}


exports.gestionInit = async (req, res) => {
    try {
        const genero = await getAllGenero(); // Esperar la resolución de la promesa
        const libros = await getAllLibro();
        res.render('gestionLA', {
            titulo: 'Gestion Libros y autores',
            generos: genero,
            libros: libros
        });
    } catch (error) {
        console.error('Error al inicializar la gestión:', error);
        res.render('gestionLA', {
            titulo: 'Gestion Libros y autores',
            generos: null,
            libros: null

        });
    }
}



//funciones
const getAllGenero = async () => {
    try {
        const genero = await Genero.getAll();
        return genero
    } catch (error) {
        console.error('Error al obtener los generos:', error);
        return null
    }
}


const getAllLibro = async () => {
    try {
        const genero = await Libro.getAll();
        return genero
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        return null
    }
}