import BannerImage from "@/assets/images/banner.jpg";

const Banner = () => {
    return (
        <>
            {/* <div className="bg-nav w-100 h-96 text-slate-50">banner 部分</div> */}
            <div className="banner w-full h-screen bg-cover bg-center flex justify-center items-center"
                style={{ backgroundImage: `url(${BannerImage})` }}
            >
                <div className="title z-10">
                    <p className="text-neutral-400 font-serif text-6xl">
                        NextEcho's Blog
                    </p>
                </div>
            </div>
        </>
    )
}

export default Banner;