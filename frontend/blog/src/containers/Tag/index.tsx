import Banner from "@/components/Banner";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import TagItem from "./TagItem";

const Tag = (): JSX.Element => {
    return (
        <>
            <div className="tag min-w-96">
                <NavBar />
                <Banner />
                <div
                    className="blog-content w-full flex justify-center"
                    style={{
                        backgroundColor: "#0E0E13",
                    }}
                >
                    <div className="tag-item-list flex justify-center flex-wrap w-full px-20 py-20 max-w-4xl">
                        <TagItem title={"Golang"} count={12} backgroundColor={"#6c6ced"}/>
                        <TagItem title={"Golang"} count={12} backgroundColor={"#6c6ced"}/>
                        <TagItem title={"Golang"} count={12} backgroundColor={"#6c6ced"}/>
                        <TagItem title={"Golang"} count={12} backgroundColor={"#6c6ced"}/>
                        <TagItem title={"Golang"} count={12} backgroundColor={"#6c6ced"}/>
                        <TagItem title={"Golang"} count={12} backgroundColor={"#6c6ced"}/>
                        <TagItem title={"Golang"} count={12} backgroundColor={"#6c6ced"}/>
                        <TagItem title={"Golang"} count={12} backgroundColor={"#6c6ced"}/>
                        <TagItem title={"Rust"} count={2} backgroundColor={"#487f32"}/>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Tag;