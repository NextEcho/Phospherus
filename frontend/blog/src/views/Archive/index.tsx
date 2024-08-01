import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import React from "react";

interface articleListProps {
  time: string;
  title: string;
}

interface ArchiveItemProps {
  year: string;
  articleList: articleListProps[];
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
                <div className="article-time mr-10 font-code">{item.time}</div>
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

  const archiveItems = [
    {
      year: "2024",
      items: [
        {
          time: "02-04",
          title: "关于 Go 语言的编写规范",
        },
        {
          time: "02-05",
          title: "Title of Article",
        },
        {
          time: "02-07",
          title: "Title of Article",
        },
      ],
    },
    {
      year: "2022",
      items: [
        {
          time: "12-04",
          title: "关于 Rust 语言的编写规范",
        },
        {
          time: "06-05",
          title: "Title of Article",
        },
        {
          time: "02-07",
          title: "Title of Article",
        },
      ],
    },
  ];
  return (
    <div className="archive-page flex flex-col min-h-screen">
      <div className="navigation">
        <NavBar />
      </div>
      <div className="content bg-main w-full h-full flex flex-1 flex-col px-96 pt-24 pb-8">
        {archiveItems.map((one, idx) => {
          return (
            <div key={idx}>
              <ArchiveItem year={one.year} articleList={one.items} />
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
