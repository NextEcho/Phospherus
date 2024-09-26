import Card from "@/components/Card";
import Button from "@/components/Button";

const Attachment = () => {
    const handleUpload = () => {
        console.log("上传附件");
    };

    return (
        <div className="font-main">
            <Button title="上传附件" handleClick={handleUpload} />
            <Card>
                <div>
                    附件管理部分
                </div>
            </Card>
        </div>
    );
};

export default Attachment;
