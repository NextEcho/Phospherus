import React from "react";
import { DesktopOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem("Home", "/console/home", <DesktopOutlined />),
    getItem("User", "/console/user", <UserOutlined />),
];

const SideMenu: React.FC = () => {
    const navigationTo = useNavigate();
    const handleMenuClick = (e: { key: string }) => {
        navigationTo(e.key);
    };
    // 菜单栏默认高亮，由路由决定
    const location = useLocation();
    return (
        <>
            <Menu
                theme="dark"
                defaultSelectedKeys={[location.pathname]}
                mode="inline"
                items={items}
                onClick={handleMenuClick}
            />
        </>
    );
};

export default SideMenu;
