import { reqGetArticleList } from "@/api/article";
import { ArticleItem, GetArticleListReq } from "@/api/article/type";
import { Table, Card } from "antd";
import { useEffect, useState } from "react";

const ArticleColumns = [
    {
        title: "id",
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
        title: "文章概述",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "所属分类",
        dataIndex: "category_name",
        key: "category_name",
    },
    {
        title: "所属标签",
        dataIndex: "tag_names",
        key: "tag_names",
    },
];

const Article = () => {
    const [articleList, setArticleList] = useState<ArticleItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 传入请求参数
                const params: GetArticleListReq = {
                    page_num: 1,
                    page_size: 10,
                };
                const response = await reqGetArticleList(params);
                if (response.code === 0) {
                    setArticleList(response.data.article_list);
                } else {
                    throw new Error(response.message);
                }
            } catch (err) {
                console.error("Error is", err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Card>
                <Table bordered columns={ArticleColumns} dataSource={articleList} rowKey="id" />
            </Card>
        </>
    );
};

export default Article;
