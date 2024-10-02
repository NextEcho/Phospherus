import { userItem } from "@/api/user/types";
import { deleteUserAPI, getUserListAPI, updateUserAPI } from "@/api/user";
import { Card, ConfigProvider, Form, Input, message, Modal, Space, Table, theme } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

const User = () => {
    const [userList, setUserList] = useState<userItem[]>([]);
    const [showUserDialog, setShowUserDialog] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<userItem>({} as userItem);

    useEffect(() => {
        getUserList();
    }, []);

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

    const deleteUser = async (id: number) => {
        Modal.confirm({
            title: "删除用户",
            content: "确定要删除该用户吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: async () => {
                try {
                    const jsonResp = await deleteUserAPI({ id });
                    if (jsonResp.code === 0) {
                        message.success("删除用户成功", 1);
                        getUserList();
                    } else {
                        message.error("删除用户失败", 1);
                    }
                } catch (err) {
                    console.log("捕获 error:", err);
                }
            },
        });
    };

    const updateUser = async (user: userItem) => {
        const params = {
            id: user.id,
            nickname: user.nickname,
            email: user.email,
            github: user.github,
        };
        try {
            const jsonResp = await updateUserAPI(params);
            if (jsonResp.code === 0) {
                message.success("修改用户成功", 1);
                setShowUserDialog(false);
                getUserList();
            } else {
                message.error("修改用户失败", 1);
            }
        } catch (err) {
            console.log("捕获 error:", err);
        }
    };

    const handleDeleteUser = (id: number) => {
        deleteUser(id);
    };

    const handleUpdateUser = (user: userItem) => {
        updateUser(user);
    };

    const showUpdateUserDialog = (user: userItem) => {
        setSelectedUser(user);
        setShowUserDialog(true);
    };

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
        { title: "账户名", dataIndex: "passport", key: "passport", align: "center" },
        { title: "昵称", dataIndex: "nickname", key: "nickname", align: "center" },
        { title: "邮箱", dataIndex: "email", key: "email", align: "center" },
        { title: "Github", dataIndex: "github", key: "github", align: "center" },
        {
            title: "操作",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a
                        type="text"
                        className="bg-indigo-500 p-2 rounded-sm hover:bg-indigo-300"
                        onClick={() => handleDeleteUser(record.id)}>
                        删除
                    </a>
                    <a
                        type="text"
                        className="bg-orange-500 p-2 rounded-sm hover:bg-orange-300"
                        onClick={() => showUpdateUserDialog(record)}>
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
            <Modal
                title="修改用户信息"
                open={showUserDialog}
                onCancel={() => setShowUserDialog(false)}
                cancelText="取消"
                okText="确定"
                onOk={() => handleUpdateUser(selectedUser)}
            >
                <Form
                    initialValues={selectedUser}
                    onFinish={handleUpdateUser}
                    onValuesChange={(changedValues, allValues) => {
                        setSelectedUser(prevState => ({
                            ...prevState,
                            ...changedValues
                        }));
                    }}
                >
                    <Form.Item label="昵称" name="nickname">
                        <Input />
                    </Form.Item>
                    <Form.Item label="邮箱" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Github" name="github">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default User;
