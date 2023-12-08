import { Layout, Tabs } from "antd";
import styled from "styled-components";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Segments from "./Pages/SegmentsPage/Segments";
import Users from "./Pages/Users/Users";

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
    label: "Users",
  },
  {
    key: "analytics",
    label: "Analytics",
  },
  {
    key: "segments",
    label: "Segments",
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
          <Route path="/" element={<Users />} />
          <Route path="/segments" element={<Segments />} />
          <Route path="/analytics" element={<div>anal</div>} />
        </Routes>
      </Content>
    </StyledLayout>
  );
};

export default App;
