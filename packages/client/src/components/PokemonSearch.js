import { useState } from 'react';
import { Input } from 'antd';
import { gql } from "@apollo/client";
import { GET_POKEMONS_BY_NAME } from '../queries.js'
import PokemonList from './PokemonList.js';
import useImperativeQuery from './useImperativeQuery.js';

function PokemonSearch() {

  const [pokemons, setPokemons] = useState([]),
    { Search } = Input,
    getPokemons = useImperativeQuery(gql(GET_POKEMONS_BY_NAME));

  const handleSearch = async name => {
    const { data, error } = await getPokemons({ q: name });
    if (error) console.log(error);
    if (data) {
      setPokemons(data.pokemons.edges.map(n => n.node));
    }
  }

  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />
      <PokemonList pokemons={pokemons}/>
    </>
  );
}

export default PokemonSearch;