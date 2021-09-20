export interface IPokemon {
  id: number,
  name: string
  types: [string]
}

export interface IPokemons {
  pokemons: IPokemon[]
}

export interface ILastSearch {
  nameValue: string,
  typeValue: string,
  hasNextPage: boolean,
  endCursor: string,
  loadMoreClicked: boolean
}

export enum PokemonTypesAndColors {
  Bug = "lime",
  Dark = "gray",
  Dragon = "purple",
  Electric = "yellow",
  Fairy = "magenta",
  Fighting = "orange",
  Fire = "red",
  Flying = "geekblue",
  Ghost = "purple",
  Grass = "green",
  Ground = "gold",
  Ice = "cyan",
  Normal = "gray",
  Poison = "purple",
  Psychic = "magenta",
  Rock = "yellow",
  Steel = "gray",
  Water = "blue"
}