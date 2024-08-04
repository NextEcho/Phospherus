import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Card, Upload, Button, UploadProps, message, Select, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";
import { postArticleAPI } from "@/api/article";
import { postArticleReq, postArticleResp } from "@/api/article/types";

const options: SelectProps["options"] = [
  { value: "gold" },
  { value: "lime" },
  { value: "green" },
  { value: "cyan" },
];

type TagRender = SelectProps["tagRender"];

const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [mdContent, setMdContent] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchTagList = () => {
        
    }
    const fetchData = async () => {
        // 获取标签列表

        
        // 获取分类列表
    }

    fetchData();
  })

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
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
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
      <Card className="bg-[#272E48] border-none font-sans mt-4">
        <div className="flex justify-start items-center">
          <div className="upload-cover text-slate-50 mr-4">
            <span>上传封面:</span>
            <Upload className="ml-4" {...uploadProps}>
              <Button
                icon={<UploadOutlined />}
                type="link"
                className="bg-indigo-500 text-slate-50 border-none focus:bg-indigo-500"
              >
                Click to upload
              </Button>
            </Upload>
          </div>
          <div className="select-category text-slate-50 mr-4 leading-8 flex">
            <span>选择分类:</span>
            <div className="ml-4">
              <select
                className="bg-blue-700 w-32 h-[32px] rounded-md px-2 hover:cursor-pointer 
                     text-sm outline outline-0 transition-all"
              >
                <option value="123">后端开发</option>
                <option value="234">前端开发</option>
                <option value="345">区块链开发</option>
                <option value="345">大数据开发</option>
              </select>
            </div>
          </div>
          <div className="select-tag text-slate-50 mr-4 leading-8 flex">
            <span>选择标签:</span>
            <Select
              className="ml-4"
              mode="multiple"
              tagRender={tagRender}
              allowClear
              status="warning"
              style={{ width: "400px" }}
              options={options}
            />
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
        </div>
      </Card>
    </div>
  );
};

export default EditArticle;
