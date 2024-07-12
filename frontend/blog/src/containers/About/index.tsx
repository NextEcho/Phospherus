import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const About = (): JSX.Element => {
    return (
        <>
            <div className="about">
                <NavBar />
                <div className="w-full h-[64px] bg-nav"></div>
                <div className="content w-full h-full text-slate-200 min-h-screen flex flex-col items-center"
                    style={{
                        backgroundColor: "#0E0E13",
                    }}
                >
                    <div className="top mx-24 px-80 pt-28 mb-10">
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
                                <p>
                                    email: <a href="">nextecho@outlook.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="middle">作品数量统计</div>
                    <div className="bottom">履历</div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default About;
