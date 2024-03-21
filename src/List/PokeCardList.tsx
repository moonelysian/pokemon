import PokeCard from "./PokeCard";
import styled from "@emotion/styled";

const PokeCardList = () => {
  return (
    <>
      <List>
        {
          Array.from({ length: 10}).map((_, idx) => (
            <PokeCard key={idx} />
          ))
        }
      </List>
    </>
  );
}

const List = styled.ul`
  list-style: none;
  margin: 0 0 32px 0;
  padding: 0;
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

export default PokeCardList
