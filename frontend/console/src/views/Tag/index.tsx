import { createTagAPI, deleteTagAPI, getTagListAPI } from "@/api/tag";
import { tagItem } from "@/api/tag/types";
import {
    Card,
    ColorPicker,
    ConfigProvider,
    Input,
    message,
    Modal,
    Space,
    Table,
    theme,
} from "antd";
import { Color } from "antd/es/color-picker";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

const Tag = () => {
    const [tagList, setTagList] = useState<tagItem[]>([]);
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [color, setColor] = useState("#7939E7");
    const [confirmLoading, setConfirmLoading] = useState(false);

    const getTagList = async () => {
        const params = {
            pageNum: 1,
            pageSize: 10,
        };
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

    // getTagList
    useEffect(() => {
        getTagList();
    }, []);

    // createTag
    const handleCreateTag = () => {
        const params = {
            name: name,
            backgroundColor: color,
        };

        const createTag = async () => {
            try {
                setConfirmLoading(true);
                const jsonResp = await createTagAPI(params);

                if (jsonResp.code === 0) {
                    setConfirmLoading(false);
                    setOpen(false);
                    message.success("创建标签成功", 1);
                    await getTagList();
                } else {
                    message.error("创建标签失败", 1);
                }
            } catch (error) {
                message.error("创建标签时发生错误，请稍后重试", 1);
            }
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
                        className="bg-indigo-500 p-2 rounded-sm hover:bg-indigo-300"
                    >
                        Delete
                    </a>
                </Space>
            ),
            align: "center",
        },
    ] as ColumnsType<tagItem>;

    return (
        <div className="font-main">
            <button className="btn-green my-4" onClick={() => setOpen(true)}>
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
                        className="[&_.ant-table-cell]:align-middle [&_.ant-table-cell]:font-main"
                    />
                </ConfigProvider>
            </Card>

            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    components: {
                        Modal: {
                            headerBg: "#1D2339",
                            contentBg: "#1D2339",
                            footerBg: "#1D2339",
                            titleFontSize: 20,
                            lineHeight: 2,
                        },
                    },
                }}
            >
                <Modal
                    title="Create New Tag"
                    centered
                    open={open}
                    onOk={handleCreateTag}
                    onCancel={() => setOpen(false)}
                    okText="提交"
                    cancelText="取消"
                    confirmLoading={confirmLoading}
                    width={700}
                >
                    <div className="font-main px-1 py-4 text-lg">
                        <div className="form">
                            <div className="tag-name flex mb-4 pr-10">
                                <span className="whitespace-nowrap mr-4">标签名称:</span>
                                <Input
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="backgroud-color flex mb-4 pr-10 items-center">
                                <span className="whitespace-nowrap mr-4">标签背景色:</span>
                                <ColorPicker
                                    defaultValue="#7939E7"
                                    disabledAlpha
                                    value={color}
                                    onChange={(_: Color, hex: string) => setColor(hex)}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
        </div>
    );
};

export default Tag;
