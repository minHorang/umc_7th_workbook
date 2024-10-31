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
  /* 뷰포트의 전체 높이 */
  height: fit-content;
  width: 100vw; /* 뷰포트의 전체 너비 */
  background-color: black;
  color: white;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export default RootLayout;
