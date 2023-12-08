import { Tabs } from "antd";


const items = [
  {
    key: '1',
    label: 'Analytics',
    children: "Content of 1 tab"
  },
  {
    key: '2',
    label: 'Segments',
    children: "Content of 2 tab"
  }
]
const Header = () => {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered items={items}/>
    </div>
  );
};

export default Header;
