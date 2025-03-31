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