import style from "@/assets/css/user-management.module.css";
import Layout from "@/components/Layout";
import { STATUS_REQUEST } from "@/constants/value";
import { useToggleModal } from "@/hooks/application.hooks";
import { authSelector } from "@/reducer";
import { ApplicationModal } from "@/reducer/app.reducer";
import {
  getOrderListSuccess
} from "@/reducer/order.reducer";
import { getRolePermissionPending } from "@/reducer/role.reducer";
import { acceptSupplierAPI, listRequestSupplierAPI } from "@/services/api/product.api";
import { IUser } from "@/types";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  InputRef, Space,
  Table,
  TablePaginationConfig
} from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type {
  FilterConfirmProps,
  FilterValue
} from "antd/es/table/interface";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// import {getListRequest} from "@/services/api/request.apt";

interface Props { }

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

interface DataType {
  companyName:string;
  contactEmail:string;
  contactPhone: string;
  address: string;
  status: string;
  userID: IUser;
}

type DataIndex = keyof DataType;
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
function Page({ }: Props) {
  const openUpdateRoleView = useToggleModal(
    ApplicationModal.UPDATE_ROLE_VIEW
  );
  const router = useRouter();

  const dispatch = useDispatch();
  const  [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  // const [data, setData] = useState<DataType[]>();
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 100,
    },
  });
  const { roleName } = useSelector(authSelector);

  const handleUpate = async (id: string) => {
    localStorage.setItem("userId", id);
    localStorage.setItem(
      "date",
      dayjs(new Date(year, month - 1)).format("YYYY-MM")
    );
    // openUpdateSalary();
  };

  // const getData = async (month: number, year: number) => {
  //   await getListUserWorking(dayjs(new Date(year,month - 1)).format("YYYY-MM"))
  //   .then((res: any)=>{
  //     setData(res.data.result)
  //     setTableParams({
  //       ...tableParams,
  //       pagination: {
  //         ...tableParams.pagination,
  //         total: res.data.totalItems,
  //         // total: 100,
  //       },
  //     })
  //   })
  //   .catch((error: any)=>{
  //     toast.error(error.message)
  //   })
  // }

  const getData = async () => {
    getRolePermissionPending("");
    await Promise.all([
      listRequestSupplierAPI()
    ])
      .then((res: any) => {
        setData(res[0]?.data);
      })
      .catch((error: any) => {
        dispatch(getOrderListSuccess([]));
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getData();
  }, [router?.pathname]);
  console.log(data);
  
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const onUpdateRole = (role: any) => {
    localStorage.setItem("role", JSON.stringify(role));
    openUpdateRoleView();
  };
  const onAcceptRequest = (record:any) => {
    try {
      
      acceptSupplierAPI({
        ids: [record?._id]
      }).then((res)=> {
        console.log(res);
        
        toast.success("Accept to Supplier success");
        setTimeout(() => {
          router.reload();
        }, 1000);
      })
    } catch (err:any) {
      toast.error(err.message);
    }
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      width: "30%",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
      ...getColumnSearchProps("companyName"),
    },
    {
        title: "Requester",
        dataIndex: "userID",
        key: "userID",
        ...getColumnSearchProps("userID"),
        width: "20%",
        sortDirections: ["descend", "ascend"],
      render: ((value: any, record: DataType) => {
        console.log(record);
        const { firstName, lastName} = record?.userID
        return <span>
          {firstName + ' ' + lastName}
        </span>
      })
    },
    {
      title: "Contact Email",
      dataIndex: "contactEmail",
      key: "contactEmail",
      width: "30%",
      sorter: (a, b) => a.contactEmail.localeCompare(b.contactEmail),
      ...getColumnSearchProps("contactEmail"),
    },
    {
      title: "Phone",
      dataIndex: "contactPhone",
      key: "contactPhone",
      width: "30%",
      sorter: (a, b) => a.contactPhone.localeCompare(b.contactPhone),
      ...getColumnSearchProps("contactPhone"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "30%",
      sorter: (a, b) => a.address.localeCompare(b.address),
      ...getColumnSearchProps("address"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
      width: "20%",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ["descend", "ascend"],
      render: (text) => {
        console.log(text);
        
        return  (
          <span
            className={`cursor-pointer ${text === STATUS_REQUEST.ACCEPTED
              ? "text-green-500"
              : text === STATUS_REQUEST.REJECTED
                ? "text-red-500"
                : ""
              }`}
          >
            {text}
          </span>
        )
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (value: any, record: any, index: number) => (
        <div className="flex flex-row gap-3">
          <CheckCircleOutlined
            className={`cursor-pointer ${record.status === STATUS_REQUEST.ACCEPTED
              ? "bg-green-500 rounded-md"
              : ""
              }`}
            title="Edit user information"
            onClick={() => {

              onAcceptRequest(record);
            }}
          />
          <CloseCircleOutlined
            className={`cursor-pointer ${record.status === STATUS_REQUEST.REJECTED
              ? "bg-red-500 rounded-md"
              : ""
              }`}
            title="Edit user information"
            onClick={() => {
              // // record.statusOrder === STATUS_REQUEST.REJECTED
              // //   ? {}
              // onCancelOrder(record);
            }}
          />
          <DeleteOutlined
            className="cursor-pointer"
            title="Training face"
            // onClick={() => { onDeleteOrder(record) }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={style.user_management_wrapper}>
      <div className="flex justify-between	">
        <div className="flex gap-10 items-center">
          <p
            style={{
              display: "flex",
              marginBottom: "20px",
              fontFamily: "sans-serif",
              fontSize: "25px",
              fontWeight: 600,
            }}
          >
            Request to Supplier
          </p>
          <span className="mb-[20px] text-[15px]">
            {month}/{year}
          </span>
        </div>
      </div>
      <Table
        // loading={}
        columns={columns}
        dataSource={data}
        className={style.user_management_table}
      />
    </div>
  );
}
export default Page;
Page.Layout = Layout;
Page.requireAuth = true;
