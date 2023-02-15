import React, { FC, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  DollarCircleOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, LayoutProps, Menu, MenuProps, theme } from 'antd';
import './Layout.css'
import Link from 'next/link';
// import '@/app/globals.css'

const { Header, Sider, Content } = Layout;
const PageLayout: FC<LayoutProps> = ({
    children
}) =>{
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link  href="/">
          Account
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href="/">
          Change password
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link href="/">
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
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'User Management',
            },
            {
              key: '3',
              icon: <DollarCircleOutlined />,
              label: 'Salary Management',
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: 'Report',
            },
            {
              key: '5',
              icon: <UploadOutlined />,
              label: 'Request',
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
              <p style={{marginRight:'10px'}}>Đặng Quốc Thắng</p>
              <Avatar size={30} icon={<UserOutlined />} />
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