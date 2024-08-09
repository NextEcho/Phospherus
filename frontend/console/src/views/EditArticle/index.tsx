import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Card, Upload, Button, UploadProps, message, Select, ConfigProvider, theme } from "antd";
import "mdui/mdui.css";
import "mdui/components/select.js";
import "mdui/components/menu-item.js";
import { UploadOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";
import { postArticleAPI } from "@/api/article";
import { postArticleReq } from "@/api/article/types";

const options: SelectProps["options"] = [
  { value: "gold" },
  { value: "lime" },
  { value: "green" },
  { value: "cyan" },
  { value: "purple" },
  { value: "slate" },
  { value: "indigo" },
  { value: "violet" },
  { value: "white" },
  { value: "black" },
];

const sharedProps: SelectProps = {
  mode: "multiple",
  style: { width: "100%" },
  options,
  placeholder: "Select Item...",
  maxTagCount: "responsive",
};

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [mdContent, setMdContent] = useState("");
  const [tags, setTags] = useState();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // 获取标签列表
    };

    fetchData();
  });

  const handlePostArtcile = (status: number) => {
    const params: postArticleReq = {
      authorId: 1,
      title: title,
      content: mdContent,
      cover: "",
      isVisible: visible ? 1 : 0,
      categoryId: 0,
      tagIds: [1, 2, 3],
      status: status,
      description: "", // 后端会自动截取，后续可在此处优化，比如使用 AI 自动生成
    };

    const fetchData = async () => {
      const jsonResp = await postArticleAPI(params);

      if (jsonResp.code === 0) {
        if (status === 0) {
          message.success("保存文章成功", 1);
        } else if (status === 1) {
          message.success("发布文章成功", 1);
        }
      } else {
        message.error("出现错误", 1);
      }
    };

    fetchData();
  };

  const uploadProps: UploadProps = {
    name: "file",
    action: "https://127.0.0.1:8989/api/console/file/upload",
    headers: {
      authorization: "authorization-text",
    },
    // only image can be uploaded
    beforeUpload: (file) => {},
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

  const selectProps: SelectProps = {
    value: tags,
    onChange: setTags,
  };

  return (
    <div className="edit-article h-full text-slate-50">
      <div>
        <button className="btn-green my-4" onClick={() => handlePostArtcile(1)}>
          发布文章
        </button>
        <button className="btn-orange my-4" onClick={() => handlePostArtcile(0)}>
          保存文章
        </button>
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

      <div className="flex">
        <Card className="bg-[#272E48] border-none font-sans mt-4 mr-4 w-1/3">
          <div className="upload-cover text-slate-50 mr-4">
            <span>上传封面:</span>
            <Upload className="ml-4" {...uploadProps}>
              <Button
                icon={<UploadOutlined />}
                type="link"
                className="bg-indigo-500 text-slate-50 border-none focus:bg-indigo-500"
              >
                Click to upload Cover
              </Button>
            </Upload>
          </div>
        </Card>

        <Card className="bg-[#272E48] border-none font-sans mt-4 text-slate-50 w-1/3 mr-4">
          <div className="flex items-center">
            <span className="whitespace-nowrap mr-4">选择标签:</span>
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
              }}
            >
              <Select {...sharedProps} {...selectProps} />
            </ConfigProvider>
          </div>
        </Card>

        <Card className="bg-[#272E48] border-none font-sans mt-4 text-slate-50 w-1/3"></Card>
      </div>
    </div>
  );
};

export default EditArticle;

{
  /* <div className="flex justify-start items-center">
          <div className="select-tag text-slate-50 mr-4 leading-8 flex items-center">
            <span>选择标签:</span>
            <div className="w-64 ml-4">
              <mdui-select multiple variant="filled" className="w-32 bg-indigo-200 h-1">
                <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
                <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
                <mdui-menu-item value="item-3">Item 3</mdui-menu-item>
              </mdui-select>
            </div>
          </div>
          <div className="select-tag text-slate-50 mr-4 leading-8 flex">
            <span>是否公开:</span>
            <label className="inline-flex items-center me-5 cursor-pointer ml-4">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={visible}
                onChange={(e) => {
                  setVisible(e.target.checked);
                }}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div> */
}
