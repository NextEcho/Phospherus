import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { getArchiveListAPI } from "@/api/article";
import { archiveItem, miniArticleItem } from "@/api/article/types";

interface ArchiveItemProps {
  year: string;
  articleList: miniArticleItem[];
}

const ArchiveItem: React.FC<ArchiveItemProps> = ({ year, articleList }) => {
  return (
    <>
      <div className="archive-item w-full py-4 text-slate-100">
        <div className="archive-year text-2xl font-code mb-4">{year}</div>
        {articleList.map((item, index) => {
          return (
            <div key={index}>
              <div className="article flex text-lg transition-all duration-200 px-4 py-4 w-full rounded-md hover:shadow-lg hover:shadow-gray-950/50">
                <div className="article-time mr-10 font-code">{item.dateTime}</div>
                <div className="article-title cursor-pointer font-main">{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

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
              <ArchiveItem year={archiveItem.year} articleList={archiveItem.articleList} />
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
