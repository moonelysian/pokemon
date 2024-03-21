import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import PokeNameChip from "../Common/PokeNameChip";
import PokeMarkChip from "../Common/PokeMarkChip";
import { PokeImageSkeleton } from "../Common/PokeImageSkeleton";

import { RootState, useAppDispatch } from "../Store";
import { fetchPokemonDetail } from "../Store/pokemonDetailSlice";

interface PokeCardProps {
  name: string;
}

const PokeCard = ({ name }: PokeCardProps) => {
  const dispatch = useAppDispatch();

  const imageType = useSelector((state: RootState) => state.imageType.type);
  const pokemon = useSelector(
    (state: RootState) => state.details.pokemonDetails[name]
  );

  const navigate = useNavigate();

  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;

  useEffect(() => {
    if (!name || !isVisible) return;
    dispatch(fetchPokemonDetail(name));
  }, [dispatch, isVisible, name, pokemon]);

  const handleClick = () => {
    navigate(`/pokemon/${name}`);
  };

  if (!pokemon) {
    return (
      <Container color={"#32CD32"} ref={ref}>
        <Header>
          <PokeNameChip name={name} id={0} numberColor={"#32CD32"} />
        </Header>
        <Body>
          <PokeImageSkeleton />
        </Body>
        <Footer>
          <PokeMarkChip />
        </Footer>
      </Container>
    );
  }

  return (
    <Container onClick={handleClick} color={pokemon.color} ref={ref}>
      <Header>
        <PokeNameChip
          name={pokemon.koreanName}
          numberColor={pokemon.color}
          id={pokemon.id}
        />
      </Header>
      <Body>
        <Image src={pokemon.images[imageType]} alt={pokemon.name} />
      </Body>
      <Footer>
        <PokeMarkChip />
      </Footer>
    </Container>
  );
};

const Container = styled.li<{ color: string }>`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
  padding: 6px;
  border: 1px solid #c0c0c0;
  box-shadow: 1px 1px 3px 1px #c0c0c0;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    background-color: ${(props) => props.color};
    opacity: 0.8;
    transition: background-color 0s;
  }
`;

const Header = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`;

const Body = styled.section`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`;

const Image = styled.img`
  width: 180px;
  height: 180px;
`;

const Footer = styled.section`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`;

export default PokeCard;
