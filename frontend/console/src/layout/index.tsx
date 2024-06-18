import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import NavBar from "./NavBar";

const { Header, Content, Footer, Sider } = Layout;

const AppLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div
                    style={{
                        lineHeight: "64px",
                        height: "32px",
                        margin: "16px",
                        backgroundColor: "#fff3",
                    }}
                ></div>
                <SideMenu />
            </Sider>
            <Layout>
                <Header style={{ padding: "0 16px", background: "#fff" }}>
                    <NavBar />
                </Header>
                <Content
                    style={{
                        margin: "16px",
                        minHeight: "calc(100% - 144px)",
                    }}
                >
                    <Outlet></Outlet>
                </Content>
                <Footer style={{ textAlign: "center", padding: 0, lineHeight: "48px" }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
