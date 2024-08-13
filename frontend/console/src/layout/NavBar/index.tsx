const NavBar = () => {
  return (
    <>
      <div
        className="navigation relative flex justify-between items-center h-full
                    after:top-0 after:left-0 after:absolute after:bg-nav after:shadow-[0_0_50px_30px_#000000]
                    after:w-full after:h-full after:bg-cover after:bg-center after:opacity-10
                    shadow-xl py-0 px-10"
      >
        <div className="left-zone flex">
          <div className="avatar bg-avatar bg-cover w-24 h-24 rounded-full"></div>
          <div className="info ml-4 font-main text-lg flex flex-1 flex-col justify-around">
            <div className="name">NextEcho</div>
            <div className="career text-xs text-gray-400">Web3 Developer</div>
          </div>
        </div>
        <div className="right-zone">右侧菜单栏</div>
      </div>
    </>
  );
};

export default NavBar;
