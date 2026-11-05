import { getPokemonInfo, getPokemonEvolutions, obtenerHabilidad, obtenerEvoluciones } from "./main.js";
import { getPokemonCard } from "./pokemonCard.js";

const pokemon = await getPokemonInfo(localStorage.getItem("pokemonInfo"));
const pokemonEvos = await getPokemonEvolutions(pokemon.evolutionChain);


async function mostrarInfoPoke() {
    
    document.getElementById("nombre-pokemon").textContent = pokemon.name;

    const container = document.querySelector("#container");

    // Contenedor de la imagen y los tipos
    const imagenContainer = document.createElement("div");
    imagenContainer.classList.add("imagen-container");

    const imagen = document.createElement("img");
    imagen.src = pokemon.sprites.other["official-artwork"].front_default;
    imagen.alt = pokemon.name;

    // Contenedor de los tipos
    const tiposContainer = document.createElement("div");
    tiposContainer.classList.add("tipos-container");

    pokemon.types.forEach(tipo => {
        const tipoTexto = document.createElement("span");
        tipoTexto.textContent = tipo;
        tipoTexto.classList.add("tipo", `tipo-${tipo}`);

        tiposContainer.append(tipoTexto);
    });

    imagenContainer.append(imagen, tiposContainer);

    // Contenedor de estadísticas vacío
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("stats-container");

    const info1Div = document.createElement("div");
    info1Div.classList.add("info-up-div");

    const habilidadesDiv = document.createElement("div");
    habilidadesDiv.classList.add("habilities-div");

    const statsDiv = document.createElement("div");
    statsDiv.classList.add("stats");

    pokemon.stats.forEach(stat => {
        const label = document.createElement("label");
        label.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        label.classList.add("stat-label");

        const meter = document.createElement("meter");
        meter.min = 0;
        meter.max = 255;
        meter.low = 50;
        meter.high = 150;
        meter.optimum = 200;
        meter.value = stat.base_stat;

        meter.classList.add("stat-meter");

        statsDiv.appendChild(label);
        statsDiv.appendChild(meter);
    });

    for (const ability of pokemon.abilities) {

        // Crear contenedor de la habilidad
        const habilidadDiv = document.createElement("div");
        habilidadDiv.classList.add("habilidadDiv");

        // Obtener información en español
        const habilidadesES = await obtenerHabilidad(ability.ability.url);

        // Crear nombre
        const habilidadNombre = document.createElement("p");
        habilidadNombre.textContent = habilidadesES.nombre;
        habilidadNombre.classList.add("habilidad-nombre");

        // Crear descripción
        const habilidadDescripcion = document.createElement("p");
        habilidadDescripcion.textContent = habilidadesES.descripcion;
        habilidadDescripcion.classList.add("habilidad-descripcion");

        // Añadir elementos al contenedor
        habilidadDiv.append(habilidadNombre, habilidadDescripcion);
        // Añadir al contenedor principal
        habilidadesDiv.appendChild(habilidadDiv);
    }


    const evolucionesDiv = document.createElement("div");
    evolucionesDiv.classList.add("evoluciones");
    evolucionesDiv.append(await mostrarEvoluciones())

    info1Div.append(statsDiv, habilidadesDiv);
    infoContainer.append(info1Div, evolucionesDiv)
    container.append(imagenContainer, infoContainer);

}
async function mostrarEvoluciones() {
    const evoluciones = await obtenerEvoluciones(pokemon.evolutionChain);

    // Contenedor principal
    const contenedor = document.createElement("div");
    contenedor.classList.add("evoluciones-container");

    // Obtener todos los Pokémon en paralelo
    const tarjetas = await Promise.all(
        evoluciones.map(async evolucion => {
            const id = evolucion.url.split("/").filter(Boolean).pop();
            const pokemonInfo = await getPokemonInfo(id);
            return getPokemonCard(pokemonInfo);
        })

    );

    // Añadir todas las tarjetas al contenedor
    tarjetas.forEach((tarjeta, index) => {
        contenedor.appendChild(tarjeta);
        if (index < tarjetas.length - 1) {
            const flecha = document.createElement("span");
            flecha.textContent = ">";
            flecha.classList.add("flecha-evolucion");

            contenedor.appendChild(flecha);
        }
    });

    return contenedor;
}

mostrarInfoPoke();