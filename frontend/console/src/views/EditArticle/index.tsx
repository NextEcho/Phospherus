import { useCallback, useState } from "react";
import { Card, ConfigProvider, Drawer, message } from "antd";
import { postArticleAPI } from "@/api/article";
import { postArticleReq } from "@/api/article/types";
import { tagItem } from "@/api/tag/types";
import MDEditor from "@uiw/react-md-editor";
import TagSelect from "./TagSelect";
import PublicSwitcher from "./PublicSwitcher";

const EditArticle = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [showAttachmentSelector, setShowAttachmentSelector] = useState<boolean>(false);
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [mdContent, setMdContent] = useState("");
    const [visible, setVisible] = useState(true);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [tags, setTags] = useState<tagItem[]>([] as tagItem[]);

    const postArticle = async (status: number) => {
        const params: postArticleReq = {
            authorId: 1,
            title: title,
            content: mdContent,
            cover: cover ? cover : "deafult.jpg",
            isVisible: visible ? 1 : 0,
            tagIds: selectedTags,
            status: status,
            description: "",
        };

        try {
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
        } catch (err) {
            console.log("catch error:", err)
        }
    }

    const handleEditorChange = (value?: string) => {
        setMdContent(value || "");
    };

    const handlePostArtcile = (status: number) => {
        postArticle(status);
    };

    return (
        <div className="edit h-full text-slate-50 font-main">
            <Card className="bg-[#272E48] border-none font-main">
                <div className="post-article flex">
                    <input
                        placeholder="Title of article"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="peer h-full flex-1 border-b-2 border-slate-700 bg-transparent pt-4 pb-1.5 text-lg font-normal 
                text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-indigo-500 
                focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 mb-5 font-main text-slate-50 pl-2"
                    />
                    <button className="btn-green my-4 mx-2" onClick={() => handlePostArtcile(1)}>发布文章</button>
                    <button className="btn-orange my-4" onClick={() => {
                        setOpenDrawer(true);
                    }}>
                        保存文章
                    </button>
                </div>
                <div className="md-container h-full" data-color-mode="dark">
                    <MDEditor className="font-main" height={590} value={mdContent} onChange={handleEditorChange} />
                </div>
            </Card>

            <div className="article-properties">
                <ConfigProvider
                    theme={{
                        token: {
                            colorBgBase: "#272E48",
                            colorTextBase: "#ffffff",
                        },
                    }}
                >
                    <Drawer title="发布文章" open={openDrawer} onClose={() => setOpenDrawer(false)} width={430}>
                        <div className="tag-select text-slate-50 font-main mb-10">
                            <TagSelect
                                selectedTags={selectedTags}
                                setSelectedTags={setSelectedTags}
                                tags={tags}
                                setTags={setTags}
                            />
                        </div>
                        <div className="public-switcher text-slate-50 font-main mb-8">
                            <PublicSwitcher visible={visible} setVisible={setVisible} />
                        </div>
                        <div className="image-uploader text-slate-50 font-main flex items-center">
                            <span className="mr-4">
                                设置封面:
                            </span>
                            <button className="btn-violet" onClick={() => setShowAttachmentSelector(true)}>从附件中选择</button>
                        </div>
                    </Drawer>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default EditArticle;
