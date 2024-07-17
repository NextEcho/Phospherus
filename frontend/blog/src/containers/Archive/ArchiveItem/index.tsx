const ArchiveItem = () => {
    return (
        <>
            <div className="archive-item w-full py-4">
                <div className="year text-2xl pb-2">2024</div>
                <div className="article flex pl-4 transition-all hover:bg-indigo-900 p-4 w-full rounded-md">
                    <div className="article-time mr-16">02-05</div>
                    <div className="article-title cursor-pointer">Title of Article</div>
                </div>
                <div className="article flex pl-4 transition-all hover:bg-indigo-900 p-4 w-full rounded-md">
                    <div className="article-time mr-16">02-05</div>
                    <div className="article-title cursor-pointer">Title of Article</div>
                </div>
                <div className="article flex pl-4 transition-all hover:bg-indigo-900 p-4 w-full rounded-md">
                    <div className="article-time mr-16">02-05</div>
                    <div className="article-title cursor-pointer">Title of Article</div>
                </div>
                <div className="article flex pl-4 transition-all hover:bg-indigo-900 p-4 w-full rounded-md">
                    <div className="article-time mr-16">02-05</div>
                    <div className="article-title cursor-pointer">Title of Article</div>
                </div>
            </div>
        </>
    )
};

export default ArchiveItem;