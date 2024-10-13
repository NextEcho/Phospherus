import { Typography, Card, List } from 'antd';
import { UserOutlined, EditOutlined, SettingOutlined, TagOutlined } from '@ant-design/icons';
import { ConfigProvider, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export default function Home() {

    const navigateTo = useNavigate();

    const handleNewArticle = () => {
        navigateTo("/console/edit")
    }

    const handleManageTags = () => {
        navigateTo("/console/tag")
    }

    const handleManageUsers = () => {
        navigateTo("/console/user")
    }

    const handleManageSettings = () => {
        console.log("站点管理");
    }

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
                    <div className="space-y-6">
                        <Card hoverable bordered={false} title={<span className="text-white">快捷操作</span>}>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={handleNewArticle}>
                                    <EditOutlined className="mr-2" /> 新建文章
                                </button>
                                <button className="flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={handleManageTags}>
                                    <TagOutlined className="mr-2" /> 管理标签
                                </button>
                                <button className="flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={handleManageUsers}>
                                    <UserOutlined className="mr-2" /> 管理用户
                                </button>
                                <button className="flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={handleManageSettings}>
                                    <SettingOutlined className="mr-2" /> 网站设置
                                </button>
                            </div>
                        </Card>

                        <Card hoverable bordered={false} title={<span className="text-white">最近活动</span>}>
                            <List
                                dataSource={[
                                    "发布新文章：'2024年SEO十大技巧'",
                                    "批准5条新评论",
                                    "更新网站主题",
                                    "添加新用户: Jane Smith",
                                    "编辑文章：'React入门指南'",
                                    "添加新文章: 'Rust 与前端的结合'"
                                ]}
                                renderItem={(item: string) => (
                                    <List.Item>
                                        <Text className="text-white">{item}</Text>
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
