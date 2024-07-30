import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import "github-markdown-css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      className="markdown-body"
      children={markdown}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

const ArticleDetail = () => {
  const markdown = `
# This is heading 1

## This is hedahing 2

1. THis is list
2. askdaskldjs

Just a link: www.nasa.gov.

~~~js
console.log('It works!')
~~~

> This is a callout
`;
  return (
    <>
      <div className="article-detail-page flex flex-col min-h-screen">
        <div className="navigation">
          <NavBar />
        </div>
        <div className="content bg-[#1A1823] w-full h-full flex-col flex-1 items-center text-slate-200">
          <div className="px-24 py-12">
            <MarkdownRenderer markdown={markdown} />
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
