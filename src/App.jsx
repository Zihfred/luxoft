import { Layout, Tabs } from "antd";
import styled from "styled-components";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Segments from "./pages/SegmentsPage/Segments";
import Users from "./pages/Users/Users";
import Analytics from './pages/Analytics/Analytics'

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
    label: "Користувачі",
  },
  {
    key: "analytics",
    label: "Аналітика",
  },
  {
    key: "segments",
    label: "Сегменти",
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
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Content>
    </StyledLayout>
  );
};

export default App;
