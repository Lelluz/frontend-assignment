import React from 'react';
import './App.css';
import pokemonLogo from './pokemon-logo.svg';
import { Layout } from 'antd';
import PokemonSearch from './components/PokemonSearch.js';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <img className="pokemon-logo" src={pokemonLogo} alt="pokemon logo" />
      </Header>
      <Content>
        <PokemonSearch />
      </Content>
    </Layout>
  );
}

export default App;
