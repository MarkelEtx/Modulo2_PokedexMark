

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