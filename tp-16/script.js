const pokemonGrid = document.getElementById('pokemon-grid');
const loadingSpinner = document.getElementById('loading-spinner');
const loadMoreBtn = document.getElementById('load-more-btn');
let offset = 0;
const limit = 20;

// Función para obtener los Pokémon de la API
const fetchPokemons = async (offset, limit) => {
    loadingSpinner.classList.remove('d-none');
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const promises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
        const pokemons = await Promise.all(promises);
        renderPokemons(pokemons);
    } catch (error) {
        console.error('Error al obtener los Pokémon:', error);
    } finally {
        loadingSpinner.classList.add('d-none');
    }
};

// Función para renderizar las tarjetas de Pokémon
const renderPokemons = (pokemons) => {
    pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${pokemon.sprites.front_default}" class="card-img-top mx-auto mt-2" alt="${pokemon.name}">
                <div class="card-body text-center">
                    <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                    <p class="card-text">${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                    <button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#pokemonModal" data-pokemon-url="${pokemon.url}">
                        Ver detalles
                    </button>
                </div>
            </div>
        `;
        pokemonGrid.appendChild(card);
    });
};

// Event listener para el botón de cargar más
loadMoreBtn.addEventListener('click', () => {
    offset += limit;
    fetchPokemons(offset, limit);
});

// Llama a la función al cargar la página para obtener los primeros 151
window.addEventListener('load', () => {
    // Para cumplir con el objetivo, la primera carga debe ser de 151
    fetchPokemons(0, 151);
    // Luego, el botón de "ver más" puede cargar de 20 en 20
    loadMoreBtn.onclick = () => {
        offset += limit;
        fetchPokemons(offset, limit);
    };
});

// Lógica para llenar el modal
// Usa el evento 'shown.bs.modal' de Bootstrap para obtener la URL del Pokémon del botón y hacer la llamada a la API
document.getElementById('pokemonModal').addEventListener('show.bs.modal', async (event) => {
    const button = event.relatedTarget;
    const pokemonUrl = button.getAttribute('data-pokemon-url');
    const modalContent = document.querySelector('#pokemonModal .modal-content');

    // Mostrar un spinner en el modal mientras carga
    modalContent.innerHTML = `<div class="p-5 text-center"><div class="spinner-border" role="status"></div></div>`;

    try {
        const response = await fetch(pokemonUrl);
        const pokemon = await response.json();
        
        // Llenar el contenido del modal
        const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
        const moves = pokemon.moves.slice(0, 4).map(m => m.move.name).join(', ');

        modalContent.innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title text-capitalize">${pokemon.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="img-fluid mb-3">
                <p><strong>Tipos:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
                <p><strong>Habilidades:</strong> ${abilities}</p>
                <p><strong>Movimientos:</strong> ${moves}</p>
            </div>
        `;
    } catch (error) {
        modalContent.innerHTML = `<div class="p-5 text-center text-danger">Error al cargar los datos.</div>`;
        console.error('Error al cargar los datos del Pokémon:', error);
    }
});
