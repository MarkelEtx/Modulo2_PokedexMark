import { getGenerationInfo, getPokemonInfo } from "./main.js";
import { getPokemonCard } from "./pokemonCard.js";

const pokemonList = await getGenerationInfo(localStorage.getItem("generationGame"));


const discoveredPokemon = new Set();



async function createGrid() {
    const grid = document.getElementById("pokemon-grid");

    const tarjetas = await Promise.all(
        pokemonList.pokemon_species.map(async (pokemon) => {
            const pokemonInfo = await getPokemonInfo(
                pokemon.url.split("/").filter(Boolean).pop()
            );
            const card = getPokemonCard(pokemonInfo, false);
            console.log(pokemon.name);
            
            card.dataset.name = pokemon.name;
            return card;
        })
    );

    grid.append(...tarjetas);
}

function checkPokemon() {
    const input = document.getElementById("pokemon-input");
    const name = input.value.trim().toLowerCase();
    const pokemon = pokemonList.pokemon_species.find(
        pokemon => pokemon.name === name
    );

    if (pokemon) {
        if (!discoveredPokemon.has(name)) {
            discoveredPokemon.add(name);
            revealPokemon(name);
            document.getElementById("discovered-count").textContent = discoveredPokemon.size;
        }
    } else {
        alert("Pokémon incorrecto");
    }
    input.value = "";
}

function revealPokemon(name) {

    const card = document.querySelector(
        `[data-name="${name}"]`
    );

    if (card) {

        const image = card.querySelector("img");

        image.classList.add("discovered");
        card.classList.add("discovered");

    }
}

document.getElementById("check-button").addEventListener("click", checkPokemon);
const input = document.getElementById("pokemon-input");
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkPokemon();
    }
});
document.getElementById("pokemon-count").textContent = pokemonList.pokemon_species.length;
createGrid();