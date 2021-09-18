import React from 'react';
import { Table, Tag } from 'antd';
import { IPokemons, PokemonTypesAndColors } from '../dataStructure';

const getColorTag = (type: string) => {
  for(const [pType, pColor] of Object.entries(PokemonTypesAndColors)) {
    if (pType === type) return pColor
  }
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
    render: (types: []) => (
      <>
        {types.map((type: string) => {
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

function PokemonList(props: IPokemons) {
  return (
    <Table columns={columns} dataSource={props.pokemons} />
  );
}

export default PokemonList;