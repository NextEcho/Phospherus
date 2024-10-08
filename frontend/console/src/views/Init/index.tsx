import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Init: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("初始化表单提交:", values);
        // 这里可以添加初始化逻辑
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f0f2ff",
        }}>
            <Card
                style={{
                    width: 400,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }}
            >
                <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>初始化系统</Title>
                <Form
                    form={form}
                    name="init"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "请输入管理员用户名!" }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="管理员用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "请输入管理员密码!" }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="管理员密码" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "请输入管理员密码!" }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { type: "email", message: "请输入有效的邮箱地址!" },
                            { required: true, message: "请输入管理员邮箱!" }
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="管理员邮箱" />
                    </Form.Item>

                    <Form.Item
                        name="siteName"
                        rules={[{ required: true, message: "请输入博客站点名称!" }]}
                    >
                        <Input prefix={<HomeOutlined />} placeholder="博客站点名称" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            初始化系统
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Init;