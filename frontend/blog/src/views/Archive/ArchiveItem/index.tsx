import { articleItem } from "@/api/article/types";
import { useNavigate } from "react-router-dom";

interface ArchiveItemProps {
    year: string;
    articleList: articleItem[];
}

const ArchiveItem: React.FC<ArchiveItemProps> = ({ year, articleList }) => {
    const navigate = useNavigate();
    const handleClick = (id: number, title: string) => {
        const data = {
            id: id,
        };
        navigate(`/article/${title}`, { state: data });
    };

    return (
        <div className="archive-item w-full py-4 text-slate-100">
            <div className="archive-year text-2xl font-code mb-4">{year}</div>
            {articleList.map((item, index) => {
                return (
                    <div key={index}>
                        <div
                            className="article flex text-lg transition-all duration-200 px-4 py-4 w-full rounded-md hover:shadow-lg hover:shadow-gray-950/50 cursor-pointer"
                            onClick={() => handleClick(item.id, item.title)}
                        >
                            <div className="article-time mr-10 font-code">{item.createdAt}</div>
                            <div className="article-title font-main">{item.title}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ArchiveItem;
