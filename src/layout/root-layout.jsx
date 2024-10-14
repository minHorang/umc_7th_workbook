import { Outlet } from "react-router-dom";
import Navbar from "../\bcomponents/navbar";
import Sidebar from "../\bcomponents/sidebar";
import styled from "styled-components";

const RootLayout = () => {
  return (
    <Main>
      <Navbar />
      <Content>
        <Sidebar />
        <Outlet />
      </Content>
    </Main>
  );
};

const Main = styled.div`
  box-sizing: border-box;
  height: 100vh; /* 뷰포트의 전체 높이 */
  width: 100vw; /* 뷰포트의 전체 너비 */
  background-color: black;
  color: white;
  margin: 0;
  padding: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

export default RootLayout;
