const NavBar = () => {
  return (
    <>
      <div className="flex flex-row justify-center items-center w-100 h-16 bg-nav">
        <div className="flex flex-row justify-between w-1/2 bg-nav text-black leading-8 ">
          <div className="logo text-slate-50">LOGO</div>
          <div className="menu text-slate-50">MENU</div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
