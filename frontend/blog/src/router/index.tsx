import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("@/containers/Home/index.tsx"));
const Archive = React.lazy(() => import("@/containers/Archive/index.tsx"));
const Tag = React.lazy(() => import("@/containers/Tag/index.tsx"));
const About = React.lazy(() => import("@/containers/About/index.tsx"));
const Article = React.lazy(() => import("@/containers/Article/index.tsx"));

const withLoadingComponent = (comp: JSX.Element) => {
    return <Suspense fallback={<div>Loading...</div>}>{comp}</Suspense>;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: withLoadingComponent(<Home />),
    },
    {
        path: "/archive",
        element: withLoadingComponent(<Archive />),
    },
    {
        path: "/tag",
        element: withLoadingComponent(<Tag />),
    },
    {
        path: "/about",
        element: withLoadingComponent(<About />),
    },
    {
        path: "/article/:title",
        element: withLoadingComponent(<Article />)
    }
]);

export default router;
