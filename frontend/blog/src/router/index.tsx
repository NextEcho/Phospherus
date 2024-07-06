import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = React.lazy(() => import("@/containers/Home"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
]);

export default router;
