import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useState } from "react";

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      className="markdown-body w-4xl mx-64 px-20 py-16 prose dark:prose-invert prose-stone max-w-none"
      children={markdown}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    />
  );
};

const ArticleDetail = () => {

  useEffect(() => {
    
  })

  const [content, setContent] = useState("");

  return (
    <>
      <div className="article-detail-page flex flex-col min-h-screen">
        <div className="navigation">
          <NavBar />
        </div>
        <div className="content bg-main w-full h-full flex-col flex-1 items-center text-slate-200">
          <div className="markdown-content px-24 py-12 font-main w-full">
            <div className="title text-4xl w-full flex justify-center">
              <span>文章标题</span>
            </div>
            <MarkdownRenderer markdown={content} />
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
