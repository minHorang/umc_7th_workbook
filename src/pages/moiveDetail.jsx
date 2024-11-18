import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { axiosInstance } from "../apis/axios-instance"; // axios 인스턴스를 가져온다고 가정

// 영화 정보 및 영화 크레딧 정보를 가져오는 함수
const fetchMovieInfo = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}?language=ko-KR`);
  return response.data;
};

const fetchMovieCredit = async (movieId) => {
  const response = await axiosInstance.get(
    `/movie/${movieId}/credits?language=ko-KR`
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
  } = useQuery({
    queryKey: ["movieInfo", movieId],
    queryFn: () => fetchMovieInfo(movieId),
    enabled: !!movieId,
  });

  // 두 번째 API 요청: 영화 크레딧 정보
  const {
    data: movieCredit,
    isLoading: isLoadingCredits,
    isError: isErrorCredits,
  } = useQuery({
    queryKey: ["movieCredit", movieId],
    queryFn: () => fetchMovieCredit(movieId),
    enabled: !!movieId,
  });

  // 로딩 및 에러 처리
  if (isLoadingCredits || isLoadingInfo) {
    return (
      <div>
        <h1 style={{ color: "white" }}>로딩중 입니다...</h1>
      </div>
    );
  }

  if (isErrorCredits || isErrorInfo) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 발생!</h1>
      </div>
    );
  }

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <InfoDiv
        url={`https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`}
      >
        <h1>{movieInfo.title}</h1>
        <p>평균 평점: {movieInfo.vote_average}</p>
        <p>개봉일: {movieInfo.release_date}</p>
        <p>상영 시간: {movieInfo.runtime}분</p>
        <br />
        <p>{movieInfo.tagline}</p>
        <br />
        <p>{movieInfo.overview}</p>
      </InfoDiv>

      <h2 style={{ marginTop: "20px" }}>출연진</h2>
      <CastGrid>
        {movieCredit.cast &&
          movieCredit.cast.map((actor) => (
            <ActorCard key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <p style={{ textAlign: "center", marginTop: "5px" }}>
                {actor.name}
              </p>
            </ActorCard>
          ))}
      </CastGrid>
    </div>
  );
};

const InfoDiv = styled.div`
  height: 500px;
  background-image: url(${(props) => props.url});
  background-size: cover; /* 이미지 크기 조정 */
  background-position: center; /* 이미지 위치 조정 */
  color: white;
  padding: 20px;
  border-radius: 10px;
`;

const CastGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const ActorCard = styled.div`
  width: 150px;
  text-align: center;
`;

export default MovieDetailPage;
