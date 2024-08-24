import { Card, ConfigProvider, Table, theme } from "antd";

const userData: any[] = [];

const User = () => {
    return (
        <div className="font-main">
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
                    <Table dataSource={userData} />
                </ConfigProvider>
            </Card>
        </div>
    );
};

export default User;
