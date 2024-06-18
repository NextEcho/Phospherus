import styles from "@/views/Login/index.module.scss";
const Login = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <div className={styles.header}>Login</div>
                    <div className={styles.formBox}>
                        <input type="text" placeholder="Account" className={styles.inputItem} />
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.inputItem}
                        />
                        <div className={styles.loginBtn}>Login</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
