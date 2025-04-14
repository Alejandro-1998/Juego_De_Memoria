window.addEventListener('DOMContentLoaded', () => {

    // Obtenemos los elementos
    const instrucciones = document.getElementById('instrucciones');
    const popup = document.getElementById('popup');

    instrucciones.addEventListener('click', () => {

        // Desocultamos u ocultamos
        if (popup.style.display === 'none' || popup.style.display === '') {
            popup.style.display = 'block';

            // Efecto de cambio de color
            instrucciones.style.boxShadow = '10px 7px 10px white';
            setTimeout(() => {
                instrucciones.style.boxShadow = '10px 7px 10px black';
            }, 150);
        } else {
            popup.style.display = 'none';

            // Efecto de cambio de color
            instrucciones.style.boxShadow = '10px 7px 10px white';
            setTimeout(() => {
                instrucciones.style.boxShadow = '10px 7px 10px black';
            }, 150);
        }
    });

    // Ocultar al hacer clic fuera también
    document.addEventListener('click', (e) => {
        if (!instrucciones.contains(e.target) && !popup.contains(e.target)) {
            popup.style.display = 'none';
        }
    });
});