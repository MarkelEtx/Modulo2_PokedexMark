

export async function getGenerations() {
    const API_URL = "https://pokeapi.co/api/v2/generation";

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Error al obtener las generaciones');
    }
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No hay datos")
    }

    return data;

}

/**
 * devuelve la info de la generacion
 * @param {string} url url geracion que quieres ver
 * @returns info de la generacion que queremos ver.
 */
export async function getGenerationInfo(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Error al obtener las generacion');
    }
    const data = await response.json();

    if (!data || data.length === 0) {
        throw new Error("No hay datos")
    }
    return data;

}

export async function getPokemonInfo(id) {
    try {
        // Consultar los dos endpoints en paralelo
        const [speciesResponse, pokemonResponse] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`),
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        ]);

        if (!speciesResponse.ok || !pokemonResponse.ok) {
            throw new Error('Error al obtener la información del Pokémon');
        }

        const [speciesData, pokemonData] = await Promise.all([
            speciesResponse.json(),
            pokemonResponse.json()
        ]);
        const pokemonInfo = {
            id: speciesData.id,
            name: speciesData.name,
            names: speciesData.names,
            genera: speciesData.genera,
            flavorText: speciesData.flavor_text_entries,
            habitat: speciesData.habitat,
            color: speciesData.color,
            evolutionChain: speciesData.evolution_chain.url,

            // Datos de pokemon
            types: pokemonData.types.map(type => type.type.name),
            abilities: pokemonData.abilities,
            stats: pokemonData.stats,
            sprites: pokemonData.sprites,
            url: pokemonData.species.url
        }
        // Combinar los datos de ambos endpoints
        return pokemonInfo;

    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }

}

export async function getPokemonEvolutions(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Error al obtener las generacion');
    }
    const data = await response.json();

    if (!data || data.length === 0) {
        throw new Error("No hay datos")
    }

    return data;

}

export async function obtenerHabilidad(url) {
    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se ha encontrado la habilidad");
        }

        const habilidad = await respuesta.json();

        const nombreEsp = habilidad.names.find(
            item => item.language.name === "es"
        );

        const descripcionEsp = habilidad.flavor_text_entries.find(
            item => item.language.name === "es"
        );

        return {
            nombre: nombreEsp?.name || habilidad.name,
            descripcion: descripcionEsp?.flavor_text || "Sin descripción disponible"
        };

    } catch (error) {
        console.error("Error al obtener la habilidad:", error);
        return null
    }
}

export async function obtenerEvoluciones(url) {
    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se ha podido obtener la cadena evolutiva");
        }

        const datos = await respuesta.json();

        let pendientes = [datos.chain];
        let evoluciones = [];


        while (pendientes.length > 0) {
            let actual = pendientes.shift();

            evoluciones.push({
                nombre: actual.species.name,
                url: actual.species.url
            });

            actual.evolves_to.forEach(evolucion => {
                pendientes.push(evolucion);
            });
        }

        return evoluciones;

    } catch (error) {
        console.error(error);
        return [];
    }
}