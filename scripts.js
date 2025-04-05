let currentPage = 1;
const itemsPerPage = 30; // Número de elementos por página
const gameItems = document.querySelectorAll('.game-item');
const totalPages = Math.ceil(gameItems.length / itemsPerPage);

function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    gameItems.forEach((item, index) => {
        if (index >= start && index < end) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // Actualizar el estado de los botones de paginación
    document.getElementById('prevPage').disabled = page === 1;
    document.getElementById('nextPage').disabled = page === totalPages;

    // Actualizar la información de la página actual
    document.getElementById('pageInfo').textContent = `Página ${page} de ${totalPages}`;
}

function changePage(direction) {
    currentPage += direction;
    showPage(currentPage);
}

function openModal(title, links) {
    const modalTitle = document.getElementById('modalTitle');
    const modalLinks = document.getElementById('modalLinks');

    modalTitle.innerText = title;
    modalLinks.innerHTML = ''; // Limpiar los enlaces anteriores
    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.textContent = link.name;
        modalLinks.appendChild(a);
    });

    document.getElementById('myModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function filterGames() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    gameItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // Recalcular las páginas después de filtrar
    const visibleItems = Array.from(gameItems).filter(item => item.style.display === 'block');
    const newTotalPages = Math.ceil(visibleItems.length / itemsPerPage);
    totalPages = newTotalPages;
    showPage(currentPage); // Volver a mostrar la página actual
}

// Inicializar la página cuando se carga
document.addEventListener('DOMContentLoaded', () => {
    showPage(currentPage);
});


// Cerrar el modal si se hace clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
}



//CHAT AYUDANTE

const botBubble = document.getElementById('botBubble');
const chatWindow = document.getElementById('chatWindow');
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Abrir o cerrar chat al tocar la burbuja
botBubble.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
});

// Enviar mensaje
sendBtn.addEventListener('click', enviarMensaje);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') enviarMensaje();
});

function enviarMensaje() {
    const mensaje = userInput.value.trim();
    if (mensaje === "") return;

    agregarMensaje("user", mensaje);
    responderBot(mensaje);
    userInput.value = "";
}

function agregarMensaje(remitente, texto) {
    const msg = document.createElement("div");
    msg.className = remitente;
    if (remitente === "bot") {
        msg.innerHTML = texto; // Permite HTML como <a>
    } else {
        msg.innerText = texto;
    }
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function responderBot(pregunta) {
    const preguntaLimpia = pregunta.toLowerCase();

    const respuestas = [
        { palabras: ["contraseña", "contraseñas"], respuesta: 'Puedes visitar nuestra <a id="respuestas" href="contraseñas.html" target="_blank">contraseñas</a>.' },
        { palabras: ["ayuda", "contacto","emergencia","pedir","juego","roto"], respuesta: 'si necesita ayuda o pedir algo visite esta pagina <a href="contacto.html" target="_blank">contacto</a>.' },
        
        { palabras: ["hello","hola","buenas","que tal","todo bien","bien"], respuesta: "Hola, en que puedo ayudarle? 😁" },
        { palabras: ["gracias"], respuesta: "¡De nada! Estoy aquí para ayudarte 🤖" },
        { palabras: ["adiós", "chao"], respuesta: "¡Hasta luego! 👋" },
    ];

    let respuesta = "Hmm... no entendí eso 🤔. ¿Podrías decirlo de otra forma?";
    for (const r of respuestas) {
        for (const palabra of r.palabras) {
            if (preguntaLimpia.includes(palabra)) {
                respuesta = r.respuesta;
                break;
            }
        }
        if (respuesta !== "Hmm... no entendí eso 🤔. ¿Podrías decirlo de otra forma?") break;
    }

    setTimeout(() => {
        agregarMensaje("bot", respuesta);
    }, 600);
}