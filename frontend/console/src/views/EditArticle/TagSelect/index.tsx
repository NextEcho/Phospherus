import { getTagListAPI } from "@/api/tag";
import { tagItem } from "@/api/tag/types";
import { ConfigProvider, Select, SelectProps, theme } from "antd";
import { useEffect } from "react";

// TagSelect 选择标签组件
interface TagSelectProps {
    selectedTags: number[];
    setSelectedTags: React.Dispatch<React.SetStateAction<number[]>>;
    tags: tagItem[];
    setTags: React.Dispatch<React.SetStateAction<tagItem[]>>;
}

const TagSelect: React.FC<TagSelectProps> = ({ selectedTags, setSelectedTags, tags, setTags }) => {
    const handleChange = (values: number[]) => {
        setSelectedTags(values);
    };
    const selectProps: SelectProps = {
        onChange: handleChange,
    };

    const sharedProps: SelectProps = {
        mode: "multiple",
        style: { width: "100%" },
        options: tags,
        placeholder: "Select Tag...",
        maxTagCount: "responsive",
        value: selectedTags,
    };

    useEffect(() => {
        const fetchTagListData = async () => {
            const params = {
                pageNum: 1,
                pageSize: 200,
            };
            try {
                const jsonResp = await getTagListAPI(params);
                if (jsonResp.code === 0) {
                    const handledTags = jsonResp.data.tagList.map((tag: tagItem) => ({
                        ...tag,
                        value: tag.id,
                        label: tag.name,
                    }));
                    setTags(handledTags);
                } else {
                    console.log("获取 tagList 失败", jsonResp);
                }
            } catch (err) {
                console.log("捕获错误 error: ", err);
            }
        };

        fetchTagListData();
    }, []);

    return (
        <div className="flex items-center">
            <span className="whitespace-nowrap mr-4">选择标签:</span>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                }}
            >
                <Select {...sharedProps} {...selectProps} />
            </ConfigProvider>
        </div>
    );
};

export default TagSelect;
