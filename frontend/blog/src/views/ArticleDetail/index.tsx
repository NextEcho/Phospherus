import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useState } from "react";
import { getArticleDetailAPI } from "@/api/article";
import { useParams } from "react-router-dom";
import CodeBlock from "@/components/CodeBlock";
import "@/theme/phospherus.scss";
import { Components } from 'react-markdown'

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {

    const components: Components = {
        code({ node, inline, className, children, ...props }: any) {
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
    }

    return (
        <ReactMarkdown
            className="markdown-body w-4xl mx-72 px-14 py-10 prose dark:prose-invert prose-stone 
            max-w-none min-w-[920px] border-2 border-solid border-[#1A1823] rounded-xl bg-[#222028]
            hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)] transition-all duration-300"
            children={markdown}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={components}
        />
    );
};

const ArticleDetail = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [createTime, setCreateTime] = useState("");
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
                setAuthor(article.authorName);
                setCreateTime(article.createdAt);
                setContent(article.content);
            } else {
                console.log("获取文章信息失败", 1);
            }
        } catch (error) {
            console.error("获取文章时出错:", error);
        }
    }

    return (
        <>
            <div className="article-detail-page flex flex-col min-h-screen">
                <div className="navigation sticky top-0 z-50">
                    <NavBar />
                </div>
                <div className="content bg-main w-full h-full flex-col flex-1 items-center text-slate-200">
                    <div className="w-full mt-10 flex justify-center">
                        <div className="article-meta-data pb-2 transition-all flex flex-col items-center">
                            <div className="article-title font-main text-4xl">{title}</div>
                            <div className="flex text-lg font-code mt-2">
                                <div className="article-author text-slate-500 mr-2">
                                    作者: {author}
                                </div>
                                <div className="article-create-time text-slate-500 ml-2">
                                    发布时间: {createTime}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="markdown-content px-24 py-12 font-code w-full">
                        <div className="markdown-body flex justify-center">
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
