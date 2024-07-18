import React from "react";
import { styleText } from "util";

interface TagItemProps {
    title: string; // 标签名称
    count: number; // 该标签下的文章数量
    backgroundColor: string; // 格式为 #xxxxxx
}

const TagItem: React.FC<TagItemProps> = ({ title, count, backgroundColor }) => {

    const bgColor = {backgroundColor: backgroundColor};

    return (
        <>
            <div className={
                `flex justify-center items-center text-slate-400 border-solid rounded-lg 
                p-2 shadow-lg shadow-[0_10px_120px_15px_rgb(40,40,61)] m-4 flex-nowrap cursor-pointer`}
                style={bgColor}
            >
                <div className="tag-name text-neutral-300 text-base">{title}</div>
                <div className="tag-article-count text-sm text-fuchsia-400 ml-1">{count}</div>
            </div>
        </>
    )
}

export default TagItem;