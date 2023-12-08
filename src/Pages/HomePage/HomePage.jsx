import {} from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 16px;
`;

const items = [
    {
        key: '1',
        label: 'Users',
        children: "Content of 1 tab"
    },
    {
        key: '2',
        label: 'Analytics',
        children: "Content of 1 tab"
    },
    {
        key: '3',
        label: 'Segments',
        children: "Content of 3 tab"
    }
]

const Home = () => {
  return (
    <Wrapper>
      <Tabs defaultActiveKey="1" centered items={items}/>
    </Wrapper>
  );
};

export default Home;