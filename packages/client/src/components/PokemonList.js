import React from 'react';
import { Table, Tag } from 'antd';

const getColorTag = type => {
  switch (type) {
    case "bug": return "lime";
    case "dark": return "gray";
    case "dragon": return "purple";
    case "electric": return "yellow";
    case "fairy": return "magenta";
    case "fighting": return "orange";
    case "fire": return "red";
    case "flying": return "geekblue";
    case "ghost": return "purple";
    case "grass": return "green";
    case "ground": return "gold";
    case "ice": return "cyan";
    case "normal": return "gray";
    case "poison": return "purple";
    case "psychic": return "magenta";
    case "rock": return "yellow";
    case "steel": return "gray";
    case "water": return "blue";
    default: return "gray";
  }
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
          const color = getColorTag(type.toLowerCase());
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