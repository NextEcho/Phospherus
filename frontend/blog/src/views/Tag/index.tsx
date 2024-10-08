import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { getTagListAPI } from "@/api/tag";
import { tagItem } from "@/api/tag/types";
import { useNavigate } from "react-router-dom";
import { ConvertColorToTranslucent } from "@/tools/color";

interface TagItemProps {
    id: number;
    name: string; // 标签名称
    count: number; // 该标签下的文章数量
    backgroundColor: string; // 格式为 #xxxxxx
}

const TagItem: React.FC<TagItemProps> = ({ id, name, count, backgroundColor }) => {
    const tagColor = {
        backgroundColor: ConvertColorToTranslucent(backgroundColor),
        borderColor: backgroundColor,
    };
    const navigate = useNavigate();

    const handleClickTag = (name: string) => {
        const data = {
            id: id,
            name: name,
            backgroundColor: backgroundColor,
        };
        navigate(`/tag/${name}`, { state: data });
    };

    return (
        <>
            <div
                className={`flex justify-center items-center text-slate-50 border-solid border-2 rounded-lg 
                py-2 px-3 mx-4 flex-nowrap cursor-pointer my-3`}
                style={tagColor}
                onClick={() => handleClickTag(name)}
            >
                <div className="tag-name text-neutral-300 text-lg font-main">{name}</div>
                <div className="tag-article-count text-sm text-fuchsia-400 ml-1 font-code">
                    {count}
                </div>
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

            setTagList(tagListData.tagList);
            console.log(tagListData.tagList);
        };


        fetchData();
    }, []);

    return (
        <div className="archive-page flex flex-col min-h-screen">
            <div className="navigation sticky top-0">
                <NavBar />
            </div>
            <div className="content bg-main w-full h-full flex flex-1 flex-col px-96 pt-24 pb-8">
                <div className="tag-list flex flex-wrap justify-center">
                    {tagList.map((item, idx) => {
                        return (
                            <div key={idx}>
                                <TagItem
                                    id={item.id}
                                    name={item.name}
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