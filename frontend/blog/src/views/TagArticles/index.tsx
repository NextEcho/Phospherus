import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { articleItem } from "@/api/article/types";
import { getArticleListByTagAPI } from "@/api/article";

// TagArticles 标签下的文章概览
const TagArticles = () => {
    const [articleList, setArticleList] = useState<articleItem[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    useEffect(() => {
        const fetchData = async () => {
            const params = {
                pageNum: 1,
                pageSize: 10,
                tagId: state.id as number,
            };
            const jsonResp = await getArticleListByTagAPI(params);
            const articleListData = jsonResp.data;

            setArticleList(articleListData.articleList);
        };

        fetchData();
    }, []);

    const handleClick = (id: number, title: string) => {
        const data = {
            id: id,
        };
        navigate(`/article/${title}`, { state: data });
    };

    const articleListData = () => {
        if (articleList.length === 0) {
            return (
                <div className="font-main text-slate-500 text-xl">
                    <span>这个标签下还没有文章发布哦😥</span>
                </div>
            );
        }

        return articleList.map((item, index) => {
            return (
                <div key={index}>
                    <div
                        className="article flex text-lg transition-all duration-200 px-4 py-4 w-full rounded-md hover:shadow-lg hover:shadow-gray-950/50 cursor-pointer"
                        onClick={() => handleClick(item.id, item.title)}
                    >
                        <div className="article-time mr-10  font-code">{item.createdAt}</div>
                        <div className="article-title font-main">{item.title}</div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="archive-page flex flex-col min-h-screen">
            <div className="navigation">
                <NavBar />
            </div>
            <div className="content bg-main w-full h-full flex flex-1 flex-col px-96 pt-24 pb-8 text-slate-50">
                <div className="tag-name flex justify-center font-main">
                    <div
                        className="text-3xl px-2 py-2 rounded-lg"
                        style={{ backgroundColor: state.backgroundColor }}
                    >
                        {state.name}
                    </div>
                </div>
                <div className="article-list mt-8">{articleListData()}</div>
            </div>
            <div className="bottom">
                <Footer />
            </div>
        </div>
    );
};

export default TagArticles;
