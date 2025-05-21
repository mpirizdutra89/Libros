document.addEventListener('DOMContentLoaded', () => {

    const btnMostrarLibros = document.querySelector('#btn-mostrar-libros');
    const btnAgregarLibro = document.querySelector('#btn-agregar-libro');
    const listaLibros = document.querySelector('#lista-libros');
    const formularioLibro = document.querySelector('#formulario-libro');
    const btnGuardarLibro = document.querySelector('#btn-guardar-libro');
    const btnCancelarLibro = document.querySelector('#btn-cancelar-libro');

    const btnMostrarAutores = document.querySelector('#btn-mostrar-autores');
    const btnAgregarAutor = document.querySelector('#btn-agregar-autor');
    const listaAutores = document.querySelector('#lista-autores');
    const formularioAutor = document.querySelector('#formulario-autor');
    const btnGuardarAutor = document.querySelector('#btn-guardar-autor');
    const btnCancelarAutor = document.querySelector('#btn-cancelar-autor');

    // --- Lógica para Libros ---
    btnMostrarLibros.addEventListener('click', () => {
        listaLibros.classList.toggle('lista-oculta');
        formularioLibro.classList.add('formulario-oculto');
        // Aquí iría la lógica para cargar y mostrar la lista de libros
        // Podrías simular datos por ahora:

    });

    btnAgregarLibro.addEventListener('click', () => {
        formularioLibro.classList.remove('formulario-oculto');
        listaLibros.classList.add('lista-oculta');
    });

    /*   btnGuardarLibro.addEventListener('click', () => {
          // Aquí iría la lógica para tomar los datos del formulario y guardarlos
          console.log('Guardando libro...');
          //formularioLibro.classList.add('formulario-oculto');
      }); */

    btnCancelarLibro.addEventListener('click', () => {
        formularioLibro.classList.add('formulario-oculto');
    });

    // --- Lógica para Autores ---
    btnMostrarAutores.addEventListener('click', () => {
        listaAutores.classList.toggle('lista-oculta');
        // Aquí iría la lógica para cargar y mostrar la lista de autores
        // Podrías simular datos por ahora:
        listaAutores.innerHTML = '<ul><li>Autor A</li><li>Autor B</li></ul>';
    });

    btnAgregarAutor.addEventListener('click', () => {
        formularioAutor.classList.remove('formulario-oculto');
        listaAutores.classList.add('lista-oculta');
    });

    btnGuardarAutor.addEventListener('click', () => {
        // Aquí iría la lógica para tomar los datos del formulario y guardarlos
        console.log('Guardando autor...');
        formularioAutor.classList.add('formulario-oculto');
    });

    btnCancelarAutor.addEventListener('click', () => {
        formularioAutor.classList.add('formulario-oculto');
    });
});