export const GET_POKEMONS_BY_NAME = name => `
{
  pokemons(q: ${name}) {
    edges {
    	node {
      	name,
        types
    	}
   	}
  }
}`;

export const GET_POKEMONS_BY_TYPE = `
{
  pokemonsByType(type: "Fire") {
    edges {
    	node {
      	name,
        types
    	}
   	}
  }
}`;