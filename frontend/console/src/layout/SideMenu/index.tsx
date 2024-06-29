import React, { useState } from "react";
import { DesktopOutlined, EditOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate, useLocation, Location } from "react-router-dom";
import styles from "./index.module.scss";

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
    getItem("主页面", "/console/home", <DesktopOutlined />),
    getItem("用户管理", "/console/user", <UserOutlined />),
    getItem("文章管理", "/console/article", <FileOutlined />),
    getItem("文章编辑", "/console/edit-article", <EditOutlined />),
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

    return (
        <>
            <Menu
                theme="dark"
                defaultSelectedKeys={[currPath.pathname]}
                mode="inline"
                items={items}
                onClick={handleMenuClick}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
                className={styles.sideMenuContainer}
            />
        </>
    );
};

export default SideMenu;

// 寻找要展开的菜单的父级菜单
const handleOpenPath = (currPath: Location): string => {
    let lastIdx = currPath.pathname.lastIndexOf("/");
    return currPath.pathname.slice(0, lastIdx);
};
