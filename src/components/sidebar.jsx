import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaSearch, FaFilm } from "react-icons/fa"; // 아이콘 추가

// 사이드바 스타일
const SidebarContainer = styled.div`
  width: 180px;
  background-color: #121212; /* 검은색 배경 */
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-left: 20px;
`;

// 아이콘을 감싸는 div 스타일
const IconWrapper = styled(Link)`
  /* Link로 변경 */
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
  text-decoration: none;

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    color: #ff1654; /* hover 시 핑크색으로 */
  }
`;

const Text = styled.span`
  margin-left: 10px; /* 텍스트 앞에 공백 추가 */
`;
const Sidebar = () => {
  return (
    <SidebarContainer>
      <IconWrapper to="/search">
        <FaSearch /> {/* 검색 아이콘 */}
        <Text>찾기</Text>
      </IconWrapper>
      <IconWrapper to="/movies">
        <FaFilm /> {/* 영화 아이콘 */}
        <Text>영화</Text>
      </IconWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
