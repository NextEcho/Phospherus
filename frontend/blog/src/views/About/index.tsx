import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import avatar from "@/assets/images/avatar.jpg";
import Button from "@/components/Button";
import Divider from "@/components/Divider";

const About = () => {
    // download button handle:
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "https://typora-note-storage.oss-cn-shenzhen.aliyuncs.com/resume/Resume.pdf";
        link.download = "Resume.pdf";
        link.click();
    };

    return (
        <div className="about-page flex flex-col min-h-screen">
            <div className="navigation">
                <NavBar />
            </div>
            <div className="content bg-main w-full h-full flex-col flex-1 items-center text-slate-200">
                <div className="upper flex flex-row flex-1 justify-around px-20 py-10 mx-24 my-10 h-64">
                    <div className="owner-outline flex">
                        <div className="avatar">
                            <img
                                src={avatar}
                                alt=""
                                className="w-48 h-48 object-cover rounded-full"
                            />
                        </div>
                        <div className="info-text ml-10 flex-col font-main">
                            <div className="name text-3xl">NextEcho</div>
                            <div className="signature pt-6 text-xl">Become your own believer</div>
                        </div>
                    </div>
                    <div className="owner-link flex flex-col items-center justify-around">
                        <img src="https://skillicons.dev/icons?i=html,css,js,ts,react,vue,go" />
                        <img src="https://skillicons.dev/icons?i=rust,solidity,mongodb,redis,docker,kafka" />
                        <img src="https://skillicons.dev/icons?i=tailwind,git,neovim,vscode,github" />
                    </div>
                </div>
                <div className="lower flex flex-row flex-1 px-24 py-10 mx-24 my-10 h-96 font-code">
                    <div className="detail basis-2/3 pr-20 text-base">
                        <p className="">
                            This is detail about blog owner, you can put discripition in this zone.
                        </p>
                    </div>
                    <div className="contact-resume basis-1/3">
                        <div className="contact">
                            📲 Contact me:
                            <ul>
                                <li className="mx-2 mt-2">
                                    Mail:{" "}
                                    <a className="hover:underline underline-offset-4 hover:text-indigo-400 decoration-indigo-400 cursor-pointer">
                                        nextecho@outlook.com
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
