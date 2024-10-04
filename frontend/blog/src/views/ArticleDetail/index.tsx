import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useState } from "react";
import { getArticleDetailAPI } from "@/api/article";
import { useParams } from "react-router-dom";
import { message } from "antd";
import CodeBlock from "@/components/CodeBlock";
import "@/theme/phospherus.scss";

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {

    return (
        <ReactMarkdown
            className="markdown-body w-4xl mx-72 px-10 py-10 prose dark:prose-invert prose-stone 
            max-w-none min-w-[920px] border-2 border-solid border-[#1A1823] rounded-xl bg-[#222028]
            hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)] transition-all duration-150"
            children={markdown}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <CodeBlock
                            language={match[1]}
                            value={String(children).replace(/\n$/, '')}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                }
            }}
        />
    );
};

const ArticleDetail = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { id } = useParams();
    useEffect(() => {
        getArticleDetail(Number(id));
    }, []);

    const getArticleDetail = async (id: number) => {
        try {
            const jsonResp = await getArticleDetailAPI({ id });
            if (jsonResp.code === 0) {
                const article = jsonResp.data;
                setTitle(article.title);
                setContent(article.content);
            } else {
                message.error("获取文章信息失败", 1);
            }
        } catch (error) {
            console.error("获取文章时出错:", error);
        }
    }

    return (
        <>
            <div className="article-detail-page flex flex-col min-h-screen">
                <div className="navigation sticky top-0">
                    <NavBar />
                </div>
                <div className="content bg-main w-full h-full flex-col flex-1 items-center text-slate-200">
                    <div className="title text-4xl w-full flex justify-center mt-10">
                        <span className="border-b-4 border-indigo-500 border-solid pb-2 font-main transition-all">
                            {title}
                        </span>
                    </div>
                    <div className="markdown-content px-24 py-12 font-code w-full">
                        <div className="flex justify-center markdown-body">
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
