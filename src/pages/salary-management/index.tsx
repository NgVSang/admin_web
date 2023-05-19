import Layout from "@/components/Layout";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {
  EditOutlined,
  FolderAddOutlined,
} from '@ant-design/icons';
import { Dropdown, InputRef, MenuProps, TablePaginationConfig } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import style from '@/assets/css/user-management.module.css'
import toast from "react-hot-toast";
import {getListUserWorking} from "@/services/api/working.api";
import dayjs from 'dayjs'
import {formatPrice} from "@/utils/Format";
import {useToggleModal} from "@/hooks/application.hooks";
import {ApplicationModal} from "@/reducer/app.reducer";
// import {getListRequest} from "@/services/api/request.apt";

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
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
function Page({}:Props) {
  const openUpdateSalary= useToggleModal(ApplicationModal.UPDATE_SALARY_VIEW)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [data, setData] = useState<DataType[]>()
  const [month,setMonth] = useState<number>(new Date().getMonth() + 1)
  const [year,setYear] = useState<number>(new Date().getFullYear())
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total:100
    },
  });

  const handleUpate = async (id: string) => {
    localStorage.setItem("userId",id)
    localStorage.setItem("date",dayjs(new Date(year,month - 1)).format("YYYY-MM"))
    openUpdateSalary()
  }
  
  const getData = async (month: number, year: number) => {
    await getListUserWorking(dayjs(new Date(year,month - 1)).format("YYYY-MM"))
    .then((res: any)=>{
      setData(res.data.result)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.data.totalItems,
          // total: 100,
        },
      })
    })
    .catch((error: any)=>{
      toast.error(error.message)
    })
  } 

  useEffect(()=>{
    getData(month,year)
  },[month,year])

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };


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
        render: (value) => (<p>{(value / 3600).toFixed(2)} hours</p>),
        sorter: (a, b) => a.timeWork - b.timeWork,
      },
      {
        title: 'Base Salary',
        dataIndex: 'baseSalary',
        key: 'baseSalary',
        // ...getColumnSearchProps('baseSalary'),
        render: (value) => (<p>{formatPrice(value)} VND</p>),
        sorter: (a, b) => a.baseSalary - b.baseSalary,
        // width: '30%',
        // sortDirections: ['descend', 'ascend'],
      },
      {
          title: 'Received',
          dataIndex: 'received',
          key: 'age',
          width: '20%',
          render: (value) => (<p>{formatPrice(value)} VND</p>),
          // ...getColumnSearchProps('received'),
      },
      {
        title: 'Action',
        dataIndex: '',
        key: '',
        render: (value: any, record: any, index: number)=>(
          <div className="flex flex-row gap-3">
            <EditOutlined 
              className="cursor-pointer"
              title="Edit user information"
              onClick={()=>{
                handleUpate(record._id)
              }}
            />
            {/* <FolderAddOutlined 
              className="cursor-pointer"
              title="Add image trainning for user"
              // onClick={openAddUserImages}
            /> */}
          </div>
        )
      },
  ];

  const monthOption: MenuProps['items'] = useMemo(()=>{
    const monthOption: MenuProps['items'] = []
    for (let i = 1;i<=12;i++){
      const month = {
        key: i.toString(),
        label: (
          <div onClick={()=>{setMonth(i)}}>
            <span>Month {i}</span>
          </div>
        ),
      }
      monthOption.push(month)
    }
    return monthOption
  },[])

  const yearOption: MenuProps['items'] = useMemo(()=>{
    const yearOption: MenuProps['items'] = []
    for (let i = new Date().getFullYear();i>=2020;i--){
      const year = {
        key: i.toString(),
        label: (
          <div onClick={()=>{setYear(i)}}>
            <span>{i}</span>
          </div>
        ),
      }
      yearOption.push(year)
    }
    return yearOption
  },[])

  return (
    <div className={style.user_management_wrapper}>
      {/* <p className={style.user_management_title}>Salary Management</p> */}
      <div className="flex justify-between	">
        <div className="flex gap-10 items-center">
          <p style={{
            display:'flex',
            marginBottom:'20px',
            fontFamily:"sans-serif",
            fontSize:'25px',
            fontWeight:600
          }}>Salary Management</p>
          <span className="mb-[20px] text-[15px]">{month}/{year}</span>
        </div>
        <div className="flex gap-10">
          <Dropdown menu={{ items: monthOption}}>
            <a onClick={(e) => e.preventDefault()}>
              <span>Select month</span>
            </a>
          </Dropdown>
          <Dropdown menu={{ items: yearOption }}>
            <a onClick={(e) => e.preventDefault()}>
              <span>Select year</span>
            </a>
          </Dropdown>
        </div>
      </div>
      <Table columns={columns} dataSource={data} className={style.user_management_table}/>
    </div>
  )
}
export default Page;
Page.Layout = Layout
Page.requireAuth = true