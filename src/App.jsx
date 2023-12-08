import { Layout, Tabs } from "antd";
import styled from 'styled-components';
import { Route, Routes, useNavigate } from "react-router-dom";


const { Header, Content } = Layout;

const HeaderLogo = styled.a`
  color: #fff;
`;

const StyledLayout = styled(Layout)`
  min-height: 100vh
`

const items = [
  {
    key: '',
    label: 'Analytics',
  },
  {
    key: 'segments',
    label: 'Segments',
  }
]

const App = () => {
  const navigate = useNavigate()

  const onTabClick = (key) => {
    navigate(`/${key}`)
  }

  return (
    <StyledLayout >
      <Header>
        <HeaderLogo href="/">E-Veteran</HeaderLogo>
      </Header>
      <Tabs onChange={onTabClick}  defaultActiveKey="1" centered items={items}/>
      <Content>
        <Routes>
          <Route path="/"  element={<div>anal</div>} />
          <Route path="/segments"  element={<div>segments</div>} />
        </Routes>
      </Content>
    </StyledLayout>
  );
};

export default App;
