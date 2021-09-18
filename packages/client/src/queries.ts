export const GET_POKEMONS_BY_NAME = `
query getPokemonsByName($q: String!) {
  pokemons(q: $q) {
    edges {
      node {
        name,
        types,
        classification
      }
     }
  }
}`;

export const GET_POKEMONS_BY_TYPE = `
query getPokemonsByType($type: String!) {
  pokemonsByType(type: $type) {
    edges {
    	node {
      	name,
        types,
        classification
    	}
   	}
  }
}`;