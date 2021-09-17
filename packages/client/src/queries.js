export const GET_POKEMONS_BY_NAME = `
query getPokemonsByName($q: String!) {
  pokemons(q: $q) {
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