import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Card, Upload, Button, UploadProps, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [mdContent, setMdContent] = useState("");

  const handlePostArtcile = () => {};

  const uploadProps: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    // only image can be uploaded
    beforeUpload: (file) => {

    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="edit-article h-full text-slate-50">
      <div>
        <button className="btn-green my-4" onClick={handlePostArtcile}>
          发布文章
        </button>
        <button className="btn-orange my-4">保存文章</button>
        <button className="btn-violet my-4">上传本地文件</button>
      </div>
      <Card className="bg-[#272E48] border-none font-sans">
        <div className="post-article">
          <input
            placeholder="Title of article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="peer h-full w-full border-b-4 border-gray-200 bg-transparent pt-4 pb-1.5 text-lg font-normal 
                text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-indigo-300 
                focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 mb-5 font-mono text-slate-50 pl-2"
          />
        </div>
        <div className="md-container h-full" data-color-mode="dark">
          <MDEditor height={590} value={mdContent} onChange={setMdContent} />
        </div>
      </Card>
      <Card className="bg-[#272E48] border-none font-sans mt-4">
        <div className="upload-cover text-slate-50 font-bold">
          上传封面:
          <Upload className="ml-4" {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </div>
      </Card>
    </div>
  );
};

export default EditArticle;
