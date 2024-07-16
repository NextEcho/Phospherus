import logo from "@/assets/images/logo.png";
import MenuItem from "@/components/MenuItem/index";
import { useLocation } from "react-router-dom";
const NavBar = () => {

  const currPath = useLocation();

  return (
    <>
      <div className="fixed top-0 left-0 flex flex-row justify-center items-center w-full h-16 bg-transparent px-10 backdrop-blur-md z-50">
        <div className="flex flex-row justify-between w-full bg-transparent text-black leading-8 max-w-5xl">
          <div className="flex text-slate-50 h-8">
            <img src={logo} alt="" style={{
              width: "35px",
              height: "35px",
            }} />
            <div className="ml-2 font-serif">NextEcho's Blog</div>
          </div>
          <div className="text-slate-50 h-8 flex flex-row justify-center items-center">
            <MenuItem title="Home" to="/" />
            <MenuItem title="Archive" to="/archive" />
            <MenuItem title="Tag" to="/tag" />
            <MenuItem title="About" to="/about" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
