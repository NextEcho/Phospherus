import NavBar from "@/components/NavBar";
import Banner from "@/components/Banner";
import ArticleItem from "@/components/ArticleItem";
import Footer from "@/components/Footer";

function Home(): JSX.Element {
    return (
        <>
            <div className="home min-w-96">
                <NavBar />
                <div className="w-full h-[64px] bg-[#0F161E]"></div>
                <Banner />
                <div
                    className="blog-content w-full flex justify-center"
                    style={{
                        backgroundColor: "#0E0E13",
                    }}
                >
                    <div className="article-list flex flex-col item-center px-10 pt-32 pb-10 max-w-4xl text-slate-400">
                        <ArticleItem />
                        <ArticleItem />
                        <ArticleItem />
                        <ArticleItem />
                        <ArticleItem />
                        <ArticleItem />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Home;
