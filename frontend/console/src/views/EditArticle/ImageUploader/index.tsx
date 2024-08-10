import { uploadFileAPI } from "@/api/file";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import React from "react";

interface ImageUploaderProps {
    onSetCover: (cover: string) => void;
}

// ImageUploader 上传文件组件
const ImageUploader: React.FC<ImageUploaderProps> = ({ onSetCover }) => {
    const handleUpload = async (options: any) => {
        const { file, onSuccess } = options;
        const formData = new FormData();
        formData.append("file", file as RcFile);

        const jsonResp = await uploadFileAPI(formData);
        onSetCover(jsonResp.data.url);
        onSuccess(jsonResp.data, file as RcFile);
    };

    const uploadProps: UploadProps = {
        customRequest: handleUpload,
        name: "file",
        multiple: false,
        action: "http://127.0.0.1:8989/api/console/file/upload",
        accept: "image/*",

        onChange(info) {
            console.log("image info is", info);
            const { status } = info.file;
            if (status === "done") {
                message.success(`${info.file.name} 封面上传成功`);
            } else if (status === "error") {
                message.error(`${info.file.name} 封面上传失败`);
            }
        },
    };

    return (
        <div className="upload-cover text-slate-50 mr-4">
            <span>上传封面:</span>
            <Upload className="ml-4" {...uploadProps}>
                <Button
                    icon={<UploadOutlined />}
                    type="primary"
                    className="bg-indigo-500 text-slate-50 border-none focus:bg-indigo-500"
                >
                    Click to upload Cover
                </Button>
            </Upload>
        </div>
    );
};
export default ImageUploader;
