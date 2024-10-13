import { deleteArticleAPI, getArticleListAPI } from "@/api/article";
import { articleItem } from "@/api/article/types";
import { getRandomColor } from "@/tools/color";
import { Table, Card, Tag, message, ConfigProvider, theme, Space, Modal } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Article = () => {

    const navigate = useNavigate();
    const [articleList, setArticleList] = useState<articleItem[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    useEffect(() => {
        getArticleList();
    }, []);

    const getArticleList = async (page?: number, pageSize?: number) => {
        const params = {
            pageNum: page || pagination.current!,
            pageSize: pageSize || pagination.pageSize!,
        };
        try {
            const jsonResp = await getArticleListAPI(params);
            if (jsonResp.code === 0) {
                console.log("jsonResp.data is", jsonResp.data);
                setArticleList(jsonResp.data.articleList);
                setPagination(prev => ({
                    ...prev,
                    current: params.pageNum,
                    pageSize: params.pageSize,
                    total: jsonResp.data.total,
                }));
            } else {
                message.error("查询文章列表失败", 1);
            }
        } catch (err) {
            console.log("捕获 error:", err);
        }
    }

    const deleteArticle = async (id: number) => {
        try {
            const jsonResp = await deleteArticleAPI({ ids: [id] });
            if (jsonResp.code === 0) {
                setArticleList(prevList => prevList.filter(item => item.id !== id));
                message.success("删除文章成功", 1);
            } else {
                message.error("删除文章失败", 1);
            }
        } catch (error) {
            message.error("删除文章时发生错误，请稍后重试", 1);
        }
    };

    const handleDeleteArticleItem = (id: number) => {
        ConfigProvider.config({
            theme: {
                algorithm: theme.darkAlgorithm,
            },
        });
        Modal.confirm({
            title: "删除文章",
            content: "确定要删除该文章吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                deleteArticle(id)
            },
        });
    };

    const handleEditArticleItem = (articleId: number) => {
        navigate(`/console/edit/${articleId}`);
    }

    const handleToAddArticle = () => {
        navigate("/console/edit");
    };

    const handleClickArticle = (articleId: number) => {
        const url = `http://localhost:10000/article/${articleId}`;
        window.open(url, "_blank");
    }

    const handlePaginationChange = (pagination: TablePaginationConfig) => {
        getArticleList(pagination.current!, pagination.pageSize!);
    };

    const ArticleColumns = [
        {
            title: "文章标题",
            dataIndex: "title",
            key: "title",
            align: "center",
            render: (_, record) => (
                <a href="#"
                    className="hover:text-indigo-500"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClickArticle(record.id)
                    }
                    }
                >
                    {record.title}
                </a>
            ),
        },
        {
            title: "封面图",
            dataIndex: "cover",
            key: "cover",
            render: (cover: string) => (
                <div className="flex justify-center items-center">
                    <div className="w-[100px] h-[70px] flex justify-center items-center">
                        {cover === "" ? (
                            <span>暂无封面</span>
                        ) : (
                            <img src={cover} className="w-full h-full object-cover object-center" alt="文章封面" />
                        )}
                    </div>
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
                        let color = getRandomColor();
                        return (
                            <Tag bordered={false} color={color} key={tag} className="font-main">
                                {tag}
                            </Tag>
                        );
                    })}
                </>
            ),
            align: "center",
        },
        {
            title: "发布时间",
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
        },
        {
            title: "操作",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a
                        type="text"
                        className="bg-indigo-500 p-2 rounded-sm hover:bg-indigo-300"
                        onClick={() => handleDeleteArticleItem(record.id)}
                    >
                        删除
                    </a>
                    <a
                        type="text"
                        className="bg-orange-500 p-2 rounded-sm hover:bg-orange-300"
                        onClick={() => handleEditArticleItem(record.id)}
                    >
                        编辑
                    </a>
                </Space>
            ),
            align: "center",
        },
    ] as ColumnsType<articleItem>;


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
                        pagination={pagination}
                        onChange={handlePaginationChange}
                    />
                </ConfigProvider>
            </Card>
        </div>
    );
};

export default Article;
