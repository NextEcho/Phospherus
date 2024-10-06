import React, { useEffect, useState } from 'react';
import { Modal, List, Card, ConfigProvider, theme, message, Input } from 'antd';
import { attachmentItem } from '@/api/attachment/types';
import { getAttachmentListAPI } from '@/api/attachment';
import { DropboxOutlined } from '@ant-design/icons';

interface AttachmentSelectorProps {
    isModalOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    onSelect: (url: string) => void;
    url: string;
}

const AttachmentSelector: React.FC<AttachmentSelectorProps> = ({ isModalOpen, onClose, onOpen, onSelect, url }) => {
    const [attachmentList, setAttachmentList] = useState<attachmentItem[]>([]);
    const [selectedFileUrl, setSelectedFileUrl] = useState<string>(url);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (isModalOpen && !hasLoaded) {
            getAttachmentList();
            setHasLoaded(true);
        }
    }, [isModalOpen, hasLoaded]);

    const getAttachmentList = async () => {
        const params = {
            pageNum: 1,
            pageSize: 10,
        };
        try {
            const jsonResp = await getAttachmentListAPI(params);
            if (jsonResp.code === 0) {
                setAttachmentList(jsonResp.data.attachmentList);
            } else {
                message.error("查询附件列表失败", 1);
            }
        } catch (err) {
            console.log("捕获 error:", err);
        }
    }

    const handleSelect = (url: string) => {
        onSelect(url);
        setSelectedFileUrl(url);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFileUrl(e.target.value);
    }

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <div>
                <Input
                    value={selectedFileUrl}
                    onChange={handleInputChange}
                    placeholder="输入图片链接或从附件列表选择"
                    prefix={
                        <DropboxOutlined
                            style={{ cursor: 'pointer' }}
                            onClick={onOpen}
                        />
                    }
                    style={{ width: '100%', minWidth: '300px', maxWidth: '500px' }}
                />
            </div>
            <Modal
                title="附件列表"
                open={isModalOpen}
                width={1000}
                onCancel={onClose}
                onOk={onClose}
                footer={null}
            >
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 5,
                        xxl: 5,
                    }}
                    dataSource={attachmentList}
                    renderItem={(item) => (
                        <List.Item>
                            {item.typeName === "图片" && (
                                <Card
                                    hoverable
                                    style={{
                                        width: '100%',
                                        borderColor: selectedFileUrl === item.url ? '#6366f1' : 'transparent',
                                        boxShadow: selectedFileUrl === item.url ? '0 0 0 2px rgba(24,144,255,0.2)' : 'none'
                                    }}
                                    cover={
                                        <div style={{ padding: '20px', textAlign: 'center', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                            <img
                                                src={item.url}
                                                alt={item.name}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        </div>
                                    }
                                    onClick={() => handleSelect(item.url)}
                                >
                                    <Card.Meta title={item.name} description={item.typeName} />
                                </Card>
                            )}
                        </List.Item>
                    )}
                />
            </Modal>
        </ConfigProvider>
    );
}
export default AttachmentSelector;