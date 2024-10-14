// navbar.jsx
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavbarBack>
      <Logo to="/">YONGCHA</Logo>
      <Menu>
        <LoginButton to="/login">로그인</LoginButton>
        <SignUpButton to="/signup">회원가입</SignUpButton>
      </Menu>
    </NavbarBack>
  );
};

// 네비게이션 바 전체 스타일
const NavbarBack = styled.nav`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #121212; /* 검은 배경 */
`;

// 로고 텍스트 스타일
const Logo = styled(Link)`
  color: #ff1654; /* 핑크색 텍스트 */
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #e0144f; /* 살짝 더 어두운 핑크 */
  }
`;

// 오른쪽 메뉴 스타일
const Menu = styled.div`
  display: flex;
  align-items: center;
`;

// 로그인 버튼 스타일
const LoginButton = styled(Link)`
  color: #ccc;
  margin-right: 15px;
  font-size: 12px;
  text-decoration: none;

  &:hover {
    color: #e0144f; /* 살짝 더 어두운 핑크 */
  }
`;

// 회언가입 버튼 스타일
const SignUpButton = styled(Link)`
  background-color: #ff1654; /* 핑크 버튼 */
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  text-decoration: none;

  &:hover {
    background-color: #e0144f; /* 살짝 더 어두운 핑크 */
  }
`;

export default Navbar;
