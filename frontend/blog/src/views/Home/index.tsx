import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ArticleItem from "@/components/ArticleItem";
import Divider from "@/components/Divider";

function Home() {
  const articleList = [
    { title: "这是一段标题 这是一是一段标题 是一段标题 " },
    { title: "这是一段标题 " },
    { title: "这是一段标题 " },
    { title: "这是一段标题 " },
    { title: "这是一段标题 " },
  ];

  return (
    <>
      <div className="home-page flex flex-col min-h-screen">
        <div className="navigation">
          <NavBar />
        </div>
        <div className="content bg-[#1A1823] w-full h-full flex flex-1 flex-col items-center px-96 pt-24 pb-8">
          <div className="article-list flex flex-col items-center w-5/6 max-w-[80rem] min-w-[720px]">
            {articleList.map((item, idx) => {
              return (
                <>
                  <ArticleItem key={idx} id={idx + 1} title={item.title} />
                  <Divider />
                </>
              );
            })}
          </div>
        </div>
        <div className="bottom">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
