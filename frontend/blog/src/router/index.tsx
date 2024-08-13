import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("@/views/Home"));
const Archive = React.lazy(() => import("@/views/Archive"));
const Tag = React.lazy(() => import("@/views/Tag"));
const About = React.lazy(() => import("@/views/About"));
const ArticleDetail = React.lazy(() => import("@/views/ArticleDetail"));

const withLoadingComponent = (comp: JSX.Element) => {
    return <Suspense fallback={<div>Loading...</div>}>{comp}</Suspense>;
};

const router = createBrowserRouter([
    { path: "/", element: withLoadingComponent(<Home />) },
    { path: "/archive", element: withLoadingComponent(<Archive />) },
    { path: "/tag", element: withLoadingComponent(<Tag />) },
    { path: "/about", element: withLoadingComponent(<About />) },
    { path: "/article/:title", element: withLoadingComponent(<ArticleDetail />) },
]);

export default router;
