import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useInfiniteScroll from "react-infinite-scroll-hook";
import PokeCard from "./PokeCard";
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

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: pokemons.next !== "",
    onLoadMore: async () => {
      const moreData = await fetchPokemons(pokemons.next);
      setPokemons({
        ...moreData,
        results: [...pokemons.results, ...moreData.results],
      });
    },
    disabled: false,
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <>
      <List>
        {pokemons.results.map((pokemon, idx) => (
          <PokeCard key={`${pokemon.name}-${idx}`} name={pokemon.name} />
        ))}
      </List>
      <Loading ref={sentryRef}>Loading...</Loading>
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

const Loading = styled.div`
  display: flex;
  justify-content: center;
`;

export default PokeCardList;
