import styles from "./index.module.scss";
import avatarImage from "@/assets/images/avatar.jpg";

const NavBar = () => {
    return (
        <>
            <div className={styles.navContainer}>
                <div className="left">左侧菜单栏</div>
                <div className={styles.right}>
                    右侧菜单栏
                    <img src={avatarImage} alt="" />
                </div>
            </div>
        </>
    );
};

export default NavBar;
