import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import styled from "styled-components";
import Card from "../\bcomponents/card";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  // 두 번째 API 요청: 영화 세부 정보
  const {
    data: movieInfo,
    isLoading: isLoadingInfo,
    isError: isErrorInfo,
  } = useCustomFetch(`/movie/${movieId}?language=ko-K`);

  // 첫 번째 API 요청: 영화 크레딧 정보
  const {
    data: movieCredit,
    isLoading: isLoadingCredits,
    isError: isErrorCredits,
  } = useCustomFetch(`/movie/${movieId}/credits?language=ko-K`);

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

  console.log(movieInfo.data); // 크레딧 정보
  console.log(movieCredit.data); // 영화 정보

  return (
    <div style={{ color: "white" }}>
      <InfoDiv
        url={`https://image.tmdb.org/t/p/original/${movieInfo.data.poster_path}`}
      >
        <h1>{movieInfo.data.title}</h1>
        <p>평균 {movieInfo.data.vote_average}</p>
        <p>{movieInfo.data.release_date}</p>
        <p>{movieInfo.data.runtime}분</p>
        <br />
        <p>{movieInfo.data.tagline}</p>
        <br />
        <p>{movieInfo.data.overview}</p>
      </InfoDiv>

      <h2>감독/출연</h2>
      {movieCredit.data.cast && (
        <>
          {movieCredit.data.cast.map((actor) => (
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
