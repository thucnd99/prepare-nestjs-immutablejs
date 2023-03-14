import React, { useEffect } from "react"
import { Button, Layout, Space } from 'antd';
import { Link, Outlet } from "react-router-dom";
import { getCurrentUserStatus } from "../services/auth.service";
import { useQuery } from "react-query";
import Loading from "../components/loading/Loading";

const { Header, Content, Footer } = Layout;

const RQMainLayout: React.FC = () => {
    const { isLoading, isError, data, error } = useQuery('get-current', getCurrentUserStatus,);
    const isLoggedIn = data;
    const loaderMenu = () => {
        if (!isLoggedIn) return <>
            <Button type="primary">
                <Link to="/login">
                    Login</Link>
            </Button>
            <Button type="primary">
                <Link to="/signup">Register</Link>
            </Button>
        </>
        if (isLoading)
            return <Loading size="small" />
        else if (isError){
            console.log(error)
            return <>St when wrong...</>
        }
        else return <>
            <Button type="primary">
                <Link to="/profile">Profile</Link>
            </Button>
            <Button type="primary">
                <Link to="/logout">Logout</Link>
            </Button>
        </>
    }
    return (
        <Layout>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <div
                    style={{
                        float: 'left',
                        width: 120,
                        height: 31,
                        margin: '16px 24px 16px 0',
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                />
                <div style={{ float: "right" }}>
                    <Space align="center">
                        {loaderMenu()}
                    </Space>
                </div>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px' }}>
                <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    )
}

export default RQMainLayout;