import { createBrowserRouter } from "react-router-dom";
import Home from "@/views/Home";
import Archive from "@/views/Archive";
import Tag from "@/views/Tag";
import About from "@/views/About";
import ArticleDetail from "@/views/ArticleDetail";
import TagArticles from "@/views/TagArticles";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/archive", element: <Archive /> },
    { path: "/tag", element: <Tag /> },
    { path: "/tag/:name", element: <TagArticles /> },
    { path: "/about", element: <About /> },
    { path: "/article/:id", element: <ArticleDetail /> },
]);

export default router;
