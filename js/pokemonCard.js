
export function getPokemonCard(pokemon, name = true) {

    const contenedor = document.createElement("div");
    const idText = document.createElement("p");
    const imagenPoke = document.createElement("img");
    const id = pokemon.url.split("/").filter(Boolean).pop();
    let nombre;
    contenedor.classList.add("pokemon-card");
    imagenPoke.classList.add("pokemon-image");

    idText.textContent = `#${id}`;
    if (name) {
        nombre = document.createElement("p");
        nombre.textContent = pokemon.name;
        nombre.classList.add("pokemon-name");
    }

    imagenPoke.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    imagenPoke.alt = pokemon.name;
    if (name) {
        contenedor.addEventListener("click", async () => {
            localStorage.setItem("pokemonInfo", id);
            window.location.href = "/html/pokemon.html";
    
        })
    }

    contenedor.append(idText, imagenPoke);
    if (name) {
        contenedor.append(nombre);
    }
    return contenedor;

}