import { useState, useRef, useEffect } from "react";
import { Table, Input, Button, Space } from "antd";
import styled from "styled-components";
import {
  SearchOutlined,
  DownloadOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { CSVLink } from "react-csv";
import CreateSegment from "../../components/CreateSegment/CreateSegment";
import { getAllUsers } from "../../api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    phoneNumber: "",
    birthday: "",
    idRegion: "",
    idUserStatus: "",
  });

  const searchInput = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersData = await getAllUsers();
        setUsers(transformUserData(usersData));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

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

  const transformUserData = (userData) => {
    return userData.map((user) => {
      const { firstName, lastName, sureName, phoneNumber, idRegion, idUserStatus, lastActivityDate, createdAt, updatedAt, birthday } = user;

      const birthdayDate = new Date(birthday);
      const today = new Date();
      const age = today.getFullYear() - birthdayDate.getFullYear();
  
      return {
        firstName,
        lastName,
        sureName,
        phoneNumber,
        idRegion,
        idUserStatus,
        lastActivityDate,
        createdAt,
        updatedAt,
        birthday: age || 0,
      };
    });
  };

  console.log(transformUserData(users))

  const columns = [
    {
      title: "Ім'я",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Прізвище",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "По батькові",
      dataIndex: "sureName",
      key: "sureName",
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: "Вік",
      dataIndex: "birthday",
      key: "birthday",
      ...getColumnSearchProps("birthday"),
    },
    {
      title: "Область",
      dataIndex: "idRegion",
      key: "idRegion",
      ...getColumnSearchProps("idRegion"),
    },
    {
      title: "Статус",
      dataIndex: "idUserStatus",
      key: "idUserStatus",
      ...getColumnSearchProps("idUserStatus"),
    },
    {
      title: "Остання діяльність",
      dataIndex: "lastActivityDate",
      key: "lastActivityDate",
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
        <Button icon={<ClearOutlined />} onChange={handleClearFilters}>
          Очистити фільри
        </Button>
        {!loading && users.length && (
          <CSVLink data={users} filename={"Users.csv"}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onChange={handleClearFilters}
            >
              Завантажити
            </Button>
          </CSVLink>
        )}
        <CreateSegment />
      </Space>
      <Table columns={columns} dataSource={users} loading={loading} />
    </Wrapper>
  );
};

export default Users;

const Wrapper = styled.div`
  padding: 16px;
`;
