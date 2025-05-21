document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("#formulario-libro")
    const info = document.querySelector("#info");

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const datos = {};
        formData.forEach((value, key) => {
            datos[key] = value;
        });

        datos.genero = parseInt(datos.genero); // Asegúrate de que sea un número
        datos.year = parseInt(datos.year);
        datos.cantidadPaginas = parseInt(datos.cantidadPaginas);
        const rutaActual = window.location.href;



        try {
            const respuesta = await fetch(`${rutaActual}/nuevo-libro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const resultado = await respuesta.json();
            console.log('Respuesta del servidor:')
            console.log(resultado);

            if (resultado.ok) {
                resetearFormulario(form)
            }
            info.style.color = 'green'
            info.innerHTML = resultado.msj
            //puedo cunsulatar si true o false resultado.ok para resetear el formulario en caso de que este bien




        } catch (error) {
            info.style.color = 'red'
            info.innerHTML = error.msj

        }

        msjTime(info)


    })

    function resetearFormulario(formulario) {


        if (formulario) {
            formulario.reset(); // Restablece los valores de la mayoría de los elementos

            // Para los elementos <select>, aseguramos que la primera opción esté seleccionada
            const selects = formulario.querySelectorAll('select');
            selects.forEach(select => {
                if (select.options.length > 0) {
                    select.selectedIndex = 0; // Establece el índice seleccionado al primero
                }
            });
        } else {
            console.error(`No se encontró el formulario con el ID: ${formularioId}`);
        }
    }











}) // load

//funciones
function msjTime(elemento) {
    setTimeout(() => {
        elemento.innerHTML = '';
    }, 3000);
}

