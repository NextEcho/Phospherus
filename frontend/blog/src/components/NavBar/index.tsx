import logo from "@/assets/images/logo.png";
import MenuItem from "@/components/MenuItem/index";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const handleClickLogo = () => {
        navigate("/");
    };

    const handleOpenConsole = () => {
        window.open("http://127.0.0.1:9000", "_blank");
    };

    return (
        <div>
            <div className="flex flex-row justify-center items-center w-full h-16 px-10 z-50 bg-main">
                <div className="flex flex-row justify-between w-full bg-transparent text-black leading-8 max-w-5xl">
                    <div
                        className="logo-zone flex h-8 hover:cursor-pointer"
                        onClick={handleClickLogo}
                    >
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
                        <MenuItem title="Home" target="/" />
                        <MenuItem title="About" target="/about" />
                        <MenuItem title="Archive" target="/archive" />
                        <MenuItem title="Tag" target="/tag" />
                        <div
                            className="console-entrance cursor-pointer ml-4 transition duration-300 hover:scale-125 opacity-50 hover:opacity-100"
                            onClick={handleOpenConsole}
                        >
                            <a>
                                <svg
                                    className="icon"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="4523"
                                    id="mx_n_1723475572362"
                                    width="24"
                                    height="24"
                                >
                                    <path
                                        d="M510.924822 28.814784c-266.787624 0.573429-482.540109 217.472771-481.966681 484.260394C29.674927 779.862803 246.574269 995.615288 513.361893 994.898502c266.787624-0.716786 482.540109-217.472771 481.823323-484.260395 0.860143-265.210696-213.458771-480.963181-478.812823-481.823323-1.720286-0.143357-3.583928 0-5.447571 0z m125.867562 97.626207c-0.430071 2.867143-2.867143 6.737785 0.430072 8.314714-31.108498 21.360213-65.657567 65.657567-84.150637 115.689206-4.874143 7.741285-8.744785 9.174857-44.727426 3.440571-23.367213-6.307714-53.042139-10.751785-76.409352 6.307714-8.027999 5.877642-14.192356 13.762285-17.919641 22.793784-7.741285 13.47557-12.902142 28.384712-15.052499 43.723926v0.430071c-4.444071 32.542069 3.440571 68.094638 22.363712 104.077279 2.007 4.730785 4.300714 9.174857 6.737786 13.618927 1.290214 2.150357 2.437071 4.444071 3.440571 6.737786l0.430071 1.003499c1.290214 3.583928 2.007 7.311214 2.007 11.181857-16.342713-21.646927-36.98614-39.423212-60.783424-52.468711-27.667927-17.059499-59.063139-27.094498-91.461851-29.244855-10.034999-0.430071-19.926641-2.723786-29.244855-6.737785l-0.430071-0.430072c-3.870643-7.741285-1.433571-21.933641 7.311213-39.423211v-1.0035c16.48607-44.727425 15.625927-79.706566-3.870642-103.50385l-0.430072-0.430071-0.430071-0.430072c-1.0035-1.0035-2.007-2.437071-3.440571-3.870642-2.007-2.723786-4.444071-5.304214-7.311214-7.311214l-6.737785-7.741285A409.614336 409.614336 0 0 1 510.351393 105.654207c43.150497-1.0035 86.01428 6.164357 126.440991 20.786784z m-531.99832 384.197116c-0.143357-84.867423 26.807784-167.727845 76.839423-236.252555l17.489571 1.433572c-1.0035 8.601428-3.440571 17.059499-7.311214 24.800784-17.919642 43.293854-18.49307 80.710066-1.433572 109.954921 23.367213 39.853283 73.972281 47.164497 89.884923 49.601567h0.430071c27.667927 3.870643 66.087638 9.174857 96.335993 49.601568 16.48607 22.793784 39.853283 35.98264 63.650567 35.982641 10.465071 0 20.786784-2.437071 30.104998-7.311214 36.98614-19.49657 53.042139-71.535209 36.986141-118.699706-1.720286-5.447571-3.727285-10.895142-6.307714-16.055999-2.437071-5.304214-4.874143-10.751785-6.737786-16.055999v-0.573428l-0.430071-0.430072c-9.461571-18.062999-13.47557-38.563069-11.611928-58.776424v-4.444071c5.447571 0.716786 10.751785 1.720286 16.055999 2.867142l6.307714 1.433572 2.007 0.430071c17.059499 3.440571 40.426711 8.314714 63.220496 3.440571 28.241355-5.877642 48.167997-24.370713 59.779924-54.905782 19.49657-54.47571 74.832423-95.332493 97.196136-105.510849l9.748285-4.444071c107.947921 74.832423 181.346773 200.269915 181.346773 341.763404-0.286714 44.727425-8.027999 89.02478-22.793784 131.315134-1.0035-2.437071-2.007-4.444071-2.867143-6.737785l-0.430071-1.433572-1.0035-1.0035c-10.034999-12.615428-22.793784-22.793784-37.416212-29.674926-14.192356-9.031499-30.821784-13.762285-47.594568-13.618928h-2.867142c-6.307714-6.737785-13.188856-19.49657-21.360213-39.853283l-0.430072-0.430071c-1.433571-2.867143-2.867143-6.307714-4.444071-9.748285-5.304214-12.328713-11.898642-23.797284-19.926641-34.549069-9.748285-15.625927-27.237855-29.674927-50.03164-40.426712-1.0035-0.430071-1.433571-0.430071-2.006999-1.003499-24.944141-13.332213-52.898782-20.356713-81.140138-20.356713-32.111998 2.007-93.325493 15.052499-138.052919 97.769564-3.727285 6.451071-6.737785 13.332213-8.744785 20.356713a138.018513 138.018513 0 0 0 2.007 118.126278c17.059499 36.412712 45.730925 67.091138 70.961781 92.321993 5.304214 5.304214 11.611928 12.185356 17.48957 18.49307s10.178356 11.181856 14.048999 15.052499c37.98964 47.594568 42.720426 78.703066 41.286854 96.335994-36.699426 8.458071-74.258995 12.615428-111.818563 12.615427-225.930841 4.587428-406.417472-176.329273-406.417472-401.399972z m590.918102 361.259975c-6.737785-38.419712-25.230855-75.405852-54.905782-112.822064-11.038499-13.618928-22.650427-26.52107-34.979141-38.849783-51.035139-53.042139-75.835923-91.461851-53.902281-129.308133 21.360213-38.849783 48.167997-59.349853 79.706565-61.213496 30.678426-2.007 54.47571 15.625927 56.912782 20.356713l0.430072 1.0035 0.430071 1.0035c4.444071 6.164357 8.027999 12.902142 10.751785 19.926641 2.437071 4.874143 4.874143 10.178356 7.311214 15.052499l2.007 3.870643c19.49657 38.419712 40.856783 82.143637 100.636707 84.580708h0.430071c6.881142 0 13.47557 2.580428 18.49307 7.311214 4.444071 6.307714 12.615428 24.800784 9.748285 72.96878-40.426711 47.02114-88.881422 86.300994-143.070418 116.119278z"
                                        p-id="4524"
                                        fill="#7e71ec"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
