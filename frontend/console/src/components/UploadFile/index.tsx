import React, { useEffect, useState } from 'react';
import { uploadAttachmentAPI } from "@/api/attachment";
import { InboxOutlined } from "@ant-design/icons";
import { message, UploadProps } from "antd";
import { Upload } from "antd";
import { RcFile, UploadFile as UploadFileType } from "antd/es/upload";

interface UploadFileProps {
    refreshAttachmentList: () => void;
}

const { Dragger } = Upload;

const UploadFile: React.FC<UploadFileProps> = ({ refreshAttachmentList }) => {
    const [fileList, setFileList] = useState<UploadFileType[]>([]);

    const handleUpload = async (options: any) => {
        const { file, onSuccess } = options;
        const formData = new FormData();
        formData.append("file", file as RcFile);

        const jsonResp = await uploadAttachmentAPI(formData);
        console.log("jsonResp is", jsonResp);
        if (jsonResp.code === 0) {
            onSuccess(jsonResp.data, file as RcFile);
            refreshAttachmentList();
        } else {
            message.error("上传文件失败");
        }
    }

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        customRequest: handleUpload,
        fileList,
        onChange(info) {
            setFileList(info.fileList);
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    // 在组件卸载时清除文件列表
    useEffect(() => {
        setFileList([]);
    }, []);

    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            <p className="ant-upload-hint">
                支持单个或批量上传
            </p>
        </Dragger>
    )
}

export default UploadFile;