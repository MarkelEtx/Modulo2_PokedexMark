
# POKEDEXMARK

Pokédex interactiva para explorar, descubrir y poner a prueba tus conocimientos sobre el universo Pokémon.

## Descripción

POKEDEXMARK es una aplicación web que permite explorar las diferentes generaciones Pokémon, consultar información detallada de cada criatura y jugar a descubrir Pokémon mediante sus siluetas.

Los datos se obtienen a través de PokeAPI y el progreso del juego se almacena en el navegador.

## Características principales

- Exploración de Pokémon por generaciones.
- Fichas individuales con información detallada.
- Consulta de tipos, estadísticas y habilidades.
- Visualización de cadenas evolutivas.
- Juego de adivinanzas mediante siluetas.
- Contador de Pokémon descubiertos.
- Guardado automático del progreso.
- Partidas independientes para cada generación.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6)
- PokeAPI
- LocalStorage

## Estructura del proyecto

```text
POKEDEXMARK/
│
├── index.html
├── css/
│   ├── style.css
│   ├── game.css
│   └── pokemon.css
|   └── pokemonInfo.css    	
│
├── js/
│   ├── main.js
│   ├── pokemonCard.js
│   ├── game.js
│   └── pokemon.js
│
├── html
│   ├── game.html
│   ├── pokemon.html
└── README.md
```

## Instalación y ejecución

### Requisitos

- Visual Studio Code.
- Extensión Live Server.
- Navegador web.

### Pasos para ejecutar el proyecto

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Instalar la extensión Live Server si todavía no está instalada.
4. Abrir el archivo `index.html`.
5. Hacer clic derecho y seleccionar **Open with Live Server**.
6. El proyecto se abrirá automáticamente en el navegador.

**Importante:** Se debe utilizar Live Server para ejecutar correctamente el proyecto, ya que utiliza módulos de JavaScript.

## API utilizada

El proyecto utiliza [PokeAPI](https://pokeapi.co/), una API REST pública que proporciona información sobre el universo Pokémon.

Permite obtener datos como:

- Generaciones.
- Información individual de cada Pokémon.
- Tipos y estadísticas.
- Habilidades.
- Cadenas evolutivas.

## Mejoras futuras

- Ampliar la información individual de los Pokémon, incluyendo sus métodos de evolución y zonas donde aparecen.
- Incorporar un temporizador de 10 minutos para completar el juego.
- Añadir un indicador de carga (*loader*) durante las peticiones a la API.

## Autor

Desarrollado por ME.

## Licencia

Proyecto desarrollado con fines educativos y de aprendizaje.