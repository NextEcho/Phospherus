import Divider from "@/components/Divider";

const ArticleItem = () => {
    return (
        <>
            <div className="article-item w-full h-48">
                <div className="article-text">
                    <div className="tip flex justify-between">
                        <div className="title cursor-pointer">
                            文章标题
                        </div>
                        <div className="tags cursor-pointer">
                            标签
                        </div>
                    </div>
                    <div className="description my-2.5 cursor-pointer">
                        你可以了解我在沉淀设计资产方面的相关经验、多年设计工作以来日积月累的丰富实战经验、
                        作为重度观影爱好者的无聊记录、对这个世界充满敬畏而收集的奇思妙想。
                    </div>
                </div>
                <div className="work-info flex">
                    <div className="author mr-2">NextEcho</div>
                    <div className="create-time">1970-01-01</div>
                </div>
                <Divider />
            </div>
        </>
    )
}

export default ArticleItem;