import Layout from "@/components/Layout";
import {
  EyeOutlined
} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table, TablePaginationConfig } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import style from '@/assets/css/user-management.module.css'
import {getListUserWorking, getUserAttendance} from "@/services/api/working.api";
import toast from "react-hot-toast";
import dayjs from 'dayjs'
import {formatPrice} from "@/utils/Format";
import {useToggleModal} from "@/hooks/application.hooks";
import {ApplicationModal} from "@/reducer/app.reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {setAttendancesInfor} from "@/reducer/working.reducer";
// import 'dayjs/locale/vi'; 

interface Props {

}

interface DataType {
  _id: string
  name: string
  email: string
  gender: string
  phoneNumber: string
  workings: any[]
  timeWork:number
  baseSalary: number
  received: number
  date: string
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

type DataIndex = keyof DataType;

function Page({}:Props) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const dispatch = useDispatch<AppDispatch>()
  const searchInput = useRef<InputRef>(null);
  const openDetailWorkingView = useToggleModal(ApplicationModal.DETAIL_WORKING_VIEW)

  const [data, setData] = useState<DataType[]>()
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total:100
    },
  });
  
  const getData = async () => {
    await getListUserWorking(dayjs(new Date()).format("YYYY-MM"))
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
    getData()
  },[])

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
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Time work',
      dataIndex: 'timeWork',
      key: 'timeWork',
      width: '20%',
      render: (value) => (<p>{(value / 3600).toFixed(2)} hours</p>),
      sorter: (a, b) => a.timeWork - b.timeWork,
      // ...getColumnSearchProps('timeWork'),
    },
    {
      title: 'Base Salary',
      dataIndex: 'baseSalary',
      key: 'baseSalary',
      // ...getColumnSearchProps('baseSalary'),
      sorter: (a, b) => a.baseSalary - b.baseSalary,
      render: (value) => (<p>{formatPrice(value)} VND</p>),
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

  const getAttendanceInfor = async (userId: string, date: string) =>{
    console.log(userId,date);
    await getUserAttendance(userId,date)
    .then((res: any)=>{
      dispatch(setAttendancesInfor(res.data.result))
      openDetailWorkingView()
    })
    .catch((error: any)=>{
      toast.error(error.message)
    })
  }

  const renderExpandTable = (workings: any[]) =>{
    return (
      <Table 
        key={"aasd"}
        style={{
          border:'1px solid black',
          borderRadius:'6px'
        }}
        dataSource={workings} 
        pagination={false}
        columns={[
          {
            title: 'Date',
            dataIndex: 'date',
            width:'40%',
            key: 'date',
            render: (value) => (<p>{dayjs(value).format('dddd')} {dayjs(value).format("DD/MM/YYYY")}</p>),
          },
          {
            title: 'Time work',
            dataIndex: 'timeWork',
            key: 'timeWork',
            render: (value) => (<p>{(value / 3600).toFixed(2)} hours</p>),
            sorter: (a, b) => a.timeWork - b.timeWork,
          },
          {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (value: any, record: any, index: number) => 
              <EyeOutlined 
                onClick={()=>{
                  getAttendanceInfor(record.user, record.date)
                }}  
              />,
          }
        ]} 
      />
    )
  }
  
  return (
    <div className='user_management_wrapper'>
        <div className="working_management_header">
          <p className="working_management_title">Working Management</p>
          <div></div>
        </div>
        <Table 
          columns={columns} 
          expandable={{
            expandedRowRender: (record) => (
              <div key={record._id}>
                {
                  record.workings.length == 0 ? (
                    <p style={{ margin: 0 }}>No attendance this month</p>
                  ):(
                    <>
                      {
                        renderExpandTable(record.workings)
                      }
                    </>
                  )
                }
                {/* <p style={{ margin: 0 }}>{record.phoneNumber}</p> */}
              </div>
            ),
            // rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          dataSource={data} 
          className={style.user_management_table}
          rowKey={(record) => record._id}
          pagination={tableParams.pagination}
          //@ts-ignore
          onChange={handleTableChange}
        />
    </div>
  )
}
export default Page;
Page.Layout = Layout
Page.requireAuth = true