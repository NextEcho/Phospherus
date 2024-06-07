import styles from "@/views/Login/login.module.scss";
const Login = () => {
    return (
        <>
            <div className={styles.loginContainer}>
                <div className={styles.loginBox}>
                    <p className={styles.fontLg}>Welcome</p>
                    <input
                        className={styles.accountInput}
                        type="text"
                        placeholder="Your Account"
                    />
                    <input
                        className={styles.passwordInput}
                        type="password"
                        placeholder="Your Password"
                    />
                    <button
                        className={`${styles.loginButton} ${styles.fontMd} ${styles.cursorPointer}`}
                    >
                        Login
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;
