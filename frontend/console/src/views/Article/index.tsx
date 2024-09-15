import { deleteArticleAPI, getArticleListAPI } from "@/api/article";
import { articleItem } from "@/api/article/types";
import { Table, Card, Tag, message, ConfigProvider, theme, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Article = () => {
    const [articleList, setArticleList] = useState<articleItem[]>([]);

    const handleDeleteArticleItem = (key: React.Key) => {
        const newArticleList = articleList.filter((item) => item.id !== key);
        const deletedData = articleList.find((item) => item.id === key) as articleItem;

        const deleteArticle = async () => {
            try {
                const jsonResp = await deleteArticleAPI({ ids: [deletedData.id] });
                console.log("deletedData: ", jsonResp);
                if (jsonResp.code === 0) {
                    message.success("删除文章成功", 1);
                } else {
                    message.error("删除文章失败", 1);
                }
            } catch (error) {
                message.error("删除文章时发生错误，请稍后重试", 1);
            }

            setArticleList(newArticleList);
        };

        deleteArticle();
    };

    const ArticleColumns = [
        { title: "文章ID", dataIndex: "id", key: "id", align: "center" },
        { title: "文章标题", dataIndex: "title", key: "title", align: "center" },
        {
            title: "文章封面图",
            dataIndex: "cover",
            key: "cover",
            render: (cover: string) => (
                <div className="flex justify-center">
                    {cover === "" ? (
                        "暂无封面"
                    ) : (
                        <img src={cover} width={100} height={70} className="bg-cover bg-center" />
                    )}
                </div>
            ),
            align: "center",
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
            align: "center",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle" onClick={() => handleDeleteArticleItem(record.id)}>
                    <a type="text" className="bg-indigo-500 p-2 rounded-sm hover:bg-indigo-300">
                        Delete
                    </a>
                </Space>
            ),
            align: "center",
        },
    ] as ColumnsType<articleItem>;

    useEffect(() => {
        const fetchData = async () => {
            const params = {
                pageNum: 1,
                pageSize: 10,
            };
            try {
                const jsonResp = await getArticleListAPI(params);

                if (jsonResp.code === 0) {
                    setArticleList(jsonResp.data.articleList);
                } else {
                    message.error("查询文章列表失败", 1);
                }
            } catch (err) {
                console.log("捕获 error:", err);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();
    const handleToAddArticle = () => {
        navigate("/console/edit");
    };

    return (
        <div className="font-main">
            <button className="btn-green my-4" onClick={handleToAddArticle}>
                创作文章
            </button>
            <Card className="bg-[#272E48] border-none">
                <ConfigProvider
                    theme={{
                        algorithm: theme.darkAlgorithm,
                        components: {
                            Table: {
                                headerBg: "#1D2339",
                                rowHoverBg: "#222942",
                            },
                        },
                    }}
                >
                    <Table
                        columns={ArticleColumns}
                        dataSource={articleList}
                        rowKey="id"
                        className="[&_.ant-table-cell]:align-middle [&_.ant-table-cell]:font-main"
                    />
                </ConfigProvider>
            </Card>
        </div>
    );
};

export default Article;
