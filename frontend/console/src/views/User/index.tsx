import { userItem } from "@/api/user/types";
import { getUserListAPI } from "@/api/user";
import { Card, ConfigProvider, message, Space, Table, theme } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

const User = () => {
    const [userList, setUserList] = useState<userItem[]>([]);

    const getUserList = async () => {
        const params = {
            pageNum: 1,
            pageSize: 10,
        };
        try {
            const jsonResp = await getUserListAPI(params);
            if (jsonResp.code === 0) {
                setUserList(jsonResp.data.userList);
            } else {
                message.error("查询标签列表失败", 1);
            }
        } catch (err) {
            console.log("捕获 error:", err);
        }
    };

    useEffect(() => {
        getUserList();
    }, []);

    const userColumns = [
        {
            title: "头像",
            dataIndex: "avatar",
            key: "avatar",
            render: (avatar: string) => (
                <div className="flex justify-center">
                    <img
                        src={avatar}
                        width={64}
                        height={64}
                        className="bg-cover bg-center rounded-full"
                    />
                </div>
            ),
            align: "center",
        },
        { title: "用户ID", dataIndex: "id", key: "id", align: "center" },
        { title: "账户名", dataIndex: "passport", key: "passport", align: "center" },
        { title: "昵称", dataIndex: "nickname", key: "nickname", align: "center" },
        { title: "邮箱", dataIndex: "email", key: "email", align: "center" },
        { title: "Github", dataIndex: "github", key: "github", align: "center" },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a type="text" className="bg-indigo-500 p-2 rounded-sm hover:bg-indigo-300">
                        删除
                    </a>
                    <a type="text" className="bg-orange-500 p-2 rounded-sm hover:bg-orange-300">
                        修改
                    </a>
                </Space>
            ),
            align: "center",
        },
    ] as ColumnsType<userItem>;

    return (
        <div className="font-main">
            <button className="btn-green my-4">创建新用户</button>
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
                        dataSource={userList}
                        rowKey="id"
                        className="[&_.ant-table-cell]:align-middle [&_.ant-table-cell]:font-main"
                    />
                </ConfigProvider>
            </Card>
        </div>
    );
};

export default User;
