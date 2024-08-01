import logo from "@/assets/images/logo.png";
import MenuItem from "@/components/MenuItem/index";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate("/")
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center w-full h-16 px-10 z-50 bg-main">
        <div className="flex flex-row justify-between w-full bg-transparent text-black leading-8 max-w-5xl">
          <div className="logo-zone flex h-8 hover:cursor-pointer" onClick={handleClickLogo}>
            <img
              src={logo}
              alt=""
              style={{
                width: "35px",
                height: "35px",
              }}
            />
            <div className="ml-2 text-green-50 font-code">NextEcho's Blog</div>
          </div>
          <div className="menu-zone text-slate-50 h-8 flex flex-row justify-center items-center">
            <MenuItem title="Home" to="/" />
            <MenuItem title="About" to="/about" />
            <MenuItem title="Archive" to="/archive" />
            <MenuItem title="Tag" to="/tag" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
