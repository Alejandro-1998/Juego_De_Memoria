/* Alejandro Caballero Luque */
/* José Ramón Rejano Ruge */

const boton = document.getElementById('botonRegresar');
const texto = document.getElementById('textoRegresar');

boton.addEventListener('mouseenter', () => {
    texto.classList.add('show');
});

boton.addEventListener('mouseleave', () => {
    texto.classList.remove('show');
});