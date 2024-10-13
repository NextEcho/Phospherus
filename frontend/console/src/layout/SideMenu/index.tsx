import { BiUserCircle } from "react-icons/bi";
import IconItem from "./IconItem";
import { RiArticleFill, RiAttachmentFill, RiEditFill, RiHome2Fill } from "react-icons/ri";
import { BsTagsFill } from "react-icons/bs";
const SideMenu: React.FC = () => {
    const menuLinks = [
        "/console/home",
        "/console/user",
        "/console/tag",
        "/console/article",
        "/console/attachment",
        "/console/edit",
    ];

    const handleOpenBlog = () => {
        window.location.href = "http://127.0.0.1:10000";
    };

    return (
        <div className="text-slate-50 fixed top-0 left-0 h-full">
            <div
                className="logo w-full h-8 flex justify-center mt-4 mb-8 hover:cursor-pointer hover:scale-125 transition duration-300"
                onClick={handleOpenBlog}
            >
                <div className="w-8 h-8 bg-logo bg-cover"></div>
            </div>
            <div className="menu-zone flex flex-col">
                <IconItem path={menuLinks[0]}>
                    <RiHome2Fill className="text-3xl text-indigo-500" />
                </IconItem>
                <IconItem path={menuLinks[1]}>
                    <BiUserCircle className="text-3xl text-indigo-500" />
                </IconItem>
                <IconItem path={menuLinks[2]}>
                    <BsTagsFill className="text-3xl text-indigo-500" />
                </IconItem>
                <IconItem path={menuLinks[3]}>
                    <RiArticleFill className="text-3xl text-indigo-500" />
                </IconItem>
                <IconItem path={menuLinks[4]}>
                    <RiAttachmentFill className="text-3xl text-indigo-500" />
                </IconItem>
                <IconItem path={menuLinks[5]}>
                    <RiEditFill className="text-3xl text-indigo-500" />
                </IconItem>
            </div>
        </div>
    );
};

export default SideMenu;
