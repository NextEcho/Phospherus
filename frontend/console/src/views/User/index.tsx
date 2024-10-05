import { userItem } from "@/api/user/types";
import { createUserAPI, deleteUserAPI, getUserListAPI, updateUserAPI } from "@/api/user";
import { Card, ConfigProvider, Form, Input, message, Modal, Space, Table, theme } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { GeneratePassword } from "@/tools/password";

const User = () => {
    const [userList, setUserList] = useState<userItem[]>([]);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [showUserDialog, setShowUserDialog] = useState<boolean>(false);

    const [userId, setUserId] = useState<number>(0);
    const [passport, setPassport] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [github, setGithub] = useState<string>("");

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
        try {
            const jsonResp = await deleteUserAPI({ id });
            if (jsonResp.code === 0) {
                setUserList(prevList => prevList.filter(item => item.id !== id));
                message.success("删除用户成功", 1);
            } else {
                message.error("删除用户失败", 1);
            }
        } catch (err) {
            console.log("捕获 error:", err);
        }
    };

    const updateUser = async () => {
        const params = {
            id: userId,
            nickname,
            email,
            github,
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

    const createUser = async () => {
        const params = {
            passport,
            nickname,
            email,
            github,
            password,
        };
        try {
            const jsonResp = await createUserAPI(params);
            if (jsonResp.code === 0) {
                message.success("创建用户成功", 1);
                setShowUserDialog(false);
                getUserList();
            } else {
                message.error("创建用户失败", 1);
            }
        } catch (err) {
            console.log("捕获 error:", err);
        }
    }

    const handleCreateUser = () => {
        createUser();
    };

    const handleDeleteUser = (id: number) => {
        Modal.confirm({
            title: "删除用户",
            content: "确定要删除该用户吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                deleteUser(id);
            }
        });
    };

    const handleUpdateUser = () => {
        updateUser();
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
                        onClick={() => {
                            setModalTitle("修改用户信息");
                            setUserId(record.id);
                            setNickname(record.nickname);
                            setEmail(record.email);
                            setGithub(record.github);
                            setShowUserDialog(true);
                        }}>
                        编辑
                    </a>
                </Space>
            ),
            align: "center",
        },
    ] as ColumnsType<userItem>;

    return (
        <div className="font-main">
            <button className="btn-green my-4" onClick={() => {
                setModalTitle("创建新用户")
                setUserId(0);
                setPassport("");
                setNickname("");
                setEmail("");
                setGithub("");
                setShowUserDialog(true);
            }}>
                创建新用户
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
                        dataSource={userList}
                        rowKey="id"
                        className="[&_.ant-table-cell]:align-middle [&_.ant-table-cell]:font-main"
                    />
                </ConfigProvider>
            </Card>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    components: {
                        Modal: {
                            headerBg: "#1D2339",
                            contentBg: "#1D2339",
                            footerBg: "#1D2339",
                            titleFontSize: 20,
                            lineHeight: 2,
                        },
                    },
                }}
            >
                <Modal
                    centered
                    title={modalTitle}
                    open={showUserDialog}
                    cancelText="取消"
                    okText="确定"
                    onCancel={() => setShowUserDialog(false)}
                    onOk={modalTitle === "修改用户信息" ? handleUpdateUser : handleCreateUser}
                >
                    <div className="form font-main px-1 py-4 text-lg">
                        {modalTitle === "创建新用户" && (
                            <>
                                <div className="passport flex mb-4 pr-10">
                                    <span className="whitespace-nowrap mr-4">账户名:</span>
                                    <Input
                                        className="font-main"
                                        type="text"
                                        value={passport}
                                        onChange={(e) => {
                                            setPassport(e.target.value);
                                        }}
                                        onBlur={() => {
                                            setPassword(GeneratePassword(passport));
                                        }}
                                    />
                                </div>
                            </>
                        )}
                        <div className="nickname flex mb-4 pr-10">
                            <span className="whitespace-nowrap mr-4">昵 称:</span>
                            <Input
                                className="font-main"
                                value={nickname}
                                onChange={(e) => {
                                    setNickname(e.target.value);
                                }}
                            />
                        </div>
                        <div className="email flex mb-4 pr-10">
                            <span className="whitespace-nowrap mr-4">邮 箱:</span>
                            <Input
                                className="font-main"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className="github flex mb-4 pr-10">
                            <span className="whitespace-nowrap mr-4">Github:</span>
                            <Input
                                className="font-main"
                                value={github}
                                onChange={(e) => {
                                    setGithub(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
        </div>
    );
};

export default User;
