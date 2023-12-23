import { ROLE_NAMES } from "@/constants/value";
import { useToggleModal } from "@/hooks/application.hooks";
import { authSelector } from "@/reducer";
import { ApplicationModal } from "@/reducer/app.reducer";
import {
  DashboardOutlined,
  DollarCircleOutlined, MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UsergroupDeleteOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import "./Layout.css";
import { LayoutPageProps } from "./Layout.types";

const { Header, Sider, Content } = Layout;
const PageLayout: FC<LayoutPageProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { roleName,user } = useSelector(authSelector);
  const [itemsMenu,setItemsMenu] = useState<{
    key: string;
    icon: JSX.Element;
    label: string;
    onClick: () => void;
    }[]>( [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: "Dashboard",
        onClick: () => {
          router.push("/dashboard");
        },
      },
      {
        key: "2",
        icon: <UsergroupDeleteOutlined />,
        label: "User Management",
        onClick: () => {
          router.push("/user-management");
        },
      },
      // {
      //   key: "3",
      //   icon: <FieldTimeOutlined />,
      //   label: "Working Management",
      //   onClick: () => {
      //     router.push("/working-management");
      //   },
      // },
      {
        key: "4",
        icon: <DollarCircleOutlined />,
        label: "Product Management",
        onClick: () => {
          router.push("/product-management");
        },
      },
      {
        key: '5',
        icon: <DollarCircleOutlined />,
        label: 'Order Management',
        onClick: () =>{
          router.push('/order-management')
        }
      },
      {
        key: "6",
        icon: <UploadOutlined />,
        label: "Requests",
        onClick: () => {
          router.push("/requests");
        },
      },
      {
        key: "7",
        icon: <UserOutlined />,
        label: "Roles",
        onClick: () => {
          router.push("/roles");
        },
      },
    ])
  const openChangePassword = useToggleModal(
    ApplicationModal.CHANGE_PASSWORD_VIEW
  );
  const openLogout = useToggleModal(ApplicationModal.LOGOUT_VIEW);
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/account">Account</Link>,
    },
    {
      key: "2",
      label: <div onClick={openChangePassword}>Change password</div>,
    },
    {
      key: "3",
      label: <div onClick={openLogout}>Logout</div>,
    },
  ];

  const currentSelect = useMemo(() => {
    let select = "0";

    switch (router.pathname) {
      case "/dashboard":
        select = "1";
        break;
      case "/user-management":
        select = "2";
        break;
      // case "/working-management":
      //   select = "3";
      //   break;
      case "/product-management":
        select = "4";
        break;
      case '/order-management':
        select = '5'
      break
      case "/requests":
        select = "6";
        break;
      case "/roles":
        select = "7";
        break;
      default:
        break;
    }
    return select;
  }, [router.pathname]);

  useEffect(()=> {
    if (roleName === ROLE_NAMES.SELLER) { 
      setItemsMenu([...itemsMenu?.filter((item )=> item?.key === "4" || item?.key === "5" )])
    }
  },[roleName])
  return (
    <Layout className="wrapper">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <p>Admin</p>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentSelect]}
          items={[...itemsMenu]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            arrow
            className="avatar"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p
                style={{
                  marginRight: "10px",
                  fontFamily: "sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                {user?.account?.userName}
              </p>
              <div className="w-[40px] h-[40px] overflow-hidden rounded-[40px]">
                {/* <Image 
                  src={`${process.env.NEXT_PUBLIC_API_URL}${userInfo?.profilePicture}`}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  style={{
                      resize:"both"
                  }}
                /> */}
              </div>
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default PageLayout;
