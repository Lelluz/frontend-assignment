import { useState } from 'react';
import { Input } from 'antd';
import { useLazyQuery , gql } from "@apollo/client";
/* import { GET_POKEMONS_BY_NAME } from '../queries.js' */
import PokemonList from './PokemonList.js';

function PokemonSearch() {

  const GET_POKEMONS_BY_NAME = `
  query getPokemonsByName($q: String!) {
    pokemons(q: $q) {
      edges {
        node {
          name,
          types
        }
       }
    }
  }
  `;

  const [pokemons, setPokemons] = useState([]);
  const { Search } = Input;
  const [getPokemons, { loading, data }] = useLazyQuery(gql(GET_POKEMONS_BY_NAME));

  if (loading) return <p>Loading ...</p>;

  if (data && data.pokemons) {
    setPokemons(data.pokemons.edges.map(n => n.node));
  }
  
  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={(name) => getPokemons({ variables: { q: name }})}
      />
      <PokemonList pokemons={pokemons}/>
    </>
  );
}

export default PokemonSearch;