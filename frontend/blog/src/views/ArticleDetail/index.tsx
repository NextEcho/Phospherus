import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useState } from "react";
import { getArticleDetailAPI } from "@/api/article";
import { useLocation } from "react-router-dom";

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
    return (
        <ReactMarkdown
            className="markdown-body w-4xl mx-72 px-10 py-4 prose dark:prose-invert prose-stone max-w-none min-w-[920px]"
            children={markdown}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
        />
    );
};

const ArticleDetail = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const location = useLocation();
    useEffect(() => {
        const { state } = location;
        const articleId = state.id as number;

        const fetchData = async () => {
            const jsonResp = await getArticleDetailAPI({ id: articleId });
            const articleData = jsonResp.data;

            setTitle(articleData.title);
            setContent(articleData.content);
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="article-detail-page flex flex-col min-h-screen">
                <div className="navigation">
                    <NavBar />
                </div>
                <div className="content bg-main w-full h-full flex-col flex-1 items-center text-slate-200">
                    <div className="title text-4xl w-full flex justify-center mt-10">
                        <span className="border-b-4 border-indigo-500 border-solid pb-2 font-main transition-all">
                            {title}
                        </span>
                    </div>
                    <div className="markdown-content px-24 py-12 font-main w-full">
                        <div className="flex justify-center">
                            <MarkdownRenderer markdown={content} />
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default ArticleDetail;
