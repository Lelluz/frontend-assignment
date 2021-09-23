import { Table, Tag } from 'antd';
import { IPokemons, PokemonTypesAndColors } from '../dataStructure';

const getColorTag = (type: string) => {
  for(const [pType, pColor] of Object.entries(PokemonTypesAndColors)) {
    if (pType === type) return pColor;
  }
  return "";
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'types',
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
  }
];

function PokemonList(props: IPokemons) {
  return (
    <Table
      rowKey="uid"
      columns={columns}
      dataSource={props.pokemons}
      pagination={false}
    />
  );
}

export default PokemonList;