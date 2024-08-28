import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Divider from "@/components/Divider";
import { useEffect, useState } from "react";
import { getUserInfoAPI } from "@/api/user";
import { message } from "antd";

const About = () => {
    const bloggerId = 1;
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState("");
    const [signature, setSignature] = useState("");
    const [email, setEmail] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [resume, setResume] = useState("");

    const getUserInfo = async () => {
        try {
            const jsonResp = await getUserInfoAPI({ id: bloggerId });
            console.log("resume ", jsonResp);
            if (jsonResp.code === 0) {
                const userInfoData = jsonResp.data;
                setNickname(userInfoData.nickname);
                setSignature(userInfoData.signature);
                setIntroduction(userInfoData.introduction);
                setEmail(userInfoData.email);
                setAvatar(userInfoData.avatar);
                setResume(userInfoData.resume);
            } else {
                message.error("获取博主信息失败", 1);
            }
        } catch (err) {
            console.log("getUserInfo Error: ", err);
        }
    };

    // useEffect 加载博主个人信息
    useEffect(() => {
        getUserInfo();
    }, []);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = resume;
        link.download = "Resume.pdf";
        link.click();
    };

    return (
        <div className="about-page flex flex-col min-h-screen">
            <div className="navigation sticky top-0">
                <NavBar />
            </div>
            <div className="content bg-main w-full h-full flex-col flex-1 items-center text-slate-200">
                <div className="upper flex flex-row flex-1 justify-around px-20 py-10 mx-24 my-10 h-64">
                    <div className="owner-profile flex">
                        <div className="avatar">
                            <img
                                src={avatar}
                                alt=""
                                className="w-48 h-48 object-cover rounded-full"
                            />
                        </div>
                        <div className="name-info ml-10 flex-col font-main">
                            <div className="nickname text-3xl">{nickname}</div>
                            <div className="signature pt-6 text-xl">{signature}</div>
                        </div>
                    </div>
                    <div className="owner-tech-stack flex flex-col items-center justify-around">
                        <img src="https://skillicons.dev/icons?i=html,css,js,ts,react,vue,go" />
                        <img src="https://skillicons.dev/icons?i=rust,solidity,mysql,mongodb,redis,docker,kafka" />
                        <img src="https://skillicons.dev/icons?i=tailwind,git,neovim,vscode,github" />
                    </div>
                </div>
                <div className="lower flex flex-row flex-1 px-24 py-10 mx-24 my-10 h-96 font-code">
                    <div className="detail basis-2/3 pr-20 text-base">
                        <p className="">{introduction}</p>
                    </div>
                    <div className="contact-resume basis-1/3">
                        <div className="contact">
                            📲 Contact me:
                            <ul>
                                <li className="mx-2 mt-2">
                                    Email:{" "}
                                    <a className="hover:underline underline-offset-4 hover:text-indigo-400 decoration-indigo-400 cursor-pointer">
                                        {email}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <Divider />
                        <div className="resume-download mt-8">
                            🍀 Download my resume:
                            <Button title="Download" handleClick={handleDownload} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <Footer />
            </div>
        </div>
    );
};

export default About;
