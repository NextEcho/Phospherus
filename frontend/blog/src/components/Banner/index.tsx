import BannerImage from "@/assets/images/banner.jpg";

const Banner = () => {
    return (
        <>
            <div className="banner w-full h-[48rem] bg-cover bg-center flex justify-center items-center"
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