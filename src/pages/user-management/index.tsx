import Layout from "@/components/Layout";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  EditOutlined,
  FolderAddOutlined,
  ScanOutlined,
} from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, TablePaginationConfig } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type {
  FilterConfirmProps,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import style from "@/assets/css/user-management.module.css";
import { getListUser } from "@/services/api/user.api";
import toast from "react-hot-toast";
import { useToggleModal } from "@/hooks/application.hooks";
import { ApplicationModal } from "@/reducer/app.reducer";
import Link from "next/link";
import { IAccount, IRole, IUser } from "@/types";

interface Props {}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

interface DataType {
  _id: number;
  name: string;
  email: string;
  roles: string;
  gender: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  Address: string;
  dayOfBirth: string;
  firstName: string;
  isActive: "ACTIVE";
  lastName: string;
  phone: string | number;
  profilePicture: string;
}

type DataIndex = keyof DataType;

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function Page({}: Props) {
  const openAddNewUser = useToggleModal(ApplicationModal.ADD_USER_VIEW);
  const openAddUserImages = useToggleModal(
    ApplicationModal.ADD_USER_IMAGES_TRAINING
  );
  const openUpdateUserView = useToggleModal(ApplicationModal.UPDATE_USER_VIEW);
  const openTrainingFaceView = useToggleModal(ApplicationModal.TRAINING_FACE);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState<DataType[]>();
  const searchInput = useRef<InputRef>(null);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10000,
      total: 10000,
    },
  });

  const openAddImageTraining = (id: string) => {
    localStorage.setItem("userId", id);
    openAddUserImages();
  };

  const openTrainingFace = (id: string) => {
    localStorage.setItem("userId", id);
    openTrainingFaceView();
  };
  const openUpdateUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    openUpdateUserView();
  };

  const getData = async () => {
    await getListUser()
      .then((res: any) => {
        const data = res.data.map((user: IUser) => {
          return {
            ...user,
            roles: user.Roles.map((role: IRole) => {
              return role.roleName;
            }).join(", "),
            name: `${user.firstName} ${user.lastName}`,
            email: user.account?.email || "",
          };
        });
        setData(data);
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>
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
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()) || false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: "15%",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: "25%",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phoneNumber",
      ...getColumnSearchProps("phone"),
      width: "20%",
      render: (value: any) => <Link href={"Tel:" + value}>{value}</Link>,
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      width: "15%",
      ...getColumnSearchProps("roles"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      ...getColumnSearchProps("gender"),
      sortDirections: ["descend", "ascend"],
      render: (value: any) => <p>{value ? "Male" : "Female"}</p>,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (value: any, record: any, index: number) => (
        <div className="flex flex-row gap-3">
          <EditOutlined
            className="cursor-pointer"
            title="Edit user information"
            onClick={() => {
              openUpdateUser(record);
            }}
          />
          <FolderAddOutlined
            className="cursor-pointer"
            title="Add image trainning for user"
            onClick={() => {
              openAddImageTraining(record._id);
            }}
          />
          <ScanOutlined
            className="cursor-pointer"
            title="Training face "
            onClick={() => {
              openTrainingFace(record._id);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="user_management_wrapper">
      <div className="user_management_header">
        <p className="user_management_title">User Management</p>
        <Button type="default" size="large" onClick={openAddNewUser}>
          Create user
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record._id}
        className={style.user_management_table}
        pagination={tableParams.pagination}
        //@ts-ignore
        onChange={handleTableChange}
      />
    </div>
  );
}
export default Page;
Page.Layout = Layout;
Page.requireAuth = true;
