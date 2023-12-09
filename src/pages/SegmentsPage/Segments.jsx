import styled from 'styled-components';
import { Button, Dropdown, Modal, Select, Table } from "antd";
import {useEffect, useState} from "react";
import {getSegments} from "../../api.js";

const defaultData = [
  {
    key: "1",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "03/06/1998",
    idRegion: "2",
    idUserStatus: "3",
    lastActivityDate: "08/12/2023",
  },
  {
    key: "2",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "03/06/1998",
    idRegion: "2",
    idUserStatus: "3",
    lastActivityDate: "08/12/2023",
  },
  {
    key: "3",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "03/06/1998",
    idRegion: "2",
    idUserStatus: "3",
    lastActivityDate: "08/12/2023",
  },
  {
    key: "4",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "03/06/1998",
    idRegion: "2",
    idUserStatus: "3",
    lastActivityDate: "08/12/2023",
  },
  {
    key: "5",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "03/06/1998",
    idRegion: "2",
    idUserStatus: "3",
    lastActivityDate: "08/12/2023",
  },
  {
    key: "6",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "03/06/1998",
    idRegion: "2",
    idUserStatus: "3",
    lastActivityDate: "08/12/2023",
  },
];
const defaultData2 = [
  {
    key: "3",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "03/06/1998",
    idRegion: "2",
    idUserStatus: "3",
    lastActivityDate: "08/12/2023",
  },
  {
    key: "4",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "03/06/1998",
    idRegion: "2",
    idUserStatus: "3",
    lastActivityDate: "08/12/2023",
  },
  {
    key: "5",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "03/06/1998",
    idRegion: "2",
    idUserStatus: "3",
    lastActivityDate: "08/12/2023",
  },
  {
    key: "6",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "03/06/1998",
    idRegion: "2",
    idUserStatus: "3",
    lastActivityDate: "08/12/2023",
  },
];
const defaultData3 = [
  {
    key: "6",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "03/06/1998",
    idRegion: "2",
    idUserStatus: "3",
    lastActivityDate: "08/12/2023",
  },
];
const Segments = () => {
  const [data, setData] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [segments, setSegments] = useState([])

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Second Name",
      dataIndex: "secondName",
      key: "secondName",
    },
    {
      title: "Sure Name",
      dataIndex: "sureName",
      key: "sureName",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Region",
      dataIndex: "idRegion",
      key: "idRegion",
    },
    {
      title: "User status",
      dataIndex: "idUserStatus",
      key: "idUserStatus",
    },
    {
      title: "Last activity day",
      dataIndex: "lastActivityDate",
      key: "lastActivityDate",
    },
    {
      title: 'Дії з користувачем',
      dataIndex: '',
      key: 'x',
      render: () => <div>
        <a>Надіслати сповіщення</a>
        {/*<br/>*/}
        {/*<a>Розпочати чат</a>*/}
        {/*<br/>*/}
        {/*<a>Видалити користувача</a>*/}
        {/*<br/>*/}
      </div>,
    },
  ];
  const onSegmentChange = () => {
    if(Math.random() > 0.2) {
      setData(defaultData);
    } else if (Math.random() > 0.4) {
      setData(defaultData2);
    } else {
      setData(defaultData3);
    }
  }

  const items = [
    {
      key: '1',
      label: (
        <div onClick={()=>showModal()}>
          Надіслати сповіщення
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={()=>showModal()}>
          Видалити користувачів
        </div>
      ),
    }
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    const fetchSegments = async ()=>{
      const response = await getSegments()
      setSegments(response.data.newSegments)
    }

    fetchSegments()
  },[])

  return (
    <Wrapper>
      <Modal
        title="Підтвердження"
        okText={"Так"}
        cancelText={"Ні"}
        centered open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>Ви впевненні шо хочете здійснити цю дію</p>
      </Modal>
      <HeaderWrapper>
        <FiltersWrapper>
          <SegmentSelectWrapper>
            <div>Назва сегменту:</div>
            <Select
              popupMatchSelectWidth={false}
              // defaultValue="1"
              style={{ width: 300 }}
              onChange={onSegmentChange}
              options={segments.map((segment) => ({
                value: segment.segmentName,
                label: segment.segmentName
              }))}
            />
          </SegmentSelectWrapper>
          <SegmentSelectWrapper>
            <div>Дата останньої активності:</div>
            <Select
              popupMatchSelectWidth={false}
              defaultValue="1timesPerThreeMeth"
              style={{ width: 300 }}
              onChange={onSegmentChange}
              options={[
                { value: '7days', label: 'до 7 днів назад' },
                { value: '14days', label: 'до 14 днів назад' },
                { value: '21day', label: 'до 21-го дня назад' },
                { value: '1timesPerMonth', label: 'до місяца назад' },
                { value: '1timesPerThreeMeth', label: 'до трьох місяців назад' },
              ]}
            />
          </SegmentSelectWrapper>
        </FiltersWrapper>
        <ActionsWrapper>
          <SegmentSelectWrapper>
            <Dropdown menu={{ items }} placement="bottom">
              <Button>{!selectedRows?.length ? 'Дії з користувачами сегменту': "Дії з обраними користувачами"}</Button>
            </Dropdown>
          </SegmentSelectWrapper>
        </ActionsWrapper>
      </HeaderWrapper>
      <TableWrapper>
        <table>
          <thead>
          <tr>
            <th>Назва сегменту</th>
            <th>Кількість активних користувачів</th>
          </tr>
          </thead>
          <tbody>
          {segments.map((segment) => (
            <tr key={segment.id}>
              <td>{segment.segmentName}</td>
              <StyledTd>{segment.usersCount}</StyledTd>
            </tr>
          ))}
          </tbody>
        </table>
      </TableWrapper>
      <Table columns={columns} dataSource={data} rowSelection={ {
        onSelect: (record, selected, selectedRows) => {
          setSelectedRows(selectedRows)
        },
        hideSelectAll: true
      }}  />


    </Wrapper>
  );
};

const StyledTd = styled.td`
  text-align:               center;
  `
const HeaderWrapper = styled.div`
  display: flex;
  gap: 18px;
  align-items: flex-start;
  `

const SegmentSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 18px;
  }
`
const TableWrapper = styled.div`
  margin: 40px 0;
`
const Wrapper = styled.div`
  padding: 16px;
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 10px;
  `

const FiltersWrapper = styled.div`
    background-color: white;
    padding: 10px;
    border: 1px solid lightgrey;
    border-radius: 6px;
    display: flex;
  justify-content: center;
  flex-direction: column;
`

export default Segments;
