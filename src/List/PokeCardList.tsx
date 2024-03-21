import { useEffect, useState } from "react";
import PokeCard from "./PokeCard";
import styled from "@emotion/styled";
import {
  fetchPokemons,
  PokemonListResponseType,
} from "../Service/pokemonService";

const PokeCardList = () => {
  const [pokemons, setPokemons] = useState<PokemonListResponseType>({
    count: 0,
    next: "",
    previous: null,
    results: [],
  });
  useEffect(() => {
    (async () => {
      const pokemons = await fetchPokemons();
      setPokemons(pokemons);
    })();
  }, []);
  return (
    <>
      <List>
        {pokemons.results.map((pokemon, idx) => (
          <PokeCard key={`${pokemon.name}-${idx}`} name={pokemon.name} />
        ))}
      </List>
    </>
  );
};

const List = styled.ul`
  list-style: none;
  margin: 0 0 32px 0;
  padding: 0;
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export default PokeCardList;
