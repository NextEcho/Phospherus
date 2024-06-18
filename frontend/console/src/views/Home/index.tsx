// 博客访问量数据显示
// 数据走向图
import styles from "./index.module.scss";

const cards = [
    {
        title: "访问量",
        content: "1000",
    },
    {
        title: "评论量",
        content: "1000",
    },
    {
        title: "留言量",
        content: "1000",
    },
    {
        title: "文章量",
        content: "1000",
    },
];

const Home = () => {
    return (
        <>
            <div className={styles.homeContainer}>
                <div className={styles.cards}>
                    {cards.map((item) => {
                        return <div className={styles.cardItem}>{item.title}</div>;
                    })}
                </div>
                <div className="quickAccess">快捷访问</div>
            </div>
        </>
    );
};

export default Home;
