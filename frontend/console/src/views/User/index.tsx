import { Table } from "antd";

const userData: any[] = [];

const User = () => {
    return (
        <>
            <Table dataSource={userData} />
        </>
    );
};

export default User;
