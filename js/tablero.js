/* Alejandro Caballero Luque */
/* José Ramón Rejano Ruge */

// Lista de imágenes (cada color es una imagen)
const imagenes = [
    '../images/carta_davante.png',
    '../images/carta_medac.png',
    'https://via.placeholder.com/80/0000FF',
    'https://via.placeholder.com/80/FFFF00',
    'https://via.placeholder.com/80/FF00FF',
    'https://via.placeholder.com/80/00FFFF',
    'https://via.placeholder.com/80/000000',
    'https://via.placeholder.com/80/FFFFFF'
    ];

// Duplicamos y mezclamos las cartas
const cartas = [...imagenes, ...imagenes];
cartas.sort(() => 0.5 - Math.random());

const juego = document.getElementById('juego');
let primeraCarta = null;
let segundaCarta = null;
let bolquearTablero = false;

// Creamos cada carta dinámicamente
cartas.forEach((src) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.image = src; // Guardamos qué imagen tiene

    const inner = document.createElement('div');
    inner.classList.add('inner');

    const front = document.createElement('div');
    front.classList.add('frontal'); // Parte frontal vacía

    const back = document.createElement('div');
    back.classList.add('trasera'); // Parte trasera con imagen
    const img = document.createElement('img');
    img.src = src;
    back.appendChild(img);

    inner.appendChild(front);
    inner.appendChild(back);
    carta.appendChild(inner);

    // Evento al hacer clic en una carta
    carta.addEventListener('click', () => {
    if (bolquearTablero || carta.classList.contains('voltear')) return;

    carta.classList.add('voltear');
    if (!primeraCarta) {
        primeraCarta = carta; // Guardamos la primera carta
    } else {
        segundaCarta = carta; // Guardamos la segunda carta
        bolquearTablero = true; // Bloqueamos el tablero

        // Si las imágenes coinciden, dejamos ambas volteadas
        if (primeraCarta.dataset.image === segundaCarta.dataset.image) {
            primeraCarta = null;
            segundaCarta = null;
            bolquearTablero = false;
        } else {
        // Si no coinciden, las giramos de vuelta después de 0,7 segundos
        setTimeout(() => {
            primeraCarta.classList.remove('voltear');
            segundaCarta.classList.remove('voltear');
            primeraCarta = null;
            segundaCarta = null;
            bolquearTablero = false;
        }, 700);
        }
    }
    });
    juego.appendChild(carta); // Añadimos la carta al tablero
});