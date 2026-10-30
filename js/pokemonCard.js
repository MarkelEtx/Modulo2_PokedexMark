export function getPokemonCard(pokemon) {
    const contenedor = document.createElement("div");
    const nombre = document.createElement("p");
    const imagenPoke = document.createElement("img");
    const id = pokemon.url.split("/").filter(Boolean).pop();

    contenedor.classList.add("pokemon-card");
    nombre.classList.add("pokemon-name");
    imagenPoke.classList.add("pokemon-image");

    nombre.textContent = pokemon.name;

    imagenPoke.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    imagenPoke.alt = pokemon.name;

    contenedor.append(imagenPoke,nombre);
    return contenedor;
    
}