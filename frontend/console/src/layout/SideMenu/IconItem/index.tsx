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
            className={`edit transition duration-300 flex items-center justify-start px-4 py-2 my-1 w-full
                        rounded-lg hover:bg-gradient-to-r from-[#1D2339] to-[#2A3352] hover:cursor-pointer 
                        ${currPath.pathname === path ? "bg-gradient-to-r from-[#212842] to-[#2E3A5C]" : ""}`}
            onClick={() => handleMenuClick(path)}
        >
            <div className="rounded-md p-2">
                {children}
            </div>
        </div>
    );
};

export default IconItem;
