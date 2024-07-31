import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      className="markdown-body w-4xl mx-64 px-20 py-16 prose dark:prose-invert prose-stone max-w-none"
      children={markdown}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      // components={{
      //   code({ node, className, children, ...props }) {
      //     const match = /language-(\w+)/.exec(className || "");

      //     return match ? (
      //       <SyntaxHighlighter
      //         children={String(children).replace(/\n$/, "")}
      //         style={tomorrow}
      //         language={match[1]}
      //         PreTag="div"
      //         {...props}
      //       />
      //     ) : (
      //       <code className={className} {...props}>
      //         {children}
      //       </code>
      //     );
      //   },
      // }}
    />
  );
};

const ArticleDetail = () => {
  const markdown = `
# 🍀 安装 NeoVim

## ArchLinux 安装 Neovim

这是一段对话，他的内容很长
这是一段对话，他的内容很长
这是一段对话，他的内容很长
这是一段对话，他的内容很长
这是一段对话，他的内容很长
这是一段对话，他的内容很长
这是一段对话，他的内容很长
这是一段对话，他的内容很长

这是第二段对话

1. THis is list
2. askdaskldjs

- code 1
- code2 

Just a link: www.nasa.gov.

~~~go
func main() {
    fmt.Println("Hello, world")
}
~~~

> This is a callout

## This is heading 2 also

- [ ] Task list 1
- [ ] Task List 2
`;
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
