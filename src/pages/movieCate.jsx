import { Link } from "react-router-dom";
import styled from "styled-components";

const MoviesCate = () => {
  return (
    <Back>
      카테고리
      <CardContainer>
        <Card to="now_playing" color="blue">
          <Text>현재 상영중인</Text>
        </Card>
        <Card to="popular" color="purple">
          <Text>인기있는</Text>
        </Card>
        <Card to="top_rated" color="orange">
          <Text>높은 평가를 받은</Text>
        </Card>
        <Card to="upcoming" color="red">
          <Text>개봉 예정중인</Text>
        </Card>
      </CardContainer>
    </Back>
  );
};

const Back = styled.div`
  width: 100%;
  font-size: 30px;
  color: aliceblue;
  padding: 20px;
  box-sizing: border-box;

  background-color: black;
`;

const CardContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
`;

const Card = styled(Link)`
  width: 25%;
  height: 150px;
  background-color: ${(props) => props.color};
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  text-decoration: none;
  color: white;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Text = styled.span`
  font-size: 20px;
  opacity: 0.7;
  background-color: #121212;
  border-radius: 4px;
  padding: 4px;
`;

export default MoviesCate;
