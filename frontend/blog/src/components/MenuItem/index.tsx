import { useLocation, useNavigate } from "react-router-dom";

interface MenuItemProps {
  title: string;
  to: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, to }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  }

  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div className={`transition duration-300 border border-solid border-slate-800 rounded-xl pl-3 pr-3 hover:bg-indigo-500 
      cursor-pointer text-sm mr-3 pt-1 pb-1 min-w-20 text-center font-serif ${isActive ? "bg-indigo-500" : ""}`}
      onClick={handleClick}
    >
      {title}
    </div>
  )
};

export default MenuItem;
