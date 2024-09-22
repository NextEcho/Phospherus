import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IconItemProps {
    path: string;
    children: ReactNode;
}

const IconItem: React.FC<IconItemProps> = ({ path, children }) => {
    const currPath = useLocation();

    const navigateTo = useNavigate();
    const handleMenuClick = (path: string) => {
        navigateTo(path);
    };

    return (
        <div
            className={`edit transition duration-300 flex items-center pl-6 pr-6 py-2 mb-4 w-full
                              hover:bg-[#1D2339] hover:cursor-pointer 
                              ${currPath.pathname === path ? "bg-[#212842]" : ""}`}
            onClick={() => handleMenuClick(path)}
        >
            {children}
        </div>
    );
};

export default IconItem;
