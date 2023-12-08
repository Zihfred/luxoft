import {} from "react";
import { Layout } from "antd";
import styled from 'styled-components';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/HomePage/HomePage";

const { Header, Content } = Layout;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const HeaderLogo = styled.a`
  color: #fff;
`;

const StyledLayout = styled(Layout)`
  min-height: 100vh
`

const App = () => {
  return (
    <StyledLayout >
      <Header>
        <HeaderLogo href="/">E-Veteran</HeaderLogo>
      </Header>
      <Content>
        <RouterProvider router={router} />
      </Content>
    </StyledLayout>
  );
};

export default App;
