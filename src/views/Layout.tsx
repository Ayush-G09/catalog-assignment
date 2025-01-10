import styled from "styled-components";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Container>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Content = styled.div`
  width: 100%;
  height: 93%;
  box-sizing: border-box;
`;

export default Layout;
