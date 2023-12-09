import { useState, useRef, useEffect } from "react";
import { Table, Input, Button, Space } from "antd";
import styled from "styled-components";
import dayjs from 'dayjs';
import {
  SearchOutlined,
  DownloadOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { CSVLink } from "react-csv";
import CreateSegment from "../../components/CreateSegment/CreateSegment";
import { getAllRegions, getAllUsers } from "../../api";

const statuses = [
  {
    _id: "65735ef5997f0a6e91d4deac",
    userStatusName: "військовослужбовці, які брали безпосередню участь у заходах, необхідних для забезпечення оборони України, захисту безпеки населення та інтересів держави, та були звільнені з військової служби, зокрема демобілізовані у визначеному законом порядку",
  },
  {
    _id: "65735ede997f0a6e91d4deab",
    userStatusName: "члени сімей загиблих (померлих) ветеранів війни, Захисників і Захисниць України",
  },
  {
    _id: "65735ece997f0a6e91d4deaa",
    userStatusName: "члени сімей ветеранів війни та осіб, які мають особливі заслуги перед Батьківщиною",
  },
  {
    _id: "657355c1997f0a6e91d4dea6",
    userStatusName: "ветерани війни, особи, які мають особливі заслуги перед Батьківщиною",
  },
];

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
        const allRegions = await getAllRegions();
        setUsers(transformUserData(usersData, allRegions, statuses));
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

  const transformUserData = (userData, regions, statuses) => {
    return userData.map((user) => {
      const { chatId, firstName, lastName, sureName, phoneNumber, idRegion, idUserStatus, lastActivityDate, createdAt, updatedAt, birthday } = user;

      const birthdayDate = new Date(birthday);
      const today = new Date();
      const age = today.getFullYear() - birthdayDate.getFullYear();
      const region = regions.find((region) => region._id === idRegion);
      const regionName = region ? region.regionName : '';
      const status = statuses.find((status) => status._id === idUserStatus);
      const statusName = status ? status.userStatusName : '';
  
      return {
        key: chatId,
        firstName,
        lastName,
        sureName,
        phoneNumber,
        idRegion: regionName,
        idUserStatus: statusName,
        lastActivityDate: dayjs(lastActivityDate).format('YYYY-MM-DD'),
        createdAt,
        updatedAt,
        birthday: age || 0,
      };
    });
  };

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
        {!loading && !!users.length && (
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
