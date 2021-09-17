import { useState } from 'react';
import { Row, Col, Input, Select } from 'antd';
import { gql } from "@apollo/client";
import { GET_POKEMONS_BY_NAME } from '../queries.js'
import PokemonList from './PokemonList.js';
import useImperativeQuery from './useImperativeQuery.js';

function PokemonSearch() {

  const [pokemons, setPokemons] = useState([]),
    { Option } = Select,
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
      <Row justify='space-between'>
        <Col span={10}>
          <Search
            placeholder="Search Pokemons"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
          />
        </Col>
        <Col span={10}>
          <Select
            showSearch
            size="large"
            style={{ width: '100%' }}
            placeholder="Select a person"
            optionFilterProp="children"
            /* onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            } */
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Col>
      </Row>
      <PokemonList pokemons={pokemons}/>
    </>
  );
}

export default PokemonSearch;