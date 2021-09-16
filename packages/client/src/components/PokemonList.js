import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Classification',
    dataIndex: 'classification',
    key: 'classification',
  }
];

function PokemonList(props) {

  const pokemons = props.pokemons

  return (
    <Table columns={columns} dataSource={pokemons} />
  );
}

export default PokemonList;