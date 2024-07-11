import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const About = (): JSX.Element => {
    return (
        <>
            <div className="about">
                <NavBar />
                <div className="w-full h-[64px] bg-nav"></div>
                <div className="content w-full h-full text-slate-200 min-h-screen"
                    style={{
                        backgroundColor: "#0E0E13",
                    }}>
                    <div className="main flex">
                        <div className="introduce">
                            <h1>NextEcho</h1>
                            <p>
                                I am currently a product designer, junior developer, and aspire to become a design engineer.
                                Having insights and practical experience in multiple industries such as cloud computing,
                                low code, e-commerce, intelligent customer service, and zero trust.
                            </p>
                        </div>
                        <div className="contact">
                            <h3>Contact</h3>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default About;
