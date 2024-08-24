import { useLocation, useNavigate } from "react-router-dom";

const SideMenu: React.FC = () => {
    const menuLinks = [
        "/console/home",
        "/console/user",
        "/console/tag",
        "/console/article",
        "/console/edit",
    ];

    // 菜单栏默认高亮，由路由决定
    const currPath = useLocation();

    // 菜单项点击事件
    const navigationTo = useNavigate();
    const handleMenuClick = (path: string) => {
        navigationTo(path);
    };

    const handleClickLogo = () => {
        navigationTo("/console/home");
        window.location.reload();
    };

    return (
        <div className="text-slate-50">
            <div
                className="logo w-full h-8 flex justify-center mt-4 mb-8 hover:cursor-pointer"
                onClick={handleClickLogo}
            >
                <div className="w-8 h-8 bg-logo bg-cover"></div>
            </div>
            <div className="menu-zone flex flex-col">
                <div
                    className={`dashboard transition duration-300 flex items-center pl-5 py-2 mb-4
                              hover:bg-[#1D2339] hover:cursor-pointer 
                              ${currPath.pathname === menuLinks[0] ? "bg-[#212842]" : ""}`}
                    onClick={() => handleMenuClick(menuLinks[0])}
                >
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="6543"
                        width="32"
                        height="32"
                    >
                        <path
                            d="M825.707 324.373c-7.36-0.746-14.827 1.387-20.587 6.08L601.067 495.467 385.28 349.013a27.942 27.942 0 0 0-34.453 2.347l-172.374 155.2c-5.546 5.013-8.853 11.947-9.28 19.307-0.426 7.466 2.134 14.72 7.147 20.16 10.347 11.52 28.053 12.48 39.573 2.133l156.054-140.48 214.826 145.813c10.24 6.934 23.787 6.4 33.387-1.386L840.32 374.08c5.76-4.693 9.493-11.413 10.24-18.88 0.747-7.36-1.387-14.827-6.08-20.587-4.587-5.76-11.413-9.493-18.773-10.24z"
                            fill="#384bb9"
                            p-id="6544"
                        ></path>
                        <path
                            d="M922.88 106.667H537.92v-42.24c-0.213-15.36-12.693-27.627-28.053-27.627s-27.84 12.373-28.054 27.627v42.24H96.96c-35.093 0-63.573 28.48-63.573 63.573v523.093c0 35.094 28.48 63.574 63.573 63.574h384.96v32L307.947 920.64c-12.054 9.387-14.4 26.773-5.12 39.04s26.56 14.72 38.933 5.653l140.16-106.24v40.534c0.213 15.36 12.693 27.626 28.053 27.626s27.84-12.373 28.054-27.626v-40.534l140.053 106.24c5.867 4.48 13.333 6.4 20.693 5.44 7.36-1.066 13.974-4.906 18.454-10.88 4.48-5.866 6.4-13.333 5.44-20.693-1.067-7.36-4.907-13.973-10.88-18.453L537.92 788.8v-32h384.96c35.093 0 63.573-28.48 63.573-63.573V170.24c0-35.093-28.48-63.573-63.573-63.573z m7.467 586.666c0 4.16-3.414 7.467-7.467 7.467H96.96c-4.16 0-7.467-3.413-7.467-7.467V170.24c0-4.16 3.414-7.467 7.467-7.467h825.813c4.16 0 7.467 3.414 7.467 7.467v523.093z"
                            fill="#384bb9"
                            p-id="6545"
                        ></path>
                    </svg>
                </div>
                <div
                    className={`user transition duration-300 flex items-center pl-5 py-2 mb-4
                              hover:bg-[#1D2339] hover:cursor-pointer 
                              ${currPath.pathname === menuLinks[1] ? "bg-[#212842]" : ""}`}
                    onClick={() => handleMenuClick(menuLinks[1])}
                >
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="7054"
                        width="32"
                        height="32"
                    >
                        <path
                            d="M727.2 839.5c0-2.6-0.4-5.3-1-8-7-57.1-29.2-111.7-64-158-32.8-43.6-76.2-79-125.9-102.7 59.5-45.2 94.6-115.2 94.3-189.3 2.4-83.9-42.1-162.5-116.1-205.1-73.9-42.6-165.6-42.6-239.5 0-73.9 42.7-118.3 121.3-116 205.2-0.3 74.2 34.8 144.2 94.5 189.3-49.2 23.4-92.3 58.3-125 101.3C94 717.9 71.6 771.7 64 828.1c-1.2 3.7-1.8 7.6-1.9 11.7v0.3l0.3 4.1 0.1 0.1c0.1 13.3 7.3 25.6 19 32.5 6.1 3.5 12.9 5.3 19.7 5.3 6.8 0 13.6-1.8 19.6-5.3 10.5-6.1 17.3-16.5 18.8-28.2h0.2l0.6-5.3C154 720.8 255.2 626.1 381 617.7c4.6 0.3 9.2 0.5 13.8 0.5 4.7 0 9.3-0.2 14-0.5 125.8 8.3 226.9 103.1 240.6 225.5l0.6 5.3h0.4c1.4 11.6 8.3 22 18.8 28.2 12.2 7.1 27.3 7.1 39.4 0 10.5-6.1 17.3-16.5 18.8-28.2h0.3v-6c0-0.7-0.1-1.3-0.2-1.7l-0.3-1.3zM409.7 539.7c-4.5-0.2-9.7-0.3-14.7-0.3-4.8 0-9.7 0.1-14.8 0.3-82.7-8.8-144.4-76.6-143.5-157.9 2.3-83.2 70.8-149.2 156.1-150.3h2.1c84.3 0 153.4 63.9 157.8 146.4 4.5 82.9-58.3 153.9-143 161.8z m549.1 301.2l-0.2-1.4c0-2.6-0.4-5.3-1-8-7-57.1-29.2-111.7-64-158-32.8-43.6-76.2-79-125.9-102.7 59.5-45.2 94.6-115.2 94.3-189.3 2.4-83.9-42-162.5-116-205.1-29.9-17.3-62.8-27.5-96.3-30.8v0.2c-1.2-0.1-2.5-0.2-3.7-0.2-23.7 0-43 19.3-43 43.2 0 20.8 14.6 38.1 34.1 42.2l-0.1 0.8c79.4 5.1 143 67 147.2 146 3.7 69.3-39.6 130.3-103.3 153l0.1 0.2c-17.3 7.8-29.3 25.3-29.3 45.6 0 22.9 15.3 42.2 36.2 48.1l-0.2 0.5c102.9 25.9 181.1 111.5 193 217.9l0.6 5.3h0.4c1.4 11.6 8.3 22 18.8 28.2 12.2 7.1 27.3 7.1 39.4 0 10.5-6.1 17.3-16.5 18.8-28.2h0.3v-6c0-0.6-0.1-1.2-0.2-1.5z"
                            p-id="7055"
                            fill="#384bb9"
                        ></path>
                    </svg>
                </div>
                <div
                    className={`tag transition duration-300 flex items-center pl-5 py-2 mb-4
                              hover:bg-[#1D2339] hover:cursor-pointer 
                              ${currPath.pathname === menuLinks[2] ? "bg-[#212842]" : ""}`}
                    onClick={() => handleMenuClick(menuLinks[2])}
                >
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="7270"
                        width="32"
                        height="32"
                    >
                        <path
                            d="M137.498233 549.992933l311.180212 311.180212c18.091873 21.710247 47.038869 32.565371 75.985866 32.565371s54.275618-10.855124 75.985866-32.565371l260.522968-260.522968c43.420495-43.420495 43.420495-108.551237 0-151.971732l-311.180212-311.180212c-7.236749-7.236749-14.473498-10.855124-25.328622-10.855123h-361.837456c-21.710247 0-36.183746 14.473498-36.183745 36.183745v361.837456c3.618375 10.855124 7.236749 18.091873 10.855123 25.328622z m61.512368-350.982332h311.180212l300.325088 300.325088c14.473498 14.473498 14.473498 36.183746 0 50.657244l-260.522968 260.522968c-7.236749 7.236749-14.473498 10.855124-25.328622 10.855124-10.855124 0-18.091873-3.618375-25.328622-10.855124l-300.325088-300.325088v-311.180212z"
                            p-id="7271"
                            fill="#384bb9"
                        ></path>
                    </svg>
                </div>
                <div
                    className={`article transition duration-300 flex items-center pl-5 py-2 mb-4
                              hover:bg-[#1D2339] hover:cursor-pointer 
                              ${currPath.pathname === menuLinks[3] ? "bg-[#212842]" : ""}`}
                    onClick={() => handleMenuClick(menuLinks[3])}
                >
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="7721"
                        width="32"
                        height="32"
                    >
                        <path
                            d="M277.504 114.176c-30.208 0-56.32 10.752-77.312 32.256s-32.256 47.104-32.256 77.312v577.024c0 30.208 10.752 56.32 32.256 77.312 21.504 21.504 47.104 32.256 77.312 32.256h578.048V114.176h-578.048z m503.808 651.264v69.632h-503.296c-9.728 0-17.92-3.584-24.576-10.24-6.656-6.656-10.24-14.848-10.24-24.576s3.584-17.92 10.24-24.576c6.656-6.656 14.848-10.24 24.576-10.24h503.296z m-538.624-69.12V223.744c0-9.728 3.584-17.92 10.24-24.576 6.656-6.656 14.848-10.24 24.576-10.24h503.296v502.272h-503.296c-11.776-0.512-23.04 1.536-34.816 5.12z"
                            p-id="7722"
                            fill="#384bb9"
                        ></path>
                    </svg>
                </div>
                <div
                    className={`edit transition duration-300 flex items-center pl-5 py-2 mb-4 w-full
                              hover:bg-[#1D2339] hover:cursor-pointer 
                              ${currPath.pathname === menuLinks[4] ? "bg-[#212842]" : ""}`}
                    onClick={() => handleMenuClick(menuLinks[4])}
                >
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="7504"
                        width="32"
                        height="32"
                    >
                        <path
                            d="M827.904 828.416h-632.32V195.584h324.096V121.344h-397.824v780.8h780.288v-396.288h-74.24z"
                            p-id="7505"
                            fill="#384bb9"
                        ></path>
                        <path
                            d="M430.33088 542.36672l406.56384-406.56384 53.2224 53.21728-406.56896 406.56384z"
                            p-id="7506"
                            fill="#384bb9"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SideMenu;
