import Layout from "@/components/Layout";
import {
    CheckOutlined,
    StopOutlined
} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { InputRef, Tag } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType, TablePaginationConfig } from 'antd/es/table';
import type { FilterConfirmProps, FilterValue } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import style from '@/assets/css/user-management.module.css'
import toast from "react-hot-toast";
import {getListRequest} from "@/services/api/request.api";
import {useToggleModal} from "@/hooks/application.hooks";
import {ApplicationModal} from "@/reducer/app.reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@/store/store";
import {setListRequest} from "@/reducer/request.reducer";

interface Props {

}

interface DataType {
    key: string;
    _id: string
    type: {
        _id: string
        name: string
    };
    status:number;
    body: number;
    user:{
        _id: string
        name: string
    };
    date: string
    startTime: string
    endTime: string
}

type DataIndex = keyof DataType;

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
  }

function Page({}:Props) {
    const openAddRequestType = useToggleModal(ApplicationModal.ADD_REQUEST_TYPE)
    const openUpdateRequest = useToggleModal(ApplicationModal.UPDATE_REQUEST_STATUS_VIEW)
    const { requests } = useSelector((state: any) => state.request)
    const dispatch = useDispatch<AppDispatch>()
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const [tableParams, setTableParams] = useState<TableParams>({
      pagination: {
        current: 1,
        pageSize: 10,
        total:100
      },
    });
  
    const getData = async () => {
      await getListRequest({})
      .then((res: any)=>{
        const result = {
            requests: res.data.result,
            totalItems: res.data.totalItems
        }
        dispatch(setListRequest(result))
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
          dataIndex: 'user',
          key: 'name',
          width: '20%',
          render: (value)=>(<p>{value.name}</p>),
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
          render: (value)=>(<p>{value.name}</p>)
        },
        {
            title: 'Content',
            dataIndex: 'body',
            key: 'body',
            ...getColumnSearchProps('body'),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps('date'),
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            ...getColumnSearchProps('startTime'),
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
            ...getColumnSearchProps('endTime'),
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (value)=>{
              switch (value) {
                case 0:
                    return (
                        <Tag color={'red'} key={value}>
                            <p>Reject</p>
                        </Tag>
                    )
                    break;
                case 1:
                    return (
                        <Tag color={'orange'} key={value}>
                            <p>Pending</p>
                        </Tag>
                    )
                case 2:
                    return (
                        <Tag color={'cyan'} key={value}>
                            <p>Accept</p>
                        </Tag>
                    )
                default:
                    return (
                        <p></p>
                    )
              }
          }
        },
        {
            title: 'Action',
            dataIndex: '',
            render: (value: any, record: DataType, index: number) =>(
            <div className="flex gap-3">
                <CheckOutlined 
                    size={40}
                    className="cursor-pointer"
                    title="Accecpt request"
                    alt="Accecpt request"
                    onClick={()=>{
                        localStorage.setItem('requestId',record._id)
                        localStorage.setItem('requestStatus','2')
                        openUpdateRequest()
                    }}
                />
                <StopOutlined 
                    className="cursor-pointer "
                    color="Green"
                    alt="Reject request"
                    title="Reject request"
                    onClick={()=>{
                        localStorage.setItem('requestId',record._id)
                        localStorage.setItem('requestStatus','0')
                        openUpdateRequest()
                    }}
                />
            </div>)
        },
      ];

    return (
      <div className={style.user_management_wrapper}>
        <div className="user_management_header">
            <p className="user_management_title">Request Management</p>
            <Button 
                type="default"
                size="large"
                onClick={openAddRequestType}
            >
                Add type
            </Button>
        </div>
          <Table columns={columns} dataSource={requests} className={style.user_management_table}/>
      </div>
    )
}
export default Page;
Page.Layout = Layout
Page.requireAuth = true