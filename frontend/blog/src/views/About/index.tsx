function About() {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "https://typora-note-storage.oss-cn-shenzhen.aliyuncs.com/resume/Resume.pdf";
        link.download = "Resume.pdf";
        link.click();
    };

    return (
        <>
            <div className="about">about page</div>
        </>
    );
}

export default About;
