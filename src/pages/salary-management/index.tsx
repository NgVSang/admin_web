import Layout from "@/components/Layout";
import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TablePaginationConfig } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps, FilterValue } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import style from '@/assets/css/user-management.module.css'
import toast from "react-hot-toast";
import {getListRequest} from "@/services/api/request.apt";

interface Props {

}

interface DataType {
    key: string;
    name: string;
    timeWork:number;
    baseSalary: number;
    received: number;
  }

type DataIndex = keyof DataType;

const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      timeWork: 32,
      baseSalary:6000000,
      received:2000000,
    },
    {
      key: '2',
      name: 'Joe Black',
      timeWork: 100,
      baseSalary:68000000,
      received:4000000,
    },
    {
      key: '3',
      name: 'Jim Green',
      timeWork: 180,
      baseSalary:9000000,
      received:10000000,
    },
    {
      key: '4',
      name: 'Jim Red',
      timeWork: 167,
      baseSalary:6000000,
      received:5800000,
    },
];

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
function Page({}:Props) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
      selectedKeys: string[],
      confirm: (param?: FilterConfirmProps) => void,
      dataIndex: DataIndex,
  ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
    const columns: ColumnsType<DataType> = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...getColumnSearchProps('name'),
      },
      {
        title: 'Time work',
        dataIndex: 'timeWork',
        key: 'timeWork',
        width: '20%',
        ...getColumnSearchProps('timeWork'),
      },
      {
        title: 'Base Salary',
        dataIndex: 'baseSalary',
        key: 'baseSalary',
        ...getColumnSearchProps('baseSalary'),
        sorter: (a, b) => a.baseSalary - b.baseSalary,
        width: '30%',
        sortDirections: ['descend', 'ascend'],
      },
      {
          title: 'Received',
          dataIndex: 'received',
          key: 'age',
          width: '20%',
          ...getColumnSearchProps('received'),
      },
    ];

  return (
    <div className={style.user_management_wrapper}>
      {/* <p className={style.user_management_title}>Salary Management</p> */}
      <p style={{
          display:'flex',
          marginBottom:'20px',
          fontFamily:"sans-serif",
          fontSize:'25px',
          fontWeight:600
      }}>Salary Management</p>
      <Table columns={columns} dataSource={data} className={style.user_management_table}/>
    </div>
  )
}
export default Page;
Page.Layout = Layout
Page.requireAuth = true