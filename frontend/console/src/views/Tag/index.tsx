import { createTagAPI, deleteTagAPI, getTagListAPI, updateTagAPI } from "@/api/tag";
import { tagItem } from "@/api/tag/types";
import { ConvertColorToTranslucent } from "@/tools/color";
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
    const [open, setOpen] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");

    const [tagId, setTagId] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [color, setColor] = useState<string>("#7939E7");
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    useEffect(() => {
        getTagList();
    }, []);

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

    const deleteTag = async (id: number) => {
        try {
            const jsonResp = await deleteTagAPI({ ids: [id] });
            if (jsonResp.code === 0) {
                setTagList(prevList => prevList.filter(item => item.id !== id));
                message.success("删除标签成功", 1);
            } else {
                message.error("删除标签失败", 1);
            }
        } catch (err) {
            console.log("捕获 error:", err);
        }
    }

    const updateTag = async (id: number, name: string, backgroundColor: string) => {
        try {
            const jsonResp = await updateTagAPI({ id, name, backgroundColor });
            if (jsonResp.code === 0) {
                setTagList(prevList => prevList.map(item => item.id === id ? { ...item, name, backgroundColor } : item));
                setConfirmLoading(false);
                setOpen(false);
                message.success("修改标签成功", 1);
            } else {
                message.error("修改标签失败", 1);
            }
        } catch (err) {
            console.log("捕获 error:", err);
        }
    }

    const createTag = async () => {
        const params = {
            name: name,
            backgroundColor: color,
        };
        try {
            setConfirmLoading(true);
            const jsonResp = await createTagAPI(params);

            if (jsonResp.code === 0) {
                await getTagList();
                setConfirmLoading(false);
                setOpen(false);
                message.success("创建标签成功", 1);
            } else {
                message.error("创建标签失败", 1);
            }
        } catch (error) {
            message.error("创建标签时发生错误，请稍后重试", 1);
        }
    };

    const handleCreateTag = () => {
        createTag();
    };

    const handleUpdateTag = async () => {
        updateTag(tagId, name, color);
    }

    const handleDeleteTagItem = async (id: number) => {
        Modal.confirm({
            title: "删除标签",
            content: "确定要删除该标签吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                deleteTag(id);
            }
        });
    };

    const TagColumns = [
        { title: "标签名称", dataIndex: "name", key: "name", align: "center" },
        {
            title: "标签颜色",
            dataIndex: "backgroundColor",
            key: "backgroundColor",
            render: (backgroundColor) => (
                <div className="flex justify-center">
                    <div
                        className="rounded-md border-solid border-2"
                        style={{
                            width: "50%",
                            height: "100%",
                            backgroundColor: ConvertColorToTranslucent(backgroundColor),
                            borderColor: backgroundColor,
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
            title: "操作",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a
                        type="text"
                        className="bg-indigo-500 p-2 rounded-sm hover:bg-indigo-300"
                        onClick={() => handleDeleteTagItem(record.id)}
                    >
                        删除
                    </a>
                    <a
                        type="text"
                        className="bg-orange-500 p-2 rounded-sm hover:bg-orange-300"
                        onClick={() => {
                            setTagId(record.id);
                            setName(record.name);
                            setColor(record.backgroundColor);
                            setModalTitle("编辑标签")
                            setOpen(true);
                        }}
                    >
                        编辑
                    </a>
                </Space>
            ),
            align: "center",
        },
    ] as ColumnsType<tagItem>;

    return (
        <div className="font-main">
            <button className="btn-green my-4" onClick={() => {
                setTagId(0);
                setName("");
                setColor("#7939E7");
                setModalTitle("创建新标签");
                setOpen(true);
            }}>
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
                    title={modalTitle}
                    centered
                    open={open}
                    onOk={modalTitle === "创建新标签" ? handleCreateTag : handleUpdateTag}
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
