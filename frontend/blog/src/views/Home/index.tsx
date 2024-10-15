import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Divider from "@/components/Divider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleListAPI } from "@/api/article";
import { articleItem } from "@/api/article/types";
import { ConfigProvider, Pagination, theme } from "antd";

interface ArticleItemProps {
	id: number;
	title: string;
	time: string;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ id, title, time }) => {
	const navigate = useNavigate();
	const handleClick = (id: number) => {
		navigate(`/article/${id}`);
	};

	return (
		<div className="article-item w-full py-2 my-2 flex justify-around items-center font-main">
			<a className="title text-2xl basis-2/3 text-slate-50 min-w-[512px] truncate">
				<span
					className="transition duration-75 hover:cursor-pointer hover:text-indigo-500"
					onClick={(e) => {
						e.preventDefault();
						handleClick(id);
					}}
				>
					{title}
				</span>
			</a>
			<span className="time basis-1/3 text-slate-500 text-right min-w-28 font-code">
				{time}
			</span>
		</div>
	);
};

const Home = () => {
	const [articles, setArticles] = useState<articleItem[]>([] as articleItem[]);
	const [pageNum, setPageNum] = useState(1);
	const [total, setTotal] = useState(0);
	const pageSize = 10; // pageSize is fixed at 10

	const fetchArticleListData = async (current: number) => {
		const params = {
			pageNum: current,
			pageSize: pageSize,
		};

		try {
			const jsonResp = await getArticleListAPI(params);
			if (jsonResp.code === 0) {
				const articleListData = jsonResp.data;
				setArticles(articleListData.articleList);
				setTotal(articleListData.total);
			} else {
				console.log("获取文章列表失败");
			}
		} catch (err) {
			console.log("捕获异常 error: ", err);
		}
	};

	const handlePageChange = (current: number) => {
		setPageNum(current);
		fetchArticleListData(current);
	};

	const articleListData = () => {
		if (articles.length === 0) {
			return (
				<div className="font-main text-slate-50 text-3xl">
					<span>暂无文章</span>
				</div>
			);
		}

		return articles.map((item, idx) => {
			return (
				<div key={idx} className="w-full">
					<ArticleItem id={item.id} title={item.title} time={item.createdAt} />
					<Divider />
				</div>
			);
		});
	};

	useEffect(() => {
		fetchArticleListData(pageNum);
	}, []);

	return (
		<div className="home-page flex flex-col min-h-screen">
			<div className="navigation sticky top-0">
				<NavBar />
			</div>
			<div className="content bg-main w-full h-full flex flex-1 flex-col items-center px-96 pt-24 pb-8">
				<div className="article-list flex flex-col items-center w-5/6 max-w-[80rem] min-w-[720px]">
					{articleListData()}
				</div>
				<div className="pagination mt-8">
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

export default Home;
