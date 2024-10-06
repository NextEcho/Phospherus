import Card from "@/components/Card";
import Button from "@/components/Button";
import { ConfigProvider, message, Modal, Space, Table, theme } from "antd";
import { ColumnsType } from "antd/es/table";
import { attachmentItem } from "@/api/attachment/types";
import { useEffect, useState } from "react";
import { deleteAttachmentAPI, getAttachmentListAPI } from "@/api/attachment";

import imageIcon from '@/assets/images/typeIcons/image.png';
import videoIcon from '@/assets/images/typeIcons/video.png';
import audioIcon from '@/assets/images/typeIcons/audio.png';
import fileIcon from '@/assets/images/typeIcons/file.png';
import { formatFileSize } from "@/tools/file";
import UploadFile from "@/components/UploadFile";

const SelectTypeIcon = (type: string) => {
    switch (type) {
        case "图片":
            return <img className="w-8 h-8 bg-cover bg-center" src={imageIcon} alt="image" />;
        case "视频":
            return <img className="w-8 h-8 bg-cover bg-center" src={videoIcon} alt="video" />;
        case "音频":
            return <img className="w-8 h-8 bg-cover bg-center" src={audioIcon} alt="audio" />;
        default:
            return <img className="w-8 h-8 bg-cover bg-center" src={fileIcon} alt="file" />;
    }
}

const Attachment = () => {
    const [attachmentList, setAttachmentList] = useState<attachmentItem[]>([]);
    const [showFileUploadModal, setShowFileUploadModal] = useState<boolean>(false);

    useEffect(() => {
        getAttachmentList();
    }, []);

    const getAttachmentList = async () => {
        const params = {
            pageNum: 1,
            pageSize: 10,
        };
        try {
            const jsonResp = await getAttachmentListAPI(params);
            if (jsonResp.code === 0) {
                setAttachmentList(jsonResp.data.attachmentList);
            } else {
                message.error("查询附件列表失败", 1);
            }
        } catch (err) {
            console.log("捕获 error:", err);
        }
    };

    const deleteAttachment = async (id: number) => {
        try {
            const jsonResp = await deleteAttachmentAPI({ id });
            if (jsonResp.code === 0) {
                setAttachmentList(prevList => prevList.filter(item => item.id !== id));
                message.success("删除附件成功", 1);
            } else {
                message.error("删除附件失败", 1);
            }
        } catch (err) {
            console.log("捕获 error:", err);
        }
    }

    const handleDeleteAttachment = (id: number) => {
        Modal.confirm({
            title: "删除附件",
            content: "确定要删除该附件吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                deleteAttachment(id);
            },
        });
    };

    // auto 是否自动刷新
    const handleFlushAttachmentList = async (auto: boolean) => {
        await getAttachmentList();
        if (!auto) {
            message.success("刷新附件列表成功", 1);
        }
    }

    const showAttachmentModal = (record: attachmentItem) => {
        ConfigProvider.config({
            theme: {
                algorithm: theme.darkAlgorithm,
            },
        });
        Modal.info({
            title: "附件预览",
            content: (
                <div className="font-main">
                    <img src={record.url} alt={record.name} />
                    <div className="flex flex-col justify-between">
                        <span>附件名: {record.name}</span>
                        <span>附件大小: {formatFileSize(record.size)}</span>
                        <span>附件类型: {record.typeName}</span>
                    </div>
                </div>
            ),
            okText: "关闭",
            cancelText: "关闭",
        });
    };

    const AttachmentColums = [
        {
            title: "附件名称", dataIndex: "name", key: "name", align: "center",
            render: (_, record) => (
                <div className="flex items-center justify-center">
                    {SelectTypeIcon(record.typeName)}
                    <a className="ml-2" onClick={() => showAttachmentModal(record)}>{record.name}</a>
                </div>
            ),
        },
        {
            title: "附件类型",
            dataIndex: "type",
            key: "type",
            align: "center",
            render: (_, record) => (
                <div className="flex justify-center">
                    <span>{record.typeName}</span>
                </div>
            ),
        },
        {
            title: "附件大小",
            dataIndex: "size",
            key: "size",
            align: "center",
            render: (_, record) => (
                <div className="flex justify-center">
                    <span>{formatFileSize(record.size)}</span>
                </div>
            ),
        },
        {
            title: "上传者",
            dataIndex: "creator",
            key: "creator",
            align: "center",
            render: (_, record) => (
                <div className="flex justify-center">
                    <span>{record.creator}</span>
                </div>
            ),
        },
        {
            title: "上传时间",
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
            render: (_, record) => (
                <div className="flex justify-center">
                    <span>{record.createdAt}</span>
                </div>
            ),
        },
        {
            title: "操作",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a type="text" className="bg-indigo-500 p-2 rounded-sm hover:bg-indigo-300"
                        onClick={() => handleDeleteAttachment(record.id)}
                    >
                        删除
                    </a>
                </Space>
            ),
            align: "center",
        },
    ] as ColumnsType<attachmentItem>;

    return (
        <div className="font-main">
            <button className="btn-green mb-2" onClick={() => setShowFileUploadModal(true)}>上传附件</button>
            <button className="btn-orange mb-2" onClick={() => handleFlushAttachmentList(false)}>刷新附件列表</button>
            <Card>
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
                        columns={AttachmentColums}
                        dataSource={attachmentList}
                        rowKey="id"
                        className="[&_.ant-table-cell]:align-middle [&_.ant-table-cell]:font-main"
                    />
                </ConfigProvider>
            </Card>

            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                }}
            >
                <Modal centered title="附件上传" open={showFileUploadModal} footer={null} onCancel={() => setShowFileUploadModal(false)}>
                    <UploadFile refreshAttachmentList={() => handleFlushAttachmentList(true)} />
                </Modal>
            </ConfigProvider>
        </div>
    );
};

export default Attachment;

