import { Layout, Tabs } from "antd";
import styled from "styled-components";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Users from "./pages/Users/Users";

const { Header, Content } = Layout;

const HeaderLogo = styled.a`
  color: #fff;
`;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const items = [
  {
    key: "",
    label: "Analytics",
  },
  {
    key: "segments",
    label: "Segments",
  },
  {
    key: "users",
    label: "Users",
  },
];

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onTabClick = (key) => {
    navigate(`/${key}`);
  };

  return (
    <StyledLayout>
      <Header>
        <HeaderLogo href="/">E-Veteran</HeaderLogo>
      </Header>
      <Tabs
        onChange={onTabClick}
        defaultActiveKey="1"
        centered
        items={items}
        activeKey={pathname.slice(1)}
      />
      <Content>
        <Routes>
          <Route path="/" element={<div>anal</div>} />
          <Route path="/segments" element={<div>segments</div>} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Content>
    </StyledLayout>
  );
};

export default App;
