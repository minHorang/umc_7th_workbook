import styled from "styled-components";

const Card = (props) => {
  return (
    <Main>
      <MovieItem key={props.key}>
        <Poster
          src={`https://image.tmdb.org/t/p/original/${props.movie.profile_path}`}
          alt={props.movie.title}
          className="poster"
        />
        <Title>{props.movie.name}</Title>
        <br />
        <Date> {props.movie.character}</Date>
      </MovieItem>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
`;

/* 개별 영화 아이템 */
const MovieItem = styled.div`
  width: 200px;
  overflow: hidden;
  margin: 10px;
`;

/* 포스터 이미지 */
const Poster = styled.img`
  width: 200px;
  height: 303px;
  object-fit: cover;
  border-radius: 8px;

  &:hover {
    filter: brightness(50%);
  }
`;

const Title = styled.span`
  color: white;
  font-size: 20px;
  white-space: nowrap; /* 텍스트를 한 줄로 표시 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 말줄임표(...)로 표시 */
`;

const Date = styled.span`
  color: white;
  font-size: 14px;
`;

export default Card;
