/* Alejandro Caballero Luque */
/* José Ramón Rejano Ruge */

// Definimos las cartas
const cartas = [
    { nombre: 'Carta 1', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
    { nombre: 'Carta 2', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/TituloMedac.png' },
    { nombre: 'Carta 3', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
    { nombre: 'Carta 4', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/TituloMedac.png' },
    { nombre: 'Carta 5', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
    { nombre: 'Carta 6', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
    { nombre: 'Carta 7', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
    { nombre: 'Carta 8', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
    { nombre: 'Carta 9', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
    { nombre: 'Carta 10', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
    { nombre: 'Carta 11', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
    { nombre: 'Carta 12', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
    { nombre: 'Carta 13', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
    { nombre: 'Carta 14', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/InstitutoVMedac.png' },
    { nombre: 'Carta 15', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
    { nombre: 'Carta 16', imagenDetras: './images/parteAtras/cartasMedac.png', imagenDelante: './images/parteAlante/LogoMedac.png' },
];

let primeraCarta = null;
let segundaCarta = null;

// Barajar las cartas (Método Fisher-Yates)
function barajarCartas(cartas) {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    return cartas;
}

// Generar el tablero de juego
function generarTablero(cartas) {
    
    barajarCartas(cartas);

    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Limpiar el tablero antes de generar nuevas cartas

    cartas.forEach((carta, index) => {
        const cartaDiv = document.createElement('div');
        cartaDiv.classList.add('carta');
        cartaDiv.setAttribute('data-index', index);
        cartaDiv.innerHTML = `<button><img src="${carta.imagenDetras}" alt="${carta.nombre}"></button>`;
        gameBoard.appendChild(cartaDiv);
    });

    // Llama a la función para habilitar el evento de clic en las cartas
    darVueltaCarta();
}