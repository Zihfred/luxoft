import {} from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName'
    },
    {
        title: 'Second Name',
        dataIndex: 'secondName',
        key: 'secondName'
    },
    {
        title: 'Sure Name',
        dataIndex: 'sureName',
        key: 'sureName'
    },
    {
        title: 'Phone number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber'
    },
    {
        title: 'Birthday',
        dataIndex: 'birthday',
        key: 'birthday'
    },
    {
        title: 'Region',
        dataIndex: 'idRegion',
        key: 'idRegion'
    },
    {
        title: 'User status',
        dataIndex: 'idUserStatus',
        key: 'idUserStatus'
    },
    {
        title: 'Last activity day',
        dataIndex: 'lastActivityDate',
        key: 'lastActivityDate'
    },
]

const Data = [
    {
        key: '1',
        firstName: 'Artem',
        secondName: 'Shevchuk',
        sureName: 'Olexandrovich',
        phoneNumber: '+380971100619',
        birthday: '03/06/1998',
        idRegion: '2',
        idUserStatus: '3',
        lastActivityDate: '08/12/2023'
    },
    {
        key: '2',
        firstName: 'Artem',
        secondName: 'Shevchuk',
        sureName: 'Olexandrovich',
        phoneNumber: '+380971100619',
        birthday: '03/06/1998',
        idRegion: '2',
        idUserStatus: '3',
        lastActivityDate: '08/12/2023'
    },
    {
        key: '3',
        firstName: 'Artem',
        secondName: 'Shevchuk',
        sureName: 'Olexandrovich',
        phoneNumber: '+380971100619',
        birthday: '03/06/1998',
        idRegion: '2',
        idUserStatus: '3',
        lastActivityDate: '08/12/2023'
    },
    {
        key: '4',
        firstName: 'Artem',
        secondName: 'Shevchuk',
        sureName: 'Olexandrovich',
        phoneNumber: '+380971100619',
        birthday: '03/06/1998',
        idRegion: '2',
        idUserStatus: '3',
        lastActivityDate: '08/12/2023'
    },
    {
        key: '5',
        firstName: 'Artem',
        secondName: 'Shevchuk',
        sureName: 'Olexandrovich',
        phoneNumber: '+380971100619',
        birthday: '03/06/1998',
        idRegion: '2',
        idUserStatus: '3',
        lastActivityDate: '08/12/2023'
    },
    {
        key: '6',
        firstName: 'Artem',
        secondName: 'Shevchuk',
        sureName: 'Olexandrovich',
        phoneNumber: '+380971100619',
        birthday: '03/06/1998',
        idRegion: '2',
        idUserStatus: '3',
        lastActivityDate: '08/12/2023'
    },
]

const Users = () => (<Table columns={columns} dataSource={Data} />)

export default Users