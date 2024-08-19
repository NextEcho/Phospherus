import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Divider from "@/components/Divider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleListAPI } from "@/api/article";
import { articleItem } from "@/api/article/types";

interface ArticleItemProps {
    id: number;
    order: number;
    title: string;
    time: string;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ id, order, title, time }) => {
    const navigate = useNavigate();
    const handleClick = (id: number, title: string) => {
        const data = {
            id: id,
        };
        navigate(`/article/${title}`, { state: data });
    };

    return (
        <div className="article-item w-full py-2 my-2 flex justify-around items-center font-main">
            <a className="title text-2xl basis-2/3 text-slate-50 min-w-[512px] truncate">
                <span
                    className="hover:cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick(id, title);
                    }}
                >
                    {order}.{title}
                </span>
            </a>
            <span className="time basis-1/3 text-slate-500 text-right min-w-28 font-code">
                {time}
            </span>
        </div>
    );
};

const Home = () => {
    const [articles, setArticles] = useState<articleItem[]>([] as articleItem[]);

    useEffect(() => {
        const fetchData = async () => {
            const jsonResp = await getArticleListAPI({ pageNum: 1, pageSize: 10 });
            const articleListData = jsonResp.data;

            setArticles(articleListData.articleList);
        };

        fetchData();
    }, []);

    const articleListData = () => {
        if (articles.length === 0) {
            return (
                <div className="font-main text-slate-50 text-3xl">
                    <span>暂无文章</span>
                </div>
            );
        }

        return articles.map((item, idx) => {
            return (
                <div key={idx}>
                    <ArticleItem
                        order={idx + 1}
                        id={item.id}
                        title={item.title}
                        time={item.createdAt}
                    />
                    <Divider />
                </div>
            );
        });
    };

    return (
        <div className="home-page flex flex-col min-h-screen">
            <div className="navigation">
                <NavBar />
            </div>
            <div className="content bg-main w-full h-full flex flex-1 flex-col items-center px-96 pt-24 pb-8">
                <div className="article-list flex flex-col items-center w-5/6 max-w-[80rem] min-w-[720px]">
                    {articleListData()}
                </div>
            </div>
            <div className="bottom">
                <Footer />
            </div>
        </div>
    );
};

export default Home;
