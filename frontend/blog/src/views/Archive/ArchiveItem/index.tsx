import { articleItem } from "@/api/article/types";
import { useNavigate } from "react-router-dom";

interface ArchiveItemProps {
    year: string;
    articleList: articleItem[];
}

const ArchiveItem: React.FC<ArchiveItemProps> = ({ year, articleList }) => {
    const navigate = useNavigate();
    const handleClick = (id: number) => {
        navigate(`/article/${id}`);
    };

    return (
        <div className="archive-item w-full py-4 text-slate-100">
            <div className="archive-year text-2xl font-code mb-4">{year}</div>
            {articleList.map((item, index) => {
                return (
                    <div key={index}>
                        <div
                            className="article flex text-lg transition-all duration-300 px-4 py-4 w-full rounded-md hover:bg-slate-800/30 hover:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] cursor-pointer"
                            onClick={() => handleClick(item.id)}
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
