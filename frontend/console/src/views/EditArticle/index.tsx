import { useCallback, useState } from "react";
import { Card, message } from "antd";
import { postArticleAPI } from "@/api/article";
import { postArticleReq } from "@/api/article/types";
import { tagItem } from "@/api/tag/types";
import MDEditor from "@uiw/react-md-editor";
import ImageUploader from "./ImageUploader";
import TagSelect from "./TagSelect";
import PublicSwitcher from "./PublicSwitcher";

const EditArticle = () => {
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [mdContent, setMdContent] = useState("");
    const [visible, setVisible] = useState(true);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [tags, setTags] = useState<tagItem[]>([] as tagItem[]);

    const handleEditorChange = (value?: string) => {
        setMdContent(value || "");
    };

    const handleSetCover = useCallback((newCover: string) => {
        setCover(newCover);
    }, []);

    const handlePostArtcile = (status: number) => {
        const params: postArticleReq = {
            authorId: 1,
            title: title,
            content: mdContent,
            cover: cover ? cover : "deafult.jpg",
            isVisible: visible ? 1 : 0,
            tagIds: selectedTags,
            status: status,
            description: "", // 后端会自动截取，后续可在此处优化，比如使用 AI 自动生成
        };

        const sendData = async () => {
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

        sendData();
    };

    return (
        <div className="edit h-full text-slate-50 font-main">
            <div>
                {/* <button className="btn-violet my-4">上传本地文件</button> */}
            </div>
            <Card className="bg-[#272E48] border-none font-main">
                <div className="post-article flex">
                    <input
                        placeholder="Title of article"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="peer h-full flex-1 border-b-2 border-gray-200 bg-transparent pt-4 pb-1.5 text-lg font-normal 
                text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-indigo-500 
                focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 mb-5 font-main text-slate-50 pl-2"
                    />
                    <button className="btn-green my-4 mx-2" onClick={() => handlePostArtcile(1)}>发布文章</button>
                    <button className="btn-orange my-4" onClick={() => handlePostArtcile(0)}>
                        保存文章
                    </button>
                </div>
                <div className="md-container h-full" data-color-mode="dark">
                    <MDEditor height={590} value={mdContent} onChange={handleEditorChange} />
                </div>
            </Card>

            <div className="flex">
                <Card className="bg-[#272E48] border-none font-main mt-4 mr-4 w-1/3 h-[110px]">
                    <ImageUploader onSetCover={handleSetCover} />
                </Card>

                <Card className="bg-[#272E48] border-none font-main mt-4 text-slate-50 w-1/3 mr-4 h-[110px]">
                    <TagSelect
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        tags={tags}
                        setTags={setTags}
                    />
                </Card>

                <Card className="bg-[#272E48] border-none font-main mt-4 text-slate-50 w-1/3 h-[110px]">
                    <PublicSwitcher visible={visible} setVisible={setVisible} />
                </Card>
            </div>
        </div>
    );
};

export default EditArticle;
