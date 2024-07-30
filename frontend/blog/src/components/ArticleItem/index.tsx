import React from "react";

interface ArticleItemProps {
  id: number;
  title: string;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ id, title }) => {
  return (
    <div className="article-item w-full py-2 my-2 flex justify-around items-center font-main">
      <a href="" className="title text-2xl basis-2/3 text-slate-50 min-w-[512px] truncate">
        {id}. {title}
      </a>
      <span className="time basis-1/3 text-slate-500 text-right min-w-28 font-code">Sep 27 2023</span>
    </div>
  );
};

export default ArticleItem;
