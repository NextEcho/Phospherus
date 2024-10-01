import Card from "@/components/Card";
import Button from "@/components/Button";
import { ConfigProvider, message, Modal, Space, Table, theme } from "antd";
import { ColumnsType } from "antd/es/table";
import { attachmentItem } from "@/api/attachment/types";
import { useEffect, useState } from "react";
import { getAttachmentListAPI } from "@/api/attachment";

import imageIcon from '@/assets/images/typeIcons/image.png';
import videoIcon from '@/assets/images/typeIcons/video.png';
import audioIcon from '@/assets/images/typeIcons/audio.png';
import fileIcon from '@/assets/images/typeIcons/file.png';
import { formatFileSize } from "@/tools/file";

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

    const handleUpload = () => {
        console.log("上传附件");
    };

    const handleDelete = (id: number) => {
    };

    const showAttachmentModal = (record: attachmentItem) => {
        Modal.info({
            title: "附件预览",
            content: (
                <div className="font-main">
                    <img src={record.url} alt={record.name} />
                    <div className="flex flex-col">
                        <span>文件名: {record.name}</span>
                        <span>文件大小: {formatFileSize(record.size)}</span>
                        <span>文件类型: {record.typeName}</span>
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
                        onClick={() => handleDelete(record.id)}
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
            <Button title="上传附件" handleClick={handleUpload} />
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
        </div>
    );
};

export default Attachment;

