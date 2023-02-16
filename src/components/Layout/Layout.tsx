import React, { FC, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  DollarCircleOutlined,
  DashboardOutlined,
  UsergroupDeleteOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, LayoutProps, Menu, MenuProps, theme } from 'antd';
import './Layout.css'
import Link from 'next/link';
import { LayoutPageProps } from './Layout.types';
import { useRouter } from 'next/navigation';

const { Header, Sider, Content } = Layout;
const PageLayout: FC<LayoutPageProps> = ({
    children,
    select= '1'
}) =>{
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link  href="/account">
          Account
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href="/account/change-password">
          Change password
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link href="/logout">
          Logout
        </Link>
      ),
    },
  ];

  return (
    <Layout className='wrapper'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <p>Admin</p>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[select]}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
              onClick: () =>{
                router.push('/dashboard')
              }
            },
            {
              key: '2',
              icon: <UsergroupDeleteOutlined />,
              label: 'User Management',
              onClick: () =>{
                router.push('/user-management')
              }
            },
            {
              key: '3',
              icon: <DollarCircleOutlined />,
              label: 'Salary Management',
              onClick: () =>{
                router.push('/salary-management')
              }
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: 'Reports',
              onClick: () =>{
                router.push('/reports')
              }
            },
            {
              key: '5',
              icon: <UploadOutlined />,
              label: 'Requests',
              onClick: () =>{
                router.push('/requests')
              }
            },
            {
              key: '6',
              icon: <UserOutlined />,
              label: 'Account',
              onClick: () =>{
                router.push('/account')
              }
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer , display:'flex', justifyContent: 'space-between' , alignItems:'center'}}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Dropdown menu={{ items }} placement="bottomRight" arrow className='avatar'>
            <div style={{display:'flex', alignItems:'center'}}>
              <p style={{
                marginRight:'10px',
                fontFamily:"sans-serif",
                fontSize:'15px',
                fontWeight:500
              }}>Đặng Quốc Thắng</p>
              <Avatar size={40} icon={<UserOutlined />} />
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
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
}
export default PageLayout;