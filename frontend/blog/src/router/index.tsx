import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = React.lazy(() => import("@/containers/Home"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/archive",
        element: <Home />,
    },
    {
        path: "/tag",
        element: <Home />,
    },
    {
        path: "/about",
        element: <div>about</div>,
    }
]);

export default router;
