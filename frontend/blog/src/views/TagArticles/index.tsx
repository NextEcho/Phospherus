import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { articleItem } from "@/api/article/types";
import { getArticleListByTagAPI } from "@/api/article";
import { ConvertColorToTranslucent } from "@/tools/color";
import { ConfigProvider, Pagination, theme } from "antd";

// TagArticles 标签下的文章概览
const TagArticles = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { state } = location;
	const [articleList, setArticleList] = useState<articleItem[]>([]);
	const [pageNum, setPageNum] = useState(1);
	const [total, setTotal] = useState(0);
	const pageSize = 10;

	useEffect(() => {
		fetchData(pageNum);
	}, []);

	const fetchData = async (current: number) => {
		const params = {
			pageNum: current,
			pageSize: pageSize,
			tagId: state.id as number,
		};
		const jsonResp = await getArticleListByTagAPI(params);
		const articleListData = jsonResp.data;

		setTotal(articleListData.total);
		setArticleList(articleListData.articleList);
	};

	const handleClick = (id: number) => {
		navigate(`/article/${id}`);
	};

	const handlePageChange = (current: number) => {
		setPageNum(current);
		fetchData(current);
	};

	const articleListData = () => {
		if (articleList.length === 0) {
			return (
				<div className="font-main text-slate-500 text-xl">
					<span>这个标签下还没有文章发布哦😥</span>
				</div>
			);
		}

		return articleList.map((item, index) => {
			return (
				<div key={index}>
					<div
						className="article flex text-lg transition-all duration-200 px-4 py-4 w-full rounded-md hover:shadow-lg hover:shadow-gray-950/50 cursor-pointer"
						onClick={() => handleClick(item.id)}
					>
						<div className="article-time mr-10  font-code">
							{item.createdAt}
						</div>
						<div className="article-title font-main">{item.title}</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div className="archive-page flex flex-col min-h-screen">
			<div className="navigation sticky top-0">
				<NavBar />
			</div>
			<div className="content bg-main w-full h-full flex flex-1 flex-col px-96 pt-24 pb-8 text-slate-50">
				<div className="tag-name flex justify-center font-main">
					<div
						className="text-3xl px-3 py-2 border-2 border-solid rounded-lg"
						style={{
							borderColor: state.backgroundColor,
							backgroundColor: ConvertColorToTranslucent(state.backgroundColor),
						}}
					>
						{state.name}
					</div>
				</div>
				<div className="article-list mt-8">{articleListData()}</div>
				<div className="pagination mt-4">
					<ConfigProvider
						theme={{
							algorithm: theme.darkAlgorithm,
							token: {
								colorPrimary: "#6366F1",
							},
							components: {
								Pagination: {
									itemActiveBg: "#1A1833",
									itemInputBg: "#5366f1",
								},
							},
						}}
					>
						<Pagination
							showQuickJumper={false}
							showSizeChanger={false}
							current={pageNum}
							pageSize={pageSize}
							total={total}
							onChange={(current: number) => handlePageChange(current)}
						></Pagination>
					</ConfigProvider>
				</div>
			</div>
			<div className="bottom">
				<Footer />
			</div>
		</div>
	);
};

export default TagArticles;
