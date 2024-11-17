import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Card from "../\bcomponents/card";
import { axiosInstance } from "../apis/axios-instance"; // axios 인스턴스를 가져온다고 가정

// 영화 정보 및 영화 크레딧 정보를 가져오는 함수
const fetchMovieInfo = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}?language=ko-K`);
  return response.data;
};

const fetchMovieCredit = async (movieId) => {
  const response = await axiosInstance.get(
    `/movie/${movieId}/credits?language=ko-K`
  );
  return response.data;
};

const MovieDetailPage = () => {
  const { movieId } = useParams();

  // 첫 번째 API 요청: 영화 정보
  const {
    data: movieInfo,
    isLoading: isLoadingInfo,
    isError: isErrorInfo,
  } = useQuery(
    ["movieInfo", movieId], // 영화 정보는 movieId로 구별
    () => fetchMovieInfo(movieId),
    {
      enabled: !!movieId, // movieId가 있을 때만 실행
    }
  );

  // 두 번째 API 요청: 영화 크레딧 정보
  const {
    data: movieCredit,
    isLoading: isLoadingCredits,
    isError: isErrorCredits,
  } = useQuery(
    ["movieCredit", movieId], // 영화 크레딧 정보는 movieId로 구별
    () => fetchMovieCredit(movieId),
    {
      enabled: !!movieId, // movieId가 있을 때만 실행
    }
  );

  // 로딩 및 에러 처리
  if (isLoadingCredits || isLoadingInfo) {
    return (
      <div>
        <h1 style={{ color: "white" }}>로딩중 입니다 ...</h1>
      </div>
    );
  }

  if (isErrorCredits || isErrorInfo) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러중</h1>
      </div>
    );
  }

  return (
    <div style={{ color: "white" }}>
      <InfoDiv
        url={`https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`}
      >
        <h1>{movieInfo.title}</h1>
        <p>평균 {movieInfo.vote_average}</p>
        <p>{movieInfo.release_date}</p>
        <p>{movieInfo.runtime}분</p>
        <br />
        <p>{movieInfo.tagline}</p>
        <br />
        <p>{movieInfo.overview}</p>
      </InfoDiv>

      <h2>감독/출연</h2>
      {movieCredit.cast && (
        <>
          {movieCredit.cast.map((actor) => (
            <Card key={actor.id} movie={actor} />
          ))}
        </>
      )}
    </div>
  );
};

const InfoDiv = styled.div`
  height: 500px;
  background-image: url(${(props) => props.url});
  background-size: cover; /* 이미지 크기 조정 */
  background-position: center; /* 이미지 위치 조정 */
`;

export default MovieDetailPage;
