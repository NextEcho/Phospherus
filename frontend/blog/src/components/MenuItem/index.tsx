import { useLocation, useNavigate } from "react-router-dom";

interface MenuItemProps {
    title: string;
    target: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, target }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(target);
    };

    const location = useLocation();
    const isActive = location.pathname === target;

    return (
        <>
            <a
                className={`transition duration-300  pl-3 pr-3 hover:bg-indigo-700/50 cursor-pointer text-sm mx-1 pt-1 pb-1 
                    rounded-md min-w-20 text-center font-code ${isActive ? "bg-indigo-500" : ""}`}
                onClick={handleClick}
            >
                {title}
            </a>
        </>
    );
};

export default MenuItem;
