import React from "react";
import NavBar from "@/components/NavBar";
import Banner from "@/components/Banner";
import ArticleItem from "@/components/ArticleItem";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
    return (
        <>
            <div className="home min-w-96">
                <NavBar />
                <Banner />
                <div
                    className="blog-content w-full flex justify-center"
                    style={{
                        // height: "calc(100vh - 160px)",
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
                <Footer/>
            </div>
        </>
    );
};

export default Home;
