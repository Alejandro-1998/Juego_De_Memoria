/* Alejandro Caballero Luque */
/* José Ramón Rejano Ruge */

// Lista de imágenes
const imagenesMedac = [
    '../assets/images/carta_davante.png',
    '../assets/images/carta_medac.png',
    '../assets/images/lenguajes_de_marca.png',
    '../assets/images/aula_virtual.png',
    '../assets/images/calendario.png',
    '../assets/images/temas.png',
    '../assets/images/tareas.png',
    '../assets/images/sistemas_informaticos.png'
];

const imagenesDaw = [
    '../assets/images/oracle.png',
    '../assets/images/sql.png',
    '../assets/images/drive.png',
    '../assets/images/wamp.png',
    '../assets/images/cisco.png',
    '../assets/images/chatgpt.png',
    '../assets/images/docker.png',
    '../assets/images/xampp.png',
    '../assets/images/proyecto.png',
    '../assets/images/visual.png',
    '../assets/images/netbeans.png',
    '../assets/images/java.png',
    '../assets/images/javascript.png',
    '../assets/images/css.png',
    '../assets/images/html.png',
    '../assets/images/github.png',
    '../assets/images/terminal.png',
    '../assets/images/wordpress.png'
];

const imagenesPokemon = [
    '../assets/images/ferromole.png',
    '../assets/images/pickachu.png',
    '../assets/images/raichu.png',
    '../assets/images/charmander.png',
    '../assets/images/pichu.png',
    '../assets/images/rayquaza.png',
    '../assets/images/hitmonlee.png',
    '../assets/images/hoOh.png',
    '../assets/images/lugia.png',
    '../assets/images/arceus.png',
    '../assets/images/articuno.png',
    '../assets/images/flareon.png',
    '../assets/images/unown.png',
    '../assets/images/heatran.png',
    '../assets/images/cobalion.png',
    '../assets/images/sprigatito.png',
    '../assets/images/fuecoco.png',
    '../assets/images/quaxly.png',
    '../assets/images/lechonk.png',
    '../assets/images/charcadet.png',
    '../assets/images/ceruledge.png',
    '../assets/images/grafaiai.png',
    '../assets/images/tinkatink.png',
    '../assets/images/flamigo.png',
    '../assets/images/annihilape.png',
    '../assets/images/kingambit.png',
    '../assets/images/ferropuas.png',
    '../assets/images/gimmighoul.png',
    '../assets/images/ferroverdor.png',
    '../assets/images/flamariete.png',
    '../assets/images/pecharunt.png',
    '../assets/images/ogerpon.png'
];

const coincidirPareja = new Audio('../assets/audio/cartaAcertada.mp3');
const ganarPartida = new Audio('../assets/audio/victoria.mp3');

// Duplicamos y mezclamos las cartas
const pagina = window.location.pathname;
let cartas;

if (pagina.includes('modo_facil.html')) {
    cartas = [...imagenesMedac, ...imagenesMedac];
} else if (pagina.includes('modo_medio.html')) {
    cartas = [...imagenesDaw, ...imagenesDaw];
} else {
    cartas = [...imagenesPokemon, ...imagenesPokemon];
}

cartas.sort(() => 0.5 - Math.random());

const juego = document.getElementById('juego');
let primeraCarta = null;
let segundaCarta = null;
let bolquearTablero = false;

// Iniciar Juego seleccionando un modo de juego
function iniciarJuego(jugadores) {
    modoJuego = jugadores;
    jugadorActual = 1;
    puntajes = [0, 0];
    segundos = 0;

    document.getElementById('seleccionModo').style.display = 'none';
    document.getElementById('juego').style.display = 'grid';
    document.getElementById('infoJuego').style.display = 'block';

    if (modoJuego === 1) {
        document.getElementById('jugador1').style.display = 'none';
        document.getElementById('jugador2').style.display = 'none';
        document.getElementById('jugadores').style.display = 'none';
        document.getElementById('turnoActual').style.display = 'none';
        iniciarTemporizador();
    } else {
        document.getElementById('temporizador').style.display = 'none';
        document.getElementById('temporizador2').style.display = 'none';
        actualizarPuntaje();
        actualizarTurno();
    }
}

// Creamos cada carta dinámicamente
cartas.forEach((src) => {
    const carta = document.createElement('div');

    if (pagina.includes('modo_facil.html')) {
        carta.classList.add('carta_facil');
    } else if (pagina.includes('modo_medio.html')) {
        carta.classList.add('carta_medio');
    } else {
        carta.classList.add('carta_dificil');
    }

    carta.dataset.image = src; // Guardamos qué imagen tiene

    const inner = document.createElement('div');
    inner.classList.add('inner');

    const front = document.createElement('div');
    front.classList.add('frontal'); // Parte frontal vacía

    const back = document.createElement('div');
    back.classList.add('trasera'); // Parte trasera con imagen

    if (pagina.includes('modo_facil.html')) {
        back.classList.add('trasera_facil');
    } else if (pagina.includes('modo_medio.html')) {
        back.classList.add('trasera_medio');
    } else {
        back.classList.add('trasera_dificil');
    }

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
            primeraCarta.classList.add('encontrada');
            segundaCarta.classList.add('encontrada');
            
            primeraCarta = null;
            segundaCarta = null;
            bolquearTablero = false;

            setTimeout(() => {
                coincidirPareja.currentTime = 0;
                coincidirPareja.play();
            }, 350);

            aumentarPuntaje();
            verificarFinJuego();
        } else {
        // Si no coinciden, las giramos de vuelta después de 0,7 segundos
        setTimeout(() => {
            primeraCarta.classList.remove('voltear');
            segundaCarta.classList.remove('voltear');
            primeraCarta = null;
            segundaCarta = null;
            bolquearTablero = false;
            cambiarTurno();
        }, 700);
        }
    }
    });
    juego.appendChild(carta); // Añadimos la carta al tablero
});

// Función temporizador
function iniciarTemporizador() {
        timerInterval = setInterval(() => {
        segundos++;
        document.getElementById('temporizador').textContent = `${segundos} segundos`;
    }, 1000);
}

// Función aumentar puntuación
function aumentarPuntaje() {
    if (modoJuego === 2) {
        puntajes[jugadorActual - 1]++;
        document.getElementById('jugador1').textContent = `Jugador 1: ${puntajes[0]}`;
        document.getElementById('jugador2').textContent = `Jugador 2: ${puntajes[1]}`;
    }
}

// Función cambiar turno de jugador
function cambiarTurno() {
    if (modoJuego === 2) {
        jugadorActual = jugadorActual === 1 ? 2 : 1;
        document.getElementById('turnoActual').textContent = `Jugador ${jugadorActual}`;
    }
}

// Función fin del juego
function verificarFinJuego() {
    const totalEncontradas = document.querySelectorAll('.encontrada').length;
    const totalCartas = document.querySelectorAll('.carta_facil, .carta_medio, .carta_dificil').length;
    const resultado = document.getElementById('resultado');

    if (totalEncontradas === totalCartas) {
        if (modoJuego === 1) {
            clearInterval(timerInterval);
        }

        setTimeout(() => {
            if (modoJuego === 1) {
                ganarPartida.currentTime = 0;
                ganarPartida.play();
                resultado.textContent = `¡Juego terminado! Tiempo total: ${segundos} segundos`;
                document.getElementById('terminarPartida').style.display = 'block';
                document.getElementById('pantalla').style.display = 'block';
            } else {
                let ganador = 1;

                let mensaje = '¡Juego terminado!\n';
                if (puntajes[0] > puntajes[1]) {
                    resultado.textContent = mensaje += 'Ganó el Jugador 1 🎉';
                } else if (puntajes[1] > puntajes[0]) {
                    resultado.textContent = mensaje += 'Ganó el Jugador 2 🎉';
                    ganador = 2;
                } else {
                    resultado.textContent = mensaje += '¡Empate!';
                    ganador = 0;
                }
                document.getElementById('terminarPartida').style.display = 'block';
                document.getElementById('pantalla').style.display = 'block';
            }

            document.getElementById('continuar').addEventListener('click', function () {

                const partida = {
                    ganador: ganador,
                    puntuacion: Math.floor(Math.random() * 100), // ejemplo
                    fecha: new Date().toLocaleString(),
                    hora: now.toLocaleTimeString()
                };

                const historial = JSON.parse(localStorage.getItem('historial')) || [];
                historial.push(partida);
                localStorage.setItem('historial', JSON.stringify(historial));

                location.reload();
            });
        }, 500);
    }
}