export const GET_POKEMONS_BY_NAME = `
query getPokemonsByName($q: String!, $after: ID) {
  pokemons(q: $q, after: $after) {
    edges {
      node {
        name,
        types,
        classification
      }
    },
    pageInfo {
      endCursor,
      hasNextPage
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