import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CareerItem from "./CareerItem";

const About = (): JSX.Element => {

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "https://typora-note-storage.oss-cn-shenzhen.aliyuncs.com/resume/Resume.pdf";
        link.download = "Resume.pdf";
        link.click();
        console.log("Dowload!!!");
    }

    return (
        <>
            <div className="about">
                <NavBar />
                <div className="w-full h-[64px] bg-nav"></div>
                <div className="content w-full h-full text-slate-200 min-h-screen items-center"
                    style={{
                        backgroundColor: "#0E0E13",
                    }}
                >
                    <div className="top mx-20 px-64 pt-28 mb-10">
                        <div className="name text-4xl mb-6 font-serif">
                            NextEcho
                        </div>
                        <div className="detail flex">
                            <div className="introduction basis-2/3">
                                <p className="text-xl mb-6 font-serif">Introduce</p>
                                <p className="leading-loose">I am currently a product designer, junior developer, and aspire to become a design engineer. Having insights and practical experience in multiple industries such as cloud computing, low code, e-commerce, intelligent customer service, and zero trust.
                                    I am passionate about the infinite possibilities of technology and also focused on exploring the values of product design, seeking a balance between ultimate design, interaction, technological inclusion, and business understanding to solve problems.
                                    In addition, I have won three patents for appearance invention, which can be found in the China National Intellectual Property Administration ↗ Enter my name on the official website to search.
                                </p>
                            </div>
                            <div className="contact px-16 basis-1/3">
                                <p className="text-xl mb-6 font-serif">Contact</p>
                                <div className="email my-2">
                                    Email: <a href="">nextecho@outlook.com</a>
                                </div>
                                <div className="github my-2">
                                    Github: <a href="https://github.com/NextEcho">NextEcho</a>
                                </div>
                                <div className="resume my-2">
                                    Resume(Download my resume):
                                    <Button title="Download" to="" handleClick={handleDownload} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="middle mb-20">
                        <div className="card-list flex px-[350px] flex-wrap">
                            <Card />
                            <Card />
                            <Card />
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="career-list px-[357px] px-2">
                            <CareerItem />
                            <CareerItem />
                            <CareerItem />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default About;
