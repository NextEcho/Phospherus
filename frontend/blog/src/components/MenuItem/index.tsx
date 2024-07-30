import { useLocation, useNavigate } from "react-router-dom";

interface MenuItemProps {
  title: string;
  to: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, to }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };

  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <>
      <a
        className={`transition duration-300  pl-3 pr-3 hover:bg-indigo-400 
      cursor-pointer text-sm mx-1 pt-1 pb-1 min-w-20 text-center font-code ${
        isActive ? "bg-indigo-500" : ""
      }`}
        onClick={handleClick}
      >
        {title}
      </a>
    </>
  );
};

export default MenuItem;
