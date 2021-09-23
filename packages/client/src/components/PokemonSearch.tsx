import { useState } from 'react';
import { Row, Col, Input, Select, Button } from 'antd';
import { gql } from "@apollo/client";
import { GET_POKEMONS_BY_NAME, GET_POKEMONS_BY_TYPE } from '../queries'
import { IPokemon, PokemonTypesAndColors, ILastSearch} from '../dataStructure';
import PokemonList from './PokemonList';
import useImperativeQuery from './useImperativeQuery';

function PokemonSearch(any: any) {

  const [lastSearch, setLastSearch] = useState<ILastSearch>({
      nameValue: '',
      typeValue: '',
      hasNextPage: false,
      endCursor: '',
      loadMoreClicked: false
    }),
    [pokemons, setPokemons] = useState<IPokemon[]>([]),
    [searchValue, setSearchValue] = useState(''),
    { Option } = Select,
    { Search } = Input,
    getPokemonsByName = useImperativeQuery(gql(GET_POKEMONS_BY_NAME)),
    getPokemonsByType = useImperativeQuery(gql(GET_POKEMONS_BY_TYPE));

  const handleLoadMoreSearch = () => {
    lastSearch.typeValue !== ''
    ? handleSearchByType(lastSearch.typeValue, true)
    : handleSearchByName(lastSearch.nameValue, true);
  }

  const handleSearchByName = async (name: string, loadMoreClicked: boolean = false) => {
    const qParams = {
      q: loadMoreClicked ? lastSearch.nameValue : name,
      after: loadMoreClicked ? lastSearch.endCursor : "0"
    },
    { data, error } = await getPokemonsByName(qParams);

    if (error) console.log(error);
    if (data) {

      const pokemonsResult = data.pokemons.edges.map((n: any) => n.node),
        newPokemonsState = loadMoreClicked ? [...pokemons, ...pokemonsResult] : pokemonsResult;

      setPokemons(newPokemonsState);
      setLastSearch({
        nameValue: name,
        typeValue: '',
        hasNextPage: data.pokemons.pageInfo.hasNextPage,
        endCursor: data.pokemons.pageInfo.endCursor,
        loadMoreClicked: loadMoreClicked
      })
    }
    setSearchValue('')
  }

  const handleSearchByType = async (type: string, loadMoreClicked: boolean = false) => {
    const qParams = {
      type: loadMoreClicked ? lastSearch.typeValue : type,
      after: loadMoreClicked ? lastSearch.endCursor : "0"
    },
    { data, error } = await getPokemonsByType(qParams);

    if (error) console.log(error);
    if (data) {

      const pokemonsResult = data.pokemonsByType.edges.map((n: any) => n.node),
        newPokemonsState = loadMoreClicked ? [...pokemons, ...pokemonsResult] : pokemonsResult;

      setPokemons(newPokemonsState);
      setLastSearch({
        nameValue: '',
        typeValue: type,
        hasNextPage: data.pokemonsByType.pageInfo.hasNextPage,
        endCursor: data.pokemonsByType.pageInfo.endCursor,
        loadMoreClicked: loadMoreClicked
      })
    }
  }

  return (
    <>
      <Row justify='space-between' gutter={[0, 15]}>
        <Col xs={24} sm={11} lg={10}>
          <Search
            placeholder="Search Pokémons"
            allowClear
            enterButton="Search"
            size="large"
            value={searchValue}
            onSearch={value => handleSearchByName(value)}
            onChange={e => setSearchValue(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={11} lg={10}>
          <Select
            size="large"
            style={{ width: '100%' }}
            placeholder="Select a Pokémon type"
            optionFilterProp="children"
            defaultValue="Filter by type"
            onChange={type => handleSearchByType(type, false)}
          >
            {Object.keys(PokemonTypesAndColors).map(type =>
              <Option value={type} key={type}>{type}</Option>
            )}
          </Select>
        </Col>
      </Row>
      <PokemonList pokemons={pokemons}/>
      <Row justify='center'>
        {(lastSearch.hasNextPage) && (
          <Button type="primary" onClick={() => handleLoadMoreSearch()}>Load more</Button>
        )}
      </Row>
    </>
  );
}

export default PokemonSearch;