import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { getUserInfoAPI } from "@/api/user";
import { SiReact } from 'react-icons/si';
import { RxGithubLogo } from "react-icons/rx";

const About = () => {
    const bloggerId = 1;
    const [nickname, setNickname] = useState("name");
    const [avatar, setAvatar] = useState("avatar");
    const [signature, setSignature] = useState("signature");
    const [email, setEmail] = useState("email");
    const [introduction, setIntroduction] = useState("introduction");
    const [resume, setResume] = useState("resume");

    const getUserInfo = async () => {
        try {
            const jsonResp = await getUserInfoAPI({ id: bloggerId });
            if (jsonResp.code === 0) {
                const userInfoData = jsonResp.data;
                setNickname(userInfoData.nickname);
                setSignature(userInfoData.signature);
                setEmail(userInfoData.email);
                setAvatar(userInfoData.avatar);
                setResume(userInfoData.resume);
                setIntroduction(userInfoData.introduction);
            } else {
                console.log("获取博主信息失败", 1);
            }
        } catch (err) {
            console.log("getUserInfo Error: ", err);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div className="about-page flex flex-col min-h-screen">
            <div className="navigation sticky top-0">
                <NavBar />
            </div>
            <div className="content bg-main w-full flex-1 flex justify-center text-slate-200">
                <div className="content-wrapper max-w-6xl min-w-[320px] w-full px-4 sm:px-6 lg:px-8">
                    <section className="personal-info py-12 font-code">
                        <img src={avatar} alt={nickname} className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <h1 className="text-3xl text-center mb-2">{nickname}</h1>
                        <p className="text-center mb-4">{signature}</p>
                        <div className="flex justify-center space-x-4">
                            <a href="https://github.com/NextEcho" target="_blank" rel="noopener noreferrer" className="text-2xl hover:transform hover:scale-125 transition-transform duration-300"><RxGithubLogo /></a>
                        </div>
                    </section>

                    <section className="skills py-11">
                        <h2 className="text-2xl font-bold mb-6 text-center">技术栈</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            <SkillItem icon={SiReact} name="React" />
                        </div>
                    </section>

                    <section className="portfolio py-12">
                        <h2 className="text-2xl font-bold mb-6 text-center">作品集</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="project-card bg-gray-800 rounded-lg overflow-hidden">
                                <img src="/path-to-project-image.jpg" alt="项目名称" className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">项目名称</h3>
                                    <p className="text-sm mb-4">项目简短描述</p>
                                    <a href="#" className="text-blue-400 hover:underline">查看详情</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="work-history py-12">
                        <h2 className="text-2xl font-bold mb-6 text-center">公司履历</h2>
                        <div className="space-y-8">
                            <div className="work-item">
                                <h3 className="text-xl font-semibold mb-1">公司名称</h3>
                                <p className="text-sm text-gray-400 mb-2">职位 | 起止时间</p>
                                <p>工作职责和成就的简要描述</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="bottom">
                <Footer />
            </div>
        </div>
    );
};

export default About;

const SkillItem = ({ icon: Icon, name }: { icon: React.ElementType, name: string }) => (
    <div className="skill-item flex flex-col items-center justify-center p-4 bg-gray-800/50 rounded-lg transition-transform hover:scale-105 font-code hover:shadow-md">
        <Icon className="text-4xl mb-2 text-indigo-400" />
        <p className="text-sm font-semibold">{name}</p>
    </div>
);
