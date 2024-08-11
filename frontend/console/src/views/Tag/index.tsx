import { deleteTagAPI, getTagListAPI } from "@/api/tag";
import { tagItem } from "@/api/tag/types";
import { Card, ConfigProvider, message, Space, Table, theme } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

const Tag = () => {
    const [tagList, setTagList] = useState<tagItem[]>([]);

    // getTagList
    useEffect(() => {
        const params = {
            pageNum: 1,
            pageSize: 10,
        };
        const fetchData = async () => {
            try {
                const jsonResp = await getTagListAPI(params);
                if (jsonResp.code === 0) {
                    setTagList(jsonResp.data.tagList);
                } else {
                    message.error("查询标签列表失败", 1);
                }
            } catch (err) {
                console.log("捕获 error:", err);
            }
        };

        fetchData();
    }, []);

    // createTag
    const handleCreateTag = async () => {
        const createTag = async () => {
            try {
            } catch (error) {}
        };

        createTag();
    };

    // deleteTag
    const handleDeleteTagItem = async (key: number) => {
        const newTagList = tagList.filter((item) => item.id !== key);
        const deletedData = tagList.find((item) => item.id === key) as tagItem;

        const deleteArticle = async () => {
            try {
                const jsonResp = await deleteTagAPI({ ids: [deletedData.id] });
                console.log("deletedData: ", jsonResp);
                if (jsonResp.code === 0) {
                    message.success("删除标签成功", 1);
                } else {
                    message.error("删除标签失败", 1);
                }
            } catch (error) {
                message.error("删除标签时发生错误，请稍后重试", 1);
            }

            setTagList(newTagList);
        };

        deleteArticle();
    };

    const TagColumns = [
        { title: "标签ID", dataIndex: "id", key: "id", align: "center" },
        { title: "标签名称", dataIndex: "name", key: "name", align: "center" },
        {
            title: "标签颜色",
            dataIndex: "backgroundColor",
            key: "backgroundColor",
            render: (backgroundColor) => (
                <div className="flex justify-center">
                    <div
                        className="rounded-md"
                        style={{
                            width: "70%",
                            height: "100%",
                            backgroundColor: backgroundColor,
                        }}
                    >
                        {backgroundColor}
                    </div>
                </div>
            ),
            align: "center",
        },
        { title: "文章数量", dataIndex: "articleCount", key: "articleCount", align: "center" },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle" onClick={() => handleDeleteTagItem(record.id)}>
                    <a
                        type="text"
                        className="bg-indigo-500 px-2 py-1 rounded-md hover:bg-indigo-300"
                    >
                        Delete
                    </a>
                </Space>
            ),
            align: "center",
        },
    ] as ColumnsType<tagItem>;

    return (
        <div>
            <button className="btn-green my-4" onClick={handleCreateTag}>
                创建标签
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
                        columns={TagColumns}
                        dataSource={tagList}
                        rowKey="id"
                        className="[&_.ant-table-cell]:align-middle [&_.ant-table-cell]:font-mono"
                    />
                </ConfigProvider>
            </Card>
        </div>
    );
};

export default Tag;
