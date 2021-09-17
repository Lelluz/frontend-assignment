import React from 'react';
import { Table, Tag } from 'antd';
import { POKEMON_TYPES } from '../pokemonsTypes';

console.log(POKEMON_TYPES)

const getColorTag = type => {
  const typeObj = POKEMON_TYPES.filter(t => t.name === type)
  if (typeObj) return typeObj[0].color
  return ""
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Type',
    dataIndex: 'types',
    key: 'types',
    render: types => (
      <>
        {types.map(type => {
          const color = getColorTag(type);
          return (
            <Tag color={color} key={type}>
              {type}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Classification',
    dataIndex: 'classification',
    key: 'classification',
  }
];

function PokemonList(props) {
  return (
    <Table columns={columns} dataSource={props.pokemons} />
  );
}

export default PokemonList;