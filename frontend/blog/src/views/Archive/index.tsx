import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { getArchiveListAPI } from "@/api/article";
import { archiveItem } from "@/api/article/types";
import ArchiveItem from "./ArchiveItem";

const Archive = () => {
    const [archiveList, setArchiveList] = useState<archiveItem[]>([] as archiveItem[]);

    useEffect(() => {
        const fetchData = async () => {
            const jsonResp = await getArchiveListAPI();
            const archiveListData = jsonResp.data;
            setArchiveList(archiveListData.archiveList);
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

export default Archive;
