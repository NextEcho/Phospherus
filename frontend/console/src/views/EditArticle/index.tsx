import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Card, Button } from "antd";

function EditArticle() {
    const [value, setValue] = React.useState("");

    return (
        <>
            <Button type="primary" style={{ margin: "10px 0" }}>
                上传本地文件
            </Button>
            <Card>
                <div className="container" data-color-mode="light">
                    <MDEditor height={520} value={value} onChange={setValue} />
                </div>
            </Card>
        </>
    );
}

export default EditArticle;
