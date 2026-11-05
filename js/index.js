import { getGenerations, getGenerationInfo } from "./main.js";
import { getPokemonCard } from "./pokemonCard.js";
const coloresGeneraciones = ["#D98282", "#C9B46A", "#79BDA1", "#7FA5DB", "#9292AA", "#D18BB2", "#DDAE70", "#829FCB", "#AD8BCB"];
const coloresBordes = ["#B96767", "#A9934D", "#5C9D81", "#6388BE", "#74748D", "#B76F97", "#BF9055", "#6683AF", "#916FB0"];

let paginaActual = 0;
const pokemonsPorPagina = 20;
const contenedor = document.querySelector("#container");
const lista = document.querySelector("#listaPokemon");
const pokemons = document.querySelector(".pokemons");

const atrasButton = document.querySelector("#atrasButton");
const adelanteButton = document.querySelector("#adelantebutton");
const pagina = document.querySelector(".pagina");
const total = document.querySelector(".total");
pokemons.style.display = "none";
let listaPokemonActual = [];

async function creacionGeneraciones() {
    try {
        const generacionesInfo = await getGenerations();
        const generacionesLista = generacionesInfo.results;
        generacionesLista.forEach((generacion, index) => {
            const grupo = document.createElement("div");
            grupo.classList.add("grupo-generacion");
            const cuadro = document.createElement("button");
            cuadro.type = "button";
            cuadro.classList.add(`generacion`, `gen-${index + 1}`);
            cuadro.textContent = generacion.name.toUpperCase();
            cuadro.style.backgroundColor = coloresGeneraciones[index];
            cuadro.style.borderColor = coloresBordes[index];
            cuadro.addEventListener("click", async () => {
                const infoPokemon = await getGenerationInfo(generacion.url);
                listaPokemonActual = infoPokemon.pokemon_species;
                paginaActual = 0;
                crearListaPokemon(infoPokemon.pokemon_species)
                pokemons.style.display = "block";
            })
            const jugar = document.createElement("button");
            jugar.type = "button";
            jugar.classList.add(`boton-juego`);
            jugar.textContent = `Jugar Gen. ${index + 1}`;
            jugar.style.backgroundColor = coloresGeneraciones[index];
            jugar.style.borderColor = coloresBordes[index];
            jugar.addEventListener("click", () => {

                localStorage.setItem("generationGame", generacion.url);
                window.location.href = "/html/game.html";
            })
            grupo.append(cuadro, jugar);
            contenedor.append(grupo);

        });

    } catch (error) {
        console.error(error);

    }

}
function crearListaPokemon(listaPokemon) {

    lista.replaceChildren();

    const inicio = paginaActual * pokemonsPorPagina;
    const final = inicio + pokemonsPorPagina;
    const pokemonPagina = listaPokemon.slice(inicio, final);

    const totalPaginas = Math.ceil(listaPokemon.length / pokemonsPorPagina);
    pagina.textContent = paginaActual + 1;
    total.textContent = totalPaginas;

    pokemonPagina.forEach(pokemon => {
        lista.append(getPokemonCard(pokemon));
    });
    atrasButton.disabled = paginaActual === 0;
    adelanteButton.disabled = final >= listaPokemon.length;

}

atrasButton.addEventListener("click", () => {
    if (paginaActual > 0) {
        paginaActual--;
        crearListaPokemon(listaPokemonActual);
    }
});

adelanteButton.addEventListener("click", () => {
    if ((paginaActual + 1) * pokemonsPorPagina < listaPokemonActual.length) {
        paginaActual++;
        crearListaPokemon(listaPokemonActual);
    }
});

creacionGeneraciones();