import Banner from "@/components/Banner";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Tag = (): JSX.Element => {
    return (
        <>
            <div className="home min-w-96">
                <NavBar />
                <Banner />
                <div
                    className="blog-content w-full flex justify-center"
                    style={{
                        backgroundColor: "#0E0E13",
                    }}
                >
                    TagPage
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Tag;