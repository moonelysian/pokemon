import { useEffect } from "react";
import styled from "@emotion/styled";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useSelector } from "react-redux";
import PokeCard from "./PokeCard";
import { RootState, useAppDispatch } from "../Store";
import { fetchPokemons } from "../Store/pokemonSlice";

const PokeCardList = () => {
  const dispatch = useAppDispatch();
  const { pokemons } = useSelector((state: RootState) => state.pokemons);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: pokemons.next !== "",
    onLoadMore: () => dispatch(fetchPokemons(pokemons.next)),
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
