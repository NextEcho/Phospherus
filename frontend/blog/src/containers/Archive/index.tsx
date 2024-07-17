import NavBar from "@/components/NavBar";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import ArchiveItem from "./ArchiveItem";

const Archive = () => {
    return (
        <>
            <NavBar />
            <Banner />
            <div className="archive-main w-full h-full text-slate-200 min-w-[300px] flex flex-col items-center py-20"
                style={{
                    backgroundColor: "#0E0E13",
                }}
            >
                <div className="total w-full flex px-96 mb-16">
                    <h1 className="text-4xl text-yellow-300">
                        共计 20 篇文章
                    </h1>
                </div>
                <div className="archive-item-list w-full flex flex-col px-96">
                    <ArchiveItem />
                    <ArchiveItem />
                    <ArchiveItem />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Archive;