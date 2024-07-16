const ProjectItem = () => {
    return (
        <>
            <div className="project">
                <div className="project-name">项目名称</div>
                <ul>
                    <li>
                        负责项目事项 1 ...
                    </li>
                    <li>
                        负责项目事项 2 ...
                    </li>
                </ul>
            </div>
        </>
    )
}
const CareerItem = () => {
    return (
        <>
            <div className="career-item flex justify-around mt-10">
                <div className="time basis-1/4">❖ 2024.4 ~ now</div>
                <div className="company basis-1/4">
                    <a href="" className="company-name">企业名称 ↗</a>
                    <p className="text-xs">任职岗位名称</p>
                </div>
                <div className="project-list basis-1/2">
                    <ProjectItem />
                </div>
            </div>
        </>
    )
};

export default CareerItem;