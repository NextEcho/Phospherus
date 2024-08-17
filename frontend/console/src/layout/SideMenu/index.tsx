import React, { useState } from "react";
import {
    DesktopOutlined,
    EditOutlined,
    FileOutlined,
    TagOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate, useLocation, Location } from "react-router-dom";

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
    getItem("Dashboard", "/console/home", <DesktopOutlined />),
    getItem("User", "/console/user", <UserOutlined />),
    getItem("Tag", "/console/tag", <TagOutlined />),
    getItem("Article", "/console/article", <FileOutlined />),
    getItem("Edit", "/console/edit-article", <EditOutlined />),
];

const SideMenu: React.FC = () => {
    // 菜单栏默认高亮，由路由决定
    const currPath = useLocation();

    // initialOpenKey 初始展开菜单项
    let initialOpenKey: string = handleOpenPath(currPath);
    const [openKeys, setOpenKeys] = useState<string[]>([initialOpenKey]);
    const handleOpenChange = (keys: string[]) => {
        // 只展开最新点开的菜单项
        setOpenKeys([keys[keys.length - 1]]);
    };

    // 菜单项点击事件
    const navigationTo = useNavigate();
    const handleMenuClick = (e: { key: string }) => {
        navigationTo(e.key);
    };

    const handleClickLogo = () => {
        navigationTo("/console/home");
        window.location.reload();
    };


    return (
        <div>
            <div
                className="logo w-full h-8 flex justify-center my-4 hover:cursor-pointer"
                onClick={handleClickLogo}
            >
                <div className="w-8 h-8 bg-logo bg-cover"></div>
            </div>
            <Menu
                theme="dark"
                defaultSelectedKeys={[currPath.pathname]}
                mode="inline"
                items={items}
                onClick={handleMenuClick}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
            />
        </div>
    );
};

export default SideMenu;

// handleOpenPath 寻找要展开的菜单的父级菜单
const handleOpenPath = (currPath: Location): string => {
    let lastIdx = currPath.pathname.lastIndexOf("/");
    return currPath.pathname.slice(0, lastIdx);
};
