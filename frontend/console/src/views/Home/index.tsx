import { Typography, Card, Button, Tabs, Form, Input, List } from 'antd';
import { UserOutlined, EditOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import { ConfigProvider, theme } from 'antd';

const { Text } = Typography;
const { TabPane } = Tabs;

export default function Home() {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#6366F1',
                },
                components: {
                    Card: {
                        colorBgContainer: '#1C2237',
                    },
                },
            }}
        >
            <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card bordered={false} title={<span style={{ color: '#fff' }}>账户设置</span>}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="General" key="1">
                                <Form layout="vertical">
                                    <Form.Item label={<span style={{ color: '#fff' }}>昵称</span>} name="nickname" initialValue="John Doe">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label={<span style={{ color: '#fff' }}>邮箱</span>} name="email" initialValue="john.doe@example.com">
                                        <Input type="email" />
                                    </Form.Item>
                                    <Form.Item label={<span style={{ color: '#fff' }}>GitHub</span>} name="github" initialValue="">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label={<span style={{ color: '#fff' }}>简介</span>} name="introduction" initialValue="">
                                        <Input.TextArea rows={4} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary">保存更改</Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                            <TabPane tab="Password" key="2">
                                <Form layout="vertical">
                                    <Form.Item label={<span style={{ color: '#fff' }}>Current Password</span>} name="currentPassword">
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item label={<span style={{ color: '#fff' }}>New Password</span>} name="newPassword">
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item label={<span style={{ color: '#fff' }}>Confirm New Password</span>} name="confirmPassword">
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary">Change Password</Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Card>

                    <div className="space-y-6">
                        <Card bordered={false} title={<span style={{ color: '#fff' }}>快捷操作</span>}>
                            <div className="grid grid-cols-2 gap-4">
                                <Button icon={<EditOutlined />}>New Post</Button>
                                <Button icon={<MessageOutlined />}>Moderate Comments</Button>
                                <Button icon={<UserOutlined />}>Manage Users</Button>
                                <Button icon={<SettingOutlined />}>Site Settings</Button>
                            </div>
                        </Card>

                        <Card bordered={false} title={<span style={{ color: '#fff' }}>最近活动</span>}>
                            <List
                                dataSource={[
                                    "Published a new post: 'Top 10 SEO Tips for 2024'",
                                    "Approved 5 new comments",
                                    "Updated site theme",
                                    "Added a new user: Jane Smith",
                                    "Edited post: 'Getting Started with React'"
                                ]}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Text style={{ color: '#fff' }}>{item}</Text>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}