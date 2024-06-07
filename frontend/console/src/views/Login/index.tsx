import styles from "./login.module.scss";
import { Button } from "antd";
import { DownCircleOutlined } from "@ant-design/icons";

const Login = () => {
    return (
        <>
            <div className={styles.box}>This is a Login Page</div>
            <div>Tow line</div>
            <Button type="primary">button text</Button>
            <DownCircleOutlined style={{ fontSize: "30px" }} />
        </>
    );
};

export default Login;
