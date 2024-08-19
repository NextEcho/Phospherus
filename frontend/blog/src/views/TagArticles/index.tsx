import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ArchiveItem from "../Archive/ArchiveItem";
import { archiveItem } from "@/api/article/types";
import { getArticleListByTagAPI } from "@/api/article";

const TagArticles = () => {
    const [archiveList, setArchiveList] = useState<archiveItem[]>([]);
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        const fetchData = async () => {
            const jsonResp = await getArticleListByTagAPI({
                pageNum: 1,
                pageSize: 10,
                tagId: state.id as number,
            });
            const archiveListData = jsonResp.data;
            setArchiveList(archiveListData.articleList);
        };

        fetchData();
    }, []);

    return (
        <div className="archive-page flex flex-col min-h-screen">
            <div className="navigation">
                <NavBar />
            </div>
            <div className="content bg-main w-full h-full flex flex-1 flex-col px-96 pt-24 pb-8">
                {archiveList.map((archiveItem, idx) => {
                    return (
                        <div key={idx}>
                            <ArchiveItem
                                year={archiveItem.year}
                                articleList={archiveItem.articleList}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="bottom">
                <Footer />
            </div>
        </div>
    );
};

export default TagArticles;
