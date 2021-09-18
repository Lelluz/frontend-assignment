import { useState } from 'react';
import { Row, Col, Input, Select } from 'antd';
import { gql } from "@apollo/client";
import { GET_POKEMONS_BY_NAME, GET_POKEMONS_BY_TYPE } from '../queries.js'
import { POKEMON_TYPES } from '../pokemonsTypes';
import PokemonList from './PokemonList.js';
import useImperativeQuery from './useImperativeQuery.js';

function PokemonSearch() {

  const [pokemons, setPokemons] = useState([]),
    { Option } = Select,
    { Search } = Input,
    getPokemonsByName = useImperativeQuery(gql(GET_POKEMONS_BY_NAME)),
    getPokemonsByType = useImperativeQuery(gql(GET_POKEMONS_BY_TYPE));

  const handleSearchByName = async name => {
    const { data, error } = await getPokemonsByName({ q: name });
    if (error) console.log(error);
    if (data) {
      setPokemons(data.pokemons.edges.map(n => n.node));
    }
  }

  const handleSearchByType = async type => {
    const { data, error } = await getPokemonsByType({ type: type });
    if (error) console.log(error);
    if (data) {
      setPokemons(data.pokemonsByType.edges.map(n => n.node));
    }
  }

  return (
    <>
      <Row justify='space-between'>
        <Col span={10}>
          <Search
            placeholder="Search Pokemons"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={handleSearchByName}
          />
        </Col>
        <Col span={10}>
          <Select
            size="large"
            style={{ width: '100%' }}
            placeholder="Select a Pokemon type"
            optionFilterProp="children"
            onChange={handleSearchByType}
          >
            {POKEMON_TYPES.map(type =>
              <Option value={type.name}>{type.name}</Option>
            )}
          </Select>
        </Col>
      </Row>
      <PokemonList pokemons={pokemons}/>
    </>
  );
}

export default PokemonSearch;