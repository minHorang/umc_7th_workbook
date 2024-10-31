import Card from "../\bcomponents/card.jsx";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch.js";

const MoviesPage = () => {
  const { category } = useParams();
  const encodedCategory = encodeURIComponent(category);
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/${encodedCategory}?language=ko-KR&page=1`);

  if (isLoading) {
    return (
      <div>
        <h1 style={{ color: "white" }}>로딩중 입니다 ...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러중</h1>
      </div>
    );
  }

  return (
    <Main>
      {movies.data?.results.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </Main>
  );
};

const Main = styled.div`
  background-color: black;

  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default MoviesPage;
