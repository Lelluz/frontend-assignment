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

  const handleSearchByName = async (name: string, loadMoreClicked: boolean = false) => {

    const qParams = {
      q: loadMoreClicked ? lastSearch.nameValue : name,
      after: loadMoreClicked ? lastSearch.endCursor : "0"
    },
    { data, error } = await getPokemonsByName(qParams);

    if (error) console.log(error);
    if (data) {
      setPokemons(data.pokemons.edges.map((n: any) => n.node));
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
            placeholder="Search Pokémons"
            allowClear
            enterButton="Search"
            size="large"
            value={searchValue}
            onSearch={value => handleSearchByName(value)}
            onChange={e => setSearchValue(e.target.value)}
          />
        </Col>
        <Col span={10}>
          <Select
            size="large"
            style={{ width: '100%' }}
            placeholder="Select a Pokémon type"
            optionFilterProp="children"
            defaultValue="Filter by type"
            onChange={handleSearchByType}
          >
            {Object.keys(PokemonTypesAndColors).map(type =>
              <Option value={type}>{type}</Option>
            )}
          </Select>
        </Col>
      </Row>
      <PokemonList pokemons={pokemons}/>
      {(lastSearch.hasNextPage) && (
        <Button
          type="primary"
          size="large"
          onClick={() => handleSearchByName(lastSearch.nameValue, true)}
        >
          Load more
        </Button>
      )}
    </>
  );
}

export default PokemonSearch;