import { useState } from 'react';
import { Row, Col, Input, Select } from 'antd';
import { gql } from "@apollo/client";
import { GET_POKEMONS_BY_NAME, GET_POKEMONS_BY_TYPE } from '../queries'
import { IPokemon, PokemonTypesAndColors} from '../dataStructure';
import PokemonList from './PokemonList';
import useImperativeQuery from './useImperativeQuery';

function PokemonSearch(any: any) {

  const [pokemons, setPokemons] = useState<IPokemon[]>([]),
    { Option } = Select,
    { Search } = Input,
    getPokemonsByName = useImperativeQuery(gql(GET_POKEMONS_BY_NAME)),
    getPokemonsByType = useImperativeQuery(gql(GET_POKEMONS_BY_TYPE));

  const handleSearchByName = async (name: string) => {
    const { data, error } = await getPokemonsByName({ q: name });
    if (error) console.log(error);
    if (data) {
      setPokemons(data.pokemons.edges.map((n: any) => n.node));
    }
  }

  const handleSearchByType = async (type: string) => {
    const { data, error } = await getPokemonsByType({ type: type });
    if (error) console.log(error);
    if (data) {
      setPokemons(data.pokemonsByType.edges.map((n: any) => n.node));
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
            {Object.keys(PokemonTypesAndColors).map(type =>
              <Option value={type}>{type}</Option>
            )}
          </Select>
        </Col>
      </Row>
      <PokemonList pokemons={pokemons}/>
    </>
  );
}

export default PokemonSearch;