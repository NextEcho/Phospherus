import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import AppLayout from "@/layout/index.tsx";

const Login = React.lazy(() => import("@/views/Login/index.tsx"));
const Home = React.lazy(() => import("@/views/Home/index.tsx"));
const User = React.lazy(() => import("@/views/User/index.tsx"));
const Article = React.lazy(() => import("@/views/Article/index.tsx"));
const EditArticle = React.lazy(() => import("@/views/EditArticle/index.tsx"));

const withLoadingComponent = (comp: JSX.Element) => {
    return <Suspense fallback={<div>Loading...</div>}>{comp}</Suspense>;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/console" replace />,
    },
    {
        path: "/console",
        element: <AppLayout />,
        children: [
            {
                path: "",
                element: <Navigate to="/console/home" replace />,
            },
            {
                path: "home",
                element: withLoadingComponent(<Home />),
            },
            {
                path: "user",
                element: withLoadingComponent(<User />),
            },
            {
                path: "article",
                element: withLoadingComponent(<Article />),
            },
            {
                path: "edit-article",
                element: withLoadingComponent(<EditArticle />),
            },
        ],
    },
    {
        path: "/auth/login",
        element: withLoadingComponent(<Login />),
    },
]);

export default router;
