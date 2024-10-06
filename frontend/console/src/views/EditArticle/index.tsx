import { useEffect, useState } from "react";
import { Card, ConfigProvider, Drawer, Input, List, message, Modal, theme } from "antd";
import { getArticleDetailAPI, postArticleAPI, updateArticleAPI } from "@/api/article";
import { postArticleReq } from "@/api/article/types";
import { tagItem } from "@/api/tag/types";
import MDEditor from "@uiw/react-md-editor";
import TagSelect from "./TagSelect";
import PublicSwitcher from "./PublicSwitcher";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import { attachmentItem } from "@/api/attachment/types";
import AttachmentSelector from "./AttachmentSelector";

const EditArticle = () => {

    const DRAFT_STATUS = 1;
    const PUBLISHD_STATUS = 2;

    const navigate = useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [title, setTitle] = useState("");
    const [coverUrl, setCoverUrl] = useState("");
    const [mdContent, setMdContent] = useState("");
    const [visible, setVisible] = useState(true);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [tags, setTags] = useState<tagItem[]>([] as tagItem[]);
    const [status, setStatus] = useState<number>(0);
    const [showAttachmentSelector, setShowAttachmentSelector] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getArticleDetail(parseInt(id));
        }
    }, [id])

    const getArticleDetail = async (id: number) => {
        try {
            const jsonResp = await getArticleDetailAPI({ id });
            if (jsonResp.code === 0) {
                const article = jsonResp.data;
                setTitle(article.title);
                setCoverUrl(article.cover);
                setMdContent(article.content);
                setVisible(article.isVisible === 1);
                setSelectedTags(article.tagIds);
                setStatus(article.status);
            } else {
                message.error("获取文章信息失败", 1);
            }
        } catch (error) {
            console.error("获取文章时出错:", error);
        }
    }

    const postArticle = async (status: number): Promise<number> => {
        const userId = localStorage.getItem("userId");
        const params: postArticleReq = {
            authorId: parseInt(userId || "0"),
            title: title,
            content: mdContent,
            cover: coverUrl,
            isVisible: visible ? 1 : 0,
            tagIds: selectedTags,
            description: "",
            status: status,
        };

        try {
            const jsonResp = await postArticleAPI(params);
            console.log("post jsonResp:", jsonResp.data.id);
            if (jsonResp.code === 0) {
                return jsonResp.data.id;
            } else {
                message.error("发布文章出现错误", 1);
            }
        } catch (err) {
            console.log("catch error:", err)
        }

        return 0;
    }

    const updateArticle = async (id: number) => {
        const params = {
            id: id,
            title: title,
            content: mdContent,
            cover: coverUrl,
            description: "",
            isVisible: visible ? 1 : 0,
            tagIds: selectedTags,
            status: status,
        }

        try {
            const jsonResp = await updateArticleAPI(params);
            console.log("update jsonResp:", jsonResp.data.id);
            if (jsonResp.code !== 0) {
                message.error("更新文章失败", 1);
            }
        } catch (error) {
            console.error("更新文章时出错:", error)
        }
    }

    const handleEditorChange = (value?: string) => {
        setMdContent(value || "");
    };

    const handlePostArtcile = async () => {
        if (mdContent.length === 0 || title.length === 0) {
            message.info("文章标题或内容均不能为空", 1);
            return;
        }

        if (id) {
            await updateArticle(parseInt(id));
        } else {
            const articleId = await postArticle(PUBLISHD_STATUS);
            setTimeout(() => {
                navigate(`/console/edit/${articleId}`);
            }, 1000)
        }
        message.success("发布文章成功", 1);
    };

    const handleSaveArticle = async () => {
        if (mdContent.length === 0 || title.length === 0) {
            message.info("文章标题或内容均不能为空", 1);
            return;
        }

        if (id) {
            updateArticle(parseInt(id));
        } else {
            const articleId = await postArticle(DRAFT_STATUS);
            setTimeout(() => {
                navigate(`/console/edit/${articleId}`);
            }, 1000)
        }
        message.success("保存文章成功", 1);
    }

    const handleSelectAttachment = (url: string) => {
        setCoverUrl(url);
    }

    return (
        <div className="edit h-full text-slate-50 font-main">
            <Card className="bg-[#272E48] border-none font-main">
                <div className="post-article flex">
                    <input
                        placeholder="Title of article"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="peer h-full flex-1 border-b-2 border-slate-700 bg-transparent pt-4 pb-1.5 text-lg font-normal 
                text-blue-gray-700 outline outline-0 transition-all duration-150 placeholder-shown:border-blue-gray-200 focus:border-indigo-500 
                focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 mb-5 font-main text-slate-50 pl-2"
                    />
                    <button className="btn-green my-4 mx-2" onClick={() => handleSaveArticle()}>保存文章</button>
                    <button className="btn-orange my-4 mx-2" onClick={() => handlePostArtcile()}>发布文章</button>
                    <button className="btn-violet my-4 mx-2" onClick={() => { setOpenDrawer(true); }}>文章设置</button>
                </div>
                <div className={styles.mdEditorWrapper} data-color-mode="dark">
                    <MDEditor hideToolbar height={625} value={mdContent} onChange={handleEditorChange} />
                </div>
            </Card>

            <div className="article-properties-setting">
                <ConfigProvider
                    theme={{
                        token: {
                            colorBgBase: "#272E48",
                            colorTextBase: "#ffffff",
                        },
                    }}
                >
                    <Drawer title="文章设置" open={openDrawer} onClose={() => setOpenDrawer(false)} width={430}>
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
                            <AttachmentSelector
                                isModalOpen={showAttachmentSelector}
                                onClose={() => setShowAttachmentSelector(false)}
                                onOpen={() => setShowAttachmentSelector(true)}
                                onSelect={handleSelectAttachment}
                                url={coverUrl}
                            />
                        </div>
                    </Drawer>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default EditArticle;
