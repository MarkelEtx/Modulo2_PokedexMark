import { getGenerationInfo, getPokemonInfo } from "./main.js";
import { getPokemonCard } from "./pokemonCard.js";

const generation = localStorage.getItem("generationGame").split("/").filter(Boolean).pop();

const progressKey = `discoveredPokemon-${generation}`;
const pokemonList = await getGenerationInfo(localStorage.getItem("generationGame"));
const discoveredPokemon = new Set();

async function inicioJuego() {
    loadProgress();

    document.getElementById("pokemon-count").textContent = pokemonList.pokemon_species.length;
    await createGrid();
    restoreProgress();
}

async function createGrid() {
    const grid = document.getElementById("pokemon-grid");

    const tarjetas = await Promise.all(
        pokemonList.pokemon_species.map(async (pokemon) => {
            const pokemonInfo = await getPokemonInfo(
                pokemon.url.split("/").filter(Boolean).pop()
            );
            const card = getPokemonCard(pokemonInfo, false);
            console.log(pokemon.name);

            card.dataset.name = pokemon.name; // pone en cada card (data-name="nombrepokemon")
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
            saveProgress();
            document.getElementById("discovered-count").textContent = discoveredPokemon.size;
        }
    } else {
        alert("Pokémon incorrecto");
    }
    input.value = "";
}

function revealPokemon(name) {// si encuentra el nombre busca la carta y le añade las clases que quita el filtro 

    const card = document.querySelector(
        `[data-name="${name}"]`
    );

    if (card) {

        const image = card.querySelector("img");

        image.classList.add("discovered");
        card.classList.add("discovered");

    }
}

function saveProgress() {
    localStorage.setItem(progressKey, JSON.stringify([...discoveredPokemon]));

}

function loadProgress() {
    const pokemonGuardados = JSON.parse(localStorage.getItem(progressKey) || "[]");
    pokemonGuardados.forEach(name => {
        discoveredPokemon.add(name)
    });
}

function restoreProgress() {
    discoveredPokemon.forEach(name => {
        revealPokemon(name);
    });

    document.getElementById("discovered-count").textContent =
        discoveredPokemon.size;
}

document.getElementById("check-button").addEventListener("click", checkPokemon);
const input = document.getElementById("pokemon-input");
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkPokemon();
    }
});
inicioJuego();