import axios from "axios";

const remote = axios.create();

export interface PokemonListResponseType {
  count: number;
  next: string;
  previous: null | string;
  results: {
    name: string;
    url: string;
  }[];
}

export const fetchPokemonsApi = async (nextUrl?: string) => {
  const requestUrl = nextUrl ?? "https://pokeapi.co/api/v2/pokemon";
  const response = await remote.get<PokemonListResponseType>(requestUrl);
  return response.data;
};

export interface PokemonDetailResponseType {
  id: number;
  weight: number;
  height: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    other: {
      dream_world: { front_default: string };
      "official-artwork": { front_default: string };
    };
  };
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
}

export interface PokemonDetailType {
  id: number;
  weight: number;
  height: number;
  name: string;
  types: string[];
  images: {
    frontDefault: string;
    dreamWorldFront: string;
    officialArtworkFront: string;
  };
  baseStats: {
    name: string;
    value: number;
  }[];
  color: string;
  koreanName: string;
}

interface PokemonSpeciesType {
  color: { name: string };
  names: { language: { name: string }; name: string }[];
}

export const fetchPokemonDetailApi = async (
  name: string
): Promise<PokemonDetailType> => {
  const pokemonDetailUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
  const { data } = await remote.get<PokemonDetailResponseType>(
    pokemonDetailUrl
  );
  const { data: speciesData } = await remote.get<PokemonSpeciesType>(
    pokemonSpeciesUrl
  );

  return {
    id: data.id,
    weight: data.weight / 10, // kg 단위,
    height: data.height / 10, // 미터단위,
    name: data.name,
    types: data.types.map((item) => item.type.name),
    images: {
      frontDefault: data.sprites.front_default,
      dreamWorldFront: data.sprites.other?.dream_world.front_default,
      officialArtworkFront:
        data.sprites?.other?.["official-artwork"].front_default,
    },
    baseStats: data.stats.map((item) => ({
      name: item.stat.name,
      value: item.base_stat,
    })),
    color: speciesData.color.name,
    koreanName:
      speciesData.names.find((data) => data.language.name === "ko")?.name ??
      data.name,
  };
};
