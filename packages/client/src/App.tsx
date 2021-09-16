import React from 'react';
import './App.css';
import { Layout } from 'antd';
import PokemonSearch from './components/PokemonSearch.js';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>Pokémon</Header>
      <Content>
        <PokemonSearch />
      </Content>
    </Layout>
  );
}

export default App;
