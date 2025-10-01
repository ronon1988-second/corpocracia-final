
// --- Elementos del DOM ---
const eventoInfoContainer = document.getElementById('evento-info-container');
const nuevoEventoBtn = document.getElementById('nuevo-evento');

// --- Variables Globales ---
let eventos = []; // Esta variable guardará los eventos cargados desde el JSON.

// --- Funciones ---

/**
 * Carga los eventos desde el archivo eventos.json y habilita el botón.
 */
async function cargarEventos() {
    try {
        const response = await fetch('eventos.json');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        eventos = await response.json();
        
        // Habilitamos el botón y restauramos su texto una vez que los datos están listos.
        nuevoEventoBtn.disabled = false;
        nuevoEventoBtn.textContent = 'Nuevo Evento';

    } catch (error) {
        console.error("No se pudieron cargar los eventos:", error);
        eventoInfoContainer.innerHTML = `<div class="carta-evento negativo">Error al cargar los eventos. Revisa el archivo eventos.json.</div>`;
        nuevoEventoBtn.textContent = 'Error de Carga'; // Dejamos el botón deshabilitado
    }
}

/**
 * Muestra un evento aleatorio de la lista ya cargada.
 */
function mostrarEventoAleatorio() {
    if (eventos.length === 0) {
        // Esto solo debería ocurrir si hay un error de carga.
        console.warn("Se intentó mostrar un evento, pero la lista está vacía.");
        return;
    }

    const evento = eventos[Math.floor(Math.random() * eventos.length)];

    eventoInfoContainer.innerHTML = `
        <div class="carta-evento">
            <h2>${evento.nombre}</h2>
            <p class="evento-descripcion">${evento.descripcion}</p>
            <div class="evento-efecto negativo">${evento.negativo}</div>
            <div class="evento-efecto positivo">${evento.positivo}</div>
        </div>
    `;
}

// --- Lógica Principal ---

// 1. Aseguramos que la página empieza limpia.
eventoInfoContainer.innerHTML = ''; 

// 2. Deshabilitamos el botón al inicio mientras se cargan los datos.
nuevoEventoBtn.disabled = true;
nuevoEventoBtn.textContent = 'Cargando...';

// 3. Añadimos el listener al botón.
nuevoEventoBtn.addEventListener('click', mostrarEventoAleatorio);

// 4. Iniciamos la carga de los eventos.
cargarEventos();
