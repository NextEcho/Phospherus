import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Divider from "@/components/Divider";
import { useLocation, useNavigate } from "react-router-dom";

interface ArticleItemProps {
  id: number;
  order: number;
  title: string;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ id, order, title }) => {
  const navigate = useNavigate();

  const handleClick = (id: number, title: string) => {
    navigate(`/article/${title}?id=${id}`);
  };

  return (
    <div className="article-item w-full py-2 my-2 flex justify-around items-center font-main">
      <a
        className="title text-2xl basis-2/3 text-slate-50 min-w-[512px] truncate"
        onClick={(e) => {
          e.preventDefault();
          handleClick(id, title);
        }}
      >
        {order}. {title}
      </a>
      <span className="time basis-1/3 text-slate-500 text-right min-w-28 font-code">
        Sep 27 2023
      </span>
    </div>
  );
};

const Home = () => {
  const articleList = [
    { title: "这是 123 一段标题" },
    { title: "这是一段标题 " },
    { title: "这是一段标题 " },
    { title: "这是一段标题 " },
    { title: "这是一段标题 " },
    { title: "这是一段标题 " },
    { title: "这是一段标题 " },
  ];

  return (
    <div className="home-page flex flex-col min-h-screen">
      <div className="navigation">
        <NavBar />
      </div>
      <div className="content bg-main w-full h-full flex flex-1 flex-col items-center px-96 pt-24 pb-8">
        <div className="article-list flex flex-col items-center w-5/6 max-w-[80rem] min-w-[720px]">
          {articleList.map((item, idx) => {
            return (
              <>
                <ArticleItem key={idx} order={idx+1} id={idx + 1} title={item.title} />
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
  );
};

export default Home;
