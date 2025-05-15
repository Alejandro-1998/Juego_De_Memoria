/* Alejandro Caballero Luque */
/* José Ramón Rejano Ruge */

const historial = JSON.parse(localStorage.getItem('historial')) || [];
const lista = document.getElementById('lista');

if (lista && historial.length > 0) {
  historial.forEach(partida => {
    const li = document.createElement('li');
    const partes = [];

    if (partida.nivel) partes.push(`Nivel: ${partida.nivel}`);
    if (partida.modo) partes.push(`Modo: ${partida.modo}`);
    if (partida.ganador !== undefined)
        partes.push(`Ganador: ${partida.ganador}`);
    if (partida.tiempo !== undefined)
        partes.push(`Tiempo: ${partida.tiempo}`);
    if (partida.fechaHora) partes.push(`Fecha: ${partida.fechaHora}`);

    li.textContent = partes.join('  --  ||  --  ');
    lista.appendChild(li);
  });
} else if (lista) {
  const li = document.createElement('li');
  li.textContent = 'No hay partidas guardadas.';
  lista.appendChild(li);
}
