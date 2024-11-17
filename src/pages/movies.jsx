import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios-instance";
import Card from "../apis/card.jsx";

const fetchMovies = async (category) => {
  const encodedCategory = encodeURIComponent(category);
  const response = await axiosInstance.get(
    `/movie/${encodedCategory}?language=ko-KR&page=1`
  );
  return response.data;
};

const Movies = () => {
  const { category } = useParams();

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery(
    ["movies", category], // Query Key: 카테고리별 데이터를 캐싱
    () => fetchMovies(category), // Fetching 함수
    {
      enabled: !!category, // category가 있을 때만 실행
      retry: 2, // 실패 시 재시도 횟수
      staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선함 유지
    }
  );

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
        <h1 style={{ color: "white" }}>에러 발생!</h1>
      </div>
    );
  }

  return (
    <Main>
      {movies?.results.map((movie) => (
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

export default Movies;
