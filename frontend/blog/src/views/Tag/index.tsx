import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { getTagListAPI } from "@/api/tag";
import { tagItem } from "@/api/tag/types";

interface TagItemProps {
  title: string; // 标签名称
  count: number; // 该标签下的文章数量
  backgroundColor: string; // 格式为 #xxxxxx
}

const TagItem: React.FC<TagItemProps> = ({ title, count, backgroundColor }) => {
  const tagBgColor = { backgroundColor: backgroundColor };

  return (
    <>
      <div
        className={`flex justify-center items-center text-slate-400 border-solid rounded-lg 
                py-2 px-3 shadow-[0_10px_120px_15px_rgb(40,40,61)] mx-4 
                flex-nowrap cursor-pointer my-3`}
        style={tagBgColor}
      >
        <div className="tag-name text-neutral-300 text-lg font-main">{title}</div>
        <div className="tag-article-count text-sm text-fuchsia-400 ml-1 font-code">{count}</div>
      </div>
    </>
  );
};

const Tag: React.FC = () => {
  const [tagList, setTagList] = useState<tagItem[]>([] as tagItem[]);

  useEffect(() => {
    const fetchData = async () => {
      const jsonResp = await getTagListAPI();
      const tagListData = jsonResp.data;

      setTagList(tagListData.tagList)
    };

    fetchData();
  }, []);

  return (
    <div className="archive-page flex flex-col min-h-screen">
      <div className="navigation">
        <NavBar />
      </div>
      <div className="content bg-main w-full h-full flex flex-1 flex-col px-96 pt-24 pb-8">
        <div className="tag-list flex flex-wrap justify-center">
          {tagList.map((item, idx) => {
            return (
              <div key={idx}>
                <TagItem
                  title={item.name}
                  count={item.count}
                  backgroundColor={item.backgroundColor}
                />
              </div>
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

export default Tag;
