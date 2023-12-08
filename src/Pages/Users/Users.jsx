import { useState, useRef } from "react";
import { Table, Input, Button, Space } from "antd";
import styled from "styled-components";
import { SearchOutlined, DownloadOutlined, ClearOutlined} from "@ant-design/icons";
import { CSVLink } from "react-csv";
import CreateSegment from "../../components/CreateSegment/CreateSegment";

const Data = [
  {
    key: "1",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "03/06/1998",
    idRegion: "1",
    idUserStatus: "1",
    lastActivityDate: "01/12/2023",
  },
  {
    key: "2",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380951100619",
    birthday: "04/06/1998",
    idRegion: "2",
    idUserStatus: "2",
    lastActivityDate: "02/12/2023",
  },
  {
    key: "3",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380941100619",
    birthday: "05/06/1998",
    idRegion: "3",
    idUserStatus: "3",
    lastActivityDate: "03/12/2023",
  },
  {
    key: "4",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380931100619",
    birthday: "06/06/1998",
    idRegion: "4",
    idUserStatus: "4",
    lastActivityDate: "04/12/2023",
  },
  {
    key: "5",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "07/06/1998",
    idRegion: "5",
    idUserStatus: "5",
    lastActivityDate: "05/12/2023",
  },
  {
    key: "6",
    firstName: "Artem",
    secondName: "Shevchuk",
    sureName: "Olexandrovich",
    phoneNumber: "+380971100619",
    birthday: "08/06/1998",
    idRegion: "6",
    idUserStatus: "6",
    lastActivityDate: "06/12/2023",
  },
];

const Users = () => {
  const [filters, setFilters] = useState({
    phoneNumber: "",
    birthday: "",
    idRegion: "",
    idUserStatus: "",
  });

  const searchInput = useRef(null);

  const onFilter = (type, value) => {
    setFilters({
      ...filters,
      [type]: value,
    });
  };

  const handleReset = (clearFilters, type) => {
    clearFilters();
    setFilters({
      ...filters,
      [type]: "",
    });
  };

  const handleClearFilters = () => {
    Object.keys(filters).forEach((key) => {
      handleReset(null, key);
    });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Пошук у колонці`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => onFilter(dataIndex, selectedKeys[0])}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => onFilter(dataIndex, selectedKeys[0])}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Пошук
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Очистити
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

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
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      ...getColumnSearchProps("birthday"),
    },
    {
      title: "Region",
      dataIndex: "idRegion",
      key: "idRegion",
      ...getColumnSearchProps("idRegion"),
    },
    {
      title: "User status",
      dataIndex: "idUserStatus",
      key: "idUserStatus",
      ...getColumnSearchProps("idUserStatus"),
    },
    {
      title: "Last activity day",
      dataIndex: "lastActivityDate",
      key: "lastActivityDate",
      ...getColumnSearchProps("lastActivityDate"),
    },
  ];

  return (
    <Wrapper>
      <Space
        align="center"
        style={{
          marginBottom: 16,
        }}
      >
        <Button icon={<ClearOutlined />} onChange={handleClearFilters}>Очистити фільри</Button>
        <CSVLink data={Data} filename={"Users.csv"}>
          <Button type="primary" icon={<DownloadOutlined />} onChange={handleClearFilters}>Завантажити</Button>
        </CSVLink>
        <CreateSegment />
      </Space>
      <Table columns={columns} dataSource={Data} />
    </Wrapper>
  );
};

export default Users;

const Wrapper = styled.div`
  padding: 16px;
`;
