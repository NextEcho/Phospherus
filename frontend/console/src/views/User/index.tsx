import { userItem } from "@/api/user/types";
import { Card, ConfigProvider, Space, Table, theme } from "antd";
import { ColumnsType } from "antd/es/table";

const User = () => {
    const userData: any[] = [];
    const userColumns = [
        { title: "用户ID", dataIndex: "id", key: "id", align: "center" },
        { title: "账户名", dataIndex: "passport", key: "passport", align: "center" },
        { title: "昵称", dataIndex: "nickname", key: "nickname", align: "center" },
        {
            title: "头像",
            dataIndex: "avatar",
            key: "avatar",
            render: (avatar: string) => (
                <div className="flex justify-center">
                    <img src={avatar} width={100} height={70} className="bg-cover bg-center" />
                </div>
            ),
            align: "center",
        },
        { title: "邮箱", dataIndex: "email", key: "email", align: "center" },
        { title: "Github", dataIndex: "github", key: "github", align: "center" },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a type="text" className="bg-indigo-500 p-2 rounded-sm hover:bg-indigo-300">
                        Delete
                    </a>
                </Space>
            ),
            align: "center",
        },
    ] as ColumnsType<userItem>;
    return (
        <div className="font-main">
            <button className="btn-green my-4">
                创建用户
            </button>
            <Card className="bg-[#272E48] border-none">
                <ConfigProvider
                    theme={{
                        algorithm: theme.darkAlgorithm,
                        components: {
                            Table: {
                                headerBg: "#1D2339",
                                rowHoverBg: "#222942",
                            },
                        },
                    }}
                >
                    <Table
                        columns={userColumns}
                        dataSource={userData}
                        rowKey="id"
                        className="[&_.ant-table-cell]:align-middle [&_.ant-table-cell]:font-main"
                    />
                </ConfigProvider>
            </Card>
        </div>
    );
};

export default User;
