import { getArticleListAPI } from "@/api/article";
import { articleItem } from "@/api/article/types";
import { Table, Card, Tag } from "antd";
import { useEffect, useState } from "react";

const ArticleColumns = [
  {
    title: "文章ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "文章标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "文章封面图",
    dataIndex: "cover",
    key: "cover",
  },
  {
    title: "所属分类",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "所属标签",
    dataIndex: "tagNames",
    key: "tagNames",
    render: (_: any, { tagNames }: { tagNames: string[] }) => (
      <>
        {tagNames.map((tag: string) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const Article = () => {
  const [articleList, setArticleList] = useState<articleItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        pageNum: 1,
        pageSize: 10,
      };
      const jsonResp = await getArticleListAPI(params);

      if (jsonResp.code === 0) {
        console.log(jsonResp.data.articleList);
        setArticleList(jsonResp.data.articleList);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Card className="bg-[#272E48] border-none">
        <Table columns={ArticleColumns} dataSource={articleList} rowKey="id" />
      </Card>
    </>
  );
};

export default Article;
